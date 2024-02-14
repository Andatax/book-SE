const User = require("../models/User");

const resolvers = {
	Query: {
		me: async (parent, args, context) => {
			if (context.user) {
				const userData = await User.findOne({ _id: context.user._id }).select("-__v -password");
			}
		},
	},
	Mutation: {
		login: async (parent, { email, password }) => {
			const user = await User.findOne({ email });

			if (!user) {
				return res.status(400).json({ message: "Can't find this user" });
			}

			const correctPw = await user.isCorrectPassword(password);

			if (!correctPw) {
				return res.status(400).json({ message: "Wrong password!" });
			}

			const token = signToken(user);
			return { token, user };
		},
		createUser: async (parent, args) => {
			const user = await User.create(args);
			const token = signToken(user);

			return { token, user };
		},
		saveBook: async (parent, { bookData }, context) => {
			if (context.user) {
				const updatedUser = await User.findByIdAndUpdate(
					{ _id: context.user._id },
					{ $push: { savedBooks: bookData } },
					{ new: true }
				);
				return updatedUser;
			}
			throw new Error("You need to be logged in!");
		},
		removeBook: async (parent, { bookId }, context) => {
			if (context.user) {
				const updatedUser = await User.findByIdAndUpdate(
					{ _id: context.user._id },
					{ $pull: { savedBooks: { bookId } } },
					{ new: true }
				);
				return updatedUser;
			}
			throw new Error("You need to be logged in!");
		},
	},
};