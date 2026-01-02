import { gql } from "@apollo/client";

export const NEWSLETTER_STATUS_QUERY = gql`
  query NewsletterStatus {
    newsletterStatus {
      subscribed
      subscribed_at
    }
  }
`;
