const { User } = require("../models");
const { AuthService } = require("../utils/auth");

const resolvers = {
	Query: {
		getUsers: async (parent, args, context, info) => {
			return User.find({});
		},
	},
	Mutation: {
		createUser: async (parent, args, context, info) => {
			const user = await User.create(args);
		},
		login: async (parent, args, context, info) => {
			const user = await User.findOne({
				$or: [{ username: args.username }, { email: args.email }],
			});
			if (!user) {
				throw new Error("Invalid email or password");
			}
			const isPasswordValid = await bcrypt.compare(args.password, user.password);
			if (!isPasswordValid) {
				throw new Error("Invalid email or password");
			}
			const token = signToken(user);
			return { token, user };
		},
		saveBook: async (parent, args, context, info) => {
			const user = context.user;
			const updatedUser = await User.findOneAndUpdate(
				{ _id: user._id },
				{ $addToSet: { savedBooks: args.book } },
				{ new: true, runValidators: true }
			);
			return updatedUser;
		},
		deleteBook: async (parent, args, context, info) => {
			const user = context.user;
			const updatedUser = await User.findOneAndUpdate(
				{ _id: user._id },
				{ $pull: { savedBooks: { bookId: args.bookId } } },
				{ new: true }
			);
			if (!updatedUser) {
				throw new Error("User not found");
			}
			return updatedUser;
		},
	},
};

module.exports = resolvers;
