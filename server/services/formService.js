const { FormRepository } = require("../database");

// class that interacts with DB repositories working on validation and functions
class FormService {
	constructor() {
		this.repository = new FormRepository();
	}

	// create new form
	async addForm(userId, formData) {}

	// load user forms
	async getUserForms(userId) {}

	// get form by id
	async getForm(formId) {}

	// delete form by id
	async deleteForm(userId, formId) {}

	// update form by id
	async updateForm(userId, formId, formData) {}
}

module.exports = FormService;
