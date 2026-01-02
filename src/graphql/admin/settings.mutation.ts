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
