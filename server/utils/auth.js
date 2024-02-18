const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "../.env" });

const expiration = "2h";

module.exports = {
	AuthenticationError: new GraphQLError("Could not authenticate user.", {
		extensions: {
			code: "UNAUTHENTICATED",
		},
	}),
	authMiddleware: function ({ req }) {
		let token = req.body.token || req.query.token || req.headers.authorization;

		if (req.headers.authorization) {
			token = token.split(" ").pop().trim();
		}
		console.log("Token:", token);
		if (!token) {
			throw new GraphQLError("No token provided.");
			return req;
		}

		try {
			const { data } = jwt.verify(token, process.env.AUTH_SECRET, { maxAge: expiration });
			req.user = data;
			console.log("User data:", data);
		} catch {
			throw new GraphQLError("Invalid token.");
			console.log("Invalid token");
		}

		return req;
	},
	signToken: function ({ email, username, _id }) {
		const payload = { email, username, _id };
		return jwt.sign({ data: payload }, process.env.AUTH_SECRET, { expiresIn: expiration });
	},
};
