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
}

module.exports = FormResponseRepository;
