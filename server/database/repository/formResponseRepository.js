// class to interact with DB

const { FormResponseModel } = require("../models");

class FormResponseRepository {
	// submit form response
	async CreateFormResponse(formResponseData) {
		try {
			const newFormResponse = await new FormResponseModel(formResponseData);
			return await newFormResponse.save();
		} catch (error) {
			console.error(error);
			return { error: "Something Went Wrong!" };
		}
	}
	// get form responses
	async GetFormResponses(formId) {
		try {
			const formResponses = await FormResponseModel.find({ formId });
			return formResponses;
		} catch (error) {
			console.error(error);
			return { error: "Something Went Wrong!" };
		}
	}

	// get form response Stats
	async GetFormResponsesStats(formId) {
		try {
			const formResponses = await FormResponseModel.aggregate([
				{ $match: { formId: formId } },
				{
					$unwind: "$answers",
				},
				{
					$replaceRoot: {
						newRoot: "$answers",
					},
				},
				{
					$project: {
						_id: 0,
					},
				},
				{
					$group: {
						_id: {
							questionId: "$questionId",
							answer: "$answer",
						},
						answerResponses: {
							$sum: 1,
						},
					},
				},
				{
					$group: {
						_id: "$_id.questionId",
						responses: {
							$sum: "$answerResponses",
						},
						answers: {
							$push: {
								answer: "$_id.answer",
								responses: "$answerResponses",
							},
						},
					},
				},
			]);

			return formResponses;
		} catch (error) {
			console.error(error);
			return { error: "Something Went Wrong!" };
		}
	}
}

module.exports = FormResponseRepository;
