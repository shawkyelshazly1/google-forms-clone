const bcryptjs = require("bcryptjs"),
	jwt = require("jsonwebtoken");

// hash password
exports.hashPassword = async (password) => {
	const hashedPassword = await bcryptjs.hash(password, 10);
	return hashedPassword;
};

// generate access token
module.exports.generateAccessToken = async (payload) => {
	return jwt.sign(payload.toJSON(), process.env.APP_ACCESS_TOKEN_SECRET, {
		expiresIn: "1w",
	});
};

// genereate token
module.exports.generateToken = async (data) => {
	return jwt.sign(data.toJSON(), process.env.APP_SECRET);
};
//validate token
module.exports.validateToken = async (token) => {
	try {
		const payload = await jwt.verify(token, process.env.APP_SECRET);
		return payload;
	} catch (error) {
		return false;
	}
};

// validate access token
module.exports.validateAccessToken = async (req) => {
	const token = req.get("authorization");
	if (token) {
		const payload = await jwt.verify(
			token.split(" ")[1],
			process.env.APP_ACCESS_TOKEN_SECRET
		);
		req.user = payload;
		return true;
	}
	return false;
};
