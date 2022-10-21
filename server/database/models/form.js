const mongoose = require("mongoose");

const formSchema = mongoose.Schema(
	{
		_id: { type: String, required: true },
		"form-title": { type: String, required: true },
		questions: [
			{
				_id: { type: String, required: true },
				"question-title": { type: String, required: true },
				"question-type": { type: String, required: true },

				options: [
					{
						_id: { type: String, required: true },
						questionId: { type: String, required: true },
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
