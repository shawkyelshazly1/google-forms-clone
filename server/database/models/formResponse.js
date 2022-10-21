const mongoose = require("mongoose");

const formResponseSchema = mongoose.Schema(
	{
		formId: { type: String, required: true },
		answers: [
			{
				questionId: { type: String, required: true },
				answer: { type: String, required: true },
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("FormResponse", formResponseSchema);
