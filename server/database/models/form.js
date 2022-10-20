const mongoose = require("mongoose");

const formSchema = mongoose.Schema(
	{
		title: { type: String, required: true },
		questions: [
			{
				"question-title": { type: String, required: true },
				"question-type": { type: String, required: true },
				id: { type: String, required: true },
				options: [
					{
						questionId: { type: String, required: true },
						id: { type: String, required: true },
						title: { type: String, required: true },
						placeholder: { type: String, required: true },
					},
				],
			},
		],
		owner: { type: mongoose.Types.ObjectId, ref: "user", required: true },
	},
	{ timeStamps: true }
);

module.exports = mongoose.model("Form", formSchema);
