const mongoose = require("mongoose");

module.exports = () => {
	try {
		mongoose.connect(
			process.env.NODE_ENV === "development"
				? process.env.MONGODB_URI_DEV
				: process.env.MONGODB_URI_PROD,
			{
				useUnifiedTopology: true,
				useNewUrlParser: true,
			}
		);
		console.log("DB Connected!");
	} catch (error) {
		console.error(error);
	}
};
