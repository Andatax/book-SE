const typeDefs = `
	type User {
		id: ID!
		username: String!
		email: String!
		savedBooks: [Book!]
		bookCount: Int
	}
	type Book {
		bookId: ID!
		title: String!
		description: String
		authors: [String]
		image: String
		link: String
	}

	input BookInput {
		bookId: ID!
		title: String!
		description: String
		authors: [String]
		image: String
		link: String
	}

	type Mutation {
		login(email: String!, password: String!): AuthPayload
		createUser(username: String!, email: String!, password: String!): AuthPayload
	}

	type Query {
		getUsers: [User]
	}

	type Mutation {
		login(email: String!, password: String!): AuthPayload
    	createUser(username: String!, email: String!, password: String!): AuthPayload
    	saveBook(book: BookInput!): User
    	deleteBook(bookId: ID!): User
	}

	type AuthPayload {
		token: String
		user: User
	}
`;

module.exports = typeDefs;
