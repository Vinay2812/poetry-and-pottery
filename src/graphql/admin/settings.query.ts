import { gql } from "@apollo/client";

export const ADMIN_HERO_IMAGES_QUERY = gql`
  query AdminHeroImages {
    adminHeroImages {
      home
      store
      events
      about
      contact
      faq
      shipping
      care
      privacy
      terms
      customize
      ourStory
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

export const ADMIN_HERO_VIDEOS_QUERY = gql`
  query AdminHeroVideos {
    adminHeroVideos {
      home {
        src
        poster
      }
    }
  }
`;

export const ADMIN_BRAND_ASSETS_QUERY = gql`
  query AdminBrandAssets {
    adminBrandAssets {
      logo
      logoDark
      favicon
      appleTouchIcon
      defaultOgImage
    }
  }
`;

export const ADMIN_SEO_METADATA_QUERY = gql`
  query AdminSeoMetadata {
    adminSeoMetadata {
      entries
    }
  }
`;

export const ADMIN_FOOTER_CONTENT_QUERY = gql`
  query AdminFooterContent {
    adminFooterContent {
      tagline
      copyright
      newsletterBlurb
      columns {
        title
        links {
          label
          href
        }
      }
    }
  }
`;

export const ADMIN_PAGE_TAGLINES_QUERY = gql`
  query AdminPageTaglines {
    adminPageTaglines {
      entries
    }
  }
`;

export const ADMIN_PAGE_CONTENT_QUERY = gql`
  query AdminPageContent($pageSlug: String!) {
    adminPageContent(pageSlug: $pageSlug) {
      hero
      video {
        src
        poster
      }
      seo {
        title
        description
        ogImage
        ogTitle
        ogDescription
      }
      tagline {
        heading
        subheading
        ctaText
      }
    }
  }
`;

export const SITE_CONTENT_DEFAULTS_QUERY = gql`
  query SiteContentDefaults {
    siteContentDefaults {
      value
    }
  }
`;
