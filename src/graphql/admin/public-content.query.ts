import { gql } from "@apollo/client";

export const PUBLIC_ABOUT_CONTENT_QUERY = gql`
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

export const PUBLIC_FAQ_CONTENT_QUERY = gql`
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

export const PUBLIC_SHIPPING_CONTENT_QUERY = gql`
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

export const PUBLIC_CARE_CONTENT_QUERY = gql`
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

export const PUBLIC_PRIVACY_CONTENT_QUERY = gql`
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

export const PUBLIC_TERMS_CONTENT_QUERY = gql`
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

export const PUBLIC_HERO_IMAGES_QUERY = gql`
  query PublicHeroImages {
    publicHeroImages {
      home
      ourStory
      products
      events
    }
  }
`;
