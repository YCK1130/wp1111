import { gql } from "@apollo/client";

// TODO 3.1 Mutation - Update item
export const CREATE_ITEM_MUTATION = gql`
    mutation CreateItem($input: CreateItemInput!) {
        createItem(input: $input) {
            amount
            category
            date
            description
            id
            name
        }
    }
`;
// TODO 3.1 End

export const UPDATE_ITEM_MUTATION = gql`
    mutation UpdateItem($input: UpdateItemInput!) {
        updateItem(input: $input) {
            id
            description
            date
            category
            amount
            name
        }
    }
`;

export const DELETE_ITEM_MUTATION = gql`
    mutation DeleteItem($id: ID!) {
        deleteItem(id: $id)
    }
`;
