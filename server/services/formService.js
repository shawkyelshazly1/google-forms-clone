const { FormRepository } = require("../database");

// class that interacts with DB repositories working on validation and functions
class FormService {
	constructor() {
		this.repository = new FormRepository();
	}

	// create new form
	async addForm(userId, formData) {
		try {
			const newForm = await this.repository.CreateForm({
				...formData,
				owner: userId,
			});
			return { data: newForm };
		} catch (error) {
			console.error(error);
			return { error: "Something Went Wrong!" };
		}
	}

	// load user forms
	async getUserForms(userId) {
		try {
			const userForms = await this.repository.GetForms(userId);
			return { data: userForms || [] };
		} catch (error) {
			console.error(error);
			return { error: "Something Went Wrong!" };
		}
	}

	// get form by id
	async getForm(formId) {
		try {
			const existingForm = await this.repository.GetFormById(formId);
			if (!existingForm) {
				return { error: "Couldn't find form!" };
			}

			return { data: existingForm };
		} catch (error) {
			console.error(error);
			return { error: "Something Went Wrong!" };
		}
	}

	// delete form by id
	async deleteForm(userId, formId) {
		try {
			const existingForm = await this.repository.GetFormById(formId);

			if (!existingForm) {
				return { error: "Couldn't find form!" };
			}

			if (existingForm.owner.toString() !== userId) {
				return { error: "Not Authorized!" };
			}

			const deletedForm = await this.repository.DeleteForm(formId);
			return { data: deletedForm };
		} catch (error) {
			console.error(error);
			return { error: "Something Went Wrong!" };
		}
	}

	// update form by id
	async updateForm(userId, formId, formData) {
		try {
			const existingForm = await this.repository.GetFormById(formId);

			if (!existingForm) {
				return { error: "Couldn't find form!" };
			}

			if (existingForm.owner.toString() !== userId) {
				return { error: "Not Authorized!" };
			}

			const updatedForm = await this.repository.UpdateForm(formId, {
				...formData,
				owner: userId,
			});
			return { data: updatedForm };
		} catch (error) {
			console.error(error);
			return { error: "Something Went Wrong!" };
		}
	}
}

module.exports = FormService;
