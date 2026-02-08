"use server";

import type { MetadataRoute } from "next";
import { cacheLife, cacheTag } from "next/cache";

import { getPublicClient } from "@/lib/apollo";
import { absoluteUrl } from "@/lib/seo";

import type {
  EventStatus,
  EventsFilterInput,
  ProductsFilterInput,
} from "@/graphql/generated/types";
import {
  SITEMAP_EVENTS_QUERY,
  SITEMAP_PRODUCTS_QUERY,
} from "@/graphql/seo.query";

const SITEMAP_CHUNK_SIZE = 500;

export type SitemapChunk = { id: number };

type SitemapProductsQueryResult = {
  products: {
    products: Array<{
      id: number;
      is_active: boolean;
    }>;
    total_products: number;
  };
};

type SitemapProductsQueryVariables = {
  filter: ProductsFilterInput;
};

type SitemapEventsQueryResult = {
  events: {
    data: Array<{
      id: string;
      status: EventStatus;
      updated_at: string;
    }>;
    total: number;
  };
};

type SitemapEventsQueryVariables = {
  filter?: EventsFilterInput;
};

function buildChunkIds(totalItems: number): SitemapChunk[] {
  const pageCount = Math.max(1, Math.ceil(totalItems / SITEMAP_CHUNK_SIZE));
  return Array.from({ length: pageCount }, (_, index) => ({ id: index }));
}

async function fetchSitemapProductsPage(page: number, limit: number) {
  const client = getPublicClient();

  const result = await client.query<
    SitemapProductsQueryResult,
    SitemapProductsQueryVariables
  >({
    query: SITEMAP_PRODUCTS_QUERY,
    variables: {
      filter: {
        page,
        limit,
        archive: false,
      },
    },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data?.products ?? { products: [], total_products: 0 };
}

async function fetchSitemapEventsPage(page: number, limit: number) {
  const client = getPublicClient();

  const result = await client.query<
    SitemapEventsQueryResult,
    SitemapEventsQueryVariables
  >({
    query: SITEMAP_EVENTS_QUERY,
    variables: {
      filter: {
        page,
        limit,
      },
    },
  });

  if (result.error) {
    throw new Error(`GraphQL error: ${result.error.message}`);
  }

  return result.data?.events ?? { data: [], total: 0 };
}

export async function getProductSitemapChunks(): Promise<SitemapChunk[]> {
  "use cache";
  cacheTag("products", "sitemap", "sitemap:products");
  cacheLife("products");

  const firstPage = await fetchSitemapProductsPage(1, 1);

  return buildChunkIds(firstPage.total_products);
}

export async function getProductSitemapEntriesByChunk(
  chunkId: number,
): Promise<MetadataRoute.Sitemap> {
  const page = chunkId + 1;
  const result = await fetchSitemapProductsPage(page, SITEMAP_CHUNK_SIZE);

  return result.products
    .filter((product) => product.is_active)
    .map((product) => ({
      url: absoluteUrl(`/products/${product.id}`),
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
}

export async function getEventSitemapChunks(): Promise<SitemapChunk[]> {
  "use cache";
  cacheTag("events", "sitemap", "sitemap:events");
  cacheLife("events");

  const firstPage = await fetchSitemapEventsPage(1, 1);

  return buildChunkIds(firstPage.total);
}

export async function getEventSitemapEntriesByChunk(
  chunkId: number,
): Promise<MetadataRoute.Sitemap> {
  const page = chunkId + 1;
  const result = await fetchSitemapEventsPage(page, SITEMAP_CHUNK_SIZE);

  return result.data
    .filter(
      (event) => event.status !== "INACTIVE" && event.status !== "CANCELLED",
    )
    .map((event) => ({
      url: absoluteUrl(`/events/${event.id}`),
      lastModified: new Date(event.updated_at),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
}
