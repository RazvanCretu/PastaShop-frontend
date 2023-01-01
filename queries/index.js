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
