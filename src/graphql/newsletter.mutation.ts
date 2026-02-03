import { gql } from "@apollo/client";

export const SUBSCRIBE_TO_NEWSLETTER_MUTATION = gql`
  mutation SubscribeToNewsletter {
    subscribeToNewsletter {
      success
      error
      status {
        subscribed
        subscribed_at
      }
    }
  }
`;
