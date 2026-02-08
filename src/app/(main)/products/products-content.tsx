import { DEFAULT_PAGE_SIZE } from "@/consts/performance";
import { getProducts } from "@/data/products/gateway/server";
import {
  ProductOrderBy,
  type ProductsFilterParams,
  getProductsOrderBy,
} from "@/data/products/types";
import { ProductListContainer } from "@/features/products";

import { absoluteUrl, resolveSocialImageUrl } from "@/lib/seo";

export interface ProductsPageSearchParams {
  categories?: string;
  materials?: string;
  collection_ids?: string;
  sort?: ProductOrderBy;
  page?: string;
  min_price?: string;
  max_price?: string;
  search?: string;
  archive?: string;
}

interface ProductsContentProps {
  searchParams: Promise<ProductsPageSearchParams>;
}

export async function ProductsContent({ searchParams }: ProductsContentProps) {
  const params = await searchParams;
  const isArchive = params.archive === "true";

  const filterParams: ProductsFilterParams = {
    categories: params.categories?.split(","),
    materials: params.materials?.split(","),
    collection_ids: params.collection_ids
      ?.split(",")
      .map((id) => parseInt(id, 10))
      .filter((id) => !isNaN(id)),
    order_by: getProductsOrderBy(params.sort),
    page: params.page ? parseInt(params.page, 10) : 1,
    limit: DEFAULT_PAGE_SIZE,
    min_price: params.min_price ? parseInt(params.min_price) : undefined,
    max_price: params.max_price ? parseInt(params.max_price) : undefined,
    search: params.search,
    archive: isArchive,
  };

  const [result, activeResult, archivedResult] = await Promise.all([
    getProducts(filterParams),
    getProducts({ ...filterParams, archive: false, page: 1, limit: 1 }),
    getProducts({ ...filterParams, archive: true, page: 1, limit: 1 }),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildProductsStructuredData(result.products)),
        }}
      />
      <ProductListContainer
        productsWithFiltersAndMetadata={result}
        activeProductsCount={activeResult.total_products}
        archivedProductsCount={archivedResult.total_products}
      />
    </>
  );
}

function buildProductsStructuredData(
  products: Awaited<ReturnType<typeof getProducts>>["products"],
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Shop Handcrafted Pottery",
    url: absoluteUrl("/products"),
    mainEntity: {
      "@type": "ItemList",
      itemListElement: products.slice(0, 24).map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteUrl(`/products/${product.id}`),
        item: {
          "@type": "Product",
          name: product.name,
          image: resolveSocialImageUrl(product.image_urls[0]),
          offers: {
            "@type": "Offer",
            priceCurrency: "INR",
            price: product.price,
            availability:
              product.available_quantity > 0
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",
          },
        },
      })),
    },
  };
}
