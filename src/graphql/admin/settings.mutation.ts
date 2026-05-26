import { gql } from "@apollo/client";

export const ADMIN_UPDATE_HERO_IMAGES_MUTATION = gql`
  mutation AdminUpdateHeroImages($input: UpdateHeroImagesInput!) {
    adminUpdateHeroImages(input: $input) {
      success
      error
    }
  }
`;

export const ADMIN_UPDATE_CONTACT_INFO_MUTATION = gql`
  mutation AdminUpdateContactInfo($input: UpdateContactInfoInput!) {
    adminUpdateContactInfo(input: $input) {
      success
      error
    }
  }
`;

export const ADMIN_UPDATE_SOCIAL_LINKS_MUTATION = gql`
  mutation AdminUpdateSocialLinks($input: UpdateSocialLinksInput!) {
    adminUpdateSocialLinks(input: $input) {
      success
      error
    }
  }
`;

export const ADMIN_UPDATE_HERO_VIDEOS_MUTATION = gql`
  mutation AdminUpdateHeroVideos($input: UpdateHeroVideosInput!) {
    adminUpdateHeroVideos(input: $input) {
      success
      error
    }
  }
`;

export const ADMIN_UPDATE_BRAND_ASSETS_MUTATION = gql`
  mutation AdminUpdateBrandAssets($input: UpdateBrandAssetsInput!) {
    adminUpdateBrandAssets(input: $input) {
      success
      error
    }
  }
`;

export const ADMIN_UPDATE_SEO_METADATA_MUTATION = gql`
  mutation AdminUpdateSeoMetadata($input: UpdateSeoMetadataInput!) {
    adminUpdateSeoMetadata(input: $input) {
      success
      error
    }
  }
`;

export const ADMIN_UPDATE_FOOTER_CONTENT_MUTATION = gql`
  mutation AdminUpdateFooterContent($input: UpdateFooterContentInput!) {
    adminUpdateFooterContent(input: $input) {
      success
      error
    }
  }
`;

export const ADMIN_UPDATE_PAGE_TAGLINES_MUTATION = gql`
  mutation AdminUpdatePageTaglines($input: UpdatePageTaglinesInput!) {
    adminUpdatePageTaglines(input: $input) {
      success
      error
    }
  }
`;
