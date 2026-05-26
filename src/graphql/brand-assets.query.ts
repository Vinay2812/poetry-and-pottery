import { gql } from "@apollo/client";

export const BRAND_ASSETS_QUERY = gql`
  query BrandAssets {
    brandAssets {
      logo
      logoDark
      favicon
      appleTouchIcon
      defaultOgImage
    }
  }
`;
