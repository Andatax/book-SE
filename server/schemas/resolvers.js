const User = require("../models/User");

const resolvers = {
	Query: {
		users: async () => {
			return await User.find();
		},
		user: async (parent, args) => {
			return await User.findOne(_id: args._id);
		},
	},
};
