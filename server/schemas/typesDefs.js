const typeDefs = `
type User {
    id: ID!  
    username: String!
    email: String!
    savedBooks: [Book!]!  
    bookCount: Int  # Virtual field for book count
}

type Book {
    bookId: ID!  
    title: String!
    description: String!
    authors: [String!]!  
    image: String
    link: String
}

type mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
    token
    user {
        id
        username
        email
    }
    }
}

mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
    token
    user {
        id
        username
        email
    }
    }
}

`;
