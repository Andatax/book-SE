export const CREATE_USER = `
mutation CreateUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
      // Include any relevant fields you want to retrieve from the mutation
    }
}
`;

export const LOGIN_USER = `
	mutation LoginUser($usernameOrEmail: String!, $password: String!) {
		login(usernameOrEmail: $usernameOrEmail, password: $password) {
			token
			user {
				id
				username
				email
				savedBooks {
					bookId
					title
					description
					authors
					image
					link
				}
				bookCount
			}
		}
	}
`;

// export const SAVE_BOOK = `
//   mutation SaveBook($book: BookInput!) {
//     saveBook(book: $book) {
//       // Include any relevant fields you want to retrieve from the mutation
//     }
//   }
// `;

// export const DELETE_BOOK = `
//   mutation DeleteBook($bookId: ID!) {
//     deleteBook(bookId: $bookId) {
//       // Include any relevant fields you want to retrieve from the mutation
//     }
//   }
// `;
