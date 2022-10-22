const { FormResponseRepository, FormRepository } = require("../database");

// class to create services to interact with the DB repository
class FormResponseService {
	constructor() {
		this.repository = new FormResponseRepository();
		this.formRepository = new FormRepository();
	}

	// create new form response
	async addFormResponse(formResponseData) {
		try {
			const newFormResponse = await this.repository.CreateFormResponse(
				formResponseData
			);
			return { data: newFormResponse };
		} catch (error) {
			console.error(error);
			return { error: "Something Went Wrong!" };
		}
	}

	// get all form responses
	async getFormResponses(userId, formId) {
		try {
			const existingForm = await this.formRepository.GetFormById(formId);
			if (!existingForm) {
				return { error: "Couldn't find form!" };
			}
			if (existingForm.owner.toString() !== userId) {
				return { error: "Not Authorized!" };
			}

			const formResponses = await this.repository.GetFormResponses(formId);
			const formResponsesStats = await this.repository.GetFormResponsesStats(
				formId
			);
			return { data: { responses: formResponses, formResponsesStats } };
		} catch (error) {
			console.error(error);
			return { error: "Something Went Wrong!" };
		}
	}
}

module.exports = FormResponseService;
