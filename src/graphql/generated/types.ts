export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
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
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  level?: InputMaybe<EventLevel>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  startDate?: InputMaybe<Scalars['DateTime']['input']>;
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
  collectionId?: InputMaybe<Scalars['Int']['input']>;
  isActive?: InputMaybe<Scalars['Boolean']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  lowStock?: InputMaybe<Scalars['Boolean']['input']>;
  outOfStock?: InputMaybe<Scalars['Boolean']['input']>;
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
