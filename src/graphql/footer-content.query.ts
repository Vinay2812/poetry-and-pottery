import { gql } from "@apollo/client";

export const FOOTER_CONTENT_QUERY = gql`
  query FooterContent {
    footerContent {
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
