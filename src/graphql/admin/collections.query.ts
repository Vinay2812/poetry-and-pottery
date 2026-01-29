import { gql } from "@apollo/client";

export const ADMIN_COLLECTIONS_QUERY = gql`
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

export const ADMIN_COLLECTION_BY_ID_QUERY = gql`
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
