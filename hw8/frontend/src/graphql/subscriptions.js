import { gql } from "@apollo/client";
export const MESSAGE_SUBSCRIPTION = gql`
    subscription subscriptChatBox($from: String!, $to: String!) {
        message(from: $from, to: $to) {
            body
            sender
            to
        }
    }
`;
