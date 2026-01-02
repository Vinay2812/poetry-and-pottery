import { gql } from "@apollo/client";

export const ADMIN_ALL_SETTINGS_QUERY = gql`
  query AdminAllSettings {
    adminAllSettings {
      id
      key
      value
      updated_at
    }
  }
`;

export const ADMIN_HERO_IMAGES_QUERY = gql`
  query AdminHeroImages {
    adminHeroImages {
      home
      ourStory
      products
      events
    }
  }
`;

export const ADMIN_CONTACT_INFO_QUERY = gql`
  query AdminContactInfo {
    adminContactInfo {
      address
      email
      phone
      hours
    }
  }
`;

export const ADMIN_SOCIAL_LINKS_QUERY = gql`
  query AdminSocialLinks {
    adminSocialLinks {
      instagram
      facebook
      twitter
      pinterest
    }
  }
`;
