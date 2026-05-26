import { gql } from "@apollo/client";

export const PAGE_CONTENT_QUERY = gql`
  query PageContent($pageSlug: String!) {
    pageContent(pageSlug: $pageSlug) {
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
