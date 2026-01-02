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

export const UNSUBSCRIBE_FROM_NEWSLETTER_MUTATION = gql`
  mutation UnsubscribeFromNewsletter {
    unsubscribeFromNewsletter {
      success
      error
      status {
        subscribed
        subscribed_at
      }
    }
  }
`;
