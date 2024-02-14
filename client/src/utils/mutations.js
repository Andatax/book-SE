import { gql } from "@apollo/client";

export const CREATE_PROFILE = gql`
	mutation createUser($username: String!, $email: String!, $password: String!) {
		createUser(username: $username, email: $email, password: $password) {
			_id
			username
			email
			password
		}
	}
`;

export const LOGIN_USER = gql`
	mutation loginUser($email: String!, $password: String!) {
		loginUser(email: $email, password: $password) {
			token
			user {
				_id
				username
				email
			}
		}
	}
`;

export const SAVE_BOOK = gql`
	mutation saveBook($bookData: BookInput!) {
		saveBook(bookData: $bookData) {
			_id
			username
			email
			bookCount
			savedBooks {
				bookId
				authors
				description
				title
				image
				link
			}
		}
	}
`;

export const REMOVE_BOOK = gql`
	mutation removeBook($bookId: ID!) {
		removeBook(bookId: $bookId)
	}
`;
