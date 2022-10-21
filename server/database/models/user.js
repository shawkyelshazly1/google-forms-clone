const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
	{
		email: { type: String, required: true, trim: true },
		password: { type: String, required: true, trim: true },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
