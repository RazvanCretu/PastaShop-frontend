import { gql } from "@apollo/client";

export const ITEMS = gql`
  query Items {
    items {
      data {
        id
        attributes {
          name
          shortDescription
          longDescription
          price
          image {
            data {
              attributes {
                url
              }
            }
          }
        }
      }
    }
  }
`;

export const ORDER_CREATE = gql`
  mutation placeOrder($username: String!, $products: JSON) {
    createOrder(data: { username: $username, products: $products }) {
      data {
        id
        attributes {
          products
          username
          stripeSessionId
          url
        }
      }
    }
  }
`;
