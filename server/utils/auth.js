const jwt = require("jsonwebtoken");
const { GraphQLError } = require("graphql");

const expiration = "1h";

module.exports = {
	// function for our authenticated routes
	AuthenticationError: new GraphQLError("Could not authenticate user.", {
		extensions: {
			code: "UNAUTHENTICATED",
		},
	}),
	signToken: function ({ email, username, _id }) {
		const payload = { email, username, _id };
		return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
	},
};
