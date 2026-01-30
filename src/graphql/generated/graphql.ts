/* eslint-disable */
// @ts-nocheck
"use client";
import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client/react';
import * as ApolloReactHooks from '@apollo/client/react';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: string; output: Date | string; }
  JSON: { input: any; output: any; }
};

export type AboutPageContent = {
  processSteps: Array<AboutProcessStep>;
  storyContent: Array<Scalars['String']['output']>;
  storySubtitle: Scalars['String']['output'];
  storyTitle: Scalars['String']['output'];
  team: Array<AboutTeamMember>;
  values: Array<AboutValue>;
};

export type AboutProcessStep = {
  description: Scalars['String']['output'];
  step: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type AboutTeamMember = {
  bio: Scalars['String']['output'];
  image: Scalars['String']['output'];
  name: Scalars['String']['output'];
  role: Scalars['String']['output'];
};

export type AboutValue = {
  description: Scalars['String']['output'];
  icon: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type AddToCartInput = {
  product_id: Scalars['Int']['input'];
  quantity?: InputMaybe<Scalars['Int']['input']>;
};

export type AddressMutationResponse = {
  address?: Maybe<UserAddress>;
  error?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type AddressesResponse = {
  addresses: Array<UserAddress>;
  total: Scalars['Int']['output'];
};

export type AdminBulkDeleteEventsResponse = {
  cancelledCount: Scalars['Int']['output'];
  deletedCount: Scalars['Int']['output'];
  error?: Maybe<Scalars['String']['output']>;
  failedCount: Scalars['Int']['output'];
  results: Array<BulkDeleteEventResult>;
  success: Scalars['Boolean']['output'];
  totalRequested: Scalars['Int']['output'];
};

export type AdminBulkDeleteProductsResponse = {
  deactivatedCount: Scalars['Int']['output'];
  deletedCount: Scalars['Int']['output'];
  error?: Maybe<Scalars['String']['output']>;
  failedCount: Scalars['Int']['output'];
  results: Array<BulkDeleteProductResult>;
  success: Scalars['Boolean']['output'];
  totalRequested: Scalars['Int']['output'];
};

export type AdminCategoriesResponse = {
  categories: Array<AdminCategory>;
  total: Scalars['Int']['output'];
};

export type AdminCategory = {
  icon: Scalars['String']['output'];
  name: Scalars['String']['output'];
  productCount: Scalars['Int']['output'];
};

export type AdminCategoryConfig = {
  icon: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type AdminCategoryMutationResponse = {
  error?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type AdminCollection = {
  created_at: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  ends_at?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  image_url?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  products_count: Scalars['Int']['output'];
  slug: Scalars['String']['output'];
  starts_at?: Maybe<Scalars['DateTime']['output']>;
  updated_at: Scalars['DateTime']['output'];
};

export type AdminCollectionDetail = {
  created_at: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  ends_at?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  image_url?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  products: Array<AdminCollectionProduct>;
  products_count: Scalars['Int']['output'];
  slug: Scalars['String']['output'];
  starts_at?: Maybe<Scalars['DateTime']['output']>;
  updated_at: Scalars['DateTime']['output'];
};

export type AdminCollectionMutationResponse = {
  collectionId?: Maybe<Scalars['Int']['output']>;
  error?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type AdminCollectionProduct = {
  id: Scalars['Int']['output'];
  image_url?: Maybe<Scalars['String']['output']>;
  is_active: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Int']['output'];
  slug: Scalars['String']['output'];
};

export type AdminCollectionsFilterInput = {
  active?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type AdminCollectionsResponse = {
  collections: Array<AdminCollection>;
  limit: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type AdminContentMutationResponse = {
  error?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type AdminContentPage = {
  content: Scalars['JSON']['output'];
  created_at: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  is_active: Scalars['Boolean']['output'];
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updated_at: Scalars['DateTime']['output'];
};

export type AdminContentPageListItem = {
  is_active: Scalars['Boolean']['output'];
  slug: Scalars['String']['output'];
  title: Scalars['String']['output'];
  updated_at: Scalars['DateTime']['output'];
};

export type AdminEvent = {
  _count: AdminEventCount;
  available_seats: Scalars['Int']['output'];
  created_at: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  ends_at: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  image: Scalars['String']['output'];
  instructor: Scalars['String']['output'];
  level: EventLevel;
  location: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  slug: Scalars['String']['output'];
  starts_at: Scalars['DateTime']['output'];
  status: EventStatus;
  title: Scalars['String']['output'];
  total_seats: Scalars['Int']['output'];
};

export type AdminEventCount = {
  event_registrations: Scalars['Int']['output'];
  reviews: Scalars['Int']['output'];
};

export type AdminEventDetail = {
  _count: AdminEventCount;
  available_seats: Scalars['Int']['output'];
  created_at: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  ends_at: Scalars['DateTime']['output'];
  full_location: Scalars['String']['output'];
  gallery: Array<Scalars['String']['output']>;
  highlights: Array<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  image: Scalars['String']['output'];
  includes: Array<Scalars['String']['output']>;
  instructor: Scalars['String']['output'];
  level: EventLevel;
  location: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  slug: Scalars['String']['output'];
  starts_at: Scalars['DateTime']['output'];
  status: EventStatus;
  title: Scalars['String']['output'];
  total_seats: Scalars['Int']['output'];
  updated_at: Scalars['DateTime']['output'];
};

export type AdminEventMutationResponse = {
  error?: Maybe<Scalars['String']['output']>;
  eventId?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type AdminEventRegistration = {
  approved_at?: Maybe<Scalars['DateTime']['output']>;
  cancelled_at?: Maybe<Scalars['DateTime']['output']>;
  confirmed_at?: Maybe<Scalars['DateTime']['output']>;
  created_at: Scalars['DateTime']['output'];
  discount: Scalars['Float']['output'];
  id: Scalars['String']['output'];
  paid_at?: Maybe<Scalars['DateTime']['output']>;
  price: Scalars['Float']['output'];
  request_at?: Maybe<Scalars['DateTime']['output']>;
  seats_reserved: Scalars['Int']['output'];
  status: EventRegistrationStatus;
  user: AdminRegistrationUser;
};

export type AdminEventRegistrationsResponse = {
  registrations: Array<AdminEventRegistration>;
  statusCounts: AdminRegistrationStatusCount;
  total: Scalars['Int']['output'];
};

export type AdminEventReview = {
  created_at: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  image_urls: Array<Scalars['String']['output']>;
  rating: Scalars['Int']['output'];
  review?: Maybe<Scalars['String']['output']>;
  user: AdminEventReviewUser;
};

export type AdminEventReviewUser = {
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type AdminEventReviewsResponse = {
  averageRating: Scalars['Float']['output'];
  reviews: Array<AdminEventReview>;
  total: Scalars['Int']['output'];
};

export type AdminEventsFilterInput = {
  level?: InputMaybe<EventLevel>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<EventStatus>;
  upcoming?: InputMaybe<Scalars['Boolean']['input']>;
};

export type AdminEventsResponse = {
  events: Array<AdminEvent>;
  limit: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type AdminIconOption = {
  label: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type AdminLevelOption = {
  label: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type AdminMutationResponse = {
  error?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type AdminOrderMutationResponse = {
  error?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type AdminProduct = {
  _count: AdminProductCount;
  available_quantity: Scalars['Int']['output'];
  categories: Array<Scalars['String']['output']>;
  color_code: Scalars['String']['output'];
  color_name: Scalars['String']['output'];
  created_at: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  image_urls: Array<Scalars['String']['output']>;
  is_active: Scalars['Boolean']['output'];
  material: Scalars['String']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  slug: Scalars['String']['output'];
  total_quantity: Scalars['Int']['output'];
};

export type AdminProductCollection = {
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
};

export type AdminProductCount = {
  carts: Scalars['Int']['output'];
  reviews: Scalars['Int']['output'];
  wishlists: Scalars['Int']['output'];
};

export type AdminProductDetail = {
  _count: AdminProductDetailCount;
  available_quantity: Scalars['Int']['output'];
  categories: Array<Scalars['String']['output']>;
  collection?: Maybe<AdminProductCollection>;
  collection_id?: Maybe<Scalars['Int']['output']>;
  color_code: Scalars['String']['output'];
  color_name: Scalars['String']['output'];
  created_at: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  image_urls: Array<Scalars['String']['output']>;
  instructions: Array<Scalars['String']['output']>;
  is_active: Scalars['Boolean']['output'];
  material: Scalars['String']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  slug: Scalars['String']['output'];
  total_quantity: Scalars['Int']['output'];
  updated_at: Scalars['DateTime']['output'];
};

export type AdminProductDetailCount = {
  carts: Scalars['Int']['output'];
  purchased_products: Scalars['Int']['output'];
  reviews: Scalars['Int']['output'];
  wishlists: Scalars['Int']['output'];
};

export type AdminProductMutationResponse = {
  error?: Maybe<Scalars['String']['output']>;
  productId?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type AdminProductReview = {
  created_at: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  image_urls: Array<Scalars['String']['output']>;
  rating: Scalars['Int']['output'];
  review?: Maybe<Scalars['String']['output']>;
  user: AdminProductReviewUser;
};

export type AdminProductReviewUser = {
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type AdminProductReviewsResponse = {
  averageRating: Scalars['Float']['output'];
  reviews: Array<AdminProductReview>;
  total: Scalars['Int']['output'];
};

export type AdminProductsFilterInput = {
  category?: InputMaybe<Scalars['String']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  lowStock?: InputMaybe<Scalars['Boolean']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type AdminProductsResponse = {
  limit: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
  products: Array<AdminProduct>;
  total: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type AdminRegistrationMutationResponse = {
  error?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type AdminRegistrationStatusCount = {
  APPROVED: Scalars['Int']['output'];
  CANCELLED: Scalars['Int']['output'];
  CONFIRMED: Scalars['Int']['output'];
  PAID: Scalars['Int']['output'];
  PENDING: Scalars['Int']['output'];
  REJECTED: Scalars['Int']['output'];
};

export type AdminRegistrationUser = {
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
};

export type AdminSettingsMutationResponse = {
  error?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type AdminSiteSetting = {
  id: Scalars['Int']['output'];
  key: Scalars['String']['output'];
  updated_at: Scalars['DateTime']['output'];
  value: Scalars['JSON']['output'];
};

export type AdminStatusOption = {
  label: Scalars['String']['output'];
  value: Scalars['String']['output'];
};

export type AdminUser = {
  _count: AdminUserCount;
  auth_id: Scalars['String']['output'];
  created_at: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  pendingOrdersCount: Scalars['Int']['output'];
  pendingRegistrationsCount: Scalars['Int']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  role: UserRole;
};

export type AdminUserCartItem = {
  created_at: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  product: AdminUserCartProduct;
  quantity: Scalars['Int']['output'];
};

export type AdminUserCartProduct = {
  available_quantity: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  image_urls: Array<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  slug: Scalars['String']['output'];
};

export type AdminUserCount = {
  event_registrations: Scalars['Int']['output'];
  product_orders: Scalars['Int']['output'];
};

export type AdminUserDetail = {
  _count: AdminUserDetailCount;
  auth_id: Scalars['String']['output'];
  created_at: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  role: UserRole;
  updated_at: Scalars['DateTime']['output'];
};

export type AdminUserDetailCount = {
  carts: Scalars['Int']['output'];
  event_registrations: Scalars['Int']['output'];
  product_orders: Scalars['Int']['output'];
  reviews: Scalars['Int']['output'];
  wishlists: Scalars['Int']['output'];
};

export type AdminUserMutationResponse = {
  error?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type AdminUserOrder = {
  approved_at?: Maybe<Scalars['DateTime']['output']>;
  cancelled_at?: Maybe<Scalars['DateTime']['output']>;
  created_at: Scalars['DateTime']['output'];
  delivered_at?: Maybe<Scalars['DateTime']['output']>;
  discount: Scalars['Float']['output'];
  id: Scalars['String']['output'];
  ordered_products: Array<AdminUserOrderItem>;
  paid_at?: Maybe<Scalars['DateTime']['output']>;
  refunded_at?: Maybe<Scalars['DateTime']['output']>;
  request_at?: Maybe<Scalars['DateTime']['output']>;
  returned_at?: Maybe<Scalars['DateTime']['output']>;
  shipped_at?: Maybe<Scalars['DateTime']['output']>;
  shipping_fee: Scalars['Float']['output'];
  status: Scalars['String']['output'];
  subtotal: Scalars['Float']['output'];
  total: Scalars['Float']['output'];
};

export type AdminUserOrderItem = {
  discount: Scalars['Float']['output'];
  id: Scalars['Int']['output'];
  price: Scalars['Float']['output'];
  product: AdminUserOrderProduct;
  quantity: Scalars['Int']['output'];
};

export type AdminUserOrderProduct = {
  id: Scalars['Int']['output'];
  image_urls: Array<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  slug: Scalars['String']['output'];
};

export type AdminUserRegistration = {
  approved_at?: Maybe<Scalars['DateTime']['output']>;
  cancelled_at?: Maybe<Scalars['DateTime']['output']>;
  confirmed_at?: Maybe<Scalars['DateTime']['output']>;
  created_at: Scalars['DateTime']['output'];
  discount: Scalars['Float']['output'];
  event: AdminUserRegistrationEvent;
  id: Scalars['String']['output'];
  paid_at?: Maybe<Scalars['DateTime']['output']>;
  price: Scalars['Float']['output'];
  request_at?: Maybe<Scalars['DateTime']['output']>;
  seats_reserved: Scalars['Int']['output'];
  status: Scalars['String']['output'];
};

export type AdminUserRegistrationEvent = {
  ends_at: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  image: Scalars['String']['output'];
  location: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  slug: Scalars['String']['output'];
  starts_at: Scalars['DateTime']['output'];
  title: Scalars['String']['output'];
};

export type AdminUserWishlistItem = {
  created_at: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  product: AdminUserWishlistProduct;
};

export type AdminUserWishlistProduct = {
  available_quantity: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  image_urls: Array<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  slug: Scalars['String']['output'];
};

export type AdminUserWishlistResponse = {
  data: Array<AdminUserWishlistItem>;
  page: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
};

export type AdminUsersFilterInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  role?: InputMaybe<UserRole>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};

export type AdminUsersResponse = {
  limit: Scalars['Int']['output'];
  page: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
  totalPages: Scalars['Int']['output'];
  users: Array<AdminUser>;
};

export type AssignProductsToCollectionInput = {
  collectionId: Scalars['Int']['input'];
  productIds: Array<Scalars['Int']['input']>;
};

export type BestSellersResponse = {
  page: Scalars['Int']['output'];
  products: Array<ProductBase>;
  total: Scalars['Int']['output'];
  total_pages: Scalars['Int']['output'];
};

export type BulkDeleteEventResult = {
  action: Scalars['String']['output'];
  error?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type BulkDeleteEventsInput = {
  ids: Array<Scalars['String']['input']>;
};

export type BulkDeleteProductResult = {
  action: Scalars['String']['output'];
  error?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  success: Scalars['Boolean']['output'];
};

export type BulkDeleteProductsInput = {
  ids: Array<Scalars['Int']['input']>;
};

export type CancelRegistrationResponse = {
  error?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type CarePageContent = {
  avoid: Array<Scalars['String']['output']>;
  glazeTypes: Array<GlazeType>;
  safeFor: Array<Scalars['String']['output']>;
  warnings: Array<CareWarning>;
};

export type CareWarning = {
  description: Scalars['String']['output'];
  icon: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type CartItem = {
  created_at: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  product: ProductBase;
  product_id: Scalars['Int']['output'];
  quantity: Scalars['Int']['output'];
  updated_at: Scalars['DateTime']['output'];
  user_id: Scalars['Int']['output'];
};

export type CartMutationResponse = {
  item?: Maybe<CartItem>;
  success: Scalars['Boolean']['output'];
};

export type CartResponse = {
  items: Array<CartItem>;
  subtotal: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type CategoryWithImage = {
  image_url?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
};

export type CollectionBase = {
  created_at: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  ends_at?: Maybe<Scalars['DateTime']['output']>;
  id: Scalars['Int']['output'];
  image_url?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  products_count: Scalars['Int']['output'];
  slug: Scalars['String']['output'];
  starts_at?: Maybe<Scalars['DateTime']['output']>;
  updated_at: Scalars['DateTime']['output'];
};

export type ContactInfo = {
  address: Scalars['String']['output'];
  email: Scalars['String']['output'];
  hours: Scalars['String']['output'];
  phone: Scalars['String']['output'];
};

export type CreateAddressInput = {
  address_line_1: Scalars['String']['input'];
  address_line_2?: InputMaybe<Scalars['String']['input']>;
  city: Scalars['String']['input'];
  contact_number?: InputMaybe<Scalars['String']['input']>;
  landmark?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  state: Scalars['String']['input'];
  zip: Scalars['String']['input'];
};

export type CreateCollectionInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  ends_at?: InputMaybe<Scalars['DateTime']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  slug: Scalars['String']['input'];
  starts_at?: InputMaybe<Scalars['DateTime']['input']>;
};

export type CreateEventInput = {
  available_seats: Scalars['Int']['input'];
  description: Scalars['String']['input'];
  ends_at: Scalars['DateTime']['input'];
  full_location: Scalars['String']['input'];
  gallery?: InputMaybe<Array<Scalars['String']['input']>>;
  highlights?: InputMaybe<Array<Scalars['String']['input']>>;
  image: Scalars['String']['input'];
  includes?: InputMaybe<Array<Scalars['String']['input']>>;
  instructor: Scalars['String']['input'];
  level?: InputMaybe<EventLevel>;
  location: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  slug: Scalars['String']['input'];
  starts_at: Scalars['DateTime']['input'];
  status?: InputMaybe<EventStatus>;
  title: Scalars['String']['input'];
  total_seats: Scalars['Int']['input'];
};

export type CreateEventReviewInput = {
  eventId: Scalars['String']['input'];
  imageUrls?: InputMaybe<Array<Scalars['String']['input']>>;
  rating: Scalars['Int']['input'];
  review?: InputMaybe<Scalars['String']['input']>;
};

export type CreateOrderInput = {
  product_ids: Array<Scalars['Int']['input']>;
  shipping_address: ShippingAddressInput;
  shipping_fee: Scalars['Int']['input'];
};

export type CreateProductInput = {
  available_quantity: Scalars['Int']['input'];
  categories: Array<Scalars['String']['input']>;
  collection_id?: InputMaybe<Scalars['Int']['input']>;
  color_code: Scalars['String']['input'];
  color_name: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  image_urls: Array<Scalars['String']['input']>;
  instructions?: InputMaybe<Array<Scalars['String']['input']>>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  material: Scalars['String']['input'];
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
  slug: Scalars['String']['input'];
  total_quantity: Scalars['Int']['input'];
};

export type CreateProductReviewInput = {
  imageUrls?: InputMaybe<Array<Scalars['String']['input']>>;
  productId: Scalars['Int']['input'];
  rating: Scalars['Int']['input'];
  review?: InputMaybe<Scalars['String']['input']>;
};

export type CreateReviewResponse = {
  error?: Maybe<Scalars['String']['output']>;
  review?: Maybe<Review>;
  success: Scalars['Boolean']['output'];
};

export type DashboardStats = {
  events: EventsStats;
  newsletter: NewsletterStats;
  orders: OrdersStats;
  products: ProductsStats;
  registrations: RegistrationsStats;
  revenue: RevenueStats;
  users: UsersStats;
};

export type DeleteReviewResponse = {
  error?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type EventBase = {
  available_seats: Scalars['Int']['output'];
  avg_rating?: Maybe<Scalars['Float']['output']>;
  created_at: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  ends_at: Scalars['DateTime']['output'];
  full_location: Scalars['String']['output'];
  gallery: Array<Scalars['String']['output']>;
  highlights: Array<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  image: Scalars['String']['output'];
  includes: Array<Scalars['String']['output']>;
  instructor: Scalars['String']['output'];
  level: EventLevel;
  location: Scalars['String']['output'];
  price: Scalars['Int']['output'];
  registrations_count: Scalars['Int']['output'];
  reviews_count: Scalars['Int']['output'];
  slug: Scalars['String']['output'];
  starts_at: Scalars['DateTime']['output'];
  status: EventStatus;
  title: Scalars['String']['output'];
  total_seats: Scalars['Int']['output'];
  updated_at: Scalars['DateTime']['output'];
};

export type EventDetail = {
  available_seats: Scalars['Int']['output'];
  avg_rating?: Maybe<Scalars['Float']['output']>;
  created_at: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  ends_at: Scalars['DateTime']['output'];
  full_location: Scalars['String']['output'];
  gallery: Array<Scalars['String']['output']>;
  highlights: Array<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  image: Scalars['String']['output'];
  includes: Array<Scalars['String']['output']>;
  instructor: Scalars['String']['output'];
  is_registered: Scalars['Boolean']['output'];
  level: EventLevel;
  location: Scalars['String']['output'];
  price: Scalars['Int']['output'];
  registrations_count: Scalars['Int']['output'];
  reviews: Array<EventReview>;
  reviews_count: Scalars['Int']['output'];
  slug: Scalars['String']['output'];
  starts_at: Scalars['DateTime']['output'];
  status: EventStatus;
  title: Scalars['String']['output'];
  total_seats: Scalars['Int']['output'];
  updated_at: Scalars['DateTime']['output'];
};

/** The difficulty level of an event */
export enum EventLevel {
  Advanced = 'ADVANCED',
  Beginner = 'BEGINNER',
  Intermediate = 'INTERMEDIATE'
}

export type EventRegistration = {
  approved_at?: Maybe<Scalars['DateTime']['output']>;
  cancelled_at?: Maybe<Scalars['DateTime']['output']>;
  confirmed_at?: Maybe<Scalars['DateTime']['output']>;
  created_at: Scalars['DateTime']['output'];
  discount: Scalars['Int']['output'];
  event: RegistrationEvent;
  event_id: Scalars['String']['output'];
  has_reviewed: Scalars['Boolean']['output'];
  id: Scalars['String']['output'];
  paid_at?: Maybe<Scalars['DateTime']['output']>;
  price: Scalars['Int']['output'];
  request_at?: Maybe<Scalars['DateTime']['output']>;
  seats_reserved: Scalars['Int']['output'];
  status: EventRegistrationStatus;
  updated_at: Scalars['DateTime']['output'];
  user: RegistrationUser;
  user_id: Scalars['Int']['output'];
};

/** The status of an event registration */
export enum EventRegistrationStatus {
  Approved = 'APPROVED',
  Cancelled = 'CANCELLED',
  Confirmed = 'CONFIRMED',
  Paid = 'PAID',
  Pending = 'PENDING',
  Rejected = 'REJECTED'
}

export type EventReview = {
  created_at: Scalars['DateTime']['output'];
  event_id?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  image_urls: Array<Scalars['String']['output']>;
  likes: Array<EventReviewLike>;
  rating: Scalars['Int']['output'];
  review?: Maybe<Scalars['String']['output']>;
  updated_at: Scalars['DateTime']['output'];
  user: EventReviewUser;
  user_id: Scalars['Int']['output'];
};

export type EventReviewLike = {
  id: Scalars['Int']['output'];
  review_id: Scalars['Int']['output'];
  user_id: Scalars['Int']['output'];
};

export type EventReviewUser = {
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

/** The status of an event */
export enum EventStatus {
  Active = 'ACTIVE',
  Cancelled = 'CANCELLED',
  Completed = 'COMPLETED',
  Inactive = 'INACTIVE',
  Upcoming = 'UPCOMING'
}

export type EventWithUserContext = {
  current_user_id?: Maybe<Scalars['Int']['output']>;
  event: EventDetail;
  is_past_event: Scalars['Boolean']['output'];
  registration?: Maybe<EventRegistration>;
};

export type EventsFilterInput = {
  level?: InputMaybe<EventLevel>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<EventStatus>;
};

export type EventsResponse = {
  data: Array<EventBase>;
  levels: Array<EventLevel>;
  page: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
  total_pages: Scalars['Int']['output'];
};

export type EventsStats = {
  total: Scalars['Int']['output'];
  upcoming: Scalars['Int']['output'];
  upcomingIn7Days: Scalars['Int']['output'];
};

export type FaqCategory = {
  faqs: Array<FaqItem>;
  title: Scalars['String']['output'];
};

export type FaqItem = {
  answer: Scalars['String']['output'];
  question: Scalars['String']['output'];
};

export type FaqPageContent = {
  categories: Array<FaqCategory>;
};

export type GetPresignedUploadUrlInput = {
  contentType: Scalars['String']['input'];
  fileSize: Scalars['Int']['input'];
  filename: Scalars['String']['input'];
  folder?: InputMaybe<Scalars['String']['input']>;
};

export type GlazeType = {
  care: Scalars['String']['output'];
  description: Scalars['String']['output'];
  icon: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type GlobalSearchInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  query: Scalars['String']['input'];
};

export type GlobalSearchResponse = {
  counts: SearchCounts;
  events: Array<EventBase>;
  orders: Array<Order>;
  products: Array<ProductBase>;
};

export type HeroImages = {
  events: Scalars['String']['output'];
  home: Scalars['String']['output'];
  ourStory: Scalars['String']['output'];
  products: Scalars['String']['output'];
};

export type LowStockProduct = {
  available_quantity: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  slug: Scalars['String']['output'];
  total_quantity: Scalars['Int']['output'];
};

export type Mutation = {
  addToCart: CartMutationResponse;
  addToWishlist: WishlistMutationResponse;
  adminAddCategory: AdminCategoryMutationResponse;
  adminAssignProductsToCollection: AdminCollectionMutationResponse;
  adminBulkDeleteEvents: AdminBulkDeleteEventsResponse;
  adminBulkDeleteProducts: AdminBulkDeleteProductsResponse;
  adminCreateCollection: AdminCollectionMutationResponse;
  adminCreateEvent: AdminEventMutationResponse;
  adminCreateProduct: AdminProductMutationResponse;
  adminDeleteCategory: AdminCategoryMutationResponse;
  adminDeleteCollection: AdminCollectionMutationResponse;
  adminDeleteEvent: AdminEventMutationResponse;
  adminDeleteEventReview: AdminEventMutationResponse;
  adminDeleteProduct: AdminMutationResponse;
  adminDeleteProductReview: AdminMutationResponse;
  adminGetPresignedUploadUrl: PresignedUploadUrlResponse;
  adminRemoveProductFromCollection: AdminCollectionMutationResponse;
  adminRenameCategory: AdminCategoryMutationResponse;
  adminToggleContentPageActive: AdminContentMutationResponse;
  adminToggleProductActive: AdminMutationResponse;
  adminUpdateCategoryIcon: AdminCategoryMutationResponse;
  adminUpdateCollection: AdminCollectionMutationResponse;
  adminUpdateContactInfo: AdminSettingsMutationResponse;
  adminUpdateContentPage: AdminContentMutationResponse;
  adminUpdateEvent: AdminEventMutationResponse;
  adminUpdateEventStatus: AdminEventMutationResponse;
  adminUpdateHeroImages: AdminSettingsMutationResponse;
  adminUpdateOrderDiscount: AdminOrderMutationResponse;
  adminUpdateOrderItemDiscount: AdminOrderMutationResponse;
  adminUpdateOrderItemQuantity: AdminOrderMutationResponse;
  adminUpdateOrderPrice: AdminOrderMutationResponse;
  adminUpdateOrderStatus: AdminOrderMutationResponse;
  adminUpdateProduct: AdminMutationResponse;
  adminUpdateRegistrationDetails: AdminRegistrationMutationResponse;
  adminUpdateRegistrationPrice: AdminRegistrationMutationResponse;
  adminUpdateRegistrationStatus: AdminRegistrationMutationResponse;
  adminUpdateSocialLinks: AdminSettingsMutationResponse;
  adminUpdateUserRole: AdminUserMutationResponse;
  cancelOrder: OrderMutationResponse;
  cancelRegistration: CancelRegistrationResponse;
  clearCart: Scalars['Boolean']['output'];
  createAddress: AddressMutationResponse;
  createEventReview: CreateReviewResponse;
  createOrder: OrderMutationResponse;
  createProductReview: CreateReviewResponse;
  deleteAddress: AddressMutationResponse;
  deleteReview: DeleteReviewResponse;
  moveToCart: Scalars['Boolean']['output'];
  registerForEvent: RegisterForEventResponse;
  removeFromCart: Scalars['Boolean']['output'];
  removeFromWishlist: Scalars['Boolean']['output'];
  subscribeToNewsletter: NewsletterMutationResponse;
  toggleReviewLike: ToggleReviewLikeResponse;
  toggleWishlist: ToggleWishlistResponse;
  unsubscribeFromNewsletter: NewsletterMutationResponse;
  updateAddress: AddressMutationResponse;
  updateCartQuantity: CartMutationResponse;
};


export type MutationAddToCartArgs = {
  input: AddToCartInput;
};


export type MutationAddToWishlistArgs = {
  productId: Scalars['Int']['input'];
};


export type MutationAdminAddCategoryArgs = {
  icon?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


export type MutationAdminAssignProductsToCollectionArgs = {
  input: AssignProductsToCollectionInput;
};


export type MutationAdminBulkDeleteEventsArgs = {
  input: BulkDeleteEventsInput;
};


export type MutationAdminBulkDeleteProductsArgs = {
  input: BulkDeleteProductsInput;
};


export type MutationAdminCreateCollectionArgs = {
  input: CreateCollectionInput;
};


export type MutationAdminCreateEventArgs = {
  input: CreateEventInput;
};


export type MutationAdminCreateProductArgs = {
  input: CreateProductInput;
};


export type MutationAdminDeleteCategoryArgs = {
  name: Scalars['String']['input'];
};


export type MutationAdminDeleteCollectionArgs = {
  id: Scalars['Int']['input'];
};


export type MutationAdminDeleteEventArgs = {
  id: Scalars['String']['input'];
};


export type MutationAdminDeleteEventReviewArgs = {
  reviewId: Scalars['Int']['input'];
};


export type MutationAdminDeleteProductArgs = {
  id: Scalars['Int']['input'];
};


export type MutationAdminDeleteProductReviewArgs = {
  reviewId: Scalars['Int']['input'];
};


export type MutationAdminGetPresignedUploadUrlArgs = {
  input: GetPresignedUploadUrlInput;
};


export type MutationAdminRemoveProductFromCollectionArgs = {
  productId: Scalars['Int']['input'];
};


export type MutationAdminRenameCategoryArgs = {
  newName: Scalars['String']['input'];
  oldName: Scalars['String']['input'];
};


export type MutationAdminToggleContentPageActiveArgs = {
  slug: Scalars['String']['input'];
};


export type MutationAdminToggleProductActiveArgs = {
  id: Scalars['Int']['input'];
};


export type MutationAdminUpdateCategoryIconArgs = {
  category: Scalars['String']['input'];
  icon: Scalars['String']['input'];
};


export type MutationAdminUpdateCollectionArgs = {
  id: Scalars['Int']['input'];
  input: UpdateCollectionInput;
};


export type MutationAdminUpdateContactInfoArgs = {
  input: UpdateContactInfoInput;
};


export type MutationAdminUpdateContentPageArgs = {
  input: UpdateContentPageInput;
  slug: Scalars['String']['input'];
};


export type MutationAdminUpdateEventArgs = {
  id: Scalars['String']['input'];
  input: UpdateEventInput;
};


export type MutationAdminUpdateEventStatusArgs = {
  id: Scalars['String']['input'];
  status: Scalars['String']['input'];
};


export type MutationAdminUpdateHeroImagesArgs = {
  input: UpdateHeroImagesInput;
};


export type MutationAdminUpdateOrderDiscountArgs = {
  discount: Scalars['Float']['input'];
  orderId: Scalars['String']['input'];
};


export type MutationAdminUpdateOrderItemDiscountArgs = {
  discount: Scalars['Float']['input'];
  itemId: Scalars['Int']['input'];
};


export type MutationAdminUpdateOrderItemQuantityArgs = {
  itemId: Scalars['Int']['input'];
  quantity: Scalars['Int']['input'];
};


export type MutationAdminUpdateOrderPriceArgs = {
  orderId: Scalars['String']['input'];
  total: Scalars['Float']['input'];
};


export type MutationAdminUpdateOrderStatusArgs = {
  orderId: Scalars['String']['input'];
  status: Scalars['String']['input'];
};


export type MutationAdminUpdateProductArgs = {
  id: Scalars['Int']['input'];
  input: UpdateProductInput;
};


export type MutationAdminUpdateRegistrationDetailsArgs = {
  input: UpdateRegistrationDetailsInput;
  registrationId: Scalars['String']['input'];
};


export type MutationAdminUpdateRegistrationPriceArgs = {
  price: Scalars['Float']['input'];
  registrationId: Scalars['String']['input'];
};


export type MutationAdminUpdateRegistrationStatusArgs = {
  registrationId: Scalars['String']['input'];
  status: Scalars['String']['input'];
};


export type MutationAdminUpdateSocialLinksArgs = {
  input: UpdateSocialLinksInput;
};


export type MutationAdminUpdateUserRoleArgs = {
  role: Scalars['String']['input'];
  userId: Scalars['Int']['input'];
};


export type MutationCancelOrderArgs = {
  orderId: Scalars['String']['input'];
};


export type MutationCancelRegistrationArgs = {
  registrationId: Scalars['String']['input'];
};


export type MutationCreateAddressArgs = {
  input: CreateAddressInput;
};


export type MutationCreateEventReviewArgs = {
  input: CreateEventReviewInput;
};


export type MutationCreateOrderArgs = {
  input: CreateOrderInput;
};


export type MutationCreateProductReviewArgs = {
  input: CreateProductReviewInput;
};


export type MutationDeleteAddressArgs = {
  id: Scalars['Int']['input'];
};


export type MutationDeleteReviewArgs = {
  reviewId: Scalars['Int']['input'];
};


export type MutationMoveToCartArgs = {
  productId: Scalars['Int']['input'];
};


export type MutationRegisterForEventArgs = {
  input: RegisterForEventInput;
};


export type MutationRemoveFromCartArgs = {
  productId: Scalars['Int']['input'];
};


export type MutationRemoveFromWishlistArgs = {
  productId: Scalars['Int']['input'];
};


export type MutationToggleReviewLikeArgs = {
  reviewId: Scalars['Int']['input'];
};


export type MutationToggleWishlistArgs = {
  productId: Scalars['Int']['input'];
};


export type MutationUpdateAddressArgs = {
  id: Scalars['Int']['input'];
  input: UpdateAddressInput;
};


export type MutationUpdateCartQuantityArgs = {
  input: UpdateCartQuantityInput;
};

export type NewsletterMutationResponse = {
  error?: Maybe<Scalars['String']['output']>;
  status?: Maybe<NewsletterStatus>;
  success: Scalars['Boolean']['output'];
};

export type NewsletterStats = {
  newThisMonth: Scalars['Int']['output'];
  totalSubscribers: Scalars['Int']['output'];
};

export type NewsletterStatus = {
  subscribed: Scalars['Boolean']['output'];
  subscribed_at?: Maybe<Scalars['DateTime']['output']>;
};

export type NewsletterSubscriber = {
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  newsletter_subscribed_at?: Maybe<Scalars['DateTime']['output']>;
};

export type Order = {
  approved_at?: Maybe<Scalars['DateTime']['output']>;
  cancelled_at?: Maybe<Scalars['DateTime']['output']>;
  created_at: Scalars['DateTime']['output'];
  delivered_at?: Maybe<Scalars['DateTime']['output']>;
  discount: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  ordered_products: Array<OrderItem>;
  paid_at?: Maybe<Scalars['DateTime']['output']>;
  refunded_at?: Maybe<Scalars['DateTime']['output']>;
  request_at?: Maybe<Scalars['DateTime']['output']>;
  returned_at?: Maybe<Scalars['DateTime']['output']>;
  shipped_at?: Maybe<Scalars['DateTime']['output']>;
  shipping_address: Scalars['JSON']['output'];
  shipping_fee: Scalars['Int']['output'];
  status: OrderStatus;
  subtotal: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
  updated_at: Scalars['DateTime']['output'];
  user: OrderUser;
  user_id: Scalars['Int']['output'];
};

export type OrderItem = {
  created_at: Scalars['DateTime']['output'];
  discount: Scalars['Int']['output'];
  has_reviewed: Scalars['Boolean']['output'];
  id: Scalars['Int']['output'];
  order_id: Scalars['String']['output'];
  price: Scalars['Int']['output'];
  product: ProductBase;
  product_id: Scalars['Int']['output'];
  quantity: Scalars['Int']['output'];
  updated_at: Scalars['DateTime']['output'];
};

export type OrderMutationResponse = {
  error?: Maybe<Scalars['String']['output']>;
  order?: Maybe<Order>;
  success: Scalars['Boolean']['output'];
};

/** The status of an order */
export enum OrderStatus {
  Cancelled = 'CANCELLED',
  Delivered = 'DELIVERED',
  Paid = 'PAID',
  Pending = 'PENDING',
  Processing = 'PROCESSING',
  Refunded = 'REFUNDED',
  Returned = 'RETURNED',
  Shipped = 'SHIPPED'
}

export type OrderUser = {
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export type OrdersFilterInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type OrdersResponse = {
  data: Array<Order>;
  page: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
  total_pages: Scalars['Int']['output'];
};

export type OrdersStats = {
  pending: Scalars['Int']['output'];
  processing: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type PresignedUploadUrlResponse = {
  error?: Maybe<Scalars['String']['output']>;
  key?: Maybe<Scalars['String']['output']>;
  presignedUrl?: Maybe<Scalars['String']['output']>;
  publicUrl?: Maybe<Scalars['String']['output']>;
  success: Scalars['Boolean']['output'];
};

export type PriceHistogramBucket = {
  count: Scalars['Int']['output'];
  max: Scalars['Int']['output'];
  min: Scalars['Int']['output'];
};

export type PriceRange = {
  max: Scalars['Int']['output'];
  min: Scalars['Int']['output'];
};

export type PrivacyPageContent = {
  contactEmail: Scalars['String']['output'];
  introduction: Scalars['String']['output'];
  lastUpdated: Scalars['String']['output'];
  sections: Array<PrivacySection>;
};

export type PrivacySection = {
  content: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type ProductBase = {
  available_quantity: Scalars['Int']['output'];
  avg_rating: Scalars['Int']['output'];
  collection?: Maybe<CollectionBase>;
  color_code: Scalars['String']['output'];
  color_name: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  image_urls: Array<Scalars['String']['output']>;
  in_wishlist: Scalars['Boolean']['output'];
  is_active: Scalars['Boolean']['output'];
  material: Scalars['String']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Int']['output'];
  reviews_count: Scalars['Int']['output'];
  slug: Scalars['String']['output'];
  total_quantity: Scalars['Int']['output'];
};

export type ProductDetail = {
  available_quantity: Scalars['Int']['output'];
  avg_rating: Scalars['Int']['output'];
  categories: Array<Scalars['String']['output']>;
  collection?: Maybe<CollectionBase>;
  color_code: Scalars['String']['output'];
  color_name: Scalars['String']['output'];
  created_at: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  image_urls: Array<Scalars['String']['output']>;
  in_wishlist: Scalars['Boolean']['output'];
  instructions: Array<Scalars['String']['output']>;
  is_active: Scalars['Boolean']['output'];
  material: Scalars['String']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Int']['output'];
  reviews: Array<ProductReview>;
  reviews_count: Scalars['Int']['output'];
  slug: Scalars['String']['output'];
  total_quantity: Scalars['Int']['output'];
  updated_at: Scalars['DateTime']['output'];
};

/** The order by which the products should be sorted */
export enum ProductOrderBy {
  BestSellers = 'BEST_SELLERS',
  Featured = 'FEATURED',
  New = 'NEW',
  PriceHighToLow = 'PRICE_HIGH_TO_LOW',
  PriceLowToHigh = 'PRICE_LOW_TO_HIGH',
  RatingHighToLow = 'RATING_HIGH_TO_LOW',
  RatingLowToHigh = 'RATING_LOW_TO_HIGH'
}

export type ProductReview = {
  created_at: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  image_urls: Array<Scalars['String']['output']>;
  likes: Array<ReviewLike>;
  rating: Scalars['Int']['output'];
  review?: Maybe<Scalars['String']['output']>;
  user?: Maybe<ReviewUser>;
  user_id: Scalars['Int']['output'];
};

export type ProductsFilter = {
  archive?: Maybe<Scalars['Boolean']['output']>;
  categories?: Maybe<Array<Scalars['String']['output']>>;
  collection_ids?: Maybe<Array<Scalars['Int']['output']>>;
  limit?: Maybe<Scalars['Int']['output']>;
  materials?: Maybe<Array<Scalars['String']['output']>>;
  max_price?: Maybe<Scalars['Int']['output']>;
  min_price?: Maybe<Scalars['Int']['output']>;
  order_by?: Maybe<ProductOrderBy>;
  page?: Maybe<Scalars['Int']['output']>;
  search?: Maybe<Scalars['String']['output']>;
};

export type ProductsFilterInput = {
  archive?: InputMaybe<Scalars['Boolean']['input']>;
  categories?: InputMaybe<Array<Scalars['String']['input']>>;
  collection_ids?: InputMaybe<Array<Scalars['Int']['input']>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  materials?: InputMaybe<Array<Scalars['String']['input']>>;
  max_price?: InputMaybe<Scalars['Int']['input']>;
  min_price?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<ProductOrderBy>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type ProductsMeta = {
  categories: Array<Scalars['String']['output']>;
  collections: Array<CollectionBase>;
  materials: Array<Scalars['String']['output']>;
  price_histogram: Array<PriceHistogramBucket>;
  price_range: PriceRange;
};

export type ProductsResponse = {
  filter: ProductsFilter;
  meta: ProductsMeta;
  products: Array<ProductBase>;
  total_pages: Scalars['Int']['output'];
  total_products: Scalars['Int']['output'];
};

export type ProductsStats = {
  lowStock: Scalars['Int']['output'];
  outOfStock: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type Query = {
  addressById?: Maybe<UserAddress>;
  adminAllCategories: Array<Scalars['String']['output']>;
  adminAllCollections: Array<AdminProductCollection>;
  adminAllConfiguredCategories: Array<AdminCategoryConfig>;
  adminAllSettings: Array<AdminSiteSetting>;
  adminAvailableIcons: Array<AdminIconOption>;
  adminCategories: AdminCategoriesResponse;
  adminCollectionById?: Maybe<AdminCollectionDetail>;
  adminCollections: AdminCollectionsResponse;
  adminContactInfo: ContactInfo;
  adminContentPageBySlug?: Maybe<AdminContentPage>;
  adminContentPages: Array<AdminContentPageListItem>;
  adminDashboardStats: DashboardStats;
  adminEventById?: Maybe<AdminEventDetail>;
  adminEventLevelOptions: Array<AdminLevelOption>;
  adminEventRegistrations: AdminEventRegistrationsResponse;
  adminEventReviews: AdminEventReviewsResponse;
  adminEventStatusOptions: Array<AdminStatusOption>;
  adminEvents: AdminEventsResponse;
  adminHeroImages: HeroImages;
  adminLowStockProducts: Array<LowStockProduct>;
  adminNewsletterSubscribers: Array<NewsletterSubscriber>;
  adminProductById?: Maybe<AdminProductDetail>;
  adminProductReviews: AdminProductReviewsResponse;
  adminProducts: AdminProductsResponse;
  adminRecentOrders: Array<RecentOrder>;
  adminRecentRegistrations: Array<RecentRegistration>;
  adminSocialLinks: SocialLinks;
  adminUpcomingEvents: Array<UpcomingEvent>;
  adminUserById?: Maybe<AdminUserDetail>;
  adminUserCart: Array<AdminUserCartItem>;
  adminUserOrders: Array<AdminUserOrder>;
  adminUserRegistrations: Array<AdminUserRegistration>;
  adminUserWishlist: AdminUserWishlistResponse;
  adminUsers: AdminUsersResponse;
  bestSellers: BestSellersResponse;
  cart: CartResponse;
  categories: Array<Scalars['String']['output']>;
  categoriesWithImages: Array<CategoryWithImage>;
  collections: Array<CollectionBase>;
  completedRegistrations: RegistrationsResponse;
  eventById?: Maybe<EventDetail>;
  eventBySlug?: Maybe<EventDetail>;
  eventReviews: ReviewsResponse;
  eventWithUserContext?: Maybe<EventWithUserContext>;
  events: EventsResponse;
  featuredReviews: Array<Review>;
  globalSearch: GlobalSearchResponse;
  materials: Array<Scalars['String']['output']>;
  newsletterStatus: NewsletterStatus;
  order?: Maybe<Order>;
  orders: OrdersResponse;
  pastEvents: EventsResponse;
  productById?: Maybe<ProductDetail>;
  productBySlug?: Maybe<ProductDetail>;
  productReviews: ReviewsResponse;
  products: ProductsResponse;
  publicAboutContent?: Maybe<AboutPageContent>;
  publicCareContent?: Maybe<CarePageContent>;
  publicContactInfo: ContactInfo;
  publicFAQContent?: Maybe<FaqPageContent>;
  publicHeroImages: HeroImages;
  publicPrivacyContent?: Maybe<PrivacyPageContent>;
  publicShippingContent?: Maybe<ShippingPageContent>;
  publicSocialLinks: SocialLinks;
  publicTermsContent?: Maybe<TermsPageContent>;
  recommendedProducts: RecommendedProductsResponse;
  registrationById?: Maybe<EventRegistration>;
  upcomingEvents: EventsResponse;
  upcomingRegistrations: RegistrationsResponse;
  user: UserResponse;
  userAddresses: AddressesResponse;
  userCounts: UserCounts;
  userRegistrations: RegistrationsResponse;
  wishlist: WishlistResponse;
  wishlistIds: Array<Scalars['Int']['output']>;
};


export type QueryAddressByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryAdminCollectionByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryAdminCollectionsArgs = {
  filter?: InputMaybe<AdminCollectionsFilterInput>;
};


export type QueryAdminContentPageBySlugArgs = {
  slug: Scalars['String']['input'];
};


export type QueryAdminEventByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryAdminEventRegistrationsArgs = {
  eventId: Scalars['String']['input'];
};


export type QueryAdminEventReviewsArgs = {
  eventId: Scalars['String']['input'];
};


export type QueryAdminEventsArgs = {
  filter?: InputMaybe<AdminEventsFilterInput>;
};


export type QueryAdminLowStockProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryAdminNewsletterSubscribersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryAdminProductByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryAdminProductReviewsArgs = {
  productId: Scalars['Int']['input'];
};


export type QueryAdminProductsArgs = {
  filter?: InputMaybe<AdminProductsFilterInput>;
};


export type QueryAdminRecentOrdersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryAdminRecentRegistrationsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryAdminUpcomingEventsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryAdminUserByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryAdminUserCartArgs = {
  userId: Scalars['Int']['input'];
};


export type QueryAdminUserOrdersArgs = {
  userId: Scalars['Int']['input'];
};


export type QueryAdminUserRegistrationsArgs = {
  userId: Scalars['Int']['input'];
};


export type QueryAdminUserWishlistArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  userId: Scalars['Int']['input'];
};


export type QueryAdminUsersArgs = {
  filter?: InputMaybe<AdminUsersFilterInput>;
};


export type QueryBestSellersArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryCollectionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryCompletedRegistrationsArgs = {
  filter?: InputMaybe<RegistrationsFilterInput>;
};


export type QueryEventByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryEventBySlugArgs = {
  slug: Scalars['String']['input'];
};


export type QueryEventReviewsArgs = {
  eventId: Scalars['String']['input'];
  filter?: InputMaybe<ReviewsFilterInput>;
};


export type QueryEventWithUserContextArgs = {
  eventId: Scalars['String']['input'];
};


export type QueryEventsArgs = {
  filter?: InputMaybe<EventsFilterInput>;
};


export type QueryFeaturedReviewsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGlobalSearchArgs = {
  input: GlobalSearchInput;
};


export type QueryOrderArgs = {
  id: Scalars['String']['input'];
};


export type QueryOrdersArgs = {
  filter?: InputMaybe<OrdersFilterInput>;
};


export type QueryPastEventsArgs = {
  filter?: InputMaybe<EventsFilterInput>;
};


export type QueryProductByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryProductBySlugArgs = {
  slug: Scalars['String']['input'];
};


export type QueryProductReviewsArgs = {
  filter?: InputMaybe<ReviewsFilterInput>;
  productId: Scalars['Int']['input'];
};


export type QueryProductsArgs = {
  filter: ProductsFilterInput;
};


export type QueryRecommendedProductsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  productId?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryRegistrationByIdArgs = {
  registrationId: Scalars['String']['input'];
};


export type QueryUpcomingEventsArgs = {
  filter?: InputMaybe<EventsFilterInput>;
};


export type QueryUpcomingRegistrationsArgs = {
  filter?: InputMaybe<RegistrationsFilterInput>;
};


export type QueryUserRegistrationsArgs = {
  filter?: InputMaybe<RegistrationsFilterInput>;
};


export type QueryWishlistArgs = {
  filter?: InputMaybe<WishlistFilterInput>;
};

export type RecentOrder = {
  created_at: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  status: Scalars['String']['output'];
  total: Scalars['Float']['output'];
  user: RecentOrderUser;
};

export type RecentOrderUser = {
  email: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export type RecentRegistration = {
  created_at: Scalars['DateTime']['output'];
  event: RecentRegistrationEvent;
  id: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  seats_reserved: Scalars['Int']['output'];
  status: Scalars['String']['output'];
  user: RecentRegistrationUser;
};

export type RecentRegistrationEvent = {
  title: Scalars['String']['output'];
};

export type RecentRegistrationUser = {
  email: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
};

export type RecommendedProductsResponse = {
  page: Scalars['Int']['output'];
  products: Array<ProductBase>;
  total: Scalars['Int']['output'];
  total_pages: Scalars['Int']['output'];
};

export type RegisterForEventInput = {
  eventId: Scalars['String']['input'];
  seats?: InputMaybe<Scalars['Int']['input']>;
};

export type RegisterForEventResponse = {
  error?: Maybe<Scalars['String']['output']>;
  registration?: Maybe<EventRegistration>;
  success: Scalars['Boolean']['output'];
};

export type RegistrationEvent = {
  available_seats: Scalars['Int']['output'];
  created_at: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  ends_at: Scalars['DateTime']['output'];
  full_location: Scalars['String']['output'];
  gallery: Array<Scalars['String']['output']>;
  highlights: Array<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  image: Scalars['String']['output'];
  includes: Array<Scalars['String']['output']>;
  instructor: Scalars['String']['output'];
  level: EventLevel;
  location: Scalars['String']['output'];
  price: Scalars['Int']['output'];
  slug: Scalars['String']['output'];
  starts_at: Scalars['DateTime']['output'];
  status: EventStatus;
  title: Scalars['String']['output'];
  total_seats: Scalars['Int']['output'];
  updated_at: Scalars['DateTime']['output'];
};

export type RegistrationUser = {
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type RegistrationsFilterInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

export type RegistrationsResponse = {
  data: Array<EventRegistration>;
  page: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
  total_pages: Scalars['Int']['output'];
};

export type RegistrationsStats = {
  pending: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type ReturnStep = {
  description: Scalars['String']['output'];
  step: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type ReturnsPolicy = {
  description: Scalars['String']['output'];
  icon: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type RevenueStats = {
  totalOrders: Scalars['Float']['output'];
  totalRegistrations: Scalars['Float']['output'];
};

export type Review = {
  created_at: Scalars['DateTime']['output'];
  event_id?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  image_urls: Array<Scalars['String']['output']>;
  is_liked_by_current_user: Scalars['Boolean']['output'];
  likes: Array<ReviewLike>;
  likes_count: Scalars['Int']['output'];
  product_id?: Maybe<Scalars['Int']['output']>;
  rating: Scalars['Int']['output'];
  review?: Maybe<Scalars['String']['output']>;
  updated_at: Scalars['DateTime']['output'];
  user: ReviewUser;
  user_id: Scalars['Int']['output'];
};

export type ReviewLike = {
  id: Scalars['Int']['output'];
  user_id: Scalars['Int']['output'];
};

export type ReviewUser = {
  id: Scalars['Int']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type ReviewsFilterInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

export type ReviewsResponse = {
  data: Array<Review>;
  page: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
  total_pages: Scalars['Int']['output'];
};

export type SearchCounts = {
  events: Scalars['Int']['output'];
  orders: Scalars['Int']['output'];
  products: Scalars['Int']['output'];
};

export type ShippingAddressInput = {
  address_line_1: Scalars['String']['input'];
  address_line_2?: InputMaybe<Scalars['String']['input']>;
  city: Scalars['String']['input'];
  contact_number?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  state: Scalars['String']['input'];
  zip: Scalars['String']['input'];
};

export type ShippingInfo = {
  content: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type ShippingOption = {
  description: Scalars['String']['output'];
  icon: Scalars['String']['output'];
  price: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

export type ShippingPageContent = {
  returnSteps: Array<ReturnStep>;
  returnsPolicy: Array<ReturnsPolicy>;
  shippingInfo: Array<ShippingInfo>;
  shippingOptions: Array<ShippingOption>;
};

export type SocialLinks = {
  facebook: Scalars['String']['output'];
  instagram: Scalars['String']['output'];
  pinterest: Scalars['String']['output'];
  twitter: Scalars['String']['output'];
};

export type TermsPageContent = {
  contactEmail: Scalars['String']['output'];
  introduction: Scalars['String']['output'];
  lastUpdated: Scalars['String']['output'];
  sections: Array<TermsSection>;
};

export type TermsSection = {
  content: Scalars['String']['output'];
  title: Scalars['String']['output'];
};

/** The action performed when toggling wishlist */
export enum ToggleAction {
  Added = 'ADDED',
  Removed = 'REMOVED'
}

/** The action taken when toggling a review like */
export enum ToggleLikeAction {
  Liked = 'LIKED',
  Unliked = 'UNLIKED'
}

export type ToggleReviewLikeResponse = {
  action?: Maybe<ToggleLikeAction>;
  error?: Maybe<Scalars['String']['output']>;
  likes_count?: Maybe<Scalars['Int']['output']>;
  success: Scalars['Boolean']['output'];
};

export type ToggleWishlistResponse = {
  action: ToggleAction;
  item?: Maybe<WishlistItem>;
  success: Scalars['Boolean']['output'];
};

export type UpcomingEvent = {
  _count: UpcomingEventCount;
  available_seats: Scalars['Int']['output'];
  id: Scalars['String']['output'];
  slug: Scalars['String']['output'];
  starts_at: Scalars['DateTime']['output'];
  title: Scalars['String']['output'];
  total_seats: Scalars['Int']['output'];
};

export type UpcomingEventCount = {
  event_registrations: Scalars['Int']['output'];
};

export type UpdateAddressInput = {
  address_line_1?: InputMaybe<Scalars['String']['input']>;
  address_line_2?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  contact_number?: InputMaybe<Scalars['String']['input']>;
  landmark?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  zip?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCartQuantityInput = {
  product_id: Scalars['Int']['input'];
  quantity: Scalars['Int']['input'];
};

export type UpdateCollectionInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  ends_at?: InputMaybe<Scalars['DateTime']['input']>;
  image_url?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  starts_at?: InputMaybe<Scalars['DateTime']['input']>;
};

export type UpdateContactInfoInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  hours?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateContentPageInput = {
  content: Scalars['JSON']['input'];
};

export type UpdateEventInput = {
  available_seats?: InputMaybe<Scalars['Int']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  ends_at?: InputMaybe<Scalars['DateTime']['input']>;
  full_location?: InputMaybe<Scalars['String']['input']>;
  gallery?: InputMaybe<Array<Scalars['String']['input']>>;
  highlights?: InputMaybe<Array<Scalars['String']['input']>>;
  image?: InputMaybe<Scalars['String']['input']>;
  includes?: InputMaybe<Array<Scalars['String']['input']>>;
  instructor?: InputMaybe<Scalars['String']['input']>;
  level?: InputMaybe<EventLevel>;
  location?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  starts_at?: InputMaybe<Scalars['DateTime']['input']>;
  status?: InputMaybe<EventStatus>;
  title?: InputMaybe<Scalars['String']['input']>;
  total_seats?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateHeroImagesInput = {
  events?: InputMaybe<Scalars['String']['input']>;
  home?: InputMaybe<Scalars['String']['input']>;
  ourStory?: InputMaybe<Scalars['String']['input']>;
  products?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateProductInput = {
  available_quantity?: InputMaybe<Scalars['Int']['input']>;
  categories?: InputMaybe<Array<Scalars['String']['input']>>;
  collection_id?: InputMaybe<Scalars['Int']['input']>;
  color_code?: InputMaybe<Scalars['String']['input']>;
  color_name?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  image_urls?: InputMaybe<Array<Scalars['String']['input']>>;
  instructions?: InputMaybe<Array<Scalars['String']['input']>>;
  is_active?: InputMaybe<Scalars['Boolean']['input']>;
  material?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
  total_quantity?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateRegistrationDetailsInput = {
  discount: Scalars['Float']['input'];
  price: Scalars['Float']['input'];
  seatsReserved: Scalars['Int']['input'];
};

export type UpdateSocialLinksInput = {
  facebook?: InputMaybe<Scalars['String']['input']>;
  instagram?: InputMaybe<Scalars['String']['input']>;
  pinterest?: InputMaybe<Scalars['String']['input']>;
  twitter?: InputMaybe<Scalars['String']['input']>;
};

export type UserAddress = {
  address_line_1: Scalars['String']['output'];
  address_line_2?: Maybe<Scalars['String']['output']>;
  city: Scalars['String']['output'];
  contact_number?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  landmark?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  state: Scalars['String']['output'];
  user_id: Scalars['Int']['output'];
  zip: Scalars['String']['output'];
};

export type UserCounts = {
  cartCount: Scalars['Int']['output'];
  eventRegistrationsCount: Scalars['Int']['output'];
  pendingOrdersCount: Scalars['Int']['output'];
  wishlistCount: Scalars['Int']['output'];
};

export type UserResponse = {
  auth_id: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  role: UserRole;
  subscribed_to_newsletter: Scalars['Boolean']['output'];
};

/** Defines the role of the user */
export enum UserRole {
  Admin = 'ADMIN',
  User = 'USER'
}

export type UsersStats = {
  newThisMonth: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
};

export type WishlistFilterInput = {
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
};

export type WishlistItem = {
  created_at: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  product: ProductBase;
  product_id: Scalars['Int']['output'];
  updated_at: Scalars['DateTime']['output'];
  user_id: Scalars['Int']['output'];
};

export type WishlistMutationResponse = {
  item?: Maybe<WishlistItem>;
  success: Scalars['Boolean']['output'];
};

export type WishlistResponse = {
  data: Array<WishlistItem>;
  page: Scalars['Int']['output'];
  total: Scalars['Int']['output'];
  total_pages: Scalars['Int']['output'];
};

export type CreateAddressMutationVariables = Exact<{
  input: CreateAddressInput;
}>;


export type CreateAddressMutation = { createAddress: { success: boolean, error?: string | null, address?: { id: number, user_id: number, name: string, address_line_1: string, address_line_2?: string | null, landmark?: string | null, city: string, state: string, zip: string, contact_number?: string | null } | null } };

export type UpdateAddressMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  input: UpdateAddressInput;
}>;


export type UpdateAddressMutation = { updateAddress: { success: boolean, error?: string | null, address?: { id: number, user_id: number, name: string, address_line_1: string, address_line_2?: string | null, landmark?: string | null, city: string, state: string, zip: string, contact_number?: string | null } | null } };

export type DeleteAddressMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type DeleteAddressMutation = { deleteAddress: { success: boolean, error?: string | null } };

export type UserAddressesQueryVariables = Exact<{ [key: string]: never; }>;


export type UserAddressesQuery = { userAddresses: { total: number, addresses: Array<{ id: number, user_id: number, name: string, address_line_1: string, address_line_2?: string | null, landmark?: string | null, city: string, state: string, zip: string, contact_number?: string | null }> } };

export type AddressByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type AddressByIdQuery = { addressById?: { id: number, user_id: number, name: string, address_line_1: string, address_line_2?: string | null, landmark?: string | null, city: string, state: string, zip: string, contact_number?: string | null } | null };

export type AdminDashboardStatsQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminDashboardStatsQuery = { adminDashboardStats: { orders: { total: number, pending: number, processing: number }, registrations: { total: number, pending: number }, products: { total: number, outOfStock: number, lowStock: number }, events: { total: number, upcoming: number, upcomingIn7Days: number }, users: { total: number, newThisMonth: number }, revenue: { totalOrders: number, totalRegistrations: number }, newsletter: { totalSubscribers: number, newThisMonth: number } } };

export type AdminRecentOrdersQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type AdminRecentOrdersQuery = { adminRecentOrders: Array<{ id: string, status: string, total: number, created_at: Date | string, user: { name?: string | null, email: string } }> };

export type AdminRecentRegistrationsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type AdminRecentRegistrationsQuery = { adminRecentRegistrations: Array<{ id: string, status: string, seats_reserved: number, price: number, created_at: Date | string, user: { name?: string | null, email: string }, event: { title: string } }> };

export type AdminLowStockProductsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type AdminLowStockProductsQuery = { adminLowStockProducts: Array<{ id: number, name: string, slug: string, available_quantity: number, total_quantity: number, price: number }> };

export type AdminUpcomingEventsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type AdminUpcomingEventsQuery = { adminUpcomingEvents: Array<{ id: string, title: string, slug: string, starts_at: Date | string, available_seats: number, total_seats: number, _count: { event_registrations: number } }> };

export type AdminNewsletterSubscribersQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type AdminNewsletterSubscribersQuery = { adminNewsletterSubscribers: Array<{ id: number, email: string, name?: string | null, image?: string | null, newsletter_subscribed_at?: Date | string | null }> };

export type AdminUpdateCategoryIconMutationVariables = Exact<{
  category: Scalars['String']['input'];
  icon: Scalars['String']['input'];
}>;


export type AdminUpdateCategoryIconMutation = { adminUpdateCategoryIcon: { success: boolean, error?: string | null } };

export type AdminAddCategoryMutationVariables = Exact<{
  name: Scalars['String']['input'];
  icon: Scalars['String']['input'];
}>;


export type AdminAddCategoryMutation = { adminAddCategory: { success: boolean, error?: string | null } };

export type AdminRenameCategoryMutationVariables = Exact<{
  oldName: Scalars['String']['input'];
  newName: Scalars['String']['input'];
}>;


export type AdminRenameCategoryMutation = { adminRenameCategory: { success: boolean, error?: string | null } };

export type AdminDeleteCategoryMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type AdminDeleteCategoryMutation = { adminDeleteCategory: { success: boolean, error?: string | null } };

export type AdminCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminCategoriesQuery = { adminCategories: { total: number, categories: Array<{ name: string, icon: string, productCount: number }> } };

export type AdminAllConfiguredCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminAllConfiguredCategoriesQuery = { adminAllConfiguredCategories: Array<{ name: string, icon: string }> };

export type AdminAvailableIconsQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminAvailableIconsQuery = { adminAvailableIcons: Array<{ value: string, label: string }> };

export type AdminCreateCollectionMutationVariables = Exact<{
  input: CreateCollectionInput;
}>;


export type AdminCreateCollectionMutation = { adminCreateCollection: { success: boolean, collectionId?: number | null, error?: string | null } };

export type AdminUpdateCollectionMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  input: UpdateCollectionInput;
}>;


export type AdminUpdateCollectionMutation = { adminUpdateCollection: { success: boolean, collectionId?: number | null, error?: string | null } };

export type AdminDeleteCollectionMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type AdminDeleteCollectionMutation = { adminDeleteCollection: { success: boolean, collectionId?: number | null, error?: string | null } };

export type AdminAssignProductsToCollectionMutationVariables = Exact<{
  input: AssignProductsToCollectionInput;
}>;


export type AdminAssignProductsToCollectionMutation = { adminAssignProductsToCollection: { success: boolean, collectionId?: number | null, error?: string | null } };

export type AdminRemoveProductFromCollectionMutationVariables = Exact<{
  productId: Scalars['Int']['input'];
}>;


export type AdminRemoveProductFromCollectionMutation = { adminRemoveProductFromCollection: { success: boolean, error?: string | null } };

export type AdminCollectionsQueryVariables = Exact<{
  filter?: InputMaybe<AdminCollectionsFilterInput>;
}>;


export type AdminCollectionsQuery = { adminCollections: { total: number, page: number, limit: number, totalPages: number, collections: Array<{ id: number, slug: string, name: string, description?: string | null, image_url?: string | null, starts_at?: Date | string | null, ends_at?: Date | string | null, created_at: Date | string, updated_at: Date | string, products_count: number }> } };

export type AdminCollectionByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type AdminCollectionByIdQuery = { adminCollectionById?: { id: number, slug: string, name: string, description?: string | null, image_url?: string | null, starts_at?: Date | string | null, ends_at?: Date | string | null, created_at: Date | string, updated_at: Date | string, products_count: number, products: Array<{ id: number, name: string, slug: string, image_url?: string | null, price: number, is_active: boolean }> } | null };

export type AdminUpdateContentPageMutationVariables = Exact<{
  slug: Scalars['String']['input'];
  input: UpdateContentPageInput;
}>;


export type AdminUpdateContentPageMutation = { adminUpdateContentPage: { success: boolean, error?: string | null } };

export type AdminToggleContentPageActiveMutationVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type AdminToggleContentPageActiveMutation = { adminToggleContentPageActive: { success: boolean, error?: string | null } };

export type AdminContentPagesQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminContentPagesQuery = { adminContentPages: Array<{ slug: string, title: string, is_active: boolean, updated_at: Date | string }> };

export type AdminContentPageBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type AdminContentPageBySlugQuery = { adminContentPageBySlug?: { id: number, slug: string, title: string, content: any, is_active: boolean, created_at: Date | string, updated_at: Date | string } | null };

export type AdminCreateEventMutationVariables = Exact<{
  input: CreateEventInput;
}>;


export type AdminCreateEventMutation = { adminCreateEvent: { success: boolean, eventId?: string | null, error?: string | null } };

export type AdminUpdateEventMutationVariables = Exact<{
  id: Scalars['String']['input'];
  input: UpdateEventInput;
}>;


export type AdminUpdateEventMutation = { adminUpdateEvent: { success: boolean, eventId?: string | null, error?: string | null } };

export type AdminDeleteEventMutationVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type AdminDeleteEventMutation = { adminDeleteEvent: { success: boolean, eventId?: string | null, error?: string | null } };

export type AdminUpdateEventStatusMutationVariables = Exact<{
  id: Scalars['String']['input'];
  status: Scalars['String']['input'];
}>;


export type AdminUpdateEventStatusMutation = { adminUpdateEventStatus: { success: boolean, eventId?: string | null, error?: string | null } };

export type AdminDeleteEventReviewMutationVariables = Exact<{
  reviewId: Scalars['Int']['input'];
}>;


export type AdminDeleteEventReviewMutation = { adminDeleteEventReview: { success: boolean, eventId?: string | null, error?: string | null } };

export type AdminBulkDeleteEventsMutationVariables = Exact<{
  input: BulkDeleteEventsInput;
}>;


export type AdminBulkDeleteEventsMutation = { adminBulkDeleteEvents: { success: boolean, totalRequested: number, deletedCount: number, cancelledCount: number, failedCount: number, error?: string | null, results: Array<{ id: string, success: boolean, action: string, error?: string | null }> } };

export type AdminEventsQueryVariables = Exact<{
  filter?: InputMaybe<AdminEventsFilterInput>;
}>;


export type AdminEventsQuery = { adminEvents: { total: number, page: number, limit: number, totalPages: number, events: Array<{ id: string, title: string, slug: string, description: string, status: EventStatus, level: EventLevel, starts_at: Date | string, ends_at: Date | string, location: string, price: number, available_seats: number, total_seats: number, instructor: string, image: string, created_at: Date | string, _count: { event_registrations: number, reviews: number } }> } };

export type AdminEventByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type AdminEventByIdQuery = { adminEventById?: { id: string, title: string, slug: string, description: string, status: EventStatus, level: EventLevel, starts_at: Date | string, ends_at: Date | string, location: string, full_location: string, instructor: string, includes: Array<string>, price: number, available_seats: number, total_seats: number, image: string, highlights: Array<string>, gallery: Array<string>, created_at: Date | string, updated_at: Date | string, _count: { event_registrations: number, reviews: number } } | null };

export type AdminEventRegistrationsQueryVariables = Exact<{
  eventId: Scalars['String']['input'];
}>;


export type AdminEventRegistrationsQuery = { adminEventRegistrations: { total: number, registrations: Array<{ id: string, status: EventRegistrationStatus, seats_reserved: number, price: number, discount: number, created_at: Date | string, request_at?: Date | string | null, approved_at?: Date | string | null, paid_at?: Date | string | null, confirmed_at?: Date | string | null, cancelled_at?: Date | string | null, user: { id: number, name?: string | null, email: string, phone?: string | null, image?: string | null } }>, statusCounts: { PENDING: number, APPROVED: number, REJECTED: number, PAID: number, CONFIRMED: number, CANCELLED: number } } };

export type AdminEventReviewsQueryVariables = Exact<{
  eventId: Scalars['String']['input'];
}>;


export type AdminEventReviewsQuery = { adminEventReviews: { total: number, averageRating: number, reviews: Array<{ id: number, rating: number, review?: string | null, image_urls: Array<string>, created_at: Date | string, user: { id: number, name?: string | null, email: string, image?: string | null } }> } };

export type AdminEventStatusOptionsQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminEventStatusOptionsQuery = { adminEventStatusOptions: Array<{ value: string, label: string }> };

export type AdminEventLevelOptionsQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminEventLevelOptionsQuery = { adminEventLevelOptions: Array<{ value: string, label: string }> };

export type AdminUpdateOrderStatusMutationVariables = Exact<{
  orderId: Scalars['String']['input'];
  status: Scalars['String']['input'];
}>;


export type AdminUpdateOrderStatusMutation = { adminUpdateOrderStatus: { success: boolean, error?: string | null } };

export type AdminUpdateOrderPriceMutationVariables = Exact<{
  orderId: Scalars['String']['input'];
  total: Scalars['Float']['input'];
}>;


export type AdminUpdateOrderPriceMutation = { adminUpdateOrderPrice: { success: boolean, error?: string | null } };

export type AdminUpdateOrderDiscountMutationVariables = Exact<{
  orderId: Scalars['String']['input'];
  discount: Scalars['Float']['input'];
}>;


export type AdminUpdateOrderDiscountMutation = { adminUpdateOrderDiscount: { success: boolean, error?: string | null } };

export type AdminUpdateOrderItemDiscountMutationVariables = Exact<{
  itemId: Scalars['Int']['input'];
  discount: Scalars['Float']['input'];
}>;


export type AdminUpdateOrderItemDiscountMutation = { adminUpdateOrderItemDiscount: { success: boolean, error?: string | null } };

export type AdminUpdateOrderItemQuantityMutationVariables = Exact<{
  itemId: Scalars['Int']['input'];
  quantity: Scalars['Int']['input'];
}>;


export type AdminUpdateOrderItemQuantityMutation = { adminUpdateOrderItemQuantity: { success: boolean, error?: string | null } };

export type AdminCreateProductMutationVariables = Exact<{
  input: CreateProductInput;
}>;


export type AdminCreateProductMutation = { adminCreateProduct: { success: boolean, productId?: number | null, error?: string | null } };

export type AdminUpdateProductMutationVariables = Exact<{
  id: Scalars['Int']['input'];
  input: UpdateProductInput;
}>;


export type AdminUpdateProductMutation = { adminUpdateProduct: { success: boolean, error?: string | null } };

export type AdminDeleteProductMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type AdminDeleteProductMutation = { adminDeleteProduct: { success: boolean, error?: string | null } };

export type AdminToggleProductActiveMutationVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type AdminToggleProductActiveMutation = { adminToggleProductActive: { success: boolean, error?: string | null } };

export type AdminDeleteProductReviewMutationVariables = Exact<{
  reviewId: Scalars['Int']['input'];
}>;


export type AdminDeleteProductReviewMutation = { adminDeleteProductReview: { success: boolean, error?: string | null } };

export type AdminBulkDeleteProductsMutationVariables = Exact<{
  input: BulkDeleteProductsInput;
}>;


export type AdminBulkDeleteProductsMutation = { adminBulkDeleteProducts: { success: boolean, totalRequested: number, deletedCount: number, deactivatedCount: number, failedCount: number, error?: string | null, results: Array<{ id: number, success: boolean, action: string, error?: string | null }> } };

export type AdminProductsQueryVariables = Exact<{
  filter?: InputMaybe<AdminProductsFilterInput>;
}>;


export type AdminProductsQuery = { adminProducts: { total: number, page: number, limit: number, totalPages: number, products: Array<{ id: number, name: string, slug: string, price: number, available_quantity: number, total_quantity: number, is_active: boolean, categories: Array<string>, material: string, color_code: string, color_name: string, image_urls: Array<string>, created_at: Date | string, _count: { reviews: number, wishlists: number, carts: number } }> } };

export type AdminProductByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type AdminProductByIdQuery = { adminProductById?: { id: number, name: string, slug: string, description?: string | null, instructions: Array<string>, price: number, available_quantity: number, total_quantity: number, is_active: boolean, categories: Array<string>, material: string, color_code: string, color_name: string, image_urls: Array<string>, collection_id?: number | null, created_at: Date | string, updated_at: Date | string, collection?: { id: number, name: string, slug: string } | null, _count: { reviews: number, wishlists: number, carts: number, purchased_products: number } } | null };

export type AdminProductReviewsQueryVariables = Exact<{
  productId: Scalars['Int']['input'];
}>;


export type AdminProductReviewsQuery = { adminProductReviews: { total: number, averageRating: number, reviews: Array<{ id: number, rating: number, review?: string | null, image_urls: Array<string>, created_at: Date | string, user: { id: number, name?: string | null, email: string, image?: string | null } }> } };

export type AdminAllCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminAllCategoriesQuery = { adminAllCategories: Array<string> };

export type AdminAllCollectionsQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminAllCollectionsQuery = { adminAllCollections: Array<{ id: number, name: string, slug: string }> };

export type PublicAboutContentQueryVariables = Exact<{ [key: string]: never; }>;


export type PublicAboutContentQuery = { publicAboutContent?: { storyTitle: string, storySubtitle: string, storyContent: Array<string>, values: Array<{ icon: string, title: string, description: string }>, team: Array<{ name: string, role: string, image: string, bio: string }>, processSteps: Array<{ step: string, title: string, description: string }> } | null };

export type PublicFaqContentQueryVariables = Exact<{ [key: string]: never; }>;


export type PublicFaqContentQuery = { publicFAQContent?: { categories: Array<{ title: string, faqs: Array<{ question: string, answer: string }> }> } | null };

export type PublicShippingContentQueryVariables = Exact<{ [key: string]: never; }>;


export type PublicShippingContentQuery = { publicShippingContent?: { shippingOptions: Array<{ icon: string, title: string, description: string, price: string }>, shippingInfo: Array<{ title: string, content: string }>, returnsPolicy: Array<{ icon: string, title: string, description: string }>, returnSteps: Array<{ step: string, title: string, description: string }> } | null };

export type PublicCareContentQueryVariables = Exact<{ [key: string]: never; }>;


export type PublicCareContentQuery = { publicCareContent?: { safeFor: Array<string>, avoid: Array<string>, glazeTypes: Array<{ name: string, icon: string, description: string, care: string }>, warnings: Array<{ icon: string, title: string, description: string }> } | null };

export type PublicPrivacyContentQueryVariables = Exact<{ [key: string]: never; }>;


export type PublicPrivacyContentQuery = { publicPrivacyContent?: { lastUpdated: string, introduction: string, contactEmail: string, sections: Array<{ title: string, content: string }> } | null };

export type PublicTermsContentQueryVariables = Exact<{ [key: string]: never; }>;


export type PublicTermsContentQuery = { publicTermsContent?: { lastUpdated: string, introduction: string, contactEmail: string, sections: Array<{ title: string, content: string }> } | null };

export type PublicHeroImagesQueryVariables = Exact<{ [key: string]: never; }>;


export type PublicHeroImagesQuery = { publicHeroImages: { home: string, ourStory: string, products: string, events: string } };

export type PublicContactInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type PublicContactInfoQuery = { publicContactInfo: { address: string, email: string, phone: string, hours: string } };

export type PublicSocialLinksQueryVariables = Exact<{ [key: string]: never; }>;


export type PublicSocialLinksQuery = { publicSocialLinks: { instagram: string, facebook: string, twitter: string, pinterest: string } };

export type AdminUpdateRegistrationStatusMutationVariables = Exact<{
  registrationId: Scalars['String']['input'];
  status: Scalars['String']['input'];
}>;


export type AdminUpdateRegistrationStatusMutation = { adminUpdateRegistrationStatus: { success: boolean, error?: string | null } };

export type AdminUpdateRegistrationPriceMutationVariables = Exact<{
  registrationId: Scalars['String']['input'];
  price: Scalars['Float']['input'];
}>;


export type AdminUpdateRegistrationPriceMutation = { adminUpdateRegistrationPrice: { success: boolean, error?: string | null } };

export type AdminUpdateRegistrationDetailsMutationVariables = Exact<{
  registrationId: Scalars['String']['input'];
  input: UpdateRegistrationDetailsInput;
}>;


export type AdminUpdateRegistrationDetailsMutation = { adminUpdateRegistrationDetails: { success: boolean, error?: string | null } };

export type AdminUpdateHeroImagesMutationVariables = Exact<{
  input: UpdateHeroImagesInput;
}>;


export type AdminUpdateHeroImagesMutation = { adminUpdateHeroImages: { success: boolean, error?: string | null } };

export type AdminUpdateContactInfoMutationVariables = Exact<{
  input: UpdateContactInfoInput;
}>;


export type AdminUpdateContactInfoMutation = { adminUpdateContactInfo: { success: boolean, error?: string | null } };

export type AdminUpdateSocialLinksMutationVariables = Exact<{
  input: UpdateSocialLinksInput;
}>;


export type AdminUpdateSocialLinksMutation = { adminUpdateSocialLinks: { success: boolean, error?: string | null } };

export type AdminAllSettingsQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminAllSettingsQuery = { adminAllSettings: Array<{ id: number, key: string, value: any, updated_at: Date | string }> };

export type AdminHeroImagesQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminHeroImagesQuery = { adminHeroImages: { home: string, ourStory: string, products: string, events: string } };

export type AdminContactInfoQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminContactInfoQuery = { adminContactInfo: { address: string, email: string, phone: string, hours: string } };

export type AdminSocialLinksQueryVariables = Exact<{ [key: string]: never; }>;


export type AdminSocialLinksQuery = { adminSocialLinks: { instagram: string, facebook: string, twitter: string, pinterest: string } };

export type AdminGetPresignedUploadUrlMutationVariables = Exact<{
  input: GetPresignedUploadUrlInput;
}>;


export type AdminGetPresignedUploadUrlMutation = { adminGetPresignedUploadUrl: { success: boolean, presignedUrl?: string | null, publicUrl?: string | null, key?: string | null, error?: string | null } };

export type AdminUpdateUserRoleMutationVariables = Exact<{
  userId: Scalars['Int']['input'];
  role: Scalars['String']['input'];
}>;


export type AdminUpdateUserRoleMutation = { adminUpdateUserRole: { success: boolean, error?: string | null } };

export type AdminUsersQueryVariables = Exact<{
  filter?: InputMaybe<AdminUsersFilterInput>;
}>;


export type AdminUsersQuery = { adminUsers: { total: number, page: number, limit: number, totalPages: number, users: Array<{ id: number, auth_id: string, email: string, name?: string | null, image?: string | null, phone?: string | null, role: UserRole, created_at: Date | string, pendingOrdersCount: number, pendingRegistrationsCount: number, _count: { product_orders: number, event_registrations: number } }> } };

export type AdminUserByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type AdminUserByIdQuery = { adminUserById?: { id: number, auth_id: string, email: string, name?: string | null, image?: string | null, phone?: string | null, role: UserRole, created_at: Date | string, updated_at: Date | string, _count: { product_orders: number, event_registrations: number, wishlists: number, carts: number, reviews: number } } | null };

export type AdminUserOrdersQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type AdminUserOrdersQuery = { adminUserOrders: Array<{ id: string, status: string, total: number, subtotal: number, discount: number, shipping_fee: number, created_at: Date | string, request_at?: Date | string | null, approved_at?: Date | string | null, paid_at?: Date | string | null, shipped_at?: Date | string | null, delivered_at?: Date | string | null, cancelled_at?: Date | string | null, returned_at?: Date | string | null, refunded_at?: Date | string | null, ordered_products: Array<{ id: number, quantity: number, price: number, discount: number, product: { id: number, name: string, slug: string, image_urls: Array<string> } }> }> };

export type AdminUserRegistrationsQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type AdminUserRegistrationsQuery = { adminUserRegistrations: Array<{ id: string, status: string, seats_reserved: number, price: number, discount: number, created_at: Date | string, request_at?: Date | string | null, approved_at?: Date | string | null, paid_at?: Date | string | null, confirmed_at?: Date | string | null, cancelled_at?: Date | string | null, event: { id: string, title: string, slug: string, starts_at: Date | string, ends_at: Date | string, location: string, image: string, price: number } }> };

export type AdminUserCartQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
}>;


export type AdminUserCartQuery = { adminUserCart: Array<{ id: number, quantity: number, created_at: Date | string, product: { id: number, name: string, slug: string, price: number, available_quantity: number, image_urls: Array<string> } }> };

export type AdminUserWishlistQueryVariables = Exact<{
  userId: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type AdminUserWishlistQuery = { adminUserWishlist: { total: number, page: number, totalPages: number, data: Array<{ id: number, created_at: Date | string, product: { id: number, name: string, slug: string, price: number, available_quantity: number, image_urls: Array<string> } }> } };

export type AddToCartMutationVariables = Exact<{
  input: AddToCartInput;
}>;


export type AddToCartMutation = { addToCart: { success: boolean, item?: { id: number, user_id: number, product_id: number, quantity: number, created_at: Date | string, updated_at: Date | string, product: { id: number, slug: string, name: string, price: number, image_urls: Array<string>, reviews_count: number, avg_rating: number, material: string, in_wishlist: boolean, is_active: boolean, available_quantity: number, total_quantity: number, color_code: string, color_name: string } } | null } };

export type UpdateCartQuantityMutationVariables = Exact<{
  input: UpdateCartQuantityInput;
}>;


export type UpdateCartQuantityMutation = { updateCartQuantity: { success: boolean, item?: { id: number, user_id: number, product_id: number, quantity: number, created_at: Date | string, updated_at: Date | string, product: { id: number, slug: string, name: string, price: number, image_urls: Array<string>, reviews_count: number, avg_rating: number, material: string, in_wishlist: boolean, is_active: boolean, available_quantity: number, total_quantity: number, color_code: string, color_name: string } } | null } };

export type RemoveFromCartMutationVariables = Exact<{
  productId: Scalars['Int']['input'];
}>;


export type RemoveFromCartMutation = { removeFromCart: boolean };

export type ClearCartMutationVariables = Exact<{ [key: string]: never; }>;


export type ClearCartMutation = { clearCart: boolean };

export type CartQueryVariables = Exact<{ [key: string]: never; }>;


export type CartQuery = { cart: { total: number, subtotal: number, items: Array<{ id: number, user_id: number, product_id: number, quantity: number, created_at: Date | string, updated_at: Date | string, product: { id: number, slug: string, name: string, price: number, image_urls: Array<string>, reviews_count: number, avg_rating: number, material: string, in_wishlist: boolean, is_active: boolean, available_quantity: number, total_quantity: number, color_code: string, color_name: string, collection?: { id: number, slug: string, name: string, starts_at?: Date | string | null, ends_at?: Date | string | null, created_at: Date | string, updated_at: Date | string, products_count: number } | null } }> } };

export type MutationRegistrationEventFieldsFragment = { id: string, slug: string, title: string, description: string, starts_at: Date | string, ends_at: Date | string, location: string, full_location: string, total_seats: number, available_seats: number, instructor: string, includes: Array<string>, price: number, image: string, highlights: Array<string>, gallery: Array<string>, status: EventStatus, level: EventLevel, created_at: Date | string, updated_at: Date | string };

export type MutationEventRegistrationFieldsFragment = { id: string, event_id: string, user_id: number, seats_reserved: number, price: number, discount: number, status: EventRegistrationStatus, request_at?: Date | string | null, approved_at?: Date | string | null, paid_at?: Date | string | null, confirmed_at?: Date | string | null, cancelled_at?: Date | string | null, created_at: Date | string, updated_at: Date | string, has_reviewed: boolean, event: { id: string, slug: string, title: string, description: string, starts_at: Date | string, ends_at: Date | string, location: string, full_location: string, total_seats: number, available_seats: number, instructor: string, includes: Array<string>, price: number, image: string, highlights: Array<string>, gallery: Array<string>, status: EventStatus, level: EventLevel, created_at: Date | string, updated_at: Date | string }, user: { id: number, email: string, name?: string | null, image?: string | null } };

export type RegisterForEventMutationVariables = Exact<{
  input: RegisterForEventInput;
}>;


export type RegisterForEventMutation = { registerForEvent: { success: boolean, error?: string | null, registration?: { id: string, event_id: string, user_id: number, seats_reserved: number, price: number, discount: number, status: EventRegistrationStatus, request_at?: Date | string | null, approved_at?: Date | string | null, paid_at?: Date | string | null, confirmed_at?: Date | string | null, cancelled_at?: Date | string | null, created_at: Date | string, updated_at: Date | string, has_reviewed: boolean, event: { id: string, slug: string, title: string, description: string, starts_at: Date | string, ends_at: Date | string, location: string, full_location: string, total_seats: number, available_seats: number, instructor: string, includes: Array<string>, price: number, image: string, highlights: Array<string>, gallery: Array<string>, status: EventStatus, level: EventLevel, created_at: Date | string, updated_at: Date | string }, user: { id: number, email: string, name?: string | null, image?: string | null } } | null } };

export type CancelRegistrationMutationVariables = Exact<{
  registrationId: Scalars['String']['input'];
}>;


export type CancelRegistrationMutation = { cancelRegistration: { success: boolean, error?: string | null } };

export type EventBaseFieldsFragment = { id: string, slug: string, title: string, description: string, starts_at: Date | string, ends_at: Date | string, location: string, full_location: string, total_seats: number, available_seats: number, instructor: string, includes: Array<string>, price: number, image: string, highlights: Array<string>, gallery: Array<string>, status: EventStatus, level: EventLevel, created_at: Date | string, updated_at: Date | string, registrations_count: number, reviews_count: number, avg_rating?: number | null };

export type EventDetailFieldsFragment = { id: string, slug: string, title: string, description: string, starts_at: Date | string, ends_at: Date | string, location: string, full_location: string, total_seats: number, available_seats: number, instructor: string, includes: Array<string>, price: number, image: string, highlights: Array<string>, gallery: Array<string>, status: EventStatus, level: EventLevel, created_at: Date | string, updated_at: Date | string, registrations_count: number, reviews_count: number, avg_rating?: number | null, is_registered: boolean, reviews: Array<{ id: number, user_id: number, rating: number, review?: string | null, image_urls: Array<string>, event_id?: string | null, created_at: Date | string, updated_at: Date | string, user: { id: number, email: string, name?: string | null, image?: string | null }, likes: Array<{ id: number, review_id: number, user_id: number }> }> };

export type RegistrationEventFieldsFragment = { id: string, slug: string, title: string, description: string, starts_at: Date | string, ends_at: Date | string, location: string, full_location: string, total_seats: number, available_seats: number, instructor: string, includes: Array<string>, price: number, image: string, highlights: Array<string>, gallery: Array<string>, status: EventStatus, level: EventLevel, created_at: Date | string, updated_at: Date | string };

export type EventRegistrationFieldsFragment = { id: string, event_id: string, user_id: number, seats_reserved: number, price: number, discount: number, status: EventRegistrationStatus, request_at?: Date | string | null, approved_at?: Date | string | null, paid_at?: Date | string | null, confirmed_at?: Date | string | null, cancelled_at?: Date | string | null, created_at: Date | string, updated_at: Date | string, has_reviewed: boolean, event: { id: string, slug: string, title: string, description: string, starts_at: Date | string, ends_at: Date | string, location: string, full_location: string, total_seats: number, available_seats: number, instructor: string, includes: Array<string>, price: number, image: string, highlights: Array<string>, gallery: Array<string>, status: EventStatus, level: EventLevel, created_at: Date | string, updated_at: Date | string }, user: { id: number, email: string, name?: string | null, image?: string | null } };

export type EventsQueryVariables = Exact<{
  filter?: InputMaybe<EventsFilterInput>;
}>;


export type EventsQuery = { events: { total: number, page: number, total_pages: number, levels: Array<EventLevel>, data: Array<{ id: string, slug: string, title: string, description: string, starts_at: Date | string, ends_at: Date | string, location: string, full_location: string, total_seats: number, available_seats: number, instructor: string, includes: Array<string>, price: number, image: string, highlights: Array<string>, gallery: Array<string>, status: EventStatus, level: EventLevel, created_at: Date | string, updated_at: Date | string, registrations_count: number, reviews_count: number, avg_rating?: number | null }> } };

export type EventBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type EventBySlugQuery = { eventBySlug?: { id: string, slug: string, title: string, description: string, starts_at: Date | string, ends_at: Date | string, location: string, full_location: string, total_seats: number, available_seats: number, instructor: string, includes: Array<string>, price: number, image: string, highlights: Array<string>, gallery: Array<string>, status: EventStatus, level: EventLevel, created_at: Date | string, updated_at: Date | string, registrations_count: number, reviews_count: number, avg_rating?: number | null, is_registered: boolean, reviews: Array<{ id: number, user_id: number, rating: number, review?: string | null, image_urls: Array<string>, event_id?: string | null, created_at: Date | string, updated_at: Date | string, user: { id: number, email: string, name?: string | null, image?: string | null }, likes: Array<{ id: number, review_id: number, user_id: number }> }> } | null };

export type EventByIdQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type EventByIdQuery = { eventById?: { id: string, slug: string, title: string, description: string, starts_at: Date | string, ends_at: Date | string, location: string, full_location: string, total_seats: number, available_seats: number, instructor: string, includes: Array<string>, price: number, image: string, highlights: Array<string>, gallery: Array<string>, status: EventStatus, level: EventLevel, created_at: Date | string, updated_at: Date | string, registrations_count: number, reviews_count: number, avg_rating?: number | null, is_registered: boolean, reviews: Array<{ id: number, user_id: number, rating: number, review?: string | null, image_urls: Array<string>, event_id?: string | null, created_at: Date | string, updated_at: Date | string, user: { id: number, email: string, name?: string | null, image?: string | null }, likes: Array<{ id: number, review_id: number, user_id: number }> }> } | null };

export type UpcomingEventsQueryVariables = Exact<{
  filter?: InputMaybe<EventsFilterInput>;
}>;


export type UpcomingEventsQuery = { upcomingEvents: { total: number, page: number, total_pages: number, levels: Array<EventLevel>, data: Array<{ id: string, slug: string, title: string, description: string, starts_at: Date | string, ends_at: Date | string, location: string, full_location: string, total_seats: number, available_seats: number, instructor: string, includes: Array<string>, price: number, image: string, highlights: Array<string>, gallery: Array<string>, status: EventStatus, level: EventLevel, created_at: Date | string, updated_at: Date | string, registrations_count: number, reviews_count: number, avg_rating?: number | null }> } };

export type PastEventsQueryVariables = Exact<{
  filter?: InputMaybe<EventsFilterInput>;
}>;


export type PastEventsQuery = { pastEvents: { total: number, page: number, total_pages: number, levels: Array<EventLevel>, data: Array<{ id: string, slug: string, title: string, description: string, starts_at: Date | string, ends_at: Date | string, location: string, full_location: string, total_seats: number, available_seats: number, instructor: string, includes: Array<string>, price: number, image: string, highlights: Array<string>, gallery: Array<string>, status: EventStatus, level: EventLevel, created_at: Date | string, updated_at: Date | string, registrations_count: number, reviews_count: number, avg_rating?: number | null }> } };

export type EventWithUserContextQueryVariables = Exact<{
  eventId: Scalars['String']['input'];
}>;


export type EventWithUserContextQuery = { eventWithUserContext?: { is_past_event: boolean, current_user_id?: number | null, event: { id: string, slug: string, title: string, description: string, starts_at: Date | string, ends_at: Date | string, location: string, full_location: string, total_seats: number, available_seats: number, instructor: string, includes: Array<string>, price: number, image: string, highlights: Array<string>, gallery: Array<string>, status: EventStatus, level: EventLevel, created_at: Date | string, updated_at: Date | string, registrations_count: number, reviews_count: number, avg_rating?: number | null, is_registered: boolean, reviews: Array<{ id: number, user_id: number, rating: number, review?: string | null, image_urls: Array<string>, event_id?: string | null, created_at: Date | string, updated_at: Date | string, user: { id: number, email: string, name?: string | null, image?: string | null }, likes: Array<{ id: number, review_id: number, user_id: number }> }> }, registration?: { id: string, event_id: string, user_id: number, seats_reserved: number, price: number, discount: number, status: EventRegistrationStatus, request_at?: Date | string | null, approved_at?: Date | string | null, paid_at?: Date | string | null, confirmed_at?: Date | string | null, cancelled_at?: Date | string | null, created_at: Date | string, updated_at: Date | string, has_reviewed: boolean, event: { id: string, slug: string, title: string, description: string, starts_at: Date | string, ends_at: Date | string, location: string, full_location: string, total_seats: number, available_seats: number, instructor: string, includes: Array<string>, price: number, image: string, highlights: Array<string>, gallery: Array<string>, status: EventStatus, level: EventLevel, created_at: Date | string, updated_at: Date | string }, user: { id: number, email: string, name?: string | null, image?: string | null } } | null } | null };

export type UserRegistrationsQueryVariables = Exact<{
  filter?: InputMaybe<RegistrationsFilterInput>;
}>;


export type UserRegistrationsQuery = { userRegistrations: { total: number, page: number, total_pages: number, data: Array<{ id: string, event_id: string, user_id: number, seats_reserved: number, price: number, discount: number, status: EventRegistrationStatus, request_at?: Date | string | null, approved_at?: Date | string | null, paid_at?: Date | string | null, confirmed_at?: Date | string | null, cancelled_at?: Date | string | null, created_at: Date | string, updated_at: Date | string, has_reviewed: boolean, event: { id: string, slug: string, title: string, description: string, starts_at: Date | string, ends_at: Date | string, location: string, full_location: string, total_seats: number, available_seats: number, instructor: string, includes: Array<string>, price: number, image: string, highlights: Array<string>, gallery: Array<string>, status: EventStatus, level: EventLevel, created_at: Date | string, updated_at: Date | string }, user: { id: number, email: string, name?: string | null, image?: string | null } }> } };

export type RegistrationByIdQueryVariables = Exact<{
  registrationId: Scalars['String']['input'];
}>;


export type RegistrationByIdQuery = { registrationById?: { id: string, event_id: string, user_id: number, seats_reserved: number, price: number, discount: number, status: EventRegistrationStatus, request_at?: Date | string | null, approved_at?: Date | string | null, paid_at?: Date | string | null, confirmed_at?: Date | string | null, cancelled_at?: Date | string | null, created_at: Date | string, updated_at: Date | string, has_reviewed: boolean, event: { id: string, slug: string, title: string, description: string, starts_at: Date | string, ends_at: Date | string, location: string, full_location: string, total_seats: number, available_seats: number, instructor: string, includes: Array<string>, price: number, image: string, highlights: Array<string>, gallery: Array<string>, status: EventStatus, level: EventLevel, created_at: Date | string, updated_at: Date | string }, user: { id: number, email: string, name?: string | null, image?: string | null } } | null };

export type UpcomingRegistrationsQueryVariables = Exact<{
  filter?: InputMaybe<RegistrationsFilterInput>;
}>;


export type UpcomingRegistrationsQuery = { upcomingRegistrations: { total: number, page: number, total_pages: number, data: Array<{ id: string, event_id: string, user_id: number, seats_reserved: number, price: number, discount: number, status: EventRegistrationStatus, request_at?: Date | string | null, approved_at?: Date | string | null, paid_at?: Date | string | null, confirmed_at?: Date | string | null, cancelled_at?: Date | string | null, created_at: Date | string, updated_at: Date | string, has_reviewed: boolean, event: { id: string, slug: string, title: string, description: string, starts_at: Date | string, ends_at: Date | string, location: string, full_location: string, total_seats: number, available_seats: number, instructor: string, includes: Array<string>, price: number, image: string, highlights: Array<string>, gallery: Array<string>, status: EventStatus, level: EventLevel, created_at: Date | string, updated_at: Date | string }, user: { id: number, email: string, name?: string | null, image?: string | null } }> } };

export type CompletedRegistrationsQueryVariables = Exact<{
  filter?: InputMaybe<RegistrationsFilterInput>;
}>;


export type CompletedRegistrationsQuery = { completedRegistrations: { total: number, page: number, total_pages: number, data: Array<{ id: string, event_id: string, user_id: number, seats_reserved: number, price: number, discount: number, status: EventRegistrationStatus, request_at?: Date | string | null, approved_at?: Date | string | null, paid_at?: Date | string | null, confirmed_at?: Date | string | null, cancelled_at?: Date | string | null, created_at: Date | string, updated_at: Date | string, has_reviewed: boolean, event: { id: string, slug: string, title: string, description: string, starts_at: Date | string, ends_at: Date | string, location: string, full_location: string, total_seats: number, available_seats: number, instructor: string, includes: Array<string>, price: number, image: string, highlights: Array<string>, gallery: Array<string>, status: EventStatus, level: EventLevel, created_at: Date | string, updated_at: Date | string }, user: { id: number, email: string, name?: string | null, image?: string | null } }> } };

export type SubscribeToNewsletterMutationVariables = Exact<{ [key: string]: never; }>;


export type SubscribeToNewsletterMutation = { subscribeToNewsletter: { success: boolean, error?: string | null, status?: { subscribed: boolean, subscribed_at?: Date | string | null } | null } };

export type UnsubscribeFromNewsletterMutationVariables = Exact<{ [key: string]: never; }>;


export type UnsubscribeFromNewsletterMutation = { unsubscribeFromNewsletter: { success: boolean, error?: string | null, status?: { subscribed: boolean, subscribed_at?: Date | string | null } | null } };

export type NewsletterStatusQueryVariables = Exact<{ [key: string]: never; }>;


export type NewsletterStatusQuery = { newsletterStatus: { subscribed: boolean, subscribed_at?: Date | string | null } };

export type CreateOrderMutationVariables = Exact<{
  input: CreateOrderInput;
}>;


export type CreateOrderMutation = { createOrder: { success: boolean, error?: string | null, order?: { id: string, user_id: number, shipping_fee: number, subtotal: number, discount: number, total: number, status: OrderStatus, request_at?: Date | string | null, approved_at?: Date | string | null, paid_at?: Date | string | null, shipped_at?: Date | string | null, delivered_at?: Date | string | null, cancelled_at?: Date | string | null, returned_at?: Date | string | null, refunded_at?: Date | string | null, shipping_address: any, created_at: Date | string, updated_at: Date | string, user: { id: number, email: string, name?: string | null }, ordered_products: Array<{ id: number, order_id: string, product_id: number, quantity: number, discount: number, price: number, created_at: Date | string, updated_at: Date | string, has_reviewed: boolean, product: { id: number, slug: string, name: string, price: number, image_urls: Array<string>, reviews_count: number, avg_rating: number, material: string, in_wishlist: boolean, is_active: boolean, available_quantity: number, total_quantity: number, color_code: string, color_name: string } }> } | null } };

export type CancelOrderMutationVariables = Exact<{
  orderId: Scalars['String']['input'];
}>;


export type CancelOrderMutation = { cancelOrder: { success: boolean, error?: string | null, order?: { id: string, user_id: number, shipping_fee: number, subtotal: number, discount: number, total: number, status: OrderStatus, request_at?: Date | string | null, approved_at?: Date | string | null, paid_at?: Date | string | null, shipped_at?: Date | string | null, delivered_at?: Date | string | null, cancelled_at?: Date | string | null, returned_at?: Date | string | null, refunded_at?: Date | string | null, shipping_address: any, created_at: Date | string, updated_at: Date | string, user: { id: number, email: string, name?: string | null }, ordered_products: Array<{ id: number, order_id: string, product_id: number, quantity: number, discount: number, price: number, created_at: Date | string, updated_at: Date | string, has_reviewed: boolean, product: { id: number, slug: string, name: string, price: number, image_urls: Array<string>, reviews_count: number, avg_rating: number, material: string, in_wishlist: boolean, is_active: boolean, available_quantity: number, total_quantity: number, color_code: string, color_name: string } }> } | null } };

export type OrdersQueryVariables = Exact<{
  filter?: InputMaybe<OrdersFilterInput>;
}>;


export type OrdersQuery = { orders: { total: number, page: number, total_pages: number, data: Array<{ id: string, user_id: number, shipping_fee: number, subtotal: number, discount: number, total: number, status: OrderStatus, request_at?: Date | string | null, approved_at?: Date | string | null, paid_at?: Date | string | null, shipped_at?: Date | string | null, delivered_at?: Date | string | null, cancelled_at?: Date | string | null, returned_at?: Date | string | null, refunded_at?: Date | string | null, shipping_address: any, created_at: Date | string, updated_at: Date | string, user: { id: number, email: string, name?: string | null }, ordered_products: Array<{ id: number, order_id: string, product_id: number, quantity: number, discount: number, price: number, created_at: Date | string, updated_at: Date | string, has_reviewed: boolean, product: { id: number, slug: string, name: string, price: number, image_urls: Array<string>, reviews_count: number, avg_rating: number, material: string, in_wishlist: boolean, is_active: boolean, available_quantity: number, total_quantity: number, color_code: string, color_name: string } }> }> } };

export type OrderQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type OrderQuery = { order?: { id: string, user_id: number, shipping_fee: number, subtotal: number, discount: number, total: number, status: OrderStatus, request_at?: Date | string | null, approved_at?: Date | string | null, paid_at?: Date | string | null, shipped_at?: Date | string | null, delivered_at?: Date | string | null, cancelled_at?: Date | string | null, returned_at?: Date | string | null, refunded_at?: Date | string | null, shipping_address: any, created_at: Date | string, updated_at: Date | string, user: { id: number, email: string, name?: string | null }, ordered_products: Array<{ id: number, order_id: string, product_id: number, quantity: number, discount: number, price: number, created_at: Date | string, updated_at: Date | string, has_reviewed: boolean, product: { id: number, slug: string, name: string, price: number, image_urls: Array<string>, reviews_count: number, avg_rating: number, material: string, in_wishlist: boolean, is_active: boolean, available_quantity: number, total_quantity: number, color_code: string, color_name: string } }> } | null };

export type CollectionFieldsFragment = { id: number, slug: string, name: string, description?: string | null, image_url?: string | null, starts_at?: Date | string | null, ends_at?: Date | string | null, created_at: Date | string, updated_at: Date | string, products_count: number };

export type ProductsQueryVariables = Exact<{
  filter: ProductsFilterInput;
}>;


export type ProductsQuery = { products: { total_products: number, total_pages: number, products: Array<{ id: number, slug: string, name: string, price: number, image_urls: Array<string>, reviews_count: number, avg_rating: number, material: string, in_wishlist: boolean, is_active: boolean, available_quantity: number, total_quantity: number, color_code: string, color_name: string, collection?: { id: number, slug: string, name: string, description?: string | null, image_url?: string | null, starts_at?: Date | string | null, ends_at?: Date | string | null, created_at: Date | string, updated_at: Date | string, products_count: number } | null }>, filter: { limit?: number | null, page?: number | null, search?: string | null, categories?: Array<string> | null, materials?: Array<string> | null, min_price?: number | null, max_price?: number | null, order_by?: ProductOrderBy | null, collection_ids?: Array<number> | null, archive?: boolean | null }, meta: { categories: Array<string>, materials: Array<string>, price_range: { min: number, max: number }, price_histogram: Array<{ min: number, max: number, count: number }>, collections: Array<{ id: number, slug: string, name: string, description?: string | null, image_url?: string | null, starts_at?: Date | string | null, ends_at?: Date | string | null, created_at: Date | string, updated_at: Date | string, products_count: number }> } } };

export type ProductBySlugQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type ProductBySlugQuery = { productBySlug?: { id: number, slug: string, name: string, price: number, image_urls: Array<string>, reviews_count: number, avg_rating: number, material: string, in_wishlist: boolean, available_quantity: number, total_quantity: number, color_code: string, color_name: string, description?: string | null, instructions: Array<string>, is_active: boolean, created_at: Date | string, updated_at: Date | string, categories: Array<string>, collection?: { id: number, slug: string, name: string, description?: string | null, image_url?: string | null, starts_at?: Date | string | null, ends_at?: Date | string | null, created_at: Date | string, updated_at: Date | string, products_count: number } | null, reviews: Array<{ id: number, user_id: number, rating: number, review?: string | null, image_urls: Array<string>, created_at: Date | string, user?: { id: number, name?: string | null, image?: string | null } | null, likes: Array<{ id: number, user_id: number }> }> } | null };

export type ProductByIdQueryVariables = Exact<{
  id: Scalars['Int']['input'];
}>;


export type ProductByIdQuery = { productById?: { id: number, slug: string, name: string, price: number, image_urls: Array<string>, reviews_count: number, avg_rating: number, material: string, in_wishlist: boolean, available_quantity: number, total_quantity: number, color_code: string, color_name: string, description?: string | null, instructions: Array<string>, is_active: boolean, created_at: Date | string, updated_at: Date | string, categories: Array<string>, collection?: { id: number, slug: string, name: string, description?: string | null, image_url?: string | null, starts_at?: Date | string | null, ends_at?: Date | string | null, created_at: Date | string, updated_at: Date | string, products_count: number } | null, reviews: Array<{ id: number, user_id: number, rating: number, review?: string | null, image_urls: Array<string>, created_at: Date | string, user?: { id: number, name?: string | null, image?: string | null } | null, likes: Array<{ id: number, user_id: number }> }> } | null };

export type BestSellersQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
}>;


export type BestSellersQuery = { bestSellers: { total: number, page: number, total_pages: number, products: Array<{ id: number, slug: string, name: string, price: number, image_urls: Array<string>, reviews_count: number, avg_rating: number, material: string, in_wishlist: boolean, is_active: boolean, available_quantity: number, total_quantity: number, color_code: string, color_name: string, collection?: { id: number, slug: string, name: string, description?: string | null, image_url?: string | null, starts_at?: Date | string | null, ends_at?: Date | string | null, created_at: Date | string, updated_at: Date | string, products_count: number } | null }> } };

export type RecommendedProductsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  productId?: InputMaybe<Scalars['Int']['input']>;
}>;


export type RecommendedProductsQuery = { recommendedProducts: { total: number, page: number, total_pages: number, products: Array<{ id: number, slug: string, name: string, price: number, image_urls: Array<string>, reviews_count: number, avg_rating: number, material: string, in_wishlist: boolean, is_active: boolean, available_quantity: number, total_quantity: number, color_code: string, color_name: string, collection?: { id: number, slug: string, name: string, description?: string | null, image_url?: string | null, starts_at?: Date | string | null, ends_at?: Date | string | null, created_at: Date | string, updated_at: Date | string, products_count: number } | null }> } };

export type CategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoriesQuery = { categories: Array<string> };

export type CategoriesWithImagesQueryVariables = Exact<{ [key: string]: never; }>;


export type CategoriesWithImagesQuery = { categoriesWithImages: Array<{ name: string, image_url?: string | null }> };

export type MaterialsQueryVariables = Exact<{ [key: string]: never; }>;


export type MaterialsQuery = { materials: Array<string> };

export type CollectionsQueryVariables = Exact<{ [key: string]: never; }>;


export type CollectionsQuery = { collections: Array<{ id: number, slug: string, name: string, description?: string | null, image_url?: string | null, starts_at?: Date | string | null, ends_at?: Date | string | null, created_at: Date | string, updated_at: Date | string, products_count: number }> };

export type CreateProductReviewMutationVariables = Exact<{
  input: CreateProductReviewInput;
}>;


export type CreateProductReviewMutation = { createProductReview: { success: boolean, error?: string | null, review?: { id: number, user_id: number, rating: number, review?: string | null, image_urls: Array<string>, product_id?: number | null, created_at: Date | string, updated_at: Date | string, likes_count: number, is_liked_by_current_user: boolean, user: { id: number, name?: string | null, image?: string | null }, likes: Array<{ id: number, user_id: number }> } | null } };

export type CreateEventReviewMutationVariables = Exact<{
  input: CreateEventReviewInput;
}>;


export type CreateEventReviewMutation = { createEventReview: { success: boolean, error?: string | null, review?: { id: number, user_id: number, rating: number, review?: string | null, image_urls: Array<string>, event_id?: string | null, created_at: Date | string, updated_at: Date | string, likes_count: number, is_liked_by_current_user: boolean, user: { id: number, name?: string | null, image?: string | null }, likes: Array<{ id: number, user_id: number }> } | null } };

export type DeleteReviewMutationVariables = Exact<{
  reviewId: Scalars['Int']['input'];
}>;


export type DeleteReviewMutation = { deleteReview: { success: boolean, error?: string | null } };

export type ToggleReviewLikeMutationVariables = Exact<{
  reviewId: Scalars['Int']['input'];
}>;


export type ToggleReviewLikeMutation = { toggleReviewLike: { success: boolean, action?: ToggleLikeAction | null, likes_count?: number | null, error?: string | null } };

export type ProductReviewsQueryVariables = Exact<{
  productId: Scalars['Int']['input'];
  filter?: InputMaybe<ReviewsFilterInput>;
}>;


export type ProductReviewsQuery = { productReviews: { total: number, page: number, total_pages: number, data: Array<{ id: number, user_id: number, rating: number, review?: string | null, image_urls: Array<string>, product_id?: number | null, event_id?: string | null, created_at: Date | string, updated_at: Date | string, likes_count: number, is_liked_by_current_user: boolean, user: { id: number, name?: string | null, image?: string | null }, likes: Array<{ id: number, user_id: number }> }> } };

export type FeaturedReviewsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type FeaturedReviewsQuery = { featuredReviews: Array<{ id: number, rating: number, review?: string | null, user: { id: number, name?: string | null, image?: string | null } }> };

export type EventReviewsQueryVariables = Exact<{
  eventId: Scalars['String']['input'];
  filter?: InputMaybe<ReviewsFilterInput>;
}>;


export type EventReviewsQuery = { eventReviews: { total: number, page: number, total_pages: number, data: Array<{ id: number, user_id: number, rating: number, review?: string | null, image_urls: Array<string>, product_id?: number | null, event_id?: string | null, created_at: Date | string, updated_at: Date | string, likes_count: number, is_liked_by_current_user: boolean, user: { id: number, name?: string | null, image?: string | null }, likes: Array<{ id: number, user_id: number }> }> } };

export type GlobalSearchQueryVariables = Exact<{
  input: GlobalSearchInput;
}>;


export type GlobalSearchQuery = { globalSearch: { products: Array<{ id: number, slug: string, name: string, image_urls: Array<string>, price: number, reviews_count: number, avg_rating: number, material: string, total_quantity: number, available_quantity: number, color_code: string, color_name: string, in_wishlist: boolean, is_active: boolean }>, events: Array<{ id: string, slug: string, title: string, description: string, starts_at: Date | string, ends_at: Date | string, location: string, full_location: string, total_seats: number, available_seats: number, instructor: string, includes: Array<string>, price: number, image: string, highlights: Array<string>, gallery: Array<string>, status: EventStatus, level: EventLevel, created_at: Date | string, updated_at: Date | string, registrations_count: number, reviews_count: number, avg_rating?: number | null }>, orders: Array<{ id: string, user_id: number, shipping_fee: number, subtotal: number, discount: number, total: number, status: OrderStatus, request_at?: Date | string | null, approved_at?: Date | string | null, paid_at?: Date | string | null, shipped_at?: Date | string | null, delivered_at?: Date | string | null, cancelled_at?: Date | string | null, returned_at?: Date | string | null, refunded_at?: Date | string | null, shipping_address: any, created_at: Date | string, updated_at: Date | string, user: { id: number, email: string, name?: string | null }, ordered_products: Array<{ id: number, order_id: string, product_id: number, quantity: number, discount: number, price: number, created_at: Date | string, updated_at: Date | string, has_reviewed: boolean, product: { id: number, slug: string, name: string, image_urls: Array<string>, price: number, reviews_count: number, avg_rating: number, material: string, total_quantity: number, available_quantity: number, color_code: string, color_name: string, in_wishlist: boolean, is_active: boolean } }> }>, counts: { products: number, events: number, orders: number } } };

export type UserCountsQueryVariables = Exact<{ [key: string]: never; }>;


export type UserCountsQuery = { userCounts: { cartCount: number, wishlistCount: number, eventRegistrationsCount: number, pendingOrdersCount: number } };

export type AddToWishlistMutationVariables = Exact<{
  productId: Scalars['Int']['input'];
}>;


export type AddToWishlistMutation = { addToWishlist: { success: boolean, item?: { id: number, user_id: number, product_id: number, created_at: Date | string, updated_at: Date | string, product: { id: number, slug: string, name: string, price: number, image_urls: Array<string>, reviews_count: number, avg_rating: number, material: string, in_wishlist: boolean, is_active: boolean, available_quantity: number, total_quantity: number, color_code: string, color_name: string, collection?: { id: number, slug: string, name: string, description?: string | null, image_url?: string | null, starts_at?: Date | string | null, ends_at?: Date | string | null, created_at: Date | string, updated_at: Date | string, products_count: number } | null } } | null } };

export type RemoveFromWishlistMutationVariables = Exact<{
  productId: Scalars['Int']['input'];
}>;


export type RemoveFromWishlistMutation = { removeFromWishlist: boolean };

export type ToggleWishlistMutationVariables = Exact<{
  productId: Scalars['Int']['input'];
}>;


export type ToggleWishlistMutation = { toggleWishlist: { success: boolean, action: ToggleAction, item?: { id: number, user_id: number, product_id: number, created_at: Date | string, updated_at: Date | string, product: { id: number, slug: string, name: string, price: number, image_urls: Array<string>, reviews_count: number, avg_rating: number, material: string, in_wishlist: boolean, is_active: boolean, available_quantity: number, total_quantity: number, color_code: string, color_name: string, collection?: { id: number, slug: string, name: string, description?: string | null, image_url?: string | null, starts_at?: Date | string | null, ends_at?: Date | string | null, created_at: Date | string, updated_at: Date | string, products_count: number } | null } } | null } };

export type MoveToCartMutationVariables = Exact<{
  productId: Scalars['Int']['input'];
}>;


export type MoveToCartMutation = { moveToCart: boolean };

export type WishlistQueryVariables = Exact<{
  filter?: InputMaybe<WishlistFilterInput>;
}>;


export type WishlistQuery = { wishlist: { total: number, page: number, total_pages: number, data: Array<{ id: number, user_id: number, product_id: number, created_at: Date | string, updated_at: Date | string, product: { id: number, slug: string, name: string, price: number, image_urls: Array<string>, reviews_count: number, avg_rating: number, material: string, in_wishlist: boolean, is_active: boolean, available_quantity: number, total_quantity: number, color_code: string, color_name: string, collection?: { id: number, slug: string, name: string, description?: string | null, image_url?: string | null, starts_at?: Date | string | null, ends_at?: Date | string | null, created_at: Date | string, updated_at: Date | string, products_count: number } | null } }> } };

export type WishlistIdsQueryVariables = Exact<{ [key: string]: never; }>;


export type WishlistIdsQuery = { wishlistIds: Array<number> };

export const MutationRegistrationEventFieldsFragmentDoc = gql`
    fragment MutationRegistrationEventFields on RegistrationEvent {
  id
  slug
  title
  description
  starts_at
  ends_at
  location
  full_location
  total_seats
  available_seats
  instructor
  includes
  price
  image
  highlights
  gallery
  status
  level
  created_at
  updated_at
}
    `;
export const MutationEventRegistrationFieldsFragmentDoc = gql`
    fragment MutationEventRegistrationFields on EventRegistration {
  id
  event_id
  user_id
  seats_reserved
  price
  discount
  status
  request_at
  approved_at
  paid_at
  confirmed_at
  cancelled_at
  created_at
  updated_at
  has_reviewed
  event {
    ...MutationRegistrationEventFields
  }
  user {
    id
    email
    name
    image
  }
}
    ${MutationRegistrationEventFieldsFragmentDoc}`;
export const EventBaseFieldsFragmentDoc = gql`
    fragment EventBaseFields on EventBase {
  id
  slug
  title
  description
  starts_at
  ends_at
  location
  full_location
  total_seats
  available_seats
  instructor
  includes
  price
  image
  highlights
  gallery
  status
  level
  created_at
  updated_at
  registrations_count
  reviews_count
  avg_rating
}
    `;
export const EventDetailFieldsFragmentDoc = gql`
    fragment EventDetailFields on EventDetail {
  id
  slug
  title
  description
  starts_at
  ends_at
  location
  full_location
  total_seats
  available_seats
  instructor
  includes
  price
  image
  highlights
  gallery
  status
  level
  created_at
  updated_at
  registrations_count
  reviews_count
  avg_rating
  is_registered
  reviews {
    id
    user_id
    rating
    review
    image_urls
    event_id
    created_at
    updated_at
    user {
      id
      email
      name
      image
    }
    likes {
      id
      review_id
      user_id
    }
  }
}
    `;
export const RegistrationEventFieldsFragmentDoc = gql`
    fragment RegistrationEventFields on RegistrationEvent {
  id
  slug
  title
  description
  starts_at
  ends_at
  location
  full_location
  total_seats
  available_seats
  instructor
  includes
  price
  image
  highlights
  gallery
  status
  level
  created_at
  updated_at
}
    `;
export const EventRegistrationFieldsFragmentDoc = gql`
    fragment EventRegistrationFields on EventRegistration {
  id
  event_id
  user_id
  seats_reserved
  price
  discount
  status
  request_at
  approved_at
  paid_at
  confirmed_at
  cancelled_at
  created_at
  updated_at
  has_reviewed
  event {
    ...RegistrationEventFields
  }
  user {
    id
    email
    name
    image
  }
}
    ${RegistrationEventFieldsFragmentDoc}`;
export const CollectionFieldsFragmentDoc = gql`
    fragment CollectionFields on CollectionBase {
  id
  slug
  name
  description
  image_url
  starts_at
  ends_at
  created_at
  updated_at
  products_count
}
    `;
export const CreateAddressDocument = gql`
    mutation CreateAddress($input: CreateAddressInput!) {
  createAddress(input: $input) {
    success
    error
    address {
      id
      user_id
      name
      address_line_1
      address_line_2
      landmark
      city
      state
      zip
      contact_number
    }
  }
}
    `;

/**
 * __useCreateAddressMutation__
 *
 * To run a mutation, you first call `useCreateAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAddressMutation, { data, loading, error }] = useCreateAddressMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateAddressMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateAddressMutation, CreateAddressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateAddressMutation, CreateAddressMutationVariables>(CreateAddressDocument, options);
      }
export type CreateAddressMutationHookResult = ReturnType<typeof useCreateAddressMutation>;
export const UpdateAddressDocument = gql`
    mutation UpdateAddress($id: Int!, $input: UpdateAddressInput!) {
  updateAddress(id: $id, input: $input) {
    success
    error
    address {
      id
      user_id
      name
      address_line_1
      address_line_2
      landmark
      city
      state
      zip
      contact_number
    }
  }
}
    `;

/**
 * __useUpdateAddressMutation__
 *
 * To run a mutation, you first call `useUpdateAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAddressMutation, { data, loading, error }] = useUpdateAddressMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateAddressMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateAddressMutation, UpdateAddressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateAddressMutation, UpdateAddressMutationVariables>(UpdateAddressDocument, options);
      }
export type UpdateAddressMutationHookResult = ReturnType<typeof useUpdateAddressMutation>;
export const DeleteAddressDocument = gql`
    mutation DeleteAddress($id: Int!) {
  deleteAddress(id: $id) {
    success
    error
  }
}
    `;

/**
 * __useDeleteAddressMutation__
 *
 * To run a mutation, you first call `useDeleteAddressMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteAddressMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteAddressMutation, { data, loading, error }] = useDeleteAddressMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteAddressMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteAddressMutation, DeleteAddressMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteAddressMutation, DeleteAddressMutationVariables>(DeleteAddressDocument, options);
      }
export type DeleteAddressMutationHookResult = ReturnType<typeof useDeleteAddressMutation>;
export const UserAddressesDocument = gql`
    query UserAddresses {
  userAddresses {
    addresses {
      id
      user_id
      name
      address_line_1
      address_line_2
      landmark
      city
      state
      zip
      contact_number
    }
    total
  }
}
    `;

/**
 * __useUserAddressesQuery__
 *
 * To run a query within a React component, call `useUserAddressesQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserAddressesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserAddressesQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserAddressesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UserAddressesQuery, UserAddressesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<UserAddressesQuery, UserAddressesQueryVariables>(UserAddressesDocument, options);
      }
export function useUserAddressesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserAddressesQuery, UserAddressesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<UserAddressesQuery, UserAddressesQueryVariables>(UserAddressesDocument, options);
        }
// @ts-ignore
export function useUserAddressesSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<UserAddressesQuery, UserAddressesQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<UserAddressesQuery, UserAddressesQueryVariables>;
export function useUserAddressesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<UserAddressesQuery, UserAddressesQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<UserAddressesQuery | undefined, UserAddressesQueryVariables>;
export function useUserAddressesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<UserAddressesQuery, UserAddressesQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<UserAddressesQuery, UserAddressesQueryVariables>(UserAddressesDocument, options);
        }
export type UserAddressesQueryHookResult = ReturnType<typeof useUserAddressesQuery>;
export type UserAddressesLazyQueryHookResult = ReturnType<typeof useUserAddressesLazyQuery>;
export type UserAddressesSuspenseQueryHookResult = ReturnType<typeof useUserAddressesSuspenseQuery>;
export const AddressByIdDocument = gql`
    query AddressById($id: Int!) {
  addressById(id: $id) {
    id
    user_id
    name
    address_line_1
    address_line_2
    landmark
    city
    state
    zip
    contact_number
  }
}
    `;

/**
 * __useAddressByIdQuery__
 *
 * To run a query within a React component, call `useAddressByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useAddressByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAddressByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAddressByIdQuery(baseOptions: ApolloReactHooks.QueryHookOptions<AddressByIdQuery, AddressByIdQueryVariables> & ({ variables: AddressByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<AddressByIdQuery, AddressByIdQueryVariables>(AddressByIdDocument, options);
      }
export function useAddressByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AddressByIdQuery, AddressByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<AddressByIdQuery, AddressByIdQueryVariables>(AddressByIdDocument, options);
        }
// @ts-ignore
export function useAddressByIdSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<AddressByIdQuery, AddressByIdQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AddressByIdQuery, AddressByIdQueryVariables>;
export function useAddressByIdSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AddressByIdQuery, AddressByIdQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AddressByIdQuery | undefined, AddressByIdQueryVariables>;
export function useAddressByIdSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AddressByIdQuery, AddressByIdQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<AddressByIdQuery, AddressByIdQueryVariables>(AddressByIdDocument, options);
        }
export type AddressByIdQueryHookResult = ReturnType<typeof useAddressByIdQuery>;
export type AddressByIdLazyQueryHookResult = ReturnType<typeof useAddressByIdLazyQuery>;
export type AddressByIdSuspenseQueryHookResult = ReturnType<typeof useAddressByIdSuspenseQuery>;
export const AdminDashboardStatsDocument = gql`
    query AdminDashboardStats {
  adminDashboardStats {
    orders {
      total
      pending
      processing
    }
    registrations {
      total
      pending
    }
    products {
      total
      outOfStock
      lowStock
    }
    events {
      total
      upcoming
      upcomingIn7Days
    }
    users {
      total
      newThisMonth
    }
    revenue {
      totalOrders
      totalRegistrations
    }
    newsletter {
      totalSubscribers
      newThisMonth
    }
  }
}
    `;

/**
 * __useAdminDashboardStatsQuery__
 *
 * To run a query within a React component, call `useAdminDashboardStatsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminDashboardStatsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminDashboardStatsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAdminDashboardStatsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AdminDashboardStatsQuery, AdminDashboardStatsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<AdminDashboardStatsQuery, AdminDashboardStatsQueryVariables>(AdminDashboardStatsDocument, options);
      }
export function useAdminDashboardStatsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AdminDashboardStatsQuery, AdminDashboardStatsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<AdminDashboardStatsQuery, AdminDashboardStatsQueryVariables>(AdminDashboardStatsDocument, options);
        }
// @ts-ignore
export function useAdminDashboardStatsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<AdminDashboardStatsQuery, AdminDashboardStatsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminDashboardStatsQuery, AdminDashboardStatsQueryVariables>;
export function useAdminDashboardStatsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminDashboardStatsQuery, AdminDashboardStatsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminDashboardStatsQuery | undefined, AdminDashboardStatsQueryVariables>;
export function useAdminDashboardStatsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminDashboardStatsQuery, AdminDashboardStatsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<AdminDashboardStatsQuery, AdminDashboardStatsQueryVariables>(AdminDashboardStatsDocument, options);
        }
export type AdminDashboardStatsQueryHookResult = ReturnType<typeof useAdminDashboardStatsQuery>;
export type AdminDashboardStatsLazyQueryHookResult = ReturnType<typeof useAdminDashboardStatsLazyQuery>;
export type AdminDashboardStatsSuspenseQueryHookResult = ReturnType<typeof useAdminDashboardStatsSuspenseQuery>;
export const AdminRecentOrdersDocument = gql`
    query AdminRecentOrders($limit: Int) {
  adminRecentOrders(limit: $limit) {
    id
    status
    total
    created_at
    user {
      name
      email
    }
  }
}
    `;

/**
 * __useAdminRecentOrdersQuery__
 *
 * To run a query within a React component, call `useAdminRecentOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminRecentOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminRecentOrdersQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useAdminRecentOrdersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AdminRecentOrdersQuery, AdminRecentOrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<AdminRecentOrdersQuery, AdminRecentOrdersQueryVariables>(AdminRecentOrdersDocument, options);
      }
export function useAdminRecentOrdersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AdminRecentOrdersQuery, AdminRecentOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<AdminRecentOrdersQuery, AdminRecentOrdersQueryVariables>(AdminRecentOrdersDocument, options);
        }
// @ts-ignore
export function useAdminRecentOrdersSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<AdminRecentOrdersQuery, AdminRecentOrdersQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminRecentOrdersQuery, AdminRecentOrdersQueryVariables>;
export function useAdminRecentOrdersSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminRecentOrdersQuery, AdminRecentOrdersQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminRecentOrdersQuery | undefined, AdminRecentOrdersQueryVariables>;
export function useAdminRecentOrdersSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminRecentOrdersQuery, AdminRecentOrdersQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<AdminRecentOrdersQuery, AdminRecentOrdersQueryVariables>(AdminRecentOrdersDocument, options);
        }
export type AdminRecentOrdersQueryHookResult = ReturnType<typeof useAdminRecentOrdersQuery>;
export type AdminRecentOrdersLazyQueryHookResult = ReturnType<typeof useAdminRecentOrdersLazyQuery>;
export type AdminRecentOrdersSuspenseQueryHookResult = ReturnType<typeof useAdminRecentOrdersSuspenseQuery>;
export const AdminRecentRegistrationsDocument = gql`
    query AdminRecentRegistrations($limit: Int) {
  adminRecentRegistrations(limit: $limit) {
    id
    status
    seats_reserved
    price
    created_at
    user {
      name
      email
    }
    event {
      title
    }
  }
}
    `;

/**
 * __useAdminRecentRegistrationsQuery__
 *
 * To run a query within a React component, call `useAdminRecentRegistrationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminRecentRegistrationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminRecentRegistrationsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useAdminRecentRegistrationsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AdminRecentRegistrationsQuery, AdminRecentRegistrationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<AdminRecentRegistrationsQuery, AdminRecentRegistrationsQueryVariables>(AdminRecentRegistrationsDocument, options);
      }
export function useAdminRecentRegistrationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AdminRecentRegistrationsQuery, AdminRecentRegistrationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<AdminRecentRegistrationsQuery, AdminRecentRegistrationsQueryVariables>(AdminRecentRegistrationsDocument, options);
        }
// @ts-ignore
export function useAdminRecentRegistrationsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<AdminRecentRegistrationsQuery, AdminRecentRegistrationsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminRecentRegistrationsQuery, AdminRecentRegistrationsQueryVariables>;
export function useAdminRecentRegistrationsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminRecentRegistrationsQuery, AdminRecentRegistrationsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminRecentRegistrationsQuery | undefined, AdminRecentRegistrationsQueryVariables>;
export function useAdminRecentRegistrationsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminRecentRegistrationsQuery, AdminRecentRegistrationsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<AdminRecentRegistrationsQuery, AdminRecentRegistrationsQueryVariables>(AdminRecentRegistrationsDocument, options);
        }
export type AdminRecentRegistrationsQueryHookResult = ReturnType<typeof useAdminRecentRegistrationsQuery>;
export type AdminRecentRegistrationsLazyQueryHookResult = ReturnType<typeof useAdminRecentRegistrationsLazyQuery>;
export type AdminRecentRegistrationsSuspenseQueryHookResult = ReturnType<typeof useAdminRecentRegistrationsSuspenseQuery>;
export const AdminLowStockProductsDocument = gql`
    query AdminLowStockProducts($limit: Int) {
  adminLowStockProducts(limit: $limit) {
    id
    name
    slug
    available_quantity
    total_quantity
    price
  }
}
    `;

/**
 * __useAdminLowStockProductsQuery__
 *
 * To run a query within a React component, call `useAdminLowStockProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminLowStockProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminLowStockProductsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useAdminLowStockProductsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AdminLowStockProductsQuery, AdminLowStockProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<AdminLowStockProductsQuery, AdminLowStockProductsQueryVariables>(AdminLowStockProductsDocument, options);
      }
export function useAdminLowStockProductsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AdminLowStockProductsQuery, AdminLowStockProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<AdminLowStockProductsQuery, AdminLowStockProductsQueryVariables>(AdminLowStockProductsDocument, options);
        }
// @ts-ignore
export function useAdminLowStockProductsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<AdminLowStockProductsQuery, AdminLowStockProductsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminLowStockProductsQuery, AdminLowStockProductsQueryVariables>;
export function useAdminLowStockProductsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminLowStockProductsQuery, AdminLowStockProductsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminLowStockProductsQuery | undefined, AdminLowStockProductsQueryVariables>;
export function useAdminLowStockProductsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminLowStockProductsQuery, AdminLowStockProductsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<AdminLowStockProductsQuery, AdminLowStockProductsQueryVariables>(AdminLowStockProductsDocument, options);
        }
export type AdminLowStockProductsQueryHookResult = ReturnType<typeof useAdminLowStockProductsQuery>;
export type AdminLowStockProductsLazyQueryHookResult = ReturnType<typeof useAdminLowStockProductsLazyQuery>;
export type AdminLowStockProductsSuspenseQueryHookResult = ReturnType<typeof useAdminLowStockProductsSuspenseQuery>;
export const AdminUpcomingEventsDocument = gql`
    query AdminUpcomingEvents($limit: Int) {
  adminUpcomingEvents(limit: $limit) {
    id
    title
    slug
    starts_at
    available_seats
    total_seats
    _count {
      event_registrations
    }
  }
}
    `;

/**
 * __useAdminUpcomingEventsQuery__
 *
 * To run a query within a React component, call `useAdminUpcomingEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminUpcomingEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminUpcomingEventsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useAdminUpcomingEventsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AdminUpcomingEventsQuery, AdminUpcomingEventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<AdminUpcomingEventsQuery, AdminUpcomingEventsQueryVariables>(AdminUpcomingEventsDocument, options);
      }
export function useAdminUpcomingEventsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AdminUpcomingEventsQuery, AdminUpcomingEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<AdminUpcomingEventsQuery, AdminUpcomingEventsQueryVariables>(AdminUpcomingEventsDocument, options);
        }
// @ts-ignore
export function useAdminUpcomingEventsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<AdminUpcomingEventsQuery, AdminUpcomingEventsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminUpcomingEventsQuery, AdminUpcomingEventsQueryVariables>;
export function useAdminUpcomingEventsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminUpcomingEventsQuery, AdminUpcomingEventsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminUpcomingEventsQuery | undefined, AdminUpcomingEventsQueryVariables>;
export function useAdminUpcomingEventsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminUpcomingEventsQuery, AdminUpcomingEventsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<AdminUpcomingEventsQuery, AdminUpcomingEventsQueryVariables>(AdminUpcomingEventsDocument, options);
        }
export type AdminUpcomingEventsQueryHookResult = ReturnType<typeof useAdminUpcomingEventsQuery>;
export type AdminUpcomingEventsLazyQueryHookResult = ReturnType<typeof useAdminUpcomingEventsLazyQuery>;
export type AdminUpcomingEventsSuspenseQueryHookResult = ReturnType<typeof useAdminUpcomingEventsSuspenseQuery>;
export const AdminNewsletterSubscribersDocument = gql`
    query AdminNewsletterSubscribers($limit: Int) {
  adminNewsletterSubscribers(limit: $limit) {
    id
    email
    name
    image
    newsletter_subscribed_at
  }
}
    `;

/**
 * __useAdminNewsletterSubscribersQuery__
 *
 * To run a query within a React component, call `useAdminNewsletterSubscribersQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminNewsletterSubscribersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminNewsletterSubscribersQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useAdminNewsletterSubscribersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AdminNewsletterSubscribersQuery, AdminNewsletterSubscribersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<AdminNewsletterSubscribersQuery, AdminNewsletterSubscribersQueryVariables>(AdminNewsletterSubscribersDocument, options);
      }
export function useAdminNewsletterSubscribersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AdminNewsletterSubscribersQuery, AdminNewsletterSubscribersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<AdminNewsletterSubscribersQuery, AdminNewsletterSubscribersQueryVariables>(AdminNewsletterSubscribersDocument, options);
        }
// @ts-ignore
export function useAdminNewsletterSubscribersSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<AdminNewsletterSubscribersQuery, AdminNewsletterSubscribersQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminNewsletterSubscribersQuery, AdminNewsletterSubscribersQueryVariables>;
export function useAdminNewsletterSubscribersSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminNewsletterSubscribersQuery, AdminNewsletterSubscribersQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminNewsletterSubscribersQuery | undefined, AdminNewsletterSubscribersQueryVariables>;
export function useAdminNewsletterSubscribersSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminNewsletterSubscribersQuery, AdminNewsletterSubscribersQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<AdminNewsletterSubscribersQuery, AdminNewsletterSubscribersQueryVariables>(AdminNewsletterSubscribersDocument, options);
        }
export type AdminNewsletterSubscribersQueryHookResult = ReturnType<typeof useAdminNewsletterSubscribersQuery>;
export type AdminNewsletterSubscribersLazyQueryHookResult = ReturnType<typeof useAdminNewsletterSubscribersLazyQuery>;
export type AdminNewsletterSubscribersSuspenseQueryHookResult = ReturnType<typeof useAdminNewsletterSubscribersSuspenseQuery>;
export const AdminUpdateCategoryIconDocument = gql`
    mutation AdminUpdateCategoryIcon($category: String!, $icon: String!) {
  adminUpdateCategoryIcon(category: $category, icon: $icon) {
    success
    error
  }
}
    `;

/**
 * __useAdminUpdateCategoryIconMutation__
 *
 * To run a mutation, you first call `useAdminUpdateCategoryIconMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminUpdateCategoryIconMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminUpdateCategoryIconMutation, { data, loading, error }] = useAdminUpdateCategoryIconMutation({
 *   variables: {
 *      category: // value for 'category'
 *      icon: // value for 'icon'
 *   },
 * });
 */
export function useAdminUpdateCategoryIconMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AdminUpdateCategoryIconMutation, AdminUpdateCategoryIconMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AdminUpdateCategoryIconMutation, AdminUpdateCategoryIconMutationVariables>(AdminUpdateCategoryIconDocument, options);
      }
export type AdminUpdateCategoryIconMutationHookResult = ReturnType<typeof useAdminUpdateCategoryIconMutation>;
export const AdminAddCategoryDocument = gql`
    mutation AdminAddCategory($name: String!, $icon: String!) {
  adminAddCategory(name: $name, icon: $icon) {
    success
    error
  }
}
    `;

/**
 * __useAdminAddCategoryMutation__
 *
 * To run a mutation, you first call `useAdminAddCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminAddCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminAddCategoryMutation, { data, loading, error }] = useAdminAddCategoryMutation({
 *   variables: {
 *      name: // value for 'name'
 *      icon: // value for 'icon'
 *   },
 * });
 */
export function useAdminAddCategoryMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AdminAddCategoryMutation, AdminAddCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AdminAddCategoryMutation, AdminAddCategoryMutationVariables>(AdminAddCategoryDocument, options);
      }
export type AdminAddCategoryMutationHookResult = ReturnType<typeof useAdminAddCategoryMutation>;
export const AdminRenameCategoryDocument = gql`
    mutation AdminRenameCategory($oldName: String!, $newName: String!) {
  adminRenameCategory(oldName: $oldName, newName: $newName) {
    success
    error
  }
}
    `;

/**
 * __useAdminRenameCategoryMutation__
 *
 * To run a mutation, you first call `useAdminRenameCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminRenameCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminRenameCategoryMutation, { data, loading, error }] = useAdminRenameCategoryMutation({
 *   variables: {
 *      oldName: // value for 'oldName'
 *      newName: // value for 'newName'
 *   },
 * });
 */
export function useAdminRenameCategoryMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AdminRenameCategoryMutation, AdminRenameCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AdminRenameCategoryMutation, AdminRenameCategoryMutationVariables>(AdminRenameCategoryDocument, options);
      }
export type AdminRenameCategoryMutationHookResult = ReturnType<typeof useAdminRenameCategoryMutation>;
export const AdminDeleteCategoryDocument = gql`
    mutation AdminDeleteCategory($name: String!) {
  adminDeleteCategory(name: $name) {
    success
    error
  }
}
    `;

/**
 * __useAdminDeleteCategoryMutation__
 *
 * To run a mutation, you first call `useAdminDeleteCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminDeleteCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminDeleteCategoryMutation, { data, loading, error }] = useAdminDeleteCategoryMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useAdminDeleteCategoryMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AdminDeleteCategoryMutation, AdminDeleteCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AdminDeleteCategoryMutation, AdminDeleteCategoryMutationVariables>(AdminDeleteCategoryDocument, options);
      }
export type AdminDeleteCategoryMutationHookResult = ReturnType<typeof useAdminDeleteCategoryMutation>;
export const AdminCategoriesDocument = gql`
    query AdminCategories {
  adminCategories {
    categories {
      name
      icon
      productCount
    }
    total
  }
}
    `;

/**
 * __useAdminCategoriesQuery__
 *
 * To run a query within a React component, call `useAdminCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useAdminCategoriesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AdminCategoriesQuery, AdminCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<AdminCategoriesQuery, AdminCategoriesQueryVariables>(AdminCategoriesDocument, options);
      }
export function useAdminCategoriesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AdminCategoriesQuery, AdminCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<AdminCategoriesQuery, AdminCategoriesQueryVariables>(AdminCategoriesDocument, options);
        }
// @ts-ignore
export function useAdminCategoriesSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<AdminCategoriesQuery, AdminCategoriesQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminCategoriesQuery, AdminCategoriesQueryVariables>;
export function useAdminCategoriesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminCategoriesQuery, AdminCategoriesQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminCategoriesQuery | undefined, AdminCategoriesQueryVariables>;
export function useAdminCategoriesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminCategoriesQuery, AdminCategoriesQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<AdminCategoriesQuery, AdminCategoriesQueryVariables>(AdminCategoriesDocument, options);
        }
export type AdminCategoriesQueryHookResult = ReturnType<typeof useAdminCategoriesQuery>;
export type AdminCategoriesLazyQueryHookResult = ReturnType<typeof useAdminCategoriesLazyQuery>;
export type AdminCategoriesSuspenseQueryHookResult = ReturnType<typeof useAdminCategoriesSuspenseQuery>;
export const AdminAllConfiguredCategoriesDocument = gql`
    query AdminAllConfiguredCategories {
  adminAllConfiguredCategories {
    name
    icon
  }
}
    `;

/**
 * __useAdminAllConfiguredCategoriesQuery__
 *
 * To run a query within a React component, call `useAdminAllConfiguredCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminAllConfiguredCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminAllConfiguredCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useAdminAllConfiguredCategoriesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AdminAllConfiguredCategoriesQuery, AdminAllConfiguredCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<AdminAllConfiguredCategoriesQuery, AdminAllConfiguredCategoriesQueryVariables>(AdminAllConfiguredCategoriesDocument, options);
      }
export function useAdminAllConfiguredCategoriesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AdminAllConfiguredCategoriesQuery, AdminAllConfiguredCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<AdminAllConfiguredCategoriesQuery, AdminAllConfiguredCategoriesQueryVariables>(AdminAllConfiguredCategoriesDocument, options);
        }
// @ts-ignore
export function useAdminAllConfiguredCategoriesSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<AdminAllConfiguredCategoriesQuery, AdminAllConfiguredCategoriesQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminAllConfiguredCategoriesQuery, AdminAllConfiguredCategoriesQueryVariables>;
export function useAdminAllConfiguredCategoriesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminAllConfiguredCategoriesQuery, AdminAllConfiguredCategoriesQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminAllConfiguredCategoriesQuery | undefined, AdminAllConfiguredCategoriesQueryVariables>;
export function useAdminAllConfiguredCategoriesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminAllConfiguredCategoriesQuery, AdminAllConfiguredCategoriesQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<AdminAllConfiguredCategoriesQuery, AdminAllConfiguredCategoriesQueryVariables>(AdminAllConfiguredCategoriesDocument, options);
        }
export type AdminAllConfiguredCategoriesQueryHookResult = ReturnType<typeof useAdminAllConfiguredCategoriesQuery>;
export type AdminAllConfiguredCategoriesLazyQueryHookResult = ReturnType<typeof useAdminAllConfiguredCategoriesLazyQuery>;
export type AdminAllConfiguredCategoriesSuspenseQueryHookResult = ReturnType<typeof useAdminAllConfiguredCategoriesSuspenseQuery>;
export const AdminAvailableIconsDocument = gql`
    query AdminAvailableIcons {
  adminAvailableIcons {
    value
    label
  }
}
    `;

/**
 * __useAdminAvailableIconsQuery__
 *
 * To run a query within a React component, call `useAdminAvailableIconsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminAvailableIconsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminAvailableIconsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAdminAvailableIconsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AdminAvailableIconsQuery, AdminAvailableIconsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<AdminAvailableIconsQuery, AdminAvailableIconsQueryVariables>(AdminAvailableIconsDocument, options);
      }
export function useAdminAvailableIconsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AdminAvailableIconsQuery, AdminAvailableIconsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<AdminAvailableIconsQuery, AdminAvailableIconsQueryVariables>(AdminAvailableIconsDocument, options);
        }
// @ts-ignore
export function useAdminAvailableIconsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<AdminAvailableIconsQuery, AdminAvailableIconsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminAvailableIconsQuery, AdminAvailableIconsQueryVariables>;
export function useAdminAvailableIconsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminAvailableIconsQuery, AdminAvailableIconsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminAvailableIconsQuery | undefined, AdminAvailableIconsQueryVariables>;
export function useAdminAvailableIconsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminAvailableIconsQuery, AdminAvailableIconsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<AdminAvailableIconsQuery, AdminAvailableIconsQueryVariables>(AdminAvailableIconsDocument, options);
        }
export type AdminAvailableIconsQueryHookResult = ReturnType<typeof useAdminAvailableIconsQuery>;
export type AdminAvailableIconsLazyQueryHookResult = ReturnType<typeof useAdminAvailableIconsLazyQuery>;
export type AdminAvailableIconsSuspenseQueryHookResult = ReturnType<typeof useAdminAvailableIconsSuspenseQuery>;
export const AdminCreateCollectionDocument = gql`
    mutation AdminCreateCollection($input: CreateCollectionInput!) {
  adminCreateCollection(input: $input) {
    success
    collectionId
    error
  }
}
    `;

/**
 * __useAdminCreateCollectionMutation__
 *
 * To run a mutation, you first call `useAdminCreateCollectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminCreateCollectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminCreateCollectionMutation, { data, loading, error }] = useAdminCreateCollectionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAdminCreateCollectionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AdminCreateCollectionMutation, AdminCreateCollectionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AdminCreateCollectionMutation, AdminCreateCollectionMutationVariables>(AdminCreateCollectionDocument, options);
      }
export type AdminCreateCollectionMutationHookResult = ReturnType<typeof useAdminCreateCollectionMutation>;
export const AdminUpdateCollectionDocument = gql`
    mutation AdminUpdateCollection($id: Int!, $input: UpdateCollectionInput!) {
  adminUpdateCollection(id: $id, input: $input) {
    success
    collectionId
    error
  }
}
    `;

/**
 * __useAdminUpdateCollectionMutation__
 *
 * To run a mutation, you first call `useAdminUpdateCollectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminUpdateCollectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminUpdateCollectionMutation, { data, loading, error }] = useAdminUpdateCollectionMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAdminUpdateCollectionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AdminUpdateCollectionMutation, AdminUpdateCollectionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AdminUpdateCollectionMutation, AdminUpdateCollectionMutationVariables>(AdminUpdateCollectionDocument, options);
      }
export type AdminUpdateCollectionMutationHookResult = ReturnType<typeof useAdminUpdateCollectionMutation>;
export const AdminDeleteCollectionDocument = gql`
    mutation AdminDeleteCollection($id: Int!) {
  adminDeleteCollection(id: $id) {
    success
    collectionId
    error
  }
}
    `;

/**
 * __useAdminDeleteCollectionMutation__
 *
 * To run a mutation, you first call `useAdminDeleteCollectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminDeleteCollectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminDeleteCollectionMutation, { data, loading, error }] = useAdminDeleteCollectionMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAdminDeleteCollectionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AdminDeleteCollectionMutation, AdminDeleteCollectionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AdminDeleteCollectionMutation, AdminDeleteCollectionMutationVariables>(AdminDeleteCollectionDocument, options);
      }
export type AdminDeleteCollectionMutationHookResult = ReturnType<typeof useAdminDeleteCollectionMutation>;
export const AdminAssignProductsToCollectionDocument = gql`
    mutation AdminAssignProductsToCollection($input: AssignProductsToCollectionInput!) {
  adminAssignProductsToCollection(input: $input) {
    success
    collectionId
    error
  }
}
    `;

/**
 * __useAdminAssignProductsToCollectionMutation__
 *
 * To run a mutation, you first call `useAdminAssignProductsToCollectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminAssignProductsToCollectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminAssignProductsToCollectionMutation, { data, loading, error }] = useAdminAssignProductsToCollectionMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAdminAssignProductsToCollectionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AdminAssignProductsToCollectionMutation, AdminAssignProductsToCollectionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AdminAssignProductsToCollectionMutation, AdminAssignProductsToCollectionMutationVariables>(AdminAssignProductsToCollectionDocument, options);
      }
export type AdminAssignProductsToCollectionMutationHookResult = ReturnType<typeof useAdminAssignProductsToCollectionMutation>;
export const AdminRemoveProductFromCollectionDocument = gql`
    mutation AdminRemoveProductFromCollection($productId: Int!) {
  adminRemoveProductFromCollection(productId: $productId) {
    success
    error
  }
}
    `;

/**
 * __useAdminRemoveProductFromCollectionMutation__
 *
 * To run a mutation, you first call `useAdminRemoveProductFromCollectionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminRemoveProductFromCollectionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminRemoveProductFromCollectionMutation, { data, loading, error }] = useAdminRemoveProductFromCollectionMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useAdminRemoveProductFromCollectionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AdminRemoveProductFromCollectionMutation, AdminRemoveProductFromCollectionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AdminRemoveProductFromCollectionMutation, AdminRemoveProductFromCollectionMutationVariables>(AdminRemoveProductFromCollectionDocument, options);
      }
export type AdminRemoveProductFromCollectionMutationHookResult = ReturnType<typeof useAdminRemoveProductFromCollectionMutation>;
export const AdminCollectionsDocument = gql`
    query AdminCollections($filter: AdminCollectionsFilterInput) {
  adminCollections(filter: $filter) {
    collections {
      id
      slug
      name
      description
      image_url
      starts_at
      ends_at
      created_at
      updated_at
      products_count
    }
    total
    page
    limit
    totalPages
  }
}
    `;

/**
 * __useAdminCollectionsQuery__
 *
 * To run a query within a React component, call `useAdminCollectionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminCollectionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminCollectionsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useAdminCollectionsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AdminCollectionsQuery, AdminCollectionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<AdminCollectionsQuery, AdminCollectionsQueryVariables>(AdminCollectionsDocument, options);
      }
export function useAdminCollectionsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AdminCollectionsQuery, AdminCollectionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<AdminCollectionsQuery, AdminCollectionsQueryVariables>(AdminCollectionsDocument, options);
        }
// @ts-ignore
export function useAdminCollectionsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<AdminCollectionsQuery, AdminCollectionsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminCollectionsQuery, AdminCollectionsQueryVariables>;
export function useAdminCollectionsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminCollectionsQuery, AdminCollectionsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminCollectionsQuery | undefined, AdminCollectionsQueryVariables>;
export function useAdminCollectionsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminCollectionsQuery, AdminCollectionsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<AdminCollectionsQuery, AdminCollectionsQueryVariables>(AdminCollectionsDocument, options);
        }
export type AdminCollectionsQueryHookResult = ReturnType<typeof useAdminCollectionsQuery>;
export type AdminCollectionsLazyQueryHookResult = ReturnType<typeof useAdminCollectionsLazyQuery>;
export type AdminCollectionsSuspenseQueryHookResult = ReturnType<typeof useAdminCollectionsSuspenseQuery>;
export const AdminCollectionByIdDocument = gql`
    query AdminCollectionById($id: Int!) {
  adminCollectionById(id: $id) {
    id
    slug
    name
    description
    image_url
    starts_at
    ends_at
    created_at
    updated_at
    products_count
    products {
      id
      name
      slug
      image_url
      price
      is_active
    }
  }
}
    `;

/**
 * __useAdminCollectionByIdQuery__
 *
 * To run a query within a React component, call `useAdminCollectionByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminCollectionByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminCollectionByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAdminCollectionByIdQuery(baseOptions: ApolloReactHooks.QueryHookOptions<AdminCollectionByIdQuery, AdminCollectionByIdQueryVariables> & ({ variables: AdminCollectionByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<AdminCollectionByIdQuery, AdminCollectionByIdQueryVariables>(AdminCollectionByIdDocument, options);
      }
export function useAdminCollectionByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AdminCollectionByIdQuery, AdminCollectionByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<AdminCollectionByIdQuery, AdminCollectionByIdQueryVariables>(AdminCollectionByIdDocument, options);
        }
// @ts-ignore
export function useAdminCollectionByIdSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<AdminCollectionByIdQuery, AdminCollectionByIdQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminCollectionByIdQuery, AdminCollectionByIdQueryVariables>;
export function useAdminCollectionByIdSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminCollectionByIdQuery, AdminCollectionByIdQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminCollectionByIdQuery | undefined, AdminCollectionByIdQueryVariables>;
export function useAdminCollectionByIdSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminCollectionByIdQuery, AdminCollectionByIdQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<AdminCollectionByIdQuery, AdminCollectionByIdQueryVariables>(AdminCollectionByIdDocument, options);
        }
export type AdminCollectionByIdQueryHookResult = ReturnType<typeof useAdminCollectionByIdQuery>;
export type AdminCollectionByIdLazyQueryHookResult = ReturnType<typeof useAdminCollectionByIdLazyQuery>;
export type AdminCollectionByIdSuspenseQueryHookResult = ReturnType<typeof useAdminCollectionByIdSuspenseQuery>;
export const AdminUpdateContentPageDocument = gql`
    mutation AdminUpdateContentPage($slug: String!, $input: UpdateContentPageInput!) {
  adminUpdateContentPage(slug: $slug, input: $input) {
    success
    error
  }
}
    `;

/**
 * __useAdminUpdateContentPageMutation__
 *
 * To run a mutation, you first call `useAdminUpdateContentPageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminUpdateContentPageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminUpdateContentPageMutation, { data, loading, error }] = useAdminUpdateContentPageMutation({
 *   variables: {
 *      slug: // value for 'slug'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAdminUpdateContentPageMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AdminUpdateContentPageMutation, AdminUpdateContentPageMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AdminUpdateContentPageMutation, AdminUpdateContentPageMutationVariables>(AdminUpdateContentPageDocument, options);
      }
export type AdminUpdateContentPageMutationHookResult = ReturnType<typeof useAdminUpdateContentPageMutation>;
export const AdminToggleContentPageActiveDocument = gql`
    mutation AdminToggleContentPageActive($slug: String!) {
  adminToggleContentPageActive(slug: $slug) {
    success
    error
  }
}
    `;

/**
 * __useAdminToggleContentPageActiveMutation__
 *
 * To run a mutation, you first call `useAdminToggleContentPageActiveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminToggleContentPageActiveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminToggleContentPageActiveMutation, { data, loading, error }] = useAdminToggleContentPageActiveMutation({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useAdminToggleContentPageActiveMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AdminToggleContentPageActiveMutation, AdminToggleContentPageActiveMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AdminToggleContentPageActiveMutation, AdminToggleContentPageActiveMutationVariables>(AdminToggleContentPageActiveDocument, options);
      }
export type AdminToggleContentPageActiveMutationHookResult = ReturnType<typeof useAdminToggleContentPageActiveMutation>;
export const AdminContentPagesDocument = gql`
    query AdminContentPages {
  adminContentPages {
    slug
    title
    is_active
    updated_at
  }
}
    `;

/**
 * __useAdminContentPagesQuery__
 *
 * To run a query within a React component, call `useAdminContentPagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminContentPagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminContentPagesQuery({
 *   variables: {
 *   },
 * });
 */
export function useAdminContentPagesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AdminContentPagesQuery, AdminContentPagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<AdminContentPagesQuery, AdminContentPagesQueryVariables>(AdminContentPagesDocument, options);
      }
export function useAdminContentPagesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AdminContentPagesQuery, AdminContentPagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<AdminContentPagesQuery, AdminContentPagesQueryVariables>(AdminContentPagesDocument, options);
        }
// @ts-ignore
export function useAdminContentPagesSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<AdminContentPagesQuery, AdminContentPagesQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminContentPagesQuery, AdminContentPagesQueryVariables>;
export function useAdminContentPagesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminContentPagesQuery, AdminContentPagesQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminContentPagesQuery | undefined, AdminContentPagesQueryVariables>;
export function useAdminContentPagesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminContentPagesQuery, AdminContentPagesQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<AdminContentPagesQuery, AdminContentPagesQueryVariables>(AdminContentPagesDocument, options);
        }
export type AdminContentPagesQueryHookResult = ReturnType<typeof useAdminContentPagesQuery>;
export type AdminContentPagesLazyQueryHookResult = ReturnType<typeof useAdminContentPagesLazyQuery>;
export type AdminContentPagesSuspenseQueryHookResult = ReturnType<typeof useAdminContentPagesSuspenseQuery>;
export const AdminContentPageBySlugDocument = gql`
    query AdminContentPageBySlug($slug: String!) {
  adminContentPageBySlug(slug: $slug) {
    id
    slug
    title
    content
    is_active
    created_at
    updated_at
  }
}
    `;

/**
 * __useAdminContentPageBySlugQuery__
 *
 * To run a query within a React component, call `useAdminContentPageBySlugQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminContentPageBySlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminContentPageBySlugQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useAdminContentPageBySlugQuery(baseOptions: ApolloReactHooks.QueryHookOptions<AdminContentPageBySlugQuery, AdminContentPageBySlugQueryVariables> & ({ variables: AdminContentPageBySlugQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<AdminContentPageBySlugQuery, AdminContentPageBySlugQueryVariables>(AdminContentPageBySlugDocument, options);
      }
export function useAdminContentPageBySlugLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AdminContentPageBySlugQuery, AdminContentPageBySlugQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<AdminContentPageBySlugQuery, AdminContentPageBySlugQueryVariables>(AdminContentPageBySlugDocument, options);
        }
// @ts-ignore
export function useAdminContentPageBySlugSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<AdminContentPageBySlugQuery, AdminContentPageBySlugQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminContentPageBySlugQuery, AdminContentPageBySlugQueryVariables>;
export function useAdminContentPageBySlugSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminContentPageBySlugQuery, AdminContentPageBySlugQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminContentPageBySlugQuery | undefined, AdminContentPageBySlugQueryVariables>;
export function useAdminContentPageBySlugSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminContentPageBySlugQuery, AdminContentPageBySlugQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<AdminContentPageBySlugQuery, AdminContentPageBySlugQueryVariables>(AdminContentPageBySlugDocument, options);
        }
export type AdminContentPageBySlugQueryHookResult = ReturnType<typeof useAdminContentPageBySlugQuery>;
export type AdminContentPageBySlugLazyQueryHookResult = ReturnType<typeof useAdminContentPageBySlugLazyQuery>;
export type AdminContentPageBySlugSuspenseQueryHookResult = ReturnType<typeof useAdminContentPageBySlugSuspenseQuery>;
export const AdminCreateEventDocument = gql`
    mutation AdminCreateEvent($input: CreateEventInput!) {
  adminCreateEvent(input: $input) {
    success
    eventId
    error
  }
}
    `;

/**
 * __useAdminCreateEventMutation__
 *
 * To run a mutation, you first call `useAdminCreateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminCreateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminCreateEventMutation, { data, loading, error }] = useAdminCreateEventMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAdminCreateEventMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AdminCreateEventMutation, AdminCreateEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AdminCreateEventMutation, AdminCreateEventMutationVariables>(AdminCreateEventDocument, options);
      }
export type AdminCreateEventMutationHookResult = ReturnType<typeof useAdminCreateEventMutation>;
export const AdminUpdateEventDocument = gql`
    mutation AdminUpdateEvent($id: String!, $input: UpdateEventInput!) {
  adminUpdateEvent(id: $id, input: $input) {
    success
    eventId
    error
  }
}
    `;

/**
 * __useAdminUpdateEventMutation__
 *
 * To run a mutation, you first call `useAdminUpdateEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminUpdateEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminUpdateEventMutation, { data, loading, error }] = useAdminUpdateEventMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAdminUpdateEventMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AdminUpdateEventMutation, AdminUpdateEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AdminUpdateEventMutation, AdminUpdateEventMutationVariables>(AdminUpdateEventDocument, options);
      }
export type AdminUpdateEventMutationHookResult = ReturnType<typeof useAdminUpdateEventMutation>;
export const AdminDeleteEventDocument = gql`
    mutation AdminDeleteEvent($id: String!) {
  adminDeleteEvent(id: $id) {
    success
    eventId
    error
  }
}
    `;

/**
 * __useAdminDeleteEventMutation__
 *
 * To run a mutation, you first call `useAdminDeleteEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminDeleteEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminDeleteEventMutation, { data, loading, error }] = useAdminDeleteEventMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAdminDeleteEventMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AdminDeleteEventMutation, AdminDeleteEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AdminDeleteEventMutation, AdminDeleteEventMutationVariables>(AdminDeleteEventDocument, options);
      }
export type AdminDeleteEventMutationHookResult = ReturnType<typeof useAdminDeleteEventMutation>;
export const AdminUpdateEventStatusDocument = gql`
    mutation AdminUpdateEventStatus($id: String!, $status: String!) {
  adminUpdateEventStatus(id: $id, status: $status) {
    success
    eventId
    error
  }
}
    `;

/**
 * __useAdminUpdateEventStatusMutation__
 *
 * To run a mutation, you first call `useAdminUpdateEventStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminUpdateEventStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminUpdateEventStatusMutation, { data, loading, error }] = useAdminUpdateEventStatusMutation({
 *   variables: {
 *      id: // value for 'id'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useAdminUpdateEventStatusMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AdminUpdateEventStatusMutation, AdminUpdateEventStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AdminUpdateEventStatusMutation, AdminUpdateEventStatusMutationVariables>(AdminUpdateEventStatusDocument, options);
      }
export type AdminUpdateEventStatusMutationHookResult = ReturnType<typeof useAdminUpdateEventStatusMutation>;
export const AdminDeleteEventReviewDocument = gql`
    mutation AdminDeleteEventReview($reviewId: Int!) {
  adminDeleteEventReview(reviewId: $reviewId) {
    success
    eventId
    error
  }
}
    `;

/**
 * __useAdminDeleteEventReviewMutation__
 *
 * To run a mutation, you first call `useAdminDeleteEventReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminDeleteEventReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminDeleteEventReviewMutation, { data, loading, error }] = useAdminDeleteEventReviewMutation({
 *   variables: {
 *      reviewId: // value for 'reviewId'
 *   },
 * });
 */
export function useAdminDeleteEventReviewMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AdminDeleteEventReviewMutation, AdminDeleteEventReviewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AdminDeleteEventReviewMutation, AdminDeleteEventReviewMutationVariables>(AdminDeleteEventReviewDocument, options);
      }
export type AdminDeleteEventReviewMutationHookResult = ReturnType<typeof useAdminDeleteEventReviewMutation>;
export const AdminBulkDeleteEventsDocument = gql`
    mutation AdminBulkDeleteEvents($input: BulkDeleteEventsInput!) {
  adminBulkDeleteEvents(input: $input) {
    success
    totalRequested
    deletedCount
    cancelledCount
    failedCount
    results {
      id
      success
      action
      error
    }
    error
  }
}
    `;

/**
 * __useAdminBulkDeleteEventsMutation__
 *
 * To run a mutation, you first call `useAdminBulkDeleteEventsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminBulkDeleteEventsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminBulkDeleteEventsMutation, { data, loading, error }] = useAdminBulkDeleteEventsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAdminBulkDeleteEventsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AdminBulkDeleteEventsMutation, AdminBulkDeleteEventsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AdminBulkDeleteEventsMutation, AdminBulkDeleteEventsMutationVariables>(AdminBulkDeleteEventsDocument, options);
      }
export type AdminBulkDeleteEventsMutationHookResult = ReturnType<typeof useAdminBulkDeleteEventsMutation>;
export const AdminEventsDocument = gql`
    query AdminEvents($filter: AdminEventsFilterInput) {
  adminEvents(filter: $filter) {
    events {
      id
      title
      slug
      description
      status
      level
      starts_at
      ends_at
      location
      price
      available_seats
      total_seats
      instructor
      image
      created_at
      _count {
        event_registrations
        reviews
      }
    }
    total
    page
    limit
    totalPages
  }
}
    `;

/**
 * __useAdminEventsQuery__
 *
 * To run a query within a React component, call `useAdminEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminEventsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useAdminEventsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AdminEventsQuery, AdminEventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<AdminEventsQuery, AdminEventsQueryVariables>(AdminEventsDocument, options);
      }
export function useAdminEventsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AdminEventsQuery, AdminEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<AdminEventsQuery, AdminEventsQueryVariables>(AdminEventsDocument, options);
        }
// @ts-ignore
export function useAdminEventsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<AdminEventsQuery, AdminEventsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminEventsQuery, AdminEventsQueryVariables>;
export function useAdminEventsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminEventsQuery, AdminEventsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminEventsQuery | undefined, AdminEventsQueryVariables>;
export function useAdminEventsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminEventsQuery, AdminEventsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<AdminEventsQuery, AdminEventsQueryVariables>(AdminEventsDocument, options);
        }
export type AdminEventsQueryHookResult = ReturnType<typeof useAdminEventsQuery>;
export type AdminEventsLazyQueryHookResult = ReturnType<typeof useAdminEventsLazyQuery>;
export type AdminEventsSuspenseQueryHookResult = ReturnType<typeof useAdminEventsSuspenseQuery>;
export const AdminEventByIdDocument = gql`
    query AdminEventById($id: String!) {
  adminEventById(id: $id) {
    id
    title
    slug
    description
    status
    level
    starts_at
    ends_at
    location
    full_location
    instructor
    includes
    price
    available_seats
    total_seats
    image
    highlights
    gallery
    created_at
    updated_at
    _count {
      event_registrations
      reviews
    }
  }
}
    `;

/**
 * __useAdminEventByIdQuery__
 *
 * To run a query within a React component, call `useAdminEventByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminEventByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminEventByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAdminEventByIdQuery(baseOptions: ApolloReactHooks.QueryHookOptions<AdminEventByIdQuery, AdminEventByIdQueryVariables> & ({ variables: AdminEventByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<AdminEventByIdQuery, AdminEventByIdQueryVariables>(AdminEventByIdDocument, options);
      }
export function useAdminEventByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AdminEventByIdQuery, AdminEventByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<AdminEventByIdQuery, AdminEventByIdQueryVariables>(AdminEventByIdDocument, options);
        }
// @ts-ignore
export function useAdminEventByIdSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<AdminEventByIdQuery, AdminEventByIdQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminEventByIdQuery, AdminEventByIdQueryVariables>;
export function useAdminEventByIdSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminEventByIdQuery, AdminEventByIdQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminEventByIdQuery | undefined, AdminEventByIdQueryVariables>;
export function useAdminEventByIdSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminEventByIdQuery, AdminEventByIdQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<AdminEventByIdQuery, AdminEventByIdQueryVariables>(AdminEventByIdDocument, options);
        }
export type AdminEventByIdQueryHookResult = ReturnType<typeof useAdminEventByIdQuery>;
export type AdminEventByIdLazyQueryHookResult = ReturnType<typeof useAdminEventByIdLazyQuery>;
export type AdminEventByIdSuspenseQueryHookResult = ReturnType<typeof useAdminEventByIdSuspenseQuery>;
export const AdminEventRegistrationsDocument = gql`
    query AdminEventRegistrations($eventId: String!) {
  adminEventRegistrations(eventId: $eventId) {
    registrations {
      id
      status
      seats_reserved
      price
      discount
      created_at
      request_at
      approved_at
      paid_at
      confirmed_at
      cancelled_at
      user {
        id
        name
        email
        phone
        image
      }
    }
    total
    statusCounts {
      PENDING
      APPROVED
      REJECTED
      PAID
      CONFIRMED
      CANCELLED
    }
  }
}
    `;

/**
 * __useAdminEventRegistrationsQuery__
 *
 * To run a query within a React component, call `useAdminEventRegistrationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminEventRegistrationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminEventRegistrationsQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useAdminEventRegistrationsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<AdminEventRegistrationsQuery, AdminEventRegistrationsQueryVariables> & ({ variables: AdminEventRegistrationsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<AdminEventRegistrationsQuery, AdminEventRegistrationsQueryVariables>(AdminEventRegistrationsDocument, options);
      }
export function useAdminEventRegistrationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AdminEventRegistrationsQuery, AdminEventRegistrationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<AdminEventRegistrationsQuery, AdminEventRegistrationsQueryVariables>(AdminEventRegistrationsDocument, options);
        }
// @ts-ignore
export function useAdminEventRegistrationsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<AdminEventRegistrationsQuery, AdminEventRegistrationsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminEventRegistrationsQuery, AdminEventRegistrationsQueryVariables>;
export function useAdminEventRegistrationsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminEventRegistrationsQuery, AdminEventRegistrationsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminEventRegistrationsQuery | undefined, AdminEventRegistrationsQueryVariables>;
export function useAdminEventRegistrationsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminEventRegistrationsQuery, AdminEventRegistrationsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<AdminEventRegistrationsQuery, AdminEventRegistrationsQueryVariables>(AdminEventRegistrationsDocument, options);
        }
export type AdminEventRegistrationsQueryHookResult = ReturnType<typeof useAdminEventRegistrationsQuery>;
export type AdminEventRegistrationsLazyQueryHookResult = ReturnType<typeof useAdminEventRegistrationsLazyQuery>;
export type AdminEventRegistrationsSuspenseQueryHookResult = ReturnType<typeof useAdminEventRegistrationsSuspenseQuery>;
export const AdminEventReviewsDocument = gql`
    query AdminEventReviews($eventId: String!) {
  adminEventReviews(eventId: $eventId) {
    reviews {
      id
      rating
      review
      image_urls
      created_at
      user {
        id
        name
        email
        image
      }
    }
    total
    averageRating
  }
}
    `;

/**
 * __useAdminEventReviewsQuery__
 *
 * To run a query within a React component, call `useAdminEventReviewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminEventReviewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminEventReviewsQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useAdminEventReviewsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<AdminEventReviewsQuery, AdminEventReviewsQueryVariables> & ({ variables: AdminEventReviewsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<AdminEventReviewsQuery, AdminEventReviewsQueryVariables>(AdminEventReviewsDocument, options);
      }
export function useAdminEventReviewsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AdminEventReviewsQuery, AdminEventReviewsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<AdminEventReviewsQuery, AdminEventReviewsQueryVariables>(AdminEventReviewsDocument, options);
        }
// @ts-ignore
export function useAdminEventReviewsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<AdminEventReviewsQuery, AdminEventReviewsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminEventReviewsQuery, AdminEventReviewsQueryVariables>;
export function useAdminEventReviewsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminEventReviewsQuery, AdminEventReviewsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminEventReviewsQuery | undefined, AdminEventReviewsQueryVariables>;
export function useAdminEventReviewsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminEventReviewsQuery, AdminEventReviewsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<AdminEventReviewsQuery, AdminEventReviewsQueryVariables>(AdminEventReviewsDocument, options);
        }
export type AdminEventReviewsQueryHookResult = ReturnType<typeof useAdminEventReviewsQuery>;
export type AdminEventReviewsLazyQueryHookResult = ReturnType<typeof useAdminEventReviewsLazyQuery>;
export type AdminEventReviewsSuspenseQueryHookResult = ReturnType<typeof useAdminEventReviewsSuspenseQuery>;
export const AdminEventStatusOptionsDocument = gql`
    query AdminEventStatusOptions {
  adminEventStatusOptions {
    value
    label
  }
}
    `;

/**
 * __useAdminEventStatusOptionsQuery__
 *
 * To run a query within a React component, call `useAdminEventStatusOptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminEventStatusOptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminEventStatusOptionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAdminEventStatusOptionsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AdminEventStatusOptionsQuery, AdminEventStatusOptionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<AdminEventStatusOptionsQuery, AdminEventStatusOptionsQueryVariables>(AdminEventStatusOptionsDocument, options);
      }
export function useAdminEventStatusOptionsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AdminEventStatusOptionsQuery, AdminEventStatusOptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<AdminEventStatusOptionsQuery, AdminEventStatusOptionsQueryVariables>(AdminEventStatusOptionsDocument, options);
        }
// @ts-ignore
export function useAdminEventStatusOptionsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<AdminEventStatusOptionsQuery, AdminEventStatusOptionsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminEventStatusOptionsQuery, AdminEventStatusOptionsQueryVariables>;
export function useAdminEventStatusOptionsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminEventStatusOptionsQuery, AdminEventStatusOptionsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminEventStatusOptionsQuery | undefined, AdminEventStatusOptionsQueryVariables>;
export function useAdminEventStatusOptionsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminEventStatusOptionsQuery, AdminEventStatusOptionsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<AdminEventStatusOptionsQuery, AdminEventStatusOptionsQueryVariables>(AdminEventStatusOptionsDocument, options);
        }
export type AdminEventStatusOptionsQueryHookResult = ReturnType<typeof useAdminEventStatusOptionsQuery>;
export type AdminEventStatusOptionsLazyQueryHookResult = ReturnType<typeof useAdminEventStatusOptionsLazyQuery>;
export type AdminEventStatusOptionsSuspenseQueryHookResult = ReturnType<typeof useAdminEventStatusOptionsSuspenseQuery>;
export const AdminEventLevelOptionsDocument = gql`
    query AdminEventLevelOptions {
  adminEventLevelOptions {
    value
    label
  }
}
    `;

/**
 * __useAdminEventLevelOptionsQuery__
 *
 * To run a query within a React component, call `useAdminEventLevelOptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminEventLevelOptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminEventLevelOptionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAdminEventLevelOptionsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AdminEventLevelOptionsQuery, AdminEventLevelOptionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<AdminEventLevelOptionsQuery, AdminEventLevelOptionsQueryVariables>(AdminEventLevelOptionsDocument, options);
      }
export function useAdminEventLevelOptionsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AdminEventLevelOptionsQuery, AdminEventLevelOptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<AdminEventLevelOptionsQuery, AdminEventLevelOptionsQueryVariables>(AdminEventLevelOptionsDocument, options);
        }
// @ts-ignore
export function useAdminEventLevelOptionsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<AdminEventLevelOptionsQuery, AdminEventLevelOptionsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminEventLevelOptionsQuery, AdminEventLevelOptionsQueryVariables>;
export function useAdminEventLevelOptionsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminEventLevelOptionsQuery, AdminEventLevelOptionsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminEventLevelOptionsQuery | undefined, AdminEventLevelOptionsQueryVariables>;
export function useAdminEventLevelOptionsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminEventLevelOptionsQuery, AdminEventLevelOptionsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<AdminEventLevelOptionsQuery, AdminEventLevelOptionsQueryVariables>(AdminEventLevelOptionsDocument, options);
        }
export type AdminEventLevelOptionsQueryHookResult = ReturnType<typeof useAdminEventLevelOptionsQuery>;
export type AdminEventLevelOptionsLazyQueryHookResult = ReturnType<typeof useAdminEventLevelOptionsLazyQuery>;
export type AdminEventLevelOptionsSuspenseQueryHookResult = ReturnType<typeof useAdminEventLevelOptionsSuspenseQuery>;
export const AdminUpdateOrderStatusDocument = gql`
    mutation AdminUpdateOrderStatus($orderId: String!, $status: String!) {
  adminUpdateOrderStatus(orderId: $orderId, status: $status) {
    success
    error
  }
}
    `;

/**
 * __useAdminUpdateOrderStatusMutation__
 *
 * To run a mutation, you first call `useAdminUpdateOrderStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminUpdateOrderStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminUpdateOrderStatusMutation, { data, loading, error }] = useAdminUpdateOrderStatusMutation({
 *   variables: {
 *      orderId: // value for 'orderId'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useAdminUpdateOrderStatusMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AdminUpdateOrderStatusMutation, AdminUpdateOrderStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AdminUpdateOrderStatusMutation, AdminUpdateOrderStatusMutationVariables>(AdminUpdateOrderStatusDocument, options);
      }
export type AdminUpdateOrderStatusMutationHookResult = ReturnType<typeof useAdminUpdateOrderStatusMutation>;
export const AdminUpdateOrderPriceDocument = gql`
    mutation AdminUpdateOrderPrice($orderId: String!, $total: Float!) {
  adminUpdateOrderPrice(orderId: $orderId, total: $total) {
    success
    error
  }
}
    `;

/**
 * __useAdminUpdateOrderPriceMutation__
 *
 * To run a mutation, you first call `useAdminUpdateOrderPriceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminUpdateOrderPriceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminUpdateOrderPriceMutation, { data, loading, error }] = useAdminUpdateOrderPriceMutation({
 *   variables: {
 *      orderId: // value for 'orderId'
 *      total: // value for 'total'
 *   },
 * });
 */
export function useAdminUpdateOrderPriceMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AdminUpdateOrderPriceMutation, AdminUpdateOrderPriceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AdminUpdateOrderPriceMutation, AdminUpdateOrderPriceMutationVariables>(AdminUpdateOrderPriceDocument, options);
      }
export type AdminUpdateOrderPriceMutationHookResult = ReturnType<typeof useAdminUpdateOrderPriceMutation>;
export const AdminUpdateOrderDiscountDocument = gql`
    mutation AdminUpdateOrderDiscount($orderId: String!, $discount: Float!) {
  adminUpdateOrderDiscount(orderId: $orderId, discount: $discount) {
    success
    error
  }
}
    `;

/**
 * __useAdminUpdateOrderDiscountMutation__
 *
 * To run a mutation, you first call `useAdminUpdateOrderDiscountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminUpdateOrderDiscountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminUpdateOrderDiscountMutation, { data, loading, error }] = useAdminUpdateOrderDiscountMutation({
 *   variables: {
 *      orderId: // value for 'orderId'
 *      discount: // value for 'discount'
 *   },
 * });
 */
export function useAdminUpdateOrderDiscountMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AdminUpdateOrderDiscountMutation, AdminUpdateOrderDiscountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AdminUpdateOrderDiscountMutation, AdminUpdateOrderDiscountMutationVariables>(AdminUpdateOrderDiscountDocument, options);
      }
export type AdminUpdateOrderDiscountMutationHookResult = ReturnType<typeof useAdminUpdateOrderDiscountMutation>;
export const AdminUpdateOrderItemDiscountDocument = gql`
    mutation AdminUpdateOrderItemDiscount($itemId: Int!, $discount: Float!) {
  adminUpdateOrderItemDiscount(itemId: $itemId, discount: $discount) {
    success
    error
  }
}
    `;

/**
 * __useAdminUpdateOrderItemDiscountMutation__
 *
 * To run a mutation, you first call `useAdminUpdateOrderItemDiscountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminUpdateOrderItemDiscountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminUpdateOrderItemDiscountMutation, { data, loading, error }] = useAdminUpdateOrderItemDiscountMutation({
 *   variables: {
 *      itemId: // value for 'itemId'
 *      discount: // value for 'discount'
 *   },
 * });
 */
export function useAdminUpdateOrderItemDiscountMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AdminUpdateOrderItemDiscountMutation, AdminUpdateOrderItemDiscountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AdminUpdateOrderItemDiscountMutation, AdminUpdateOrderItemDiscountMutationVariables>(AdminUpdateOrderItemDiscountDocument, options);
      }
export type AdminUpdateOrderItemDiscountMutationHookResult = ReturnType<typeof useAdminUpdateOrderItemDiscountMutation>;
export const AdminUpdateOrderItemQuantityDocument = gql`
    mutation AdminUpdateOrderItemQuantity($itemId: Int!, $quantity: Int!) {
  adminUpdateOrderItemQuantity(itemId: $itemId, quantity: $quantity) {
    success
    error
  }
}
    `;

/**
 * __useAdminUpdateOrderItemQuantityMutation__
 *
 * To run a mutation, you first call `useAdminUpdateOrderItemQuantityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminUpdateOrderItemQuantityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminUpdateOrderItemQuantityMutation, { data, loading, error }] = useAdminUpdateOrderItemQuantityMutation({
 *   variables: {
 *      itemId: // value for 'itemId'
 *      quantity: // value for 'quantity'
 *   },
 * });
 */
export function useAdminUpdateOrderItemQuantityMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AdminUpdateOrderItemQuantityMutation, AdminUpdateOrderItemQuantityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AdminUpdateOrderItemQuantityMutation, AdminUpdateOrderItemQuantityMutationVariables>(AdminUpdateOrderItemQuantityDocument, options);
      }
export type AdminUpdateOrderItemQuantityMutationHookResult = ReturnType<typeof useAdminUpdateOrderItemQuantityMutation>;
export const AdminCreateProductDocument = gql`
    mutation AdminCreateProduct($input: CreateProductInput!) {
  adminCreateProduct(input: $input) {
    success
    productId
    error
  }
}
    `;

/**
 * __useAdminCreateProductMutation__
 *
 * To run a mutation, you first call `useAdminCreateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminCreateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminCreateProductMutation, { data, loading, error }] = useAdminCreateProductMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAdminCreateProductMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AdminCreateProductMutation, AdminCreateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AdminCreateProductMutation, AdminCreateProductMutationVariables>(AdminCreateProductDocument, options);
      }
export type AdminCreateProductMutationHookResult = ReturnType<typeof useAdminCreateProductMutation>;
export const AdminUpdateProductDocument = gql`
    mutation AdminUpdateProduct($id: Int!, $input: UpdateProductInput!) {
  adminUpdateProduct(id: $id, input: $input) {
    success
    error
  }
}
    `;

/**
 * __useAdminUpdateProductMutation__
 *
 * To run a mutation, you first call `useAdminUpdateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminUpdateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminUpdateProductMutation, { data, loading, error }] = useAdminUpdateProductMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAdminUpdateProductMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AdminUpdateProductMutation, AdminUpdateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AdminUpdateProductMutation, AdminUpdateProductMutationVariables>(AdminUpdateProductDocument, options);
      }
export type AdminUpdateProductMutationHookResult = ReturnType<typeof useAdminUpdateProductMutation>;
export const AdminDeleteProductDocument = gql`
    mutation AdminDeleteProduct($id: Int!) {
  adminDeleteProduct(id: $id) {
    success
    error
  }
}
    `;

/**
 * __useAdminDeleteProductMutation__
 *
 * To run a mutation, you first call `useAdminDeleteProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminDeleteProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminDeleteProductMutation, { data, loading, error }] = useAdminDeleteProductMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAdminDeleteProductMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AdminDeleteProductMutation, AdminDeleteProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AdminDeleteProductMutation, AdminDeleteProductMutationVariables>(AdminDeleteProductDocument, options);
      }
export type AdminDeleteProductMutationHookResult = ReturnType<typeof useAdminDeleteProductMutation>;
export const AdminToggleProductActiveDocument = gql`
    mutation AdminToggleProductActive($id: Int!) {
  adminToggleProductActive(id: $id) {
    success
    error
  }
}
    `;

/**
 * __useAdminToggleProductActiveMutation__
 *
 * To run a mutation, you first call `useAdminToggleProductActiveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminToggleProductActiveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminToggleProductActiveMutation, { data, loading, error }] = useAdminToggleProductActiveMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAdminToggleProductActiveMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AdminToggleProductActiveMutation, AdminToggleProductActiveMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AdminToggleProductActiveMutation, AdminToggleProductActiveMutationVariables>(AdminToggleProductActiveDocument, options);
      }
export type AdminToggleProductActiveMutationHookResult = ReturnType<typeof useAdminToggleProductActiveMutation>;
export const AdminDeleteProductReviewDocument = gql`
    mutation AdminDeleteProductReview($reviewId: Int!) {
  adminDeleteProductReview(reviewId: $reviewId) {
    success
    error
  }
}
    `;

/**
 * __useAdminDeleteProductReviewMutation__
 *
 * To run a mutation, you first call `useAdminDeleteProductReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminDeleteProductReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminDeleteProductReviewMutation, { data, loading, error }] = useAdminDeleteProductReviewMutation({
 *   variables: {
 *      reviewId: // value for 'reviewId'
 *   },
 * });
 */
export function useAdminDeleteProductReviewMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AdminDeleteProductReviewMutation, AdminDeleteProductReviewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AdminDeleteProductReviewMutation, AdminDeleteProductReviewMutationVariables>(AdminDeleteProductReviewDocument, options);
      }
export type AdminDeleteProductReviewMutationHookResult = ReturnType<typeof useAdminDeleteProductReviewMutation>;
export const AdminBulkDeleteProductsDocument = gql`
    mutation AdminBulkDeleteProducts($input: BulkDeleteProductsInput!) {
  adminBulkDeleteProducts(input: $input) {
    success
    totalRequested
    deletedCount
    deactivatedCount
    failedCount
    results {
      id
      success
      action
      error
    }
    error
  }
}
    `;

/**
 * __useAdminBulkDeleteProductsMutation__
 *
 * To run a mutation, you first call `useAdminBulkDeleteProductsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminBulkDeleteProductsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminBulkDeleteProductsMutation, { data, loading, error }] = useAdminBulkDeleteProductsMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAdminBulkDeleteProductsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AdminBulkDeleteProductsMutation, AdminBulkDeleteProductsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AdminBulkDeleteProductsMutation, AdminBulkDeleteProductsMutationVariables>(AdminBulkDeleteProductsDocument, options);
      }
export type AdminBulkDeleteProductsMutationHookResult = ReturnType<typeof useAdminBulkDeleteProductsMutation>;
export const AdminProductsDocument = gql`
    query AdminProducts($filter: AdminProductsFilterInput) {
  adminProducts(filter: $filter) {
    products {
      id
      name
      slug
      price
      available_quantity
      total_quantity
      is_active
      categories
      material
      color_code
      color_name
      image_urls
      created_at
      _count {
        reviews
        wishlists
        carts
      }
    }
    total
    page
    limit
    totalPages
  }
}
    `;

/**
 * __useAdminProductsQuery__
 *
 * To run a query within a React component, call `useAdminProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminProductsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useAdminProductsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AdminProductsQuery, AdminProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<AdminProductsQuery, AdminProductsQueryVariables>(AdminProductsDocument, options);
      }
export function useAdminProductsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AdminProductsQuery, AdminProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<AdminProductsQuery, AdminProductsQueryVariables>(AdminProductsDocument, options);
        }
// @ts-ignore
export function useAdminProductsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<AdminProductsQuery, AdminProductsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminProductsQuery, AdminProductsQueryVariables>;
export function useAdminProductsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminProductsQuery, AdminProductsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminProductsQuery | undefined, AdminProductsQueryVariables>;
export function useAdminProductsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminProductsQuery, AdminProductsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<AdminProductsQuery, AdminProductsQueryVariables>(AdminProductsDocument, options);
        }
export type AdminProductsQueryHookResult = ReturnType<typeof useAdminProductsQuery>;
export type AdminProductsLazyQueryHookResult = ReturnType<typeof useAdminProductsLazyQuery>;
export type AdminProductsSuspenseQueryHookResult = ReturnType<typeof useAdminProductsSuspenseQuery>;
export const AdminProductByIdDocument = gql`
    query AdminProductById($id: Int!) {
  adminProductById(id: $id) {
    id
    name
    slug
    description
    instructions
    price
    available_quantity
    total_quantity
    is_active
    categories
    material
    color_code
    color_name
    image_urls
    collection_id
    collection {
      id
      name
      slug
    }
    created_at
    updated_at
    _count {
      reviews
      wishlists
      carts
      purchased_products
    }
  }
}
    `;

/**
 * __useAdminProductByIdQuery__
 *
 * To run a query within a React component, call `useAdminProductByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminProductByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminProductByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAdminProductByIdQuery(baseOptions: ApolloReactHooks.QueryHookOptions<AdminProductByIdQuery, AdminProductByIdQueryVariables> & ({ variables: AdminProductByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<AdminProductByIdQuery, AdminProductByIdQueryVariables>(AdminProductByIdDocument, options);
      }
export function useAdminProductByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AdminProductByIdQuery, AdminProductByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<AdminProductByIdQuery, AdminProductByIdQueryVariables>(AdminProductByIdDocument, options);
        }
// @ts-ignore
export function useAdminProductByIdSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<AdminProductByIdQuery, AdminProductByIdQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminProductByIdQuery, AdminProductByIdQueryVariables>;
export function useAdminProductByIdSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminProductByIdQuery, AdminProductByIdQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminProductByIdQuery | undefined, AdminProductByIdQueryVariables>;
export function useAdminProductByIdSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminProductByIdQuery, AdminProductByIdQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<AdminProductByIdQuery, AdminProductByIdQueryVariables>(AdminProductByIdDocument, options);
        }
export type AdminProductByIdQueryHookResult = ReturnType<typeof useAdminProductByIdQuery>;
export type AdminProductByIdLazyQueryHookResult = ReturnType<typeof useAdminProductByIdLazyQuery>;
export type AdminProductByIdSuspenseQueryHookResult = ReturnType<typeof useAdminProductByIdSuspenseQuery>;
export const AdminProductReviewsDocument = gql`
    query AdminProductReviews($productId: Int!) {
  adminProductReviews(productId: $productId) {
    reviews {
      id
      rating
      review
      image_urls
      created_at
      user {
        id
        name
        email
        image
      }
    }
    total
    averageRating
  }
}
    `;

/**
 * __useAdminProductReviewsQuery__
 *
 * To run a query within a React component, call `useAdminProductReviewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminProductReviewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminProductReviewsQuery({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useAdminProductReviewsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<AdminProductReviewsQuery, AdminProductReviewsQueryVariables> & ({ variables: AdminProductReviewsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<AdminProductReviewsQuery, AdminProductReviewsQueryVariables>(AdminProductReviewsDocument, options);
      }
export function useAdminProductReviewsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AdminProductReviewsQuery, AdminProductReviewsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<AdminProductReviewsQuery, AdminProductReviewsQueryVariables>(AdminProductReviewsDocument, options);
        }
// @ts-ignore
export function useAdminProductReviewsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<AdminProductReviewsQuery, AdminProductReviewsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminProductReviewsQuery, AdminProductReviewsQueryVariables>;
export function useAdminProductReviewsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminProductReviewsQuery, AdminProductReviewsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminProductReviewsQuery | undefined, AdminProductReviewsQueryVariables>;
export function useAdminProductReviewsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminProductReviewsQuery, AdminProductReviewsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<AdminProductReviewsQuery, AdminProductReviewsQueryVariables>(AdminProductReviewsDocument, options);
        }
export type AdminProductReviewsQueryHookResult = ReturnType<typeof useAdminProductReviewsQuery>;
export type AdminProductReviewsLazyQueryHookResult = ReturnType<typeof useAdminProductReviewsLazyQuery>;
export type AdminProductReviewsSuspenseQueryHookResult = ReturnType<typeof useAdminProductReviewsSuspenseQuery>;
export const AdminAllCategoriesDocument = gql`
    query AdminAllCategories {
  adminAllCategories
}
    `;

/**
 * __useAdminAllCategoriesQuery__
 *
 * To run a query within a React component, call `useAdminAllCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminAllCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminAllCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useAdminAllCategoriesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AdminAllCategoriesQuery, AdminAllCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<AdminAllCategoriesQuery, AdminAllCategoriesQueryVariables>(AdminAllCategoriesDocument, options);
      }
export function useAdminAllCategoriesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AdminAllCategoriesQuery, AdminAllCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<AdminAllCategoriesQuery, AdminAllCategoriesQueryVariables>(AdminAllCategoriesDocument, options);
        }
// @ts-ignore
export function useAdminAllCategoriesSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<AdminAllCategoriesQuery, AdminAllCategoriesQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminAllCategoriesQuery, AdminAllCategoriesQueryVariables>;
export function useAdminAllCategoriesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminAllCategoriesQuery, AdminAllCategoriesQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminAllCategoriesQuery | undefined, AdminAllCategoriesQueryVariables>;
export function useAdminAllCategoriesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminAllCategoriesQuery, AdminAllCategoriesQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<AdminAllCategoriesQuery, AdminAllCategoriesQueryVariables>(AdminAllCategoriesDocument, options);
        }
export type AdminAllCategoriesQueryHookResult = ReturnType<typeof useAdminAllCategoriesQuery>;
export type AdminAllCategoriesLazyQueryHookResult = ReturnType<typeof useAdminAllCategoriesLazyQuery>;
export type AdminAllCategoriesSuspenseQueryHookResult = ReturnType<typeof useAdminAllCategoriesSuspenseQuery>;
export const AdminAllCollectionsDocument = gql`
    query AdminAllCollections {
  adminAllCollections {
    id
    name
    slug
  }
}
    `;

/**
 * __useAdminAllCollectionsQuery__
 *
 * To run a query within a React component, call `useAdminAllCollectionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminAllCollectionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminAllCollectionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAdminAllCollectionsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AdminAllCollectionsQuery, AdminAllCollectionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<AdminAllCollectionsQuery, AdminAllCollectionsQueryVariables>(AdminAllCollectionsDocument, options);
      }
export function useAdminAllCollectionsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AdminAllCollectionsQuery, AdminAllCollectionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<AdminAllCollectionsQuery, AdminAllCollectionsQueryVariables>(AdminAllCollectionsDocument, options);
        }
// @ts-ignore
export function useAdminAllCollectionsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<AdminAllCollectionsQuery, AdminAllCollectionsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminAllCollectionsQuery, AdminAllCollectionsQueryVariables>;
export function useAdminAllCollectionsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminAllCollectionsQuery, AdminAllCollectionsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminAllCollectionsQuery | undefined, AdminAllCollectionsQueryVariables>;
export function useAdminAllCollectionsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminAllCollectionsQuery, AdminAllCollectionsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<AdminAllCollectionsQuery, AdminAllCollectionsQueryVariables>(AdminAllCollectionsDocument, options);
        }
export type AdminAllCollectionsQueryHookResult = ReturnType<typeof useAdminAllCollectionsQuery>;
export type AdminAllCollectionsLazyQueryHookResult = ReturnType<typeof useAdminAllCollectionsLazyQuery>;
export type AdminAllCollectionsSuspenseQueryHookResult = ReturnType<typeof useAdminAllCollectionsSuspenseQuery>;
export const PublicAboutContentDocument = gql`
    query PublicAboutContent {
  publicAboutContent {
    storyTitle
    storySubtitle
    storyContent
    values {
      icon
      title
      description
    }
    team {
      name
      role
      image
      bio
    }
    processSteps {
      step
      title
      description
    }
  }
}
    `;

/**
 * __usePublicAboutContentQuery__
 *
 * To run a query within a React component, call `usePublicAboutContentQuery` and pass it any options that fit your needs.
 * When your component renders, `usePublicAboutContentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePublicAboutContentQuery({
 *   variables: {
 *   },
 * });
 */
export function usePublicAboutContentQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PublicAboutContentQuery, PublicAboutContentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<PublicAboutContentQuery, PublicAboutContentQueryVariables>(PublicAboutContentDocument, options);
      }
export function usePublicAboutContentLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PublicAboutContentQuery, PublicAboutContentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<PublicAboutContentQuery, PublicAboutContentQueryVariables>(PublicAboutContentDocument, options);
        }
// @ts-ignore
export function usePublicAboutContentSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<PublicAboutContentQuery, PublicAboutContentQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<PublicAboutContentQuery, PublicAboutContentQueryVariables>;
export function usePublicAboutContentSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<PublicAboutContentQuery, PublicAboutContentQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<PublicAboutContentQuery | undefined, PublicAboutContentQueryVariables>;
export function usePublicAboutContentSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<PublicAboutContentQuery, PublicAboutContentQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<PublicAboutContentQuery, PublicAboutContentQueryVariables>(PublicAboutContentDocument, options);
        }
export type PublicAboutContentQueryHookResult = ReturnType<typeof usePublicAboutContentQuery>;
export type PublicAboutContentLazyQueryHookResult = ReturnType<typeof usePublicAboutContentLazyQuery>;
export type PublicAboutContentSuspenseQueryHookResult = ReturnType<typeof usePublicAboutContentSuspenseQuery>;
export const PublicFaqContentDocument = gql`
    query PublicFAQContent {
  publicFAQContent {
    categories {
      title
      faqs {
        question
        answer
      }
    }
  }
}
    `;

/**
 * __usePublicFaqContentQuery__
 *
 * To run a query within a React component, call `usePublicFaqContentQuery` and pass it any options that fit your needs.
 * When your component renders, `usePublicFaqContentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePublicFaqContentQuery({
 *   variables: {
 *   },
 * });
 */
export function usePublicFaqContentQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PublicFaqContentQuery, PublicFaqContentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<PublicFaqContentQuery, PublicFaqContentQueryVariables>(PublicFaqContentDocument, options);
      }
export function usePublicFaqContentLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PublicFaqContentQuery, PublicFaqContentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<PublicFaqContentQuery, PublicFaqContentQueryVariables>(PublicFaqContentDocument, options);
        }
// @ts-ignore
export function usePublicFaqContentSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<PublicFaqContentQuery, PublicFaqContentQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<PublicFaqContentQuery, PublicFaqContentQueryVariables>;
export function usePublicFaqContentSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<PublicFaqContentQuery, PublicFaqContentQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<PublicFaqContentQuery | undefined, PublicFaqContentQueryVariables>;
export function usePublicFaqContentSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<PublicFaqContentQuery, PublicFaqContentQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<PublicFaqContentQuery, PublicFaqContentQueryVariables>(PublicFaqContentDocument, options);
        }
export type PublicFaqContentQueryHookResult = ReturnType<typeof usePublicFaqContentQuery>;
export type PublicFaqContentLazyQueryHookResult = ReturnType<typeof usePublicFaqContentLazyQuery>;
export type PublicFaqContentSuspenseQueryHookResult = ReturnType<typeof usePublicFaqContentSuspenseQuery>;
export const PublicShippingContentDocument = gql`
    query PublicShippingContent {
  publicShippingContent {
    shippingOptions {
      icon
      title
      description
      price
    }
    shippingInfo {
      title
      content
    }
    returnsPolicy {
      icon
      title
      description
    }
    returnSteps {
      step
      title
      description
    }
  }
}
    `;

/**
 * __usePublicShippingContentQuery__
 *
 * To run a query within a React component, call `usePublicShippingContentQuery` and pass it any options that fit your needs.
 * When your component renders, `usePublicShippingContentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePublicShippingContentQuery({
 *   variables: {
 *   },
 * });
 */
export function usePublicShippingContentQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PublicShippingContentQuery, PublicShippingContentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<PublicShippingContentQuery, PublicShippingContentQueryVariables>(PublicShippingContentDocument, options);
      }
export function usePublicShippingContentLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PublicShippingContentQuery, PublicShippingContentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<PublicShippingContentQuery, PublicShippingContentQueryVariables>(PublicShippingContentDocument, options);
        }
// @ts-ignore
export function usePublicShippingContentSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<PublicShippingContentQuery, PublicShippingContentQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<PublicShippingContentQuery, PublicShippingContentQueryVariables>;
export function usePublicShippingContentSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<PublicShippingContentQuery, PublicShippingContentQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<PublicShippingContentQuery | undefined, PublicShippingContentQueryVariables>;
export function usePublicShippingContentSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<PublicShippingContentQuery, PublicShippingContentQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<PublicShippingContentQuery, PublicShippingContentQueryVariables>(PublicShippingContentDocument, options);
        }
export type PublicShippingContentQueryHookResult = ReturnType<typeof usePublicShippingContentQuery>;
export type PublicShippingContentLazyQueryHookResult = ReturnType<typeof usePublicShippingContentLazyQuery>;
export type PublicShippingContentSuspenseQueryHookResult = ReturnType<typeof usePublicShippingContentSuspenseQuery>;
export const PublicCareContentDocument = gql`
    query PublicCareContent {
  publicCareContent {
    glazeTypes {
      name
      icon
      description
      care
    }
    warnings {
      icon
      title
      description
    }
    safeFor
    avoid
  }
}
    `;

/**
 * __usePublicCareContentQuery__
 *
 * To run a query within a React component, call `usePublicCareContentQuery` and pass it any options that fit your needs.
 * When your component renders, `usePublicCareContentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePublicCareContentQuery({
 *   variables: {
 *   },
 * });
 */
export function usePublicCareContentQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PublicCareContentQuery, PublicCareContentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<PublicCareContentQuery, PublicCareContentQueryVariables>(PublicCareContentDocument, options);
      }
export function usePublicCareContentLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PublicCareContentQuery, PublicCareContentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<PublicCareContentQuery, PublicCareContentQueryVariables>(PublicCareContentDocument, options);
        }
// @ts-ignore
export function usePublicCareContentSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<PublicCareContentQuery, PublicCareContentQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<PublicCareContentQuery, PublicCareContentQueryVariables>;
export function usePublicCareContentSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<PublicCareContentQuery, PublicCareContentQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<PublicCareContentQuery | undefined, PublicCareContentQueryVariables>;
export function usePublicCareContentSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<PublicCareContentQuery, PublicCareContentQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<PublicCareContentQuery, PublicCareContentQueryVariables>(PublicCareContentDocument, options);
        }
export type PublicCareContentQueryHookResult = ReturnType<typeof usePublicCareContentQuery>;
export type PublicCareContentLazyQueryHookResult = ReturnType<typeof usePublicCareContentLazyQuery>;
export type PublicCareContentSuspenseQueryHookResult = ReturnType<typeof usePublicCareContentSuspenseQuery>;
export const PublicPrivacyContentDocument = gql`
    query PublicPrivacyContent {
  publicPrivacyContent {
    lastUpdated
    introduction
    sections {
      title
      content
    }
    contactEmail
  }
}
    `;

/**
 * __usePublicPrivacyContentQuery__
 *
 * To run a query within a React component, call `usePublicPrivacyContentQuery` and pass it any options that fit your needs.
 * When your component renders, `usePublicPrivacyContentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePublicPrivacyContentQuery({
 *   variables: {
 *   },
 * });
 */
export function usePublicPrivacyContentQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PublicPrivacyContentQuery, PublicPrivacyContentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<PublicPrivacyContentQuery, PublicPrivacyContentQueryVariables>(PublicPrivacyContentDocument, options);
      }
export function usePublicPrivacyContentLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PublicPrivacyContentQuery, PublicPrivacyContentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<PublicPrivacyContentQuery, PublicPrivacyContentQueryVariables>(PublicPrivacyContentDocument, options);
        }
// @ts-ignore
export function usePublicPrivacyContentSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<PublicPrivacyContentQuery, PublicPrivacyContentQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<PublicPrivacyContentQuery, PublicPrivacyContentQueryVariables>;
export function usePublicPrivacyContentSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<PublicPrivacyContentQuery, PublicPrivacyContentQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<PublicPrivacyContentQuery | undefined, PublicPrivacyContentQueryVariables>;
export function usePublicPrivacyContentSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<PublicPrivacyContentQuery, PublicPrivacyContentQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<PublicPrivacyContentQuery, PublicPrivacyContentQueryVariables>(PublicPrivacyContentDocument, options);
        }
export type PublicPrivacyContentQueryHookResult = ReturnType<typeof usePublicPrivacyContentQuery>;
export type PublicPrivacyContentLazyQueryHookResult = ReturnType<typeof usePublicPrivacyContentLazyQuery>;
export type PublicPrivacyContentSuspenseQueryHookResult = ReturnType<typeof usePublicPrivacyContentSuspenseQuery>;
export const PublicTermsContentDocument = gql`
    query PublicTermsContent {
  publicTermsContent {
    lastUpdated
    introduction
    sections {
      title
      content
    }
    contactEmail
  }
}
    `;

/**
 * __usePublicTermsContentQuery__
 *
 * To run a query within a React component, call `usePublicTermsContentQuery` and pass it any options that fit your needs.
 * When your component renders, `usePublicTermsContentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePublicTermsContentQuery({
 *   variables: {
 *   },
 * });
 */
export function usePublicTermsContentQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PublicTermsContentQuery, PublicTermsContentQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<PublicTermsContentQuery, PublicTermsContentQueryVariables>(PublicTermsContentDocument, options);
      }
export function usePublicTermsContentLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PublicTermsContentQuery, PublicTermsContentQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<PublicTermsContentQuery, PublicTermsContentQueryVariables>(PublicTermsContentDocument, options);
        }
// @ts-ignore
export function usePublicTermsContentSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<PublicTermsContentQuery, PublicTermsContentQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<PublicTermsContentQuery, PublicTermsContentQueryVariables>;
export function usePublicTermsContentSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<PublicTermsContentQuery, PublicTermsContentQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<PublicTermsContentQuery | undefined, PublicTermsContentQueryVariables>;
export function usePublicTermsContentSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<PublicTermsContentQuery, PublicTermsContentQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<PublicTermsContentQuery, PublicTermsContentQueryVariables>(PublicTermsContentDocument, options);
        }
export type PublicTermsContentQueryHookResult = ReturnType<typeof usePublicTermsContentQuery>;
export type PublicTermsContentLazyQueryHookResult = ReturnType<typeof usePublicTermsContentLazyQuery>;
export type PublicTermsContentSuspenseQueryHookResult = ReturnType<typeof usePublicTermsContentSuspenseQuery>;
export const PublicHeroImagesDocument = gql`
    query PublicHeroImages {
  publicHeroImages {
    home
    ourStory
    products
    events
  }
}
    `;

/**
 * __usePublicHeroImagesQuery__
 *
 * To run a query within a React component, call `usePublicHeroImagesQuery` and pass it any options that fit your needs.
 * When your component renders, `usePublicHeroImagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePublicHeroImagesQuery({
 *   variables: {
 *   },
 * });
 */
export function usePublicHeroImagesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PublicHeroImagesQuery, PublicHeroImagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<PublicHeroImagesQuery, PublicHeroImagesQueryVariables>(PublicHeroImagesDocument, options);
      }
export function usePublicHeroImagesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PublicHeroImagesQuery, PublicHeroImagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<PublicHeroImagesQuery, PublicHeroImagesQueryVariables>(PublicHeroImagesDocument, options);
        }
// @ts-ignore
export function usePublicHeroImagesSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<PublicHeroImagesQuery, PublicHeroImagesQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<PublicHeroImagesQuery, PublicHeroImagesQueryVariables>;
export function usePublicHeroImagesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<PublicHeroImagesQuery, PublicHeroImagesQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<PublicHeroImagesQuery | undefined, PublicHeroImagesQueryVariables>;
export function usePublicHeroImagesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<PublicHeroImagesQuery, PublicHeroImagesQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<PublicHeroImagesQuery, PublicHeroImagesQueryVariables>(PublicHeroImagesDocument, options);
        }
export type PublicHeroImagesQueryHookResult = ReturnType<typeof usePublicHeroImagesQuery>;
export type PublicHeroImagesLazyQueryHookResult = ReturnType<typeof usePublicHeroImagesLazyQuery>;
export type PublicHeroImagesSuspenseQueryHookResult = ReturnType<typeof usePublicHeroImagesSuspenseQuery>;
export const PublicContactInfoDocument = gql`
    query PublicContactInfo {
  publicContactInfo {
    address
    email
    phone
    hours
  }
}
    `;

/**
 * __usePublicContactInfoQuery__
 *
 * To run a query within a React component, call `usePublicContactInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `usePublicContactInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePublicContactInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function usePublicContactInfoQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PublicContactInfoQuery, PublicContactInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<PublicContactInfoQuery, PublicContactInfoQueryVariables>(PublicContactInfoDocument, options);
      }
export function usePublicContactInfoLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PublicContactInfoQuery, PublicContactInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<PublicContactInfoQuery, PublicContactInfoQueryVariables>(PublicContactInfoDocument, options);
        }
// @ts-ignore
export function usePublicContactInfoSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<PublicContactInfoQuery, PublicContactInfoQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<PublicContactInfoQuery, PublicContactInfoQueryVariables>;
export function usePublicContactInfoSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<PublicContactInfoQuery, PublicContactInfoQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<PublicContactInfoQuery | undefined, PublicContactInfoQueryVariables>;
export function usePublicContactInfoSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<PublicContactInfoQuery, PublicContactInfoQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<PublicContactInfoQuery, PublicContactInfoQueryVariables>(PublicContactInfoDocument, options);
        }
export type PublicContactInfoQueryHookResult = ReturnType<typeof usePublicContactInfoQuery>;
export type PublicContactInfoLazyQueryHookResult = ReturnType<typeof usePublicContactInfoLazyQuery>;
export type PublicContactInfoSuspenseQueryHookResult = ReturnType<typeof usePublicContactInfoSuspenseQuery>;
export const PublicSocialLinksDocument = gql`
    query PublicSocialLinks {
  publicSocialLinks {
    instagram
    facebook
    twitter
    pinterest
  }
}
    `;

/**
 * __usePublicSocialLinksQuery__
 *
 * To run a query within a React component, call `usePublicSocialLinksQuery` and pass it any options that fit your needs.
 * When your component renders, `usePublicSocialLinksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePublicSocialLinksQuery({
 *   variables: {
 *   },
 * });
 */
export function usePublicSocialLinksQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PublicSocialLinksQuery, PublicSocialLinksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<PublicSocialLinksQuery, PublicSocialLinksQueryVariables>(PublicSocialLinksDocument, options);
      }
export function usePublicSocialLinksLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PublicSocialLinksQuery, PublicSocialLinksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<PublicSocialLinksQuery, PublicSocialLinksQueryVariables>(PublicSocialLinksDocument, options);
        }
// @ts-ignore
export function usePublicSocialLinksSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<PublicSocialLinksQuery, PublicSocialLinksQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<PublicSocialLinksQuery, PublicSocialLinksQueryVariables>;
export function usePublicSocialLinksSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<PublicSocialLinksQuery, PublicSocialLinksQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<PublicSocialLinksQuery | undefined, PublicSocialLinksQueryVariables>;
export function usePublicSocialLinksSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<PublicSocialLinksQuery, PublicSocialLinksQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<PublicSocialLinksQuery, PublicSocialLinksQueryVariables>(PublicSocialLinksDocument, options);
        }
export type PublicSocialLinksQueryHookResult = ReturnType<typeof usePublicSocialLinksQuery>;
export type PublicSocialLinksLazyQueryHookResult = ReturnType<typeof usePublicSocialLinksLazyQuery>;
export type PublicSocialLinksSuspenseQueryHookResult = ReturnType<typeof usePublicSocialLinksSuspenseQuery>;
export const AdminUpdateRegistrationStatusDocument = gql`
    mutation AdminUpdateRegistrationStatus($registrationId: String!, $status: String!) {
  adminUpdateRegistrationStatus(registrationId: $registrationId, status: $status) {
    success
    error
  }
}
    `;

/**
 * __useAdminUpdateRegistrationStatusMutation__
 *
 * To run a mutation, you first call `useAdminUpdateRegistrationStatusMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminUpdateRegistrationStatusMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminUpdateRegistrationStatusMutation, { data, loading, error }] = useAdminUpdateRegistrationStatusMutation({
 *   variables: {
 *      registrationId: // value for 'registrationId'
 *      status: // value for 'status'
 *   },
 * });
 */
export function useAdminUpdateRegistrationStatusMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AdminUpdateRegistrationStatusMutation, AdminUpdateRegistrationStatusMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AdminUpdateRegistrationStatusMutation, AdminUpdateRegistrationStatusMutationVariables>(AdminUpdateRegistrationStatusDocument, options);
      }
export type AdminUpdateRegistrationStatusMutationHookResult = ReturnType<typeof useAdminUpdateRegistrationStatusMutation>;
export const AdminUpdateRegistrationPriceDocument = gql`
    mutation AdminUpdateRegistrationPrice($registrationId: String!, $price: Float!) {
  adminUpdateRegistrationPrice(registrationId: $registrationId, price: $price) {
    success
    error
  }
}
    `;

/**
 * __useAdminUpdateRegistrationPriceMutation__
 *
 * To run a mutation, you first call `useAdminUpdateRegistrationPriceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminUpdateRegistrationPriceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminUpdateRegistrationPriceMutation, { data, loading, error }] = useAdminUpdateRegistrationPriceMutation({
 *   variables: {
 *      registrationId: // value for 'registrationId'
 *      price: // value for 'price'
 *   },
 * });
 */
export function useAdminUpdateRegistrationPriceMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AdminUpdateRegistrationPriceMutation, AdminUpdateRegistrationPriceMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AdminUpdateRegistrationPriceMutation, AdminUpdateRegistrationPriceMutationVariables>(AdminUpdateRegistrationPriceDocument, options);
      }
export type AdminUpdateRegistrationPriceMutationHookResult = ReturnType<typeof useAdminUpdateRegistrationPriceMutation>;
export const AdminUpdateRegistrationDetailsDocument = gql`
    mutation AdminUpdateRegistrationDetails($registrationId: String!, $input: UpdateRegistrationDetailsInput!) {
  adminUpdateRegistrationDetails(registrationId: $registrationId, input: $input) {
    success
    error
  }
}
    `;

/**
 * __useAdminUpdateRegistrationDetailsMutation__
 *
 * To run a mutation, you first call `useAdminUpdateRegistrationDetailsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminUpdateRegistrationDetailsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminUpdateRegistrationDetailsMutation, { data, loading, error }] = useAdminUpdateRegistrationDetailsMutation({
 *   variables: {
 *      registrationId: // value for 'registrationId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAdminUpdateRegistrationDetailsMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AdminUpdateRegistrationDetailsMutation, AdminUpdateRegistrationDetailsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AdminUpdateRegistrationDetailsMutation, AdminUpdateRegistrationDetailsMutationVariables>(AdminUpdateRegistrationDetailsDocument, options);
      }
export type AdminUpdateRegistrationDetailsMutationHookResult = ReturnType<typeof useAdminUpdateRegistrationDetailsMutation>;
export const AdminUpdateHeroImagesDocument = gql`
    mutation AdminUpdateHeroImages($input: UpdateHeroImagesInput!) {
  adminUpdateHeroImages(input: $input) {
    success
    error
  }
}
    `;

/**
 * __useAdminUpdateHeroImagesMutation__
 *
 * To run a mutation, you first call `useAdminUpdateHeroImagesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminUpdateHeroImagesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminUpdateHeroImagesMutation, { data, loading, error }] = useAdminUpdateHeroImagesMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAdminUpdateHeroImagesMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AdminUpdateHeroImagesMutation, AdminUpdateHeroImagesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AdminUpdateHeroImagesMutation, AdminUpdateHeroImagesMutationVariables>(AdminUpdateHeroImagesDocument, options);
      }
export type AdminUpdateHeroImagesMutationHookResult = ReturnType<typeof useAdminUpdateHeroImagesMutation>;
export const AdminUpdateContactInfoDocument = gql`
    mutation AdminUpdateContactInfo($input: UpdateContactInfoInput!) {
  adminUpdateContactInfo(input: $input) {
    success
    error
  }
}
    `;

/**
 * __useAdminUpdateContactInfoMutation__
 *
 * To run a mutation, you first call `useAdminUpdateContactInfoMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminUpdateContactInfoMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminUpdateContactInfoMutation, { data, loading, error }] = useAdminUpdateContactInfoMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAdminUpdateContactInfoMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AdminUpdateContactInfoMutation, AdminUpdateContactInfoMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AdminUpdateContactInfoMutation, AdminUpdateContactInfoMutationVariables>(AdminUpdateContactInfoDocument, options);
      }
export type AdminUpdateContactInfoMutationHookResult = ReturnType<typeof useAdminUpdateContactInfoMutation>;
export const AdminUpdateSocialLinksDocument = gql`
    mutation AdminUpdateSocialLinks($input: UpdateSocialLinksInput!) {
  adminUpdateSocialLinks(input: $input) {
    success
    error
  }
}
    `;

/**
 * __useAdminUpdateSocialLinksMutation__
 *
 * To run a mutation, you first call `useAdminUpdateSocialLinksMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminUpdateSocialLinksMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminUpdateSocialLinksMutation, { data, loading, error }] = useAdminUpdateSocialLinksMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAdminUpdateSocialLinksMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AdminUpdateSocialLinksMutation, AdminUpdateSocialLinksMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AdminUpdateSocialLinksMutation, AdminUpdateSocialLinksMutationVariables>(AdminUpdateSocialLinksDocument, options);
      }
export type AdminUpdateSocialLinksMutationHookResult = ReturnType<typeof useAdminUpdateSocialLinksMutation>;
export const AdminAllSettingsDocument = gql`
    query AdminAllSettings {
  adminAllSettings {
    id
    key
    value
    updated_at
  }
}
    `;

/**
 * __useAdminAllSettingsQuery__
 *
 * To run a query within a React component, call `useAdminAllSettingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminAllSettingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminAllSettingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAdminAllSettingsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AdminAllSettingsQuery, AdminAllSettingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<AdminAllSettingsQuery, AdminAllSettingsQueryVariables>(AdminAllSettingsDocument, options);
      }
export function useAdminAllSettingsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AdminAllSettingsQuery, AdminAllSettingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<AdminAllSettingsQuery, AdminAllSettingsQueryVariables>(AdminAllSettingsDocument, options);
        }
// @ts-ignore
export function useAdminAllSettingsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<AdminAllSettingsQuery, AdminAllSettingsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminAllSettingsQuery, AdminAllSettingsQueryVariables>;
export function useAdminAllSettingsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminAllSettingsQuery, AdminAllSettingsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminAllSettingsQuery | undefined, AdminAllSettingsQueryVariables>;
export function useAdminAllSettingsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminAllSettingsQuery, AdminAllSettingsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<AdminAllSettingsQuery, AdminAllSettingsQueryVariables>(AdminAllSettingsDocument, options);
        }
export type AdminAllSettingsQueryHookResult = ReturnType<typeof useAdminAllSettingsQuery>;
export type AdminAllSettingsLazyQueryHookResult = ReturnType<typeof useAdminAllSettingsLazyQuery>;
export type AdminAllSettingsSuspenseQueryHookResult = ReturnType<typeof useAdminAllSettingsSuspenseQuery>;
export const AdminHeroImagesDocument = gql`
    query AdminHeroImages {
  adminHeroImages {
    home
    ourStory
    products
    events
  }
}
    `;

/**
 * __useAdminHeroImagesQuery__
 *
 * To run a query within a React component, call `useAdminHeroImagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminHeroImagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminHeroImagesQuery({
 *   variables: {
 *   },
 * });
 */
export function useAdminHeroImagesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AdminHeroImagesQuery, AdminHeroImagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<AdminHeroImagesQuery, AdminHeroImagesQueryVariables>(AdminHeroImagesDocument, options);
      }
export function useAdminHeroImagesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AdminHeroImagesQuery, AdminHeroImagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<AdminHeroImagesQuery, AdminHeroImagesQueryVariables>(AdminHeroImagesDocument, options);
        }
// @ts-ignore
export function useAdminHeroImagesSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<AdminHeroImagesQuery, AdminHeroImagesQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminHeroImagesQuery, AdminHeroImagesQueryVariables>;
export function useAdminHeroImagesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminHeroImagesQuery, AdminHeroImagesQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminHeroImagesQuery | undefined, AdminHeroImagesQueryVariables>;
export function useAdminHeroImagesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminHeroImagesQuery, AdminHeroImagesQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<AdminHeroImagesQuery, AdminHeroImagesQueryVariables>(AdminHeroImagesDocument, options);
        }
export type AdminHeroImagesQueryHookResult = ReturnType<typeof useAdminHeroImagesQuery>;
export type AdminHeroImagesLazyQueryHookResult = ReturnType<typeof useAdminHeroImagesLazyQuery>;
export type AdminHeroImagesSuspenseQueryHookResult = ReturnType<typeof useAdminHeroImagesSuspenseQuery>;
export const AdminContactInfoDocument = gql`
    query AdminContactInfo {
  adminContactInfo {
    address
    email
    phone
    hours
  }
}
    `;

/**
 * __useAdminContactInfoQuery__
 *
 * To run a query within a React component, call `useAdminContactInfoQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminContactInfoQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminContactInfoQuery({
 *   variables: {
 *   },
 * });
 */
export function useAdminContactInfoQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AdminContactInfoQuery, AdminContactInfoQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<AdminContactInfoQuery, AdminContactInfoQueryVariables>(AdminContactInfoDocument, options);
      }
export function useAdminContactInfoLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AdminContactInfoQuery, AdminContactInfoQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<AdminContactInfoQuery, AdminContactInfoQueryVariables>(AdminContactInfoDocument, options);
        }
// @ts-ignore
export function useAdminContactInfoSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<AdminContactInfoQuery, AdminContactInfoQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminContactInfoQuery, AdminContactInfoQueryVariables>;
export function useAdminContactInfoSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminContactInfoQuery, AdminContactInfoQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminContactInfoQuery | undefined, AdminContactInfoQueryVariables>;
export function useAdminContactInfoSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminContactInfoQuery, AdminContactInfoQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<AdminContactInfoQuery, AdminContactInfoQueryVariables>(AdminContactInfoDocument, options);
        }
export type AdminContactInfoQueryHookResult = ReturnType<typeof useAdminContactInfoQuery>;
export type AdminContactInfoLazyQueryHookResult = ReturnType<typeof useAdminContactInfoLazyQuery>;
export type AdminContactInfoSuspenseQueryHookResult = ReturnType<typeof useAdminContactInfoSuspenseQuery>;
export const AdminSocialLinksDocument = gql`
    query AdminSocialLinks {
  adminSocialLinks {
    instagram
    facebook
    twitter
    pinterest
  }
}
    `;

/**
 * __useAdminSocialLinksQuery__
 *
 * To run a query within a React component, call `useAdminSocialLinksQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminSocialLinksQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminSocialLinksQuery({
 *   variables: {
 *   },
 * });
 */
export function useAdminSocialLinksQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AdminSocialLinksQuery, AdminSocialLinksQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<AdminSocialLinksQuery, AdminSocialLinksQueryVariables>(AdminSocialLinksDocument, options);
      }
export function useAdminSocialLinksLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AdminSocialLinksQuery, AdminSocialLinksQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<AdminSocialLinksQuery, AdminSocialLinksQueryVariables>(AdminSocialLinksDocument, options);
        }
// @ts-ignore
export function useAdminSocialLinksSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<AdminSocialLinksQuery, AdminSocialLinksQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminSocialLinksQuery, AdminSocialLinksQueryVariables>;
export function useAdminSocialLinksSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminSocialLinksQuery, AdminSocialLinksQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminSocialLinksQuery | undefined, AdminSocialLinksQueryVariables>;
export function useAdminSocialLinksSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminSocialLinksQuery, AdminSocialLinksQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<AdminSocialLinksQuery, AdminSocialLinksQueryVariables>(AdminSocialLinksDocument, options);
        }
export type AdminSocialLinksQueryHookResult = ReturnType<typeof useAdminSocialLinksQuery>;
export type AdminSocialLinksLazyQueryHookResult = ReturnType<typeof useAdminSocialLinksLazyQuery>;
export type AdminSocialLinksSuspenseQueryHookResult = ReturnType<typeof useAdminSocialLinksSuspenseQuery>;
export const AdminGetPresignedUploadUrlDocument = gql`
    mutation AdminGetPresignedUploadUrl($input: GetPresignedUploadUrlInput!) {
  adminGetPresignedUploadUrl(input: $input) {
    success
    presignedUrl
    publicUrl
    key
    error
  }
}
    `;

/**
 * __useAdminGetPresignedUploadUrlMutation__
 *
 * To run a mutation, you first call `useAdminGetPresignedUploadUrlMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminGetPresignedUploadUrlMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminGetPresignedUploadUrlMutation, { data, loading, error }] = useAdminGetPresignedUploadUrlMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAdminGetPresignedUploadUrlMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AdminGetPresignedUploadUrlMutation, AdminGetPresignedUploadUrlMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AdminGetPresignedUploadUrlMutation, AdminGetPresignedUploadUrlMutationVariables>(AdminGetPresignedUploadUrlDocument, options);
      }
export type AdminGetPresignedUploadUrlMutationHookResult = ReturnType<typeof useAdminGetPresignedUploadUrlMutation>;
export const AdminUpdateUserRoleDocument = gql`
    mutation AdminUpdateUserRole($userId: Int!, $role: String!) {
  adminUpdateUserRole(userId: $userId, role: $role) {
    success
    error
  }
}
    `;

/**
 * __useAdminUpdateUserRoleMutation__
 *
 * To run a mutation, you first call `useAdminUpdateUserRoleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAdminUpdateUserRoleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [adminUpdateUserRoleMutation, { data, loading, error }] = useAdminUpdateUserRoleMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      role: // value for 'role'
 *   },
 * });
 */
export function useAdminUpdateUserRoleMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AdminUpdateUserRoleMutation, AdminUpdateUserRoleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AdminUpdateUserRoleMutation, AdminUpdateUserRoleMutationVariables>(AdminUpdateUserRoleDocument, options);
      }
export type AdminUpdateUserRoleMutationHookResult = ReturnType<typeof useAdminUpdateUserRoleMutation>;
export const AdminUsersDocument = gql`
    query AdminUsers($filter: AdminUsersFilterInput) {
  adminUsers(filter: $filter) {
    users {
      id
      auth_id
      email
      name
      image
      phone
      role
      created_at
      _count {
        product_orders
        event_registrations
      }
      pendingOrdersCount
      pendingRegistrationsCount
    }
    total
    page
    limit
    totalPages
  }
}
    `;

/**
 * __useAdminUsersQuery__
 *
 * To run a query within a React component, call `useAdminUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminUsersQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useAdminUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<AdminUsersQuery, AdminUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<AdminUsersQuery, AdminUsersQueryVariables>(AdminUsersDocument, options);
      }
export function useAdminUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AdminUsersQuery, AdminUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<AdminUsersQuery, AdminUsersQueryVariables>(AdminUsersDocument, options);
        }
// @ts-ignore
export function useAdminUsersSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<AdminUsersQuery, AdminUsersQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminUsersQuery, AdminUsersQueryVariables>;
export function useAdminUsersSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminUsersQuery, AdminUsersQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminUsersQuery | undefined, AdminUsersQueryVariables>;
export function useAdminUsersSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminUsersQuery, AdminUsersQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<AdminUsersQuery, AdminUsersQueryVariables>(AdminUsersDocument, options);
        }
export type AdminUsersQueryHookResult = ReturnType<typeof useAdminUsersQuery>;
export type AdminUsersLazyQueryHookResult = ReturnType<typeof useAdminUsersLazyQuery>;
export type AdminUsersSuspenseQueryHookResult = ReturnType<typeof useAdminUsersSuspenseQuery>;
export const AdminUserByIdDocument = gql`
    query AdminUserById($id: Int!) {
  adminUserById(id: $id) {
    id
    auth_id
    email
    name
    image
    phone
    role
    created_at
    updated_at
    _count {
      product_orders
      event_registrations
      wishlists
      carts
      reviews
    }
  }
}
    `;

/**
 * __useAdminUserByIdQuery__
 *
 * To run a query within a React component, call `useAdminUserByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminUserByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminUserByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useAdminUserByIdQuery(baseOptions: ApolloReactHooks.QueryHookOptions<AdminUserByIdQuery, AdminUserByIdQueryVariables> & ({ variables: AdminUserByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<AdminUserByIdQuery, AdminUserByIdQueryVariables>(AdminUserByIdDocument, options);
      }
export function useAdminUserByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AdminUserByIdQuery, AdminUserByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<AdminUserByIdQuery, AdminUserByIdQueryVariables>(AdminUserByIdDocument, options);
        }
// @ts-ignore
export function useAdminUserByIdSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<AdminUserByIdQuery, AdminUserByIdQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminUserByIdQuery, AdminUserByIdQueryVariables>;
export function useAdminUserByIdSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminUserByIdQuery, AdminUserByIdQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminUserByIdQuery | undefined, AdminUserByIdQueryVariables>;
export function useAdminUserByIdSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminUserByIdQuery, AdminUserByIdQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<AdminUserByIdQuery, AdminUserByIdQueryVariables>(AdminUserByIdDocument, options);
        }
export type AdminUserByIdQueryHookResult = ReturnType<typeof useAdminUserByIdQuery>;
export type AdminUserByIdLazyQueryHookResult = ReturnType<typeof useAdminUserByIdLazyQuery>;
export type AdminUserByIdSuspenseQueryHookResult = ReturnType<typeof useAdminUserByIdSuspenseQuery>;
export const AdminUserOrdersDocument = gql`
    query AdminUserOrders($userId: Int!) {
  adminUserOrders(userId: $userId) {
    id
    status
    total
    subtotal
    discount
    shipping_fee
    created_at
    request_at
    approved_at
    paid_at
    shipped_at
    delivered_at
    cancelled_at
    returned_at
    refunded_at
    ordered_products {
      id
      quantity
      price
      discount
      product {
        id
        name
        slug
        image_urls
      }
    }
  }
}
    `;

/**
 * __useAdminUserOrdersQuery__
 *
 * To run a query within a React component, call `useAdminUserOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminUserOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminUserOrdersQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useAdminUserOrdersQuery(baseOptions: ApolloReactHooks.QueryHookOptions<AdminUserOrdersQuery, AdminUserOrdersQueryVariables> & ({ variables: AdminUserOrdersQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<AdminUserOrdersQuery, AdminUserOrdersQueryVariables>(AdminUserOrdersDocument, options);
      }
export function useAdminUserOrdersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AdminUserOrdersQuery, AdminUserOrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<AdminUserOrdersQuery, AdminUserOrdersQueryVariables>(AdminUserOrdersDocument, options);
        }
// @ts-ignore
export function useAdminUserOrdersSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<AdminUserOrdersQuery, AdminUserOrdersQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminUserOrdersQuery, AdminUserOrdersQueryVariables>;
export function useAdminUserOrdersSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminUserOrdersQuery, AdminUserOrdersQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminUserOrdersQuery | undefined, AdminUserOrdersQueryVariables>;
export function useAdminUserOrdersSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminUserOrdersQuery, AdminUserOrdersQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<AdminUserOrdersQuery, AdminUserOrdersQueryVariables>(AdminUserOrdersDocument, options);
        }
export type AdminUserOrdersQueryHookResult = ReturnType<typeof useAdminUserOrdersQuery>;
export type AdminUserOrdersLazyQueryHookResult = ReturnType<typeof useAdminUserOrdersLazyQuery>;
export type AdminUserOrdersSuspenseQueryHookResult = ReturnType<typeof useAdminUserOrdersSuspenseQuery>;
export const AdminUserRegistrationsDocument = gql`
    query AdminUserRegistrations($userId: Int!) {
  adminUserRegistrations(userId: $userId) {
    id
    status
    seats_reserved
    price
    discount
    created_at
    request_at
    approved_at
    paid_at
    confirmed_at
    cancelled_at
    event {
      id
      title
      slug
      starts_at
      ends_at
      location
      image
      price
    }
  }
}
    `;

/**
 * __useAdminUserRegistrationsQuery__
 *
 * To run a query within a React component, call `useAdminUserRegistrationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminUserRegistrationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminUserRegistrationsQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useAdminUserRegistrationsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<AdminUserRegistrationsQuery, AdminUserRegistrationsQueryVariables> & ({ variables: AdminUserRegistrationsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<AdminUserRegistrationsQuery, AdminUserRegistrationsQueryVariables>(AdminUserRegistrationsDocument, options);
      }
export function useAdminUserRegistrationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AdminUserRegistrationsQuery, AdminUserRegistrationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<AdminUserRegistrationsQuery, AdminUserRegistrationsQueryVariables>(AdminUserRegistrationsDocument, options);
        }
// @ts-ignore
export function useAdminUserRegistrationsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<AdminUserRegistrationsQuery, AdminUserRegistrationsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminUserRegistrationsQuery, AdminUserRegistrationsQueryVariables>;
export function useAdminUserRegistrationsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminUserRegistrationsQuery, AdminUserRegistrationsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminUserRegistrationsQuery | undefined, AdminUserRegistrationsQueryVariables>;
export function useAdminUserRegistrationsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminUserRegistrationsQuery, AdminUserRegistrationsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<AdminUserRegistrationsQuery, AdminUserRegistrationsQueryVariables>(AdminUserRegistrationsDocument, options);
        }
export type AdminUserRegistrationsQueryHookResult = ReturnType<typeof useAdminUserRegistrationsQuery>;
export type AdminUserRegistrationsLazyQueryHookResult = ReturnType<typeof useAdminUserRegistrationsLazyQuery>;
export type AdminUserRegistrationsSuspenseQueryHookResult = ReturnType<typeof useAdminUserRegistrationsSuspenseQuery>;
export const AdminUserCartDocument = gql`
    query AdminUserCart($userId: Int!) {
  adminUserCart(userId: $userId) {
    id
    quantity
    created_at
    product {
      id
      name
      slug
      price
      available_quantity
      image_urls
    }
  }
}
    `;

/**
 * __useAdminUserCartQuery__
 *
 * To run a query within a React component, call `useAdminUserCartQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminUserCartQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminUserCartQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useAdminUserCartQuery(baseOptions: ApolloReactHooks.QueryHookOptions<AdminUserCartQuery, AdminUserCartQueryVariables> & ({ variables: AdminUserCartQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<AdminUserCartQuery, AdminUserCartQueryVariables>(AdminUserCartDocument, options);
      }
export function useAdminUserCartLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AdminUserCartQuery, AdminUserCartQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<AdminUserCartQuery, AdminUserCartQueryVariables>(AdminUserCartDocument, options);
        }
// @ts-ignore
export function useAdminUserCartSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<AdminUserCartQuery, AdminUserCartQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminUserCartQuery, AdminUserCartQueryVariables>;
export function useAdminUserCartSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminUserCartQuery, AdminUserCartQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminUserCartQuery | undefined, AdminUserCartQueryVariables>;
export function useAdminUserCartSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminUserCartQuery, AdminUserCartQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<AdminUserCartQuery, AdminUserCartQueryVariables>(AdminUserCartDocument, options);
        }
export type AdminUserCartQueryHookResult = ReturnType<typeof useAdminUserCartQuery>;
export type AdminUserCartLazyQueryHookResult = ReturnType<typeof useAdminUserCartLazyQuery>;
export type AdminUserCartSuspenseQueryHookResult = ReturnType<typeof useAdminUserCartSuspenseQuery>;
export const AdminUserWishlistDocument = gql`
    query AdminUserWishlist($userId: Int!, $page: Int, $limit: Int) {
  adminUserWishlist(userId: $userId, page: $page, limit: $limit) {
    data {
      id
      created_at
      product {
        id
        name
        slug
        price
        available_quantity
        image_urls
      }
    }
    total
    page
    totalPages
  }
}
    `;

/**
 * __useAdminUserWishlistQuery__
 *
 * To run a query within a React component, call `useAdminUserWishlistQuery` and pass it any options that fit your needs.
 * When your component renders, `useAdminUserWishlistQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAdminUserWishlistQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      page: // value for 'page'
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useAdminUserWishlistQuery(baseOptions: ApolloReactHooks.QueryHookOptions<AdminUserWishlistQuery, AdminUserWishlistQueryVariables> & ({ variables: AdminUserWishlistQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<AdminUserWishlistQuery, AdminUserWishlistQueryVariables>(AdminUserWishlistDocument, options);
      }
export function useAdminUserWishlistLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<AdminUserWishlistQuery, AdminUserWishlistQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<AdminUserWishlistQuery, AdminUserWishlistQueryVariables>(AdminUserWishlistDocument, options);
        }
// @ts-ignore
export function useAdminUserWishlistSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<AdminUserWishlistQuery, AdminUserWishlistQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminUserWishlistQuery, AdminUserWishlistQueryVariables>;
export function useAdminUserWishlistSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminUserWishlistQuery, AdminUserWishlistQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<AdminUserWishlistQuery | undefined, AdminUserWishlistQueryVariables>;
export function useAdminUserWishlistSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<AdminUserWishlistQuery, AdminUserWishlistQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<AdminUserWishlistQuery, AdminUserWishlistQueryVariables>(AdminUserWishlistDocument, options);
        }
export type AdminUserWishlistQueryHookResult = ReturnType<typeof useAdminUserWishlistQuery>;
export type AdminUserWishlistLazyQueryHookResult = ReturnType<typeof useAdminUserWishlistLazyQuery>;
export type AdminUserWishlistSuspenseQueryHookResult = ReturnType<typeof useAdminUserWishlistSuspenseQuery>;
export const AddToCartDocument = gql`
    mutation AddToCart($input: AddToCartInput!) {
  addToCart(input: $input) {
    success
    item {
      id
      user_id
      product_id
      quantity
      created_at
      updated_at
      product {
        id
        slug
        name
        price
        image_urls
        reviews_count
        avg_rating
        material
        in_wishlist
        is_active
        available_quantity
        total_quantity
        color_code
        color_name
      }
    }
  }
}
    `;

/**
 * __useAddToCartMutation__
 *
 * To run a mutation, you first call `useAddToCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddToCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addToCartMutation, { data, loading, error }] = useAddToCartMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddToCartMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddToCartMutation, AddToCartMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AddToCartMutation, AddToCartMutationVariables>(AddToCartDocument, options);
      }
export type AddToCartMutationHookResult = ReturnType<typeof useAddToCartMutation>;
export const UpdateCartQuantityDocument = gql`
    mutation UpdateCartQuantity($input: UpdateCartQuantityInput!) {
  updateCartQuantity(input: $input) {
    success
    item {
      id
      user_id
      product_id
      quantity
      created_at
      updated_at
      product {
        id
        slug
        name
        price
        image_urls
        reviews_count
        avg_rating
        material
        in_wishlist
        is_active
        available_quantity
        total_quantity
        color_code
        color_name
      }
    }
  }
}
    `;

/**
 * __useUpdateCartQuantityMutation__
 *
 * To run a mutation, you first call `useUpdateCartQuantityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCartQuantityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCartQuantityMutation, { data, loading, error }] = useUpdateCartQuantityMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateCartQuantityMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateCartQuantityMutation, UpdateCartQuantityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UpdateCartQuantityMutation, UpdateCartQuantityMutationVariables>(UpdateCartQuantityDocument, options);
      }
export type UpdateCartQuantityMutationHookResult = ReturnType<typeof useUpdateCartQuantityMutation>;
export const RemoveFromCartDocument = gql`
    mutation RemoveFromCart($productId: Int!) {
  removeFromCart(productId: $productId)
}
    `;

/**
 * __useRemoveFromCartMutation__
 *
 * To run a mutation, you first call `useRemoveFromCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveFromCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeFromCartMutation, { data, loading, error }] = useRemoveFromCartMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useRemoveFromCartMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveFromCartMutation, RemoveFromCartMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<RemoveFromCartMutation, RemoveFromCartMutationVariables>(RemoveFromCartDocument, options);
      }
export type RemoveFromCartMutationHookResult = ReturnType<typeof useRemoveFromCartMutation>;
export const ClearCartDocument = gql`
    mutation ClearCart {
  clearCart
}
    `;

/**
 * __useClearCartMutation__
 *
 * To run a mutation, you first call `useClearCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useClearCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [clearCartMutation, { data, loading, error }] = useClearCartMutation({
 *   variables: {
 *   },
 * });
 */
export function useClearCartMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ClearCartMutation, ClearCartMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<ClearCartMutation, ClearCartMutationVariables>(ClearCartDocument, options);
      }
export type ClearCartMutationHookResult = ReturnType<typeof useClearCartMutation>;
export const CartDocument = gql`
    query Cart {
  cart {
    items {
      id
      user_id
      product_id
      quantity
      created_at
      updated_at
      product {
        id
        slug
        name
        price
        image_urls
        reviews_count
        avg_rating
        material
        in_wishlist
        is_active
        available_quantity
        total_quantity
        color_code
        color_name
        collection {
          id
          slug
          name
          starts_at
          ends_at
          created_at
          updated_at
          products_count
        }
      }
    }
    total
    subtotal
  }
}
    `;

/**
 * __useCartQuery__
 *
 * To run a query within a React component, call `useCartQuery` and pass it any options that fit your needs.
 * When your component renders, `useCartQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCartQuery({
 *   variables: {
 *   },
 * });
 */
export function useCartQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CartQuery, CartQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<CartQuery, CartQueryVariables>(CartDocument, options);
      }
export function useCartLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CartQuery, CartQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<CartQuery, CartQueryVariables>(CartDocument, options);
        }
// @ts-ignore
export function useCartSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<CartQuery, CartQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<CartQuery, CartQueryVariables>;
export function useCartSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<CartQuery, CartQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<CartQuery | undefined, CartQueryVariables>;
export function useCartSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<CartQuery, CartQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<CartQuery, CartQueryVariables>(CartDocument, options);
        }
export type CartQueryHookResult = ReturnType<typeof useCartQuery>;
export type CartLazyQueryHookResult = ReturnType<typeof useCartLazyQuery>;
export type CartSuspenseQueryHookResult = ReturnType<typeof useCartSuspenseQuery>;
export const RegisterForEventDocument = gql`
    mutation RegisterForEvent($input: RegisterForEventInput!) {
  registerForEvent(input: $input) {
    success
    error
    registration {
      ...MutationEventRegistrationFields
    }
  }
}
    ${MutationEventRegistrationFieldsFragmentDoc}`;

/**
 * __useRegisterForEventMutation__
 *
 * To run a mutation, you first call `useRegisterForEventMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterForEventMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerForEventMutation, { data, loading, error }] = useRegisterForEventMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterForEventMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterForEventMutation, RegisterForEventMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<RegisterForEventMutation, RegisterForEventMutationVariables>(RegisterForEventDocument, options);
      }
export type RegisterForEventMutationHookResult = ReturnType<typeof useRegisterForEventMutation>;
export const CancelRegistrationDocument = gql`
    mutation CancelRegistration($registrationId: String!) {
  cancelRegistration(registrationId: $registrationId) {
    success
    error
  }
}
    `;

/**
 * __useCancelRegistrationMutation__
 *
 * To run a mutation, you first call `useCancelRegistrationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelRegistrationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelRegistrationMutation, { data, loading, error }] = useCancelRegistrationMutation({
 *   variables: {
 *      registrationId: // value for 'registrationId'
 *   },
 * });
 */
export function useCancelRegistrationMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CancelRegistrationMutation, CancelRegistrationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CancelRegistrationMutation, CancelRegistrationMutationVariables>(CancelRegistrationDocument, options);
      }
export type CancelRegistrationMutationHookResult = ReturnType<typeof useCancelRegistrationMutation>;
export const EventsDocument = gql`
    query Events($filter: EventsFilterInput) {
  events(filter: $filter) {
    data {
      ...EventBaseFields
    }
    total
    page
    total_pages
    levels
  }
}
    ${EventBaseFieldsFragmentDoc}`;

/**
 * __useEventsQuery__
 *
 * To run a query within a React component, call `useEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useEventsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<EventsQuery, EventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<EventsQuery, EventsQueryVariables>(EventsDocument, options);
      }
export function useEventsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<EventsQuery, EventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<EventsQuery, EventsQueryVariables>(EventsDocument, options);
        }
// @ts-ignore
export function useEventsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<EventsQuery, EventsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<EventsQuery, EventsQueryVariables>;
export function useEventsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<EventsQuery, EventsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<EventsQuery | undefined, EventsQueryVariables>;
export function useEventsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<EventsQuery, EventsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<EventsQuery, EventsQueryVariables>(EventsDocument, options);
        }
export type EventsQueryHookResult = ReturnType<typeof useEventsQuery>;
export type EventsLazyQueryHookResult = ReturnType<typeof useEventsLazyQuery>;
export type EventsSuspenseQueryHookResult = ReturnType<typeof useEventsSuspenseQuery>;
export const EventBySlugDocument = gql`
    query EventBySlug($slug: String!) {
  eventBySlug(slug: $slug) {
    ...EventDetailFields
  }
}
    ${EventDetailFieldsFragmentDoc}`;

/**
 * __useEventBySlugQuery__
 *
 * To run a query within a React component, call `useEventBySlugQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventBySlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventBySlugQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useEventBySlugQuery(baseOptions: ApolloReactHooks.QueryHookOptions<EventBySlugQuery, EventBySlugQueryVariables> & ({ variables: EventBySlugQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<EventBySlugQuery, EventBySlugQueryVariables>(EventBySlugDocument, options);
      }
export function useEventBySlugLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<EventBySlugQuery, EventBySlugQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<EventBySlugQuery, EventBySlugQueryVariables>(EventBySlugDocument, options);
        }
// @ts-ignore
export function useEventBySlugSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<EventBySlugQuery, EventBySlugQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<EventBySlugQuery, EventBySlugQueryVariables>;
export function useEventBySlugSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<EventBySlugQuery, EventBySlugQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<EventBySlugQuery | undefined, EventBySlugQueryVariables>;
export function useEventBySlugSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<EventBySlugQuery, EventBySlugQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<EventBySlugQuery, EventBySlugQueryVariables>(EventBySlugDocument, options);
        }
export type EventBySlugQueryHookResult = ReturnType<typeof useEventBySlugQuery>;
export type EventBySlugLazyQueryHookResult = ReturnType<typeof useEventBySlugLazyQuery>;
export type EventBySlugSuspenseQueryHookResult = ReturnType<typeof useEventBySlugSuspenseQuery>;
export const EventByIdDocument = gql`
    query EventById($id: String!) {
  eventById(id: $id) {
    ...EventDetailFields
  }
}
    ${EventDetailFieldsFragmentDoc}`;

/**
 * __useEventByIdQuery__
 *
 * To run a query within a React component, call `useEventByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useEventByIdQuery(baseOptions: ApolloReactHooks.QueryHookOptions<EventByIdQuery, EventByIdQueryVariables> & ({ variables: EventByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<EventByIdQuery, EventByIdQueryVariables>(EventByIdDocument, options);
      }
export function useEventByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<EventByIdQuery, EventByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<EventByIdQuery, EventByIdQueryVariables>(EventByIdDocument, options);
        }
// @ts-ignore
export function useEventByIdSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<EventByIdQuery, EventByIdQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<EventByIdQuery, EventByIdQueryVariables>;
export function useEventByIdSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<EventByIdQuery, EventByIdQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<EventByIdQuery | undefined, EventByIdQueryVariables>;
export function useEventByIdSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<EventByIdQuery, EventByIdQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<EventByIdQuery, EventByIdQueryVariables>(EventByIdDocument, options);
        }
export type EventByIdQueryHookResult = ReturnType<typeof useEventByIdQuery>;
export type EventByIdLazyQueryHookResult = ReturnType<typeof useEventByIdLazyQuery>;
export type EventByIdSuspenseQueryHookResult = ReturnType<typeof useEventByIdSuspenseQuery>;
export const UpcomingEventsDocument = gql`
    query UpcomingEvents($filter: EventsFilterInput) {
  upcomingEvents(filter: $filter) {
    data {
      ...EventBaseFields
    }
    total
    page
    total_pages
    levels
  }
}
    ${EventBaseFieldsFragmentDoc}`;

/**
 * __useUpcomingEventsQuery__
 *
 * To run a query within a React component, call `useUpcomingEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUpcomingEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUpcomingEventsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useUpcomingEventsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UpcomingEventsQuery, UpcomingEventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<UpcomingEventsQuery, UpcomingEventsQueryVariables>(UpcomingEventsDocument, options);
      }
export function useUpcomingEventsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UpcomingEventsQuery, UpcomingEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<UpcomingEventsQuery, UpcomingEventsQueryVariables>(UpcomingEventsDocument, options);
        }
// @ts-ignore
export function useUpcomingEventsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<UpcomingEventsQuery, UpcomingEventsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<UpcomingEventsQuery, UpcomingEventsQueryVariables>;
export function useUpcomingEventsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<UpcomingEventsQuery, UpcomingEventsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<UpcomingEventsQuery | undefined, UpcomingEventsQueryVariables>;
export function useUpcomingEventsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<UpcomingEventsQuery, UpcomingEventsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<UpcomingEventsQuery, UpcomingEventsQueryVariables>(UpcomingEventsDocument, options);
        }
export type UpcomingEventsQueryHookResult = ReturnType<typeof useUpcomingEventsQuery>;
export type UpcomingEventsLazyQueryHookResult = ReturnType<typeof useUpcomingEventsLazyQuery>;
export type UpcomingEventsSuspenseQueryHookResult = ReturnType<typeof useUpcomingEventsSuspenseQuery>;
export const PastEventsDocument = gql`
    query PastEvents($filter: EventsFilterInput) {
  pastEvents(filter: $filter) {
    data {
      ...EventBaseFields
    }
    total
    page
    total_pages
    levels
  }
}
    ${EventBaseFieldsFragmentDoc}`;

/**
 * __usePastEventsQuery__
 *
 * To run a query within a React component, call `usePastEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePastEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePastEventsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function usePastEventsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<PastEventsQuery, PastEventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<PastEventsQuery, PastEventsQueryVariables>(PastEventsDocument, options);
      }
export function usePastEventsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<PastEventsQuery, PastEventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<PastEventsQuery, PastEventsQueryVariables>(PastEventsDocument, options);
        }
// @ts-ignore
export function usePastEventsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<PastEventsQuery, PastEventsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<PastEventsQuery, PastEventsQueryVariables>;
export function usePastEventsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<PastEventsQuery, PastEventsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<PastEventsQuery | undefined, PastEventsQueryVariables>;
export function usePastEventsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<PastEventsQuery, PastEventsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<PastEventsQuery, PastEventsQueryVariables>(PastEventsDocument, options);
        }
export type PastEventsQueryHookResult = ReturnType<typeof usePastEventsQuery>;
export type PastEventsLazyQueryHookResult = ReturnType<typeof usePastEventsLazyQuery>;
export type PastEventsSuspenseQueryHookResult = ReturnType<typeof usePastEventsSuspenseQuery>;
export const EventWithUserContextDocument = gql`
    query EventWithUserContext($eventId: String!) {
  eventWithUserContext(eventId: $eventId) {
    event {
      ...EventDetailFields
    }
    registration {
      ...EventRegistrationFields
    }
    is_past_event
    current_user_id
  }
}
    ${EventDetailFieldsFragmentDoc}
${EventRegistrationFieldsFragmentDoc}`;

/**
 * __useEventWithUserContextQuery__
 *
 * To run a query within a React component, call `useEventWithUserContextQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventWithUserContextQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventWithUserContextQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *   },
 * });
 */
export function useEventWithUserContextQuery(baseOptions: ApolloReactHooks.QueryHookOptions<EventWithUserContextQuery, EventWithUserContextQueryVariables> & ({ variables: EventWithUserContextQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<EventWithUserContextQuery, EventWithUserContextQueryVariables>(EventWithUserContextDocument, options);
      }
export function useEventWithUserContextLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<EventWithUserContextQuery, EventWithUserContextQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<EventWithUserContextQuery, EventWithUserContextQueryVariables>(EventWithUserContextDocument, options);
        }
// @ts-ignore
export function useEventWithUserContextSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<EventWithUserContextQuery, EventWithUserContextQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<EventWithUserContextQuery, EventWithUserContextQueryVariables>;
export function useEventWithUserContextSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<EventWithUserContextQuery, EventWithUserContextQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<EventWithUserContextQuery | undefined, EventWithUserContextQueryVariables>;
export function useEventWithUserContextSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<EventWithUserContextQuery, EventWithUserContextQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<EventWithUserContextQuery, EventWithUserContextQueryVariables>(EventWithUserContextDocument, options);
        }
export type EventWithUserContextQueryHookResult = ReturnType<typeof useEventWithUserContextQuery>;
export type EventWithUserContextLazyQueryHookResult = ReturnType<typeof useEventWithUserContextLazyQuery>;
export type EventWithUserContextSuspenseQueryHookResult = ReturnType<typeof useEventWithUserContextSuspenseQuery>;
export const UserRegistrationsDocument = gql`
    query UserRegistrations($filter: RegistrationsFilterInput) {
  userRegistrations(filter: $filter) {
    data {
      ...EventRegistrationFields
    }
    total
    page
    total_pages
  }
}
    ${EventRegistrationFieldsFragmentDoc}`;

/**
 * __useUserRegistrationsQuery__
 *
 * To run a query within a React component, call `useUserRegistrationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserRegistrationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserRegistrationsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useUserRegistrationsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UserRegistrationsQuery, UserRegistrationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<UserRegistrationsQuery, UserRegistrationsQueryVariables>(UserRegistrationsDocument, options);
      }
export function useUserRegistrationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserRegistrationsQuery, UserRegistrationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<UserRegistrationsQuery, UserRegistrationsQueryVariables>(UserRegistrationsDocument, options);
        }
// @ts-ignore
export function useUserRegistrationsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<UserRegistrationsQuery, UserRegistrationsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<UserRegistrationsQuery, UserRegistrationsQueryVariables>;
export function useUserRegistrationsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<UserRegistrationsQuery, UserRegistrationsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<UserRegistrationsQuery | undefined, UserRegistrationsQueryVariables>;
export function useUserRegistrationsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<UserRegistrationsQuery, UserRegistrationsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<UserRegistrationsQuery, UserRegistrationsQueryVariables>(UserRegistrationsDocument, options);
        }
export type UserRegistrationsQueryHookResult = ReturnType<typeof useUserRegistrationsQuery>;
export type UserRegistrationsLazyQueryHookResult = ReturnType<typeof useUserRegistrationsLazyQuery>;
export type UserRegistrationsSuspenseQueryHookResult = ReturnType<typeof useUserRegistrationsSuspenseQuery>;
export const RegistrationByIdDocument = gql`
    query RegistrationById($registrationId: String!) {
  registrationById(registrationId: $registrationId) {
    ...EventRegistrationFields
  }
}
    ${EventRegistrationFieldsFragmentDoc}`;

/**
 * __useRegistrationByIdQuery__
 *
 * To run a query within a React component, call `useRegistrationByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useRegistrationByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRegistrationByIdQuery({
 *   variables: {
 *      registrationId: // value for 'registrationId'
 *   },
 * });
 */
export function useRegistrationByIdQuery(baseOptions: ApolloReactHooks.QueryHookOptions<RegistrationByIdQuery, RegistrationByIdQueryVariables> & ({ variables: RegistrationByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<RegistrationByIdQuery, RegistrationByIdQueryVariables>(RegistrationByIdDocument, options);
      }
export function useRegistrationByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<RegistrationByIdQuery, RegistrationByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<RegistrationByIdQuery, RegistrationByIdQueryVariables>(RegistrationByIdDocument, options);
        }
// @ts-ignore
export function useRegistrationByIdSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<RegistrationByIdQuery, RegistrationByIdQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<RegistrationByIdQuery, RegistrationByIdQueryVariables>;
export function useRegistrationByIdSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<RegistrationByIdQuery, RegistrationByIdQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<RegistrationByIdQuery | undefined, RegistrationByIdQueryVariables>;
export function useRegistrationByIdSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<RegistrationByIdQuery, RegistrationByIdQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<RegistrationByIdQuery, RegistrationByIdQueryVariables>(RegistrationByIdDocument, options);
        }
export type RegistrationByIdQueryHookResult = ReturnType<typeof useRegistrationByIdQuery>;
export type RegistrationByIdLazyQueryHookResult = ReturnType<typeof useRegistrationByIdLazyQuery>;
export type RegistrationByIdSuspenseQueryHookResult = ReturnType<typeof useRegistrationByIdSuspenseQuery>;
export const UpcomingRegistrationsDocument = gql`
    query UpcomingRegistrations($filter: RegistrationsFilterInput) {
  upcomingRegistrations(filter: $filter) {
    data {
      ...EventRegistrationFields
    }
    total
    page
    total_pages
  }
}
    ${EventRegistrationFieldsFragmentDoc}`;

/**
 * __useUpcomingRegistrationsQuery__
 *
 * To run a query within a React component, call `useUpcomingRegistrationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUpcomingRegistrationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUpcomingRegistrationsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useUpcomingRegistrationsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UpcomingRegistrationsQuery, UpcomingRegistrationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<UpcomingRegistrationsQuery, UpcomingRegistrationsQueryVariables>(UpcomingRegistrationsDocument, options);
      }
export function useUpcomingRegistrationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UpcomingRegistrationsQuery, UpcomingRegistrationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<UpcomingRegistrationsQuery, UpcomingRegistrationsQueryVariables>(UpcomingRegistrationsDocument, options);
        }
// @ts-ignore
export function useUpcomingRegistrationsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<UpcomingRegistrationsQuery, UpcomingRegistrationsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<UpcomingRegistrationsQuery, UpcomingRegistrationsQueryVariables>;
export function useUpcomingRegistrationsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<UpcomingRegistrationsQuery, UpcomingRegistrationsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<UpcomingRegistrationsQuery | undefined, UpcomingRegistrationsQueryVariables>;
export function useUpcomingRegistrationsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<UpcomingRegistrationsQuery, UpcomingRegistrationsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<UpcomingRegistrationsQuery, UpcomingRegistrationsQueryVariables>(UpcomingRegistrationsDocument, options);
        }
export type UpcomingRegistrationsQueryHookResult = ReturnType<typeof useUpcomingRegistrationsQuery>;
export type UpcomingRegistrationsLazyQueryHookResult = ReturnType<typeof useUpcomingRegistrationsLazyQuery>;
export type UpcomingRegistrationsSuspenseQueryHookResult = ReturnType<typeof useUpcomingRegistrationsSuspenseQuery>;
export const CompletedRegistrationsDocument = gql`
    query CompletedRegistrations($filter: RegistrationsFilterInput) {
  completedRegistrations(filter: $filter) {
    data {
      ...EventRegistrationFields
    }
    total
    page
    total_pages
  }
}
    ${EventRegistrationFieldsFragmentDoc}`;

/**
 * __useCompletedRegistrationsQuery__
 *
 * To run a query within a React component, call `useCompletedRegistrationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCompletedRegistrationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCompletedRegistrationsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useCompletedRegistrationsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CompletedRegistrationsQuery, CompletedRegistrationsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<CompletedRegistrationsQuery, CompletedRegistrationsQueryVariables>(CompletedRegistrationsDocument, options);
      }
export function useCompletedRegistrationsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CompletedRegistrationsQuery, CompletedRegistrationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<CompletedRegistrationsQuery, CompletedRegistrationsQueryVariables>(CompletedRegistrationsDocument, options);
        }
// @ts-ignore
export function useCompletedRegistrationsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<CompletedRegistrationsQuery, CompletedRegistrationsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<CompletedRegistrationsQuery, CompletedRegistrationsQueryVariables>;
export function useCompletedRegistrationsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<CompletedRegistrationsQuery, CompletedRegistrationsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<CompletedRegistrationsQuery | undefined, CompletedRegistrationsQueryVariables>;
export function useCompletedRegistrationsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<CompletedRegistrationsQuery, CompletedRegistrationsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<CompletedRegistrationsQuery, CompletedRegistrationsQueryVariables>(CompletedRegistrationsDocument, options);
        }
export type CompletedRegistrationsQueryHookResult = ReturnType<typeof useCompletedRegistrationsQuery>;
export type CompletedRegistrationsLazyQueryHookResult = ReturnType<typeof useCompletedRegistrationsLazyQuery>;
export type CompletedRegistrationsSuspenseQueryHookResult = ReturnType<typeof useCompletedRegistrationsSuspenseQuery>;
export const SubscribeToNewsletterDocument = gql`
    mutation SubscribeToNewsletter {
  subscribeToNewsletter {
    success
    error
    status {
      subscribed
      subscribed_at
    }
  }
}
    `;

/**
 * __useSubscribeToNewsletterMutation__
 *
 * To run a mutation, you first call `useSubscribeToNewsletterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSubscribeToNewsletterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [subscribeToNewsletterMutation, { data, loading, error }] = useSubscribeToNewsletterMutation({
 *   variables: {
 *   },
 * });
 */
export function useSubscribeToNewsletterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SubscribeToNewsletterMutation, SubscribeToNewsletterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<SubscribeToNewsletterMutation, SubscribeToNewsletterMutationVariables>(SubscribeToNewsletterDocument, options);
      }
export type SubscribeToNewsletterMutationHookResult = ReturnType<typeof useSubscribeToNewsletterMutation>;
export const UnsubscribeFromNewsletterDocument = gql`
    mutation UnsubscribeFromNewsletter {
  unsubscribeFromNewsletter {
    success
    error
    status {
      subscribed
      subscribed_at
    }
  }
}
    `;

/**
 * __useUnsubscribeFromNewsletterMutation__
 *
 * To run a mutation, you first call `useUnsubscribeFromNewsletterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUnsubscribeFromNewsletterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [unsubscribeFromNewsletterMutation, { data, loading, error }] = useUnsubscribeFromNewsletterMutation({
 *   variables: {
 *   },
 * });
 */
export function useUnsubscribeFromNewsletterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UnsubscribeFromNewsletterMutation, UnsubscribeFromNewsletterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<UnsubscribeFromNewsletterMutation, UnsubscribeFromNewsletterMutationVariables>(UnsubscribeFromNewsletterDocument, options);
      }
export type UnsubscribeFromNewsletterMutationHookResult = ReturnType<typeof useUnsubscribeFromNewsletterMutation>;
export const NewsletterStatusDocument = gql`
    query NewsletterStatus {
  newsletterStatus {
    subscribed
    subscribed_at
  }
}
    `;

/**
 * __useNewsletterStatusQuery__
 *
 * To run a query within a React component, call `useNewsletterStatusQuery` and pass it any options that fit your needs.
 * When your component renders, `useNewsletterStatusQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNewsletterStatusQuery({
 *   variables: {
 *   },
 * });
 */
export function useNewsletterStatusQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<NewsletterStatusQuery, NewsletterStatusQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<NewsletterStatusQuery, NewsletterStatusQueryVariables>(NewsletterStatusDocument, options);
      }
export function useNewsletterStatusLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<NewsletterStatusQuery, NewsletterStatusQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<NewsletterStatusQuery, NewsletterStatusQueryVariables>(NewsletterStatusDocument, options);
        }
// @ts-ignore
export function useNewsletterStatusSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<NewsletterStatusQuery, NewsletterStatusQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<NewsletterStatusQuery, NewsletterStatusQueryVariables>;
export function useNewsletterStatusSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<NewsletterStatusQuery, NewsletterStatusQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<NewsletterStatusQuery | undefined, NewsletterStatusQueryVariables>;
export function useNewsletterStatusSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<NewsletterStatusQuery, NewsletterStatusQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<NewsletterStatusQuery, NewsletterStatusQueryVariables>(NewsletterStatusDocument, options);
        }
export type NewsletterStatusQueryHookResult = ReturnType<typeof useNewsletterStatusQuery>;
export type NewsletterStatusLazyQueryHookResult = ReturnType<typeof useNewsletterStatusLazyQuery>;
export type NewsletterStatusSuspenseQueryHookResult = ReturnType<typeof useNewsletterStatusSuspenseQuery>;
export const CreateOrderDocument = gql`
    mutation CreateOrder($input: CreateOrderInput!) {
  createOrder(input: $input) {
    success
    error
    order {
      id
      user_id
      user {
        id
        email
        name
      }
      shipping_fee
      subtotal
      discount
      total
      status
      request_at
      approved_at
      paid_at
      shipped_at
      delivered_at
      cancelled_at
      returned_at
      refunded_at
      shipping_address
      created_at
      updated_at
      ordered_products {
        id
        order_id
        product_id
        quantity
        discount
        price
        created_at
        updated_at
        has_reviewed
        product {
          id
          slug
          name
          price
          image_urls
          reviews_count
          avg_rating
          material
          in_wishlist
          is_active
          available_quantity
          total_quantity
          color_code
          color_name
        }
      }
    }
  }
}
    `;

/**
 * __useCreateOrderMutation__
 *
 * To run a mutation, you first call `useCreateOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createOrderMutation, { data, loading, error }] = useCreateOrderMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateOrderMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateOrderMutation, CreateOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateOrderMutation, CreateOrderMutationVariables>(CreateOrderDocument, options);
      }
export type CreateOrderMutationHookResult = ReturnType<typeof useCreateOrderMutation>;
export const CancelOrderDocument = gql`
    mutation CancelOrder($orderId: String!) {
  cancelOrder(orderId: $orderId) {
    success
    error
    order {
      id
      user_id
      user {
        id
        email
        name
      }
      shipping_fee
      subtotal
      discount
      total
      status
      request_at
      approved_at
      paid_at
      shipped_at
      delivered_at
      cancelled_at
      returned_at
      refunded_at
      shipping_address
      created_at
      updated_at
      ordered_products {
        id
        order_id
        product_id
        quantity
        discount
        price
        created_at
        updated_at
        has_reviewed
        product {
          id
          slug
          name
          price
          image_urls
          reviews_count
          avg_rating
          material
          in_wishlist
          is_active
          available_quantity
          total_quantity
          color_code
          color_name
        }
      }
    }
  }
}
    `;

/**
 * __useCancelOrderMutation__
 *
 * To run a mutation, you first call `useCancelOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelOrderMutation, { data, loading, error }] = useCancelOrderMutation({
 *   variables: {
 *      orderId: // value for 'orderId'
 *   },
 * });
 */
export function useCancelOrderMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CancelOrderMutation, CancelOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CancelOrderMutation, CancelOrderMutationVariables>(CancelOrderDocument, options);
      }
export type CancelOrderMutationHookResult = ReturnType<typeof useCancelOrderMutation>;
export const OrdersDocument = gql`
    query Orders($filter: OrdersFilterInput) {
  orders(filter: $filter) {
    data {
      id
      user_id
      user {
        id
        email
        name
      }
      shipping_fee
      subtotal
      discount
      total
      status
      request_at
      approved_at
      paid_at
      shipped_at
      delivered_at
      cancelled_at
      returned_at
      refunded_at
      shipping_address
      created_at
      updated_at
      ordered_products {
        id
        order_id
        product_id
        quantity
        discount
        price
        created_at
        updated_at
        has_reviewed
        product {
          id
          slug
          name
          price
          image_urls
          reviews_count
          avg_rating
          material
          in_wishlist
          is_active
          available_quantity
          total_quantity
          color_code
          color_name
        }
      }
    }
    total
    page
    total_pages
  }
}
    `;

/**
 * __useOrdersQuery__
 *
 * To run a query within a React component, call `useOrdersQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrdersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrdersQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useOrdersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<OrdersQuery, OrdersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<OrdersQuery, OrdersQueryVariables>(OrdersDocument, options);
      }
export function useOrdersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<OrdersQuery, OrdersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<OrdersQuery, OrdersQueryVariables>(OrdersDocument, options);
        }
// @ts-ignore
export function useOrdersSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<OrdersQuery, OrdersQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<OrdersQuery, OrdersQueryVariables>;
export function useOrdersSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<OrdersQuery, OrdersQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<OrdersQuery | undefined, OrdersQueryVariables>;
export function useOrdersSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<OrdersQuery, OrdersQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<OrdersQuery, OrdersQueryVariables>(OrdersDocument, options);
        }
export type OrdersQueryHookResult = ReturnType<typeof useOrdersQuery>;
export type OrdersLazyQueryHookResult = ReturnType<typeof useOrdersLazyQuery>;
export type OrdersSuspenseQueryHookResult = ReturnType<typeof useOrdersSuspenseQuery>;
export const OrderDocument = gql`
    query Order($id: String!) {
  order(id: $id) {
    id
    user_id
    user {
      id
      email
      name
    }
    shipping_fee
    subtotal
    discount
    total
    status
    request_at
    approved_at
    paid_at
    shipped_at
    delivered_at
    cancelled_at
    returned_at
    refunded_at
    shipping_address
    created_at
    updated_at
    ordered_products {
      id
      order_id
      product_id
      quantity
      discount
      price
      created_at
      updated_at
      has_reviewed
      product {
        id
        slug
        name
        price
        image_urls
        reviews_count
        avg_rating
        material
        in_wishlist
        is_active
        available_quantity
        total_quantity
        color_code
        color_name
      }
    }
  }
}
    `;

/**
 * __useOrderQuery__
 *
 * To run a query within a React component, call `useOrderQuery` and pass it any options that fit your needs.
 * When your component renders, `useOrderQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOrderQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useOrderQuery(baseOptions: ApolloReactHooks.QueryHookOptions<OrderQuery, OrderQueryVariables> & ({ variables: OrderQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<OrderQuery, OrderQueryVariables>(OrderDocument, options);
      }
export function useOrderLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<OrderQuery, OrderQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<OrderQuery, OrderQueryVariables>(OrderDocument, options);
        }
// @ts-ignore
export function useOrderSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<OrderQuery, OrderQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<OrderQuery, OrderQueryVariables>;
export function useOrderSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<OrderQuery, OrderQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<OrderQuery | undefined, OrderQueryVariables>;
export function useOrderSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<OrderQuery, OrderQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<OrderQuery, OrderQueryVariables>(OrderDocument, options);
        }
export type OrderQueryHookResult = ReturnType<typeof useOrderQuery>;
export type OrderLazyQueryHookResult = ReturnType<typeof useOrderLazyQuery>;
export type OrderSuspenseQueryHookResult = ReturnType<typeof useOrderSuspenseQuery>;
export const ProductsDocument = gql`
    query Products($filter: ProductsFilterInput!) {
  products(filter: $filter) {
    products {
      id
      slug
      name
      price
      image_urls
      reviews_count
      avg_rating
      material
      in_wishlist
      is_active
      available_quantity
      total_quantity
      color_code
      color_name
      collection {
        ...CollectionFields
      }
    }
    filter {
      limit
      page
      search
      categories
      materials
      min_price
      max_price
      order_by
      collection_ids
      archive
    }
    total_products
    total_pages
    meta {
      categories
      materials
      price_range {
        min
        max
      }
      price_histogram {
        min
        max
        count
      }
      collections {
        ...CollectionFields
      }
    }
  }
}
    ${CollectionFieldsFragmentDoc}`;

/**
 * __useProductsQuery__
 *
 * To run a query within a React component, call `useProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductsQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useProductsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<ProductsQuery, ProductsQueryVariables> & ({ variables: ProductsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, options);
      }
export function useProductsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, options);
        }
// @ts-ignore
export function useProductsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<ProductsQuery, ProductsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<ProductsQuery, ProductsQueryVariables>;
export function useProductsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<ProductsQuery, ProductsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<ProductsQuery | undefined, ProductsQueryVariables>;
export function useProductsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, options);
        }
export type ProductsQueryHookResult = ReturnType<typeof useProductsQuery>;
export type ProductsLazyQueryHookResult = ReturnType<typeof useProductsLazyQuery>;
export type ProductsSuspenseQueryHookResult = ReturnType<typeof useProductsSuspenseQuery>;
export const ProductBySlugDocument = gql`
    query ProductBySlug($slug: String!) {
  productBySlug(slug: $slug) {
    id
    slug
    name
    price
    image_urls
    reviews_count
    avg_rating
    material
    in_wishlist
    available_quantity
    total_quantity
    color_code
    color_name
    description
    instructions
    is_active
    created_at
    updated_at
    categories
    collection {
      ...CollectionFields
    }
    reviews {
      id
      user_id
      rating
      review
      image_urls
      created_at
      user {
        id
        name
        image
      }
      likes {
        id
        user_id
      }
    }
  }
}
    ${CollectionFieldsFragmentDoc}`;

/**
 * __useProductBySlugQuery__
 *
 * To run a query within a React component, call `useProductBySlugQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductBySlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductBySlugQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useProductBySlugQuery(baseOptions: ApolloReactHooks.QueryHookOptions<ProductBySlugQuery, ProductBySlugQueryVariables> & ({ variables: ProductBySlugQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<ProductBySlugQuery, ProductBySlugQueryVariables>(ProductBySlugDocument, options);
      }
export function useProductBySlugLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ProductBySlugQuery, ProductBySlugQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<ProductBySlugQuery, ProductBySlugQueryVariables>(ProductBySlugDocument, options);
        }
// @ts-ignore
export function useProductBySlugSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<ProductBySlugQuery, ProductBySlugQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<ProductBySlugQuery, ProductBySlugQueryVariables>;
export function useProductBySlugSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<ProductBySlugQuery, ProductBySlugQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<ProductBySlugQuery | undefined, ProductBySlugQueryVariables>;
export function useProductBySlugSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<ProductBySlugQuery, ProductBySlugQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<ProductBySlugQuery, ProductBySlugQueryVariables>(ProductBySlugDocument, options);
        }
export type ProductBySlugQueryHookResult = ReturnType<typeof useProductBySlugQuery>;
export type ProductBySlugLazyQueryHookResult = ReturnType<typeof useProductBySlugLazyQuery>;
export type ProductBySlugSuspenseQueryHookResult = ReturnType<typeof useProductBySlugSuspenseQuery>;
export const ProductByIdDocument = gql`
    query ProductById($id: Int!) {
  productById(id: $id) {
    id
    slug
    name
    price
    image_urls
    reviews_count
    avg_rating
    material
    in_wishlist
    available_quantity
    total_quantity
    color_code
    color_name
    description
    instructions
    is_active
    created_at
    updated_at
    categories
    collection {
      ...CollectionFields
    }
    reviews {
      id
      user_id
      rating
      review
      image_urls
      created_at
      user {
        id
        name
        image
      }
      likes {
        id
        user_id
      }
    }
  }
}
    ${CollectionFieldsFragmentDoc}`;

/**
 * __useProductByIdQuery__
 *
 * To run a query within a React component, call `useProductByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProductByIdQuery(baseOptions: ApolloReactHooks.QueryHookOptions<ProductByIdQuery, ProductByIdQueryVariables> & ({ variables: ProductByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<ProductByIdQuery, ProductByIdQueryVariables>(ProductByIdDocument, options);
      }
export function useProductByIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ProductByIdQuery, ProductByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<ProductByIdQuery, ProductByIdQueryVariables>(ProductByIdDocument, options);
        }
// @ts-ignore
export function useProductByIdSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<ProductByIdQuery, ProductByIdQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<ProductByIdQuery, ProductByIdQueryVariables>;
export function useProductByIdSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<ProductByIdQuery, ProductByIdQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<ProductByIdQuery | undefined, ProductByIdQueryVariables>;
export function useProductByIdSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<ProductByIdQuery, ProductByIdQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<ProductByIdQuery, ProductByIdQueryVariables>(ProductByIdDocument, options);
        }
export type ProductByIdQueryHookResult = ReturnType<typeof useProductByIdQuery>;
export type ProductByIdLazyQueryHookResult = ReturnType<typeof useProductByIdLazyQuery>;
export type ProductByIdSuspenseQueryHookResult = ReturnType<typeof useProductByIdSuspenseQuery>;
export const BestSellersDocument = gql`
    query BestSellers($limit: Int, $page: Int) {
  bestSellers(limit: $limit, page: $page) {
    products {
      id
      slug
      name
      price
      image_urls
      reviews_count
      avg_rating
      material
      in_wishlist
      is_active
      available_quantity
      total_quantity
      color_code
      color_name
      collection {
        ...CollectionFields
      }
    }
    total
    page
    total_pages
  }
}
    ${CollectionFieldsFragmentDoc}`;

/**
 * __useBestSellersQuery__
 *
 * To run a query within a React component, call `useBestSellersQuery` and pass it any options that fit your needs.
 * When your component renders, `useBestSellersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBestSellersQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useBestSellersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<BestSellersQuery, BestSellersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<BestSellersQuery, BestSellersQueryVariables>(BestSellersDocument, options);
      }
export function useBestSellersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<BestSellersQuery, BestSellersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<BestSellersQuery, BestSellersQueryVariables>(BestSellersDocument, options);
        }
// @ts-ignore
export function useBestSellersSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<BestSellersQuery, BestSellersQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<BestSellersQuery, BestSellersQueryVariables>;
export function useBestSellersSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<BestSellersQuery, BestSellersQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<BestSellersQuery | undefined, BestSellersQueryVariables>;
export function useBestSellersSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<BestSellersQuery, BestSellersQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<BestSellersQuery, BestSellersQueryVariables>(BestSellersDocument, options);
        }
export type BestSellersQueryHookResult = ReturnType<typeof useBestSellersQuery>;
export type BestSellersLazyQueryHookResult = ReturnType<typeof useBestSellersLazyQuery>;
export type BestSellersSuspenseQueryHookResult = ReturnType<typeof useBestSellersSuspenseQuery>;
export const RecommendedProductsDocument = gql`
    query RecommendedProducts($limit: Int, $page: Int, $productId: Int) {
  recommendedProducts(limit: $limit, page: $page, productId: $productId) {
    products {
      id
      slug
      name
      price
      image_urls
      reviews_count
      avg_rating
      material
      in_wishlist
      is_active
      available_quantity
      total_quantity
      color_code
      color_name
      collection {
        ...CollectionFields
      }
    }
    total
    page
    total_pages
  }
}
    ${CollectionFieldsFragmentDoc}`;

/**
 * __useRecommendedProductsQuery__
 *
 * To run a query within a React component, call `useRecommendedProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useRecommendedProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRecommendedProductsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      page: // value for 'page'
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useRecommendedProductsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<RecommendedProductsQuery, RecommendedProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<RecommendedProductsQuery, RecommendedProductsQueryVariables>(RecommendedProductsDocument, options);
      }
export function useRecommendedProductsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<RecommendedProductsQuery, RecommendedProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<RecommendedProductsQuery, RecommendedProductsQueryVariables>(RecommendedProductsDocument, options);
        }
// @ts-ignore
export function useRecommendedProductsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<RecommendedProductsQuery, RecommendedProductsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<RecommendedProductsQuery, RecommendedProductsQueryVariables>;
export function useRecommendedProductsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<RecommendedProductsQuery, RecommendedProductsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<RecommendedProductsQuery | undefined, RecommendedProductsQueryVariables>;
export function useRecommendedProductsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<RecommendedProductsQuery, RecommendedProductsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<RecommendedProductsQuery, RecommendedProductsQueryVariables>(RecommendedProductsDocument, options);
        }
export type RecommendedProductsQueryHookResult = ReturnType<typeof useRecommendedProductsQuery>;
export type RecommendedProductsLazyQueryHookResult = ReturnType<typeof useRecommendedProductsLazyQuery>;
export type RecommendedProductsSuspenseQueryHookResult = ReturnType<typeof useRecommendedProductsSuspenseQuery>;
export const CategoriesDocument = gql`
    query Categories {
  categories
}
    `;

/**
 * __useCategoriesQuery__
 *
 * To run a query within a React component, call `useCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCategoriesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, options);
      }
export function useCategoriesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, options);
        }
// @ts-ignore
export function useCategoriesSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<CategoriesQuery, CategoriesQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<CategoriesQuery, CategoriesQueryVariables>;
export function useCategoriesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<CategoriesQuery, CategoriesQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<CategoriesQuery | undefined, CategoriesQueryVariables>;
export function useCategoriesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<CategoriesQuery, CategoriesQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<CategoriesQuery, CategoriesQueryVariables>(CategoriesDocument, options);
        }
export type CategoriesQueryHookResult = ReturnType<typeof useCategoriesQuery>;
export type CategoriesLazyQueryHookResult = ReturnType<typeof useCategoriesLazyQuery>;
export type CategoriesSuspenseQueryHookResult = ReturnType<typeof useCategoriesSuspenseQuery>;
export const CategoriesWithImagesDocument = gql`
    query CategoriesWithImages {
  categoriesWithImages {
    name
    image_url
  }
}
    `;

/**
 * __useCategoriesWithImagesQuery__
 *
 * To run a query within a React component, call `useCategoriesWithImagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCategoriesWithImagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCategoriesWithImagesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCategoriesWithImagesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CategoriesWithImagesQuery, CategoriesWithImagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<CategoriesWithImagesQuery, CategoriesWithImagesQueryVariables>(CategoriesWithImagesDocument, options);
      }
export function useCategoriesWithImagesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CategoriesWithImagesQuery, CategoriesWithImagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<CategoriesWithImagesQuery, CategoriesWithImagesQueryVariables>(CategoriesWithImagesDocument, options);
        }
// @ts-ignore
export function useCategoriesWithImagesSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<CategoriesWithImagesQuery, CategoriesWithImagesQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<CategoriesWithImagesQuery, CategoriesWithImagesQueryVariables>;
export function useCategoriesWithImagesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<CategoriesWithImagesQuery, CategoriesWithImagesQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<CategoriesWithImagesQuery | undefined, CategoriesWithImagesQueryVariables>;
export function useCategoriesWithImagesSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<CategoriesWithImagesQuery, CategoriesWithImagesQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<CategoriesWithImagesQuery, CategoriesWithImagesQueryVariables>(CategoriesWithImagesDocument, options);
        }
export type CategoriesWithImagesQueryHookResult = ReturnType<typeof useCategoriesWithImagesQuery>;
export type CategoriesWithImagesLazyQueryHookResult = ReturnType<typeof useCategoriesWithImagesLazyQuery>;
export type CategoriesWithImagesSuspenseQueryHookResult = ReturnType<typeof useCategoriesWithImagesSuspenseQuery>;
export const MaterialsDocument = gql`
    query Materials {
  materials
}
    `;

/**
 * __useMaterialsQuery__
 *
 * To run a query within a React component, call `useMaterialsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMaterialsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMaterialsQuery({
 *   variables: {
 *   },
 * });
 */
export function useMaterialsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MaterialsQuery, MaterialsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<MaterialsQuery, MaterialsQueryVariables>(MaterialsDocument, options);
      }
export function useMaterialsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MaterialsQuery, MaterialsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<MaterialsQuery, MaterialsQueryVariables>(MaterialsDocument, options);
        }
// @ts-ignore
export function useMaterialsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<MaterialsQuery, MaterialsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<MaterialsQuery, MaterialsQueryVariables>;
export function useMaterialsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<MaterialsQuery, MaterialsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<MaterialsQuery | undefined, MaterialsQueryVariables>;
export function useMaterialsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<MaterialsQuery, MaterialsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<MaterialsQuery, MaterialsQueryVariables>(MaterialsDocument, options);
        }
export type MaterialsQueryHookResult = ReturnType<typeof useMaterialsQuery>;
export type MaterialsLazyQueryHookResult = ReturnType<typeof useMaterialsLazyQuery>;
export type MaterialsSuspenseQueryHookResult = ReturnType<typeof useMaterialsSuspenseQuery>;
export const CollectionsDocument = gql`
    query Collections {
  collections {
    ...CollectionFields
  }
}
    ${CollectionFieldsFragmentDoc}`;

/**
 * __useCollectionsQuery__
 *
 * To run a query within a React component, call `useCollectionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCollectionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCollectionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useCollectionsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<CollectionsQuery, CollectionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<CollectionsQuery, CollectionsQueryVariables>(CollectionsDocument, options);
      }
export function useCollectionsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<CollectionsQuery, CollectionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<CollectionsQuery, CollectionsQueryVariables>(CollectionsDocument, options);
        }
// @ts-ignore
export function useCollectionsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<CollectionsQuery, CollectionsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<CollectionsQuery, CollectionsQueryVariables>;
export function useCollectionsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<CollectionsQuery, CollectionsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<CollectionsQuery | undefined, CollectionsQueryVariables>;
export function useCollectionsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<CollectionsQuery, CollectionsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<CollectionsQuery, CollectionsQueryVariables>(CollectionsDocument, options);
        }
export type CollectionsQueryHookResult = ReturnType<typeof useCollectionsQuery>;
export type CollectionsLazyQueryHookResult = ReturnType<typeof useCollectionsLazyQuery>;
export type CollectionsSuspenseQueryHookResult = ReturnType<typeof useCollectionsSuspenseQuery>;
export const CreateProductReviewDocument = gql`
    mutation CreateProductReview($input: CreateProductReviewInput!) {
  createProductReview(input: $input) {
    success
    error
    review {
      id
      user_id
      rating
      review
      image_urls
      product_id
      created_at
      updated_at
      user {
        id
        name
        image
      }
      likes {
        id
        user_id
      }
      likes_count
      is_liked_by_current_user
    }
  }
}
    `;

/**
 * __useCreateProductReviewMutation__
 *
 * To run a mutation, you first call `useCreateProductReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductReviewMutation, { data, loading, error }] = useCreateProductReviewMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProductReviewMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateProductReviewMutation, CreateProductReviewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateProductReviewMutation, CreateProductReviewMutationVariables>(CreateProductReviewDocument, options);
      }
export type CreateProductReviewMutationHookResult = ReturnType<typeof useCreateProductReviewMutation>;
export const CreateEventReviewDocument = gql`
    mutation CreateEventReview($input: CreateEventReviewInput!) {
  createEventReview(input: $input) {
    success
    error
    review {
      id
      user_id
      rating
      review
      image_urls
      event_id
      created_at
      updated_at
      user {
        id
        name
        image
      }
      likes {
        id
        user_id
      }
      likes_count
      is_liked_by_current_user
    }
  }
}
    `;

/**
 * __useCreateEventReviewMutation__
 *
 * To run a mutation, you first call `useCreateEventReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateEventReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createEventReviewMutation, { data, loading, error }] = useCreateEventReviewMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateEventReviewMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateEventReviewMutation, CreateEventReviewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<CreateEventReviewMutation, CreateEventReviewMutationVariables>(CreateEventReviewDocument, options);
      }
export type CreateEventReviewMutationHookResult = ReturnType<typeof useCreateEventReviewMutation>;
export const DeleteReviewDocument = gql`
    mutation DeleteReview($reviewId: Int!) {
  deleteReview(reviewId: $reviewId) {
    success
    error
  }
}
    `;

/**
 * __useDeleteReviewMutation__
 *
 * To run a mutation, you first call `useDeleteReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteReviewMutation, { data, loading, error }] = useDeleteReviewMutation({
 *   variables: {
 *      reviewId: // value for 'reviewId'
 *   },
 * });
 */
export function useDeleteReviewMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteReviewMutation, DeleteReviewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<DeleteReviewMutation, DeleteReviewMutationVariables>(DeleteReviewDocument, options);
      }
export type DeleteReviewMutationHookResult = ReturnType<typeof useDeleteReviewMutation>;
export const ToggleReviewLikeDocument = gql`
    mutation ToggleReviewLike($reviewId: Int!) {
  toggleReviewLike(reviewId: $reviewId) {
    success
    action
    likes_count
    error
  }
}
    `;

/**
 * __useToggleReviewLikeMutation__
 *
 * To run a mutation, you first call `useToggleReviewLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleReviewLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleReviewLikeMutation, { data, loading, error }] = useToggleReviewLikeMutation({
 *   variables: {
 *      reviewId: // value for 'reviewId'
 *   },
 * });
 */
export function useToggleReviewLikeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ToggleReviewLikeMutation, ToggleReviewLikeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<ToggleReviewLikeMutation, ToggleReviewLikeMutationVariables>(ToggleReviewLikeDocument, options);
      }
export type ToggleReviewLikeMutationHookResult = ReturnType<typeof useToggleReviewLikeMutation>;
export const ProductReviewsDocument = gql`
    query ProductReviews($productId: Int!, $filter: ReviewsFilterInput) {
  productReviews(productId: $productId, filter: $filter) {
    data {
      id
      user_id
      rating
      review
      image_urls
      product_id
      event_id
      created_at
      updated_at
      user {
        id
        name
        image
      }
      likes {
        id
        user_id
      }
      likes_count
      is_liked_by_current_user
    }
    total
    page
    total_pages
  }
}
    `;

/**
 * __useProductReviewsQuery__
 *
 * To run a query within a React component, call `useProductReviewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductReviewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductReviewsQuery({
 *   variables: {
 *      productId: // value for 'productId'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useProductReviewsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<ProductReviewsQuery, ProductReviewsQueryVariables> & ({ variables: ProductReviewsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<ProductReviewsQuery, ProductReviewsQueryVariables>(ProductReviewsDocument, options);
      }
export function useProductReviewsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ProductReviewsQuery, ProductReviewsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<ProductReviewsQuery, ProductReviewsQueryVariables>(ProductReviewsDocument, options);
        }
// @ts-ignore
export function useProductReviewsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<ProductReviewsQuery, ProductReviewsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<ProductReviewsQuery, ProductReviewsQueryVariables>;
export function useProductReviewsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<ProductReviewsQuery, ProductReviewsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<ProductReviewsQuery | undefined, ProductReviewsQueryVariables>;
export function useProductReviewsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<ProductReviewsQuery, ProductReviewsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<ProductReviewsQuery, ProductReviewsQueryVariables>(ProductReviewsDocument, options);
        }
export type ProductReviewsQueryHookResult = ReturnType<typeof useProductReviewsQuery>;
export type ProductReviewsLazyQueryHookResult = ReturnType<typeof useProductReviewsLazyQuery>;
export type ProductReviewsSuspenseQueryHookResult = ReturnType<typeof useProductReviewsSuspenseQuery>;
export const FeaturedReviewsDocument = gql`
    query FeaturedReviews($limit: Int) {
  featuredReviews(limit: $limit) {
    id
    rating
    review
    user {
      id
      name
      image
    }
  }
}
    `;

/**
 * __useFeaturedReviewsQuery__
 *
 * To run a query within a React component, call `useFeaturedReviewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFeaturedReviewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeaturedReviewsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useFeaturedReviewsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<FeaturedReviewsQuery, FeaturedReviewsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<FeaturedReviewsQuery, FeaturedReviewsQueryVariables>(FeaturedReviewsDocument, options);
      }
export function useFeaturedReviewsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<FeaturedReviewsQuery, FeaturedReviewsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<FeaturedReviewsQuery, FeaturedReviewsQueryVariables>(FeaturedReviewsDocument, options);
        }
// @ts-ignore
export function useFeaturedReviewsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<FeaturedReviewsQuery, FeaturedReviewsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<FeaturedReviewsQuery, FeaturedReviewsQueryVariables>;
export function useFeaturedReviewsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<FeaturedReviewsQuery, FeaturedReviewsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<FeaturedReviewsQuery | undefined, FeaturedReviewsQueryVariables>;
export function useFeaturedReviewsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<FeaturedReviewsQuery, FeaturedReviewsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<FeaturedReviewsQuery, FeaturedReviewsQueryVariables>(FeaturedReviewsDocument, options);
        }
export type FeaturedReviewsQueryHookResult = ReturnType<typeof useFeaturedReviewsQuery>;
export type FeaturedReviewsLazyQueryHookResult = ReturnType<typeof useFeaturedReviewsLazyQuery>;
export type FeaturedReviewsSuspenseQueryHookResult = ReturnType<typeof useFeaturedReviewsSuspenseQuery>;
export const EventReviewsDocument = gql`
    query EventReviews($eventId: String!, $filter: ReviewsFilterInput) {
  eventReviews(eventId: $eventId, filter: $filter) {
    data {
      id
      user_id
      rating
      review
      image_urls
      product_id
      event_id
      created_at
      updated_at
      user {
        id
        name
        image
      }
      likes {
        id
        user_id
      }
      likes_count
      is_liked_by_current_user
    }
    total
    page
    total_pages
  }
}
    `;

/**
 * __useEventReviewsQuery__
 *
 * To run a query within a React component, call `useEventReviewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventReviewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventReviewsQuery({
 *   variables: {
 *      eventId: // value for 'eventId'
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useEventReviewsQuery(baseOptions: ApolloReactHooks.QueryHookOptions<EventReviewsQuery, EventReviewsQueryVariables> & ({ variables: EventReviewsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<EventReviewsQuery, EventReviewsQueryVariables>(EventReviewsDocument, options);
      }
export function useEventReviewsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<EventReviewsQuery, EventReviewsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<EventReviewsQuery, EventReviewsQueryVariables>(EventReviewsDocument, options);
        }
// @ts-ignore
export function useEventReviewsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<EventReviewsQuery, EventReviewsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<EventReviewsQuery, EventReviewsQueryVariables>;
export function useEventReviewsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<EventReviewsQuery, EventReviewsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<EventReviewsQuery | undefined, EventReviewsQueryVariables>;
export function useEventReviewsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<EventReviewsQuery, EventReviewsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<EventReviewsQuery, EventReviewsQueryVariables>(EventReviewsDocument, options);
        }
export type EventReviewsQueryHookResult = ReturnType<typeof useEventReviewsQuery>;
export type EventReviewsLazyQueryHookResult = ReturnType<typeof useEventReviewsLazyQuery>;
export type EventReviewsSuspenseQueryHookResult = ReturnType<typeof useEventReviewsSuspenseQuery>;
export const GlobalSearchDocument = gql`
    query GlobalSearch($input: GlobalSearchInput!) {
  globalSearch(input: $input) {
    products {
      id
      slug
      name
      image_urls
      price
      reviews_count
      avg_rating
      material
      total_quantity
      available_quantity
      color_code
      color_name
      in_wishlist
      is_active
    }
    events {
      id
      slug
      title
      description
      starts_at
      ends_at
      location
      full_location
      total_seats
      available_seats
      instructor
      includes
      price
      image
      highlights
      gallery
      status
      level
      created_at
      updated_at
      registrations_count
      reviews_count
      avg_rating
    }
    orders {
      id
      user_id
      user {
        id
        email
        name
      }
      shipping_fee
      subtotal
      discount
      total
      status
      request_at
      approved_at
      paid_at
      shipped_at
      delivered_at
      cancelled_at
      returned_at
      refunded_at
      shipping_address
      created_at
      updated_at
      ordered_products {
        id
        order_id
        product_id
        quantity
        discount
        price
        created_at
        updated_at
        has_reviewed
        product {
          id
          slug
          name
          image_urls
          price
          reviews_count
          avg_rating
          material
          total_quantity
          available_quantity
          color_code
          color_name
          in_wishlist
          is_active
        }
      }
    }
    counts {
      products
      events
      orders
    }
  }
}
    `;

/**
 * __useGlobalSearchQuery__
 *
 * To run a query within a React component, call `useGlobalSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useGlobalSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGlobalSearchQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGlobalSearchQuery(baseOptions: ApolloReactHooks.QueryHookOptions<GlobalSearchQuery, GlobalSearchQueryVariables> & ({ variables: GlobalSearchQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<GlobalSearchQuery, GlobalSearchQueryVariables>(GlobalSearchDocument, options);
      }
export function useGlobalSearchLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<GlobalSearchQuery, GlobalSearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<GlobalSearchQuery, GlobalSearchQueryVariables>(GlobalSearchDocument, options);
        }
// @ts-ignore
export function useGlobalSearchSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<GlobalSearchQuery, GlobalSearchQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GlobalSearchQuery, GlobalSearchQueryVariables>;
export function useGlobalSearchSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GlobalSearchQuery, GlobalSearchQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<GlobalSearchQuery | undefined, GlobalSearchQueryVariables>;
export function useGlobalSearchSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<GlobalSearchQuery, GlobalSearchQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<GlobalSearchQuery, GlobalSearchQueryVariables>(GlobalSearchDocument, options);
        }
export type GlobalSearchQueryHookResult = ReturnType<typeof useGlobalSearchQuery>;
export type GlobalSearchLazyQueryHookResult = ReturnType<typeof useGlobalSearchLazyQuery>;
export type GlobalSearchSuspenseQueryHookResult = ReturnType<typeof useGlobalSearchSuspenseQuery>;
export const UserCountsDocument = gql`
    query UserCounts {
  userCounts {
    cartCount
    wishlistCount
    eventRegistrationsCount
    pendingOrdersCount
  }
}
    `;

/**
 * __useUserCountsQuery__
 *
 * To run a query within a React component, call `useUserCountsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserCountsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserCountsQuery({
 *   variables: {
 *   },
 * });
 */
export function useUserCountsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UserCountsQuery, UserCountsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<UserCountsQuery, UserCountsQueryVariables>(UserCountsDocument, options);
      }
export function useUserCountsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserCountsQuery, UserCountsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<UserCountsQuery, UserCountsQueryVariables>(UserCountsDocument, options);
        }
// @ts-ignore
export function useUserCountsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<UserCountsQuery, UserCountsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<UserCountsQuery, UserCountsQueryVariables>;
export function useUserCountsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<UserCountsQuery, UserCountsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<UserCountsQuery | undefined, UserCountsQueryVariables>;
export function useUserCountsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<UserCountsQuery, UserCountsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<UserCountsQuery, UserCountsQueryVariables>(UserCountsDocument, options);
        }
export type UserCountsQueryHookResult = ReturnType<typeof useUserCountsQuery>;
export type UserCountsLazyQueryHookResult = ReturnType<typeof useUserCountsLazyQuery>;
export type UserCountsSuspenseQueryHookResult = ReturnType<typeof useUserCountsSuspenseQuery>;
export const AddToWishlistDocument = gql`
    mutation AddToWishlist($productId: Int!) {
  addToWishlist(productId: $productId) {
    success
    item {
      id
      user_id
      product_id
      created_at
      updated_at
      product {
        id
        slug
        name
        price
        image_urls
        reviews_count
        avg_rating
        material
        in_wishlist
        is_active
        available_quantity
        total_quantity
        color_code
        color_name
        collection {
          id
          slug
          name
          description
          image_url
          starts_at
          ends_at
          created_at
          updated_at
          products_count
        }
      }
    }
  }
}
    `;

/**
 * __useAddToWishlistMutation__
 *
 * To run a mutation, you first call `useAddToWishlistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddToWishlistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addToWishlistMutation, { data, loading, error }] = useAddToWishlistMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useAddToWishlistMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddToWishlistMutation, AddToWishlistMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<AddToWishlistMutation, AddToWishlistMutationVariables>(AddToWishlistDocument, options);
      }
export type AddToWishlistMutationHookResult = ReturnType<typeof useAddToWishlistMutation>;
export const RemoveFromWishlistDocument = gql`
    mutation RemoveFromWishlist($productId: Int!) {
  removeFromWishlist(productId: $productId)
}
    `;

/**
 * __useRemoveFromWishlistMutation__
 *
 * To run a mutation, you first call `useRemoveFromWishlistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveFromWishlistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeFromWishlistMutation, { data, loading, error }] = useRemoveFromWishlistMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useRemoveFromWishlistMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RemoveFromWishlistMutation, RemoveFromWishlistMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<RemoveFromWishlistMutation, RemoveFromWishlistMutationVariables>(RemoveFromWishlistDocument, options);
      }
export type RemoveFromWishlistMutationHookResult = ReturnType<typeof useRemoveFromWishlistMutation>;
export const ToggleWishlistDocument = gql`
    mutation ToggleWishlist($productId: Int!) {
  toggleWishlist(productId: $productId) {
    success
    action
    item {
      id
      user_id
      product_id
      created_at
      updated_at
      product {
        id
        slug
        name
        price
        image_urls
        reviews_count
        avg_rating
        material
        in_wishlist
        is_active
        available_quantity
        total_quantity
        color_code
        color_name
        collection {
          id
          slug
          name
          description
          image_url
          starts_at
          ends_at
          created_at
          updated_at
          products_count
        }
      }
    }
  }
}
    `;

/**
 * __useToggleWishlistMutation__
 *
 * To run a mutation, you first call `useToggleWishlistMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useToggleWishlistMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [toggleWishlistMutation, { data, loading, error }] = useToggleWishlistMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useToggleWishlistMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<ToggleWishlistMutation, ToggleWishlistMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<ToggleWishlistMutation, ToggleWishlistMutationVariables>(ToggleWishlistDocument, options);
      }
export type ToggleWishlistMutationHookResult = ReturnType<typeof useToggleWishlistMutation>;
export const MoveToCartDocument = gql`
    mutation MoveToCart($productId: Int!) {
  moveToCart(productId: $productId)
}
    `;

/**
 * __useMoveToCartMutation__
 *
 * To run a mutation, you first call `useMoveToCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMoveToCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [moveToCartMutation, { data, loading, error }] = useMoveToCartMutation({
 *   variables: {
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useMoveToCartMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<MoveToCartMutation, MoveToCartMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useMutation<MoveToCartMutation, MoveToCartMutationVariables>(MoveToCartDocument, options);
      }
export type MoveToCartMutationHookResult = ReturnType<typeof useMoveToCartMutation>;
export const WishlistDocument = gql`
    query Wishlist($filter: WishlistFilterInput) {
  wishlist(filter: $filter) {
    data {
      id
      user_id
      product_id
      created_at
      updated_at
      product {
        id
        slug
        name
        price
        image_urls
        reviews_count
        avg_rating
        material
        in_wishlist
        is_active
        available_quantity
        total_quantity
        color_code
        color_name
        collection {
          id
          slug
          name
          description
          image_url
          starts_at
          ends_at
          created_at
          updated_at
          products_count
        }
      }
    }
    total
    page
    total_pages
  }
}
    `;

/**
 * __useWishlistQuery__
 *
 * To run a query within a React component, call `useWishlistQuery` and pass it any options that fit your needs.
 * When your component renders, `useWishlistQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWishlistQuery({
 *   variables: {
 *      filter: // value for 'filter'
 *   },
 * });
 */
export function useWishlistQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<WishlistQuery, WishlistQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<WishlistQuery, WishlistQueryVariables>(WishlistDocument, options);
      }
export function useWishlistLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<WishlistQuery, WishlistQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<WishlistQuery, WishlistQueryVariables>(WishlistDocument, options);
        }
// @ts-ignore
export function useWishlistSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<WishlistQuery, WishlistQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<WishlistQuery, WishlistQueryVariables>;
export function useWishlistSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<WishlistQuery, WishlistQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<WishlistQuery | undefined, WishlistQueryVariables>;
export function useWishlistSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<WishlistQuery, WishlistQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<WishlistQuery, WishlistQueryVariables>(WishlistDocument, options);
        }
export type WishlistQueryHookResult = ReturnType<typeof useWishlistQuery>;
export type WishlistLazyQueryHookResult = ReturnType<typeof useWishlistLazyQuery>;
export type WishlistSuspenseQueryHookResult = ReturnType<typeof useWishlistSuspenseQuery>;
export const WishlistIdsDocument = gql`
    query WishlistIds {
  wishlistIds
}
    `;

/**
 * __useWishlistIdsQuery__
 *
 * To run a query within a React component, call `useWishlistIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useWishlistIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWishlistIdsQuery({
 *   variables: {
 *   },
 * });
 */
export function useWishlistIdsQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<WishlistIdsQuery, WishlistIdsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return ApolloReactHooks.useQuery<WishlistIdsQuery, WishlistIdsQueryVariables>(WishlistIdsDocument, options);
      }
export function useWishlistIdsLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<WishlistIdsQuery, WishlistIdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useLazyQuery<WishlistIdsQuery, WishlistIdsQueryVariables>(WishlistIdsDocument, options);
        }
// @ts-ignore
export function useWishlistIdsSuspenseQuery(baseOptions?: ApolloReactHooks.SuspenseQueryHookOptions<WishlistIdsQuery, WishlistIdsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<WishlistIdsQuery, WishlistIdsQueryVariables>;
export function useWishlistIdsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<WishlistIdsQuery, WishlistIdsQueryVariables>): ApolloReactHooks.UseSuspenseQueryResult<WishlistIdsQuery | undefined, WishlistIdsQueryVariables>;
export function useWishlistIdsSuspenseQuery(baseOptions?: ApolloReactHooks.SkipToken | ApolloReactHooks.SuspenseQueryHookOptions<WishlistIdsQuery, WishlistIdsQueryVariables>) {
          const options = baseOptions === ApolloReactHooks.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return ApolloReactHooks.useSuspenseQuery<WishlistIdsQuery, WishlistIdsQueryVariables>(WishlistIdsDocument, options);
        }
export type WishlistIdsQueryHookResult = ReturnType<typeof useWishlistIdsQuery>;
export type WishlistIdsLazyQueryHookResult = ReturnType<typeof useWishlistIdsLazyQuery>;
export type WishlistIdsSuspenseQueryHookResult = ReturnType<typeof useWishlistIdsSuspenseQuery>;