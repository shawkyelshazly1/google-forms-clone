const { UserRepository } = require("../database");
const { hashPassword, generateAccessToken } = require("../utils");
const bcryptjs = require("bcryptjs");

// class that interacts with DB repositories working on validation and functions
class UserService {
	constructor() {
		this.repository = new UserRepository();
	}

	// register new user
	async registerUser({ email, password, confirmPassword }) {
		try {
			if (password !== confirmPassword) {
				return { error: "Password & Confirm Password doesn't match" };
			}

			const existingUser = await this.repository.FindUserByEmail(email);
			if (existingUser) {
				return { error: "Email registered Already." };
			}
			const newUser = await this.repository.CreateUser({
				email,
				password: await hashPassword(password),
			});
			return { data: newUser };
		} catch (error) {
			console.error(error);
			return { error: "Something Went Wrong!" };
		}
	}

	// login user
	async loginUser({ email, password }) {
		try {
			const existingUser = await this.repository.FindUserByEmail(email);
			if (!existingUser) {
				return { error: "Email not found!" };
			}

			if (!(await bcryptjs.compare(password, existingUser.password))) {
				return { error: "Wrong Password!" };
			}

			const user = await this.repository.FindUserById(existingUser._id);
			const token = await generateAccessToken(user);

			return { data: { user, token } };
		} catch (error) {
			console.error(error);
			return { error: "Something Went Wrong!" };
		}
	}

	// get user by id
	async getUser(userId) {
		try {
			const existingUser = await this.repository.FindUserById(userId);
			if (!existingUser) {
				return { error: "can't Find user!" };
			}
			return { data: existingUser };
		} catch (error) {
			console.error(error);
			return { error: "Something Went Wrong!" };
		}
	}
}

module.exports = UserService;
