const { UserModel } = require("../models");
const mongoose = require("mongoose");

// class to handle the user modal interactions on DB
class UserRepository {
	// add user to DB
	async CreateUser(userData) {
		try {
			const newUser = await new UserModel(userData);
			return await newUser.save();
		} catch (error) {
			console.error(error);
			return { error: "Something Went Wrong!" };
		}
	}

	// load User by ID
	async FindUserById(userId) {
		try {
			const existingUser = await UserModel.findById(
				mongoose.Types.ObjectId(userId),
				{ password: 0 }
			);
			return existingUser;
		} catch (error) {
			console.error(error);
			return { error: "Something Went Wrong!" };
		}
	}

	// load User by Email
	async FindUserByEmail(email) {
		try {
			const existingUser = await UserModel.findOne({ email });
			return existingUser;
		} catch (error) {
			console.error(error);
			return { error: "Something Went Wrong!" };
		}
	}
}

module.exports = UserRepository;
