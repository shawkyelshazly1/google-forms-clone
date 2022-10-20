const { default: mongoose } = require("mongoose");
const { FormModel } = require("../models");

// class to handle the user modal interactions on DB
class FormRepository {
	//create new form
	async CreateForm(formData) {
		try {
			const newForm = await new FormModel(formData);
			return await newForm.save();
		} catch (error) {
			console.error(error);
			return { error: "Something Went Wrong!" };
		}
	}

	// update form
	async UpdateForm(formId, formData) {
		try {
			const updatedForm = await FormModel.findByIdAndUpdate(formId, formData, {
				new: true,
			});

			return updatedForm;
		} catch (error) {
			console.error(error);
			return { error: "Something Went Wrong!" };
		}
	}

	// delete form by id
	async DeleteForm(formId) {
		try {
			const deletedForm = await FormModel.findByIdAndDelete(formId);
			return deletedForm;
		} catch (error) {
			console.error(error);
			return { error: "Something Went Wrong!" };
		}
	}

	// get user forms
	async GetForms(userId) {
		try {
			const userForms = await FormModel.find({
				owner: mongoose.Types.ObjectId(userId),
			});
			return userForms;
		} catch (error) {
			console.error(error);
			return { error: "Something Went Wrong!" };
		}
	}

	//get single form by id
	async GetFormById(formId) {
		try {
			const existingForm = await FormModel.findById(formId);
			return existingForm;
		} catch (error) {
			console.error(error);
			return { error: "Something Went Wrong!" };
		}
	}
}

module.exports = FormRepository;
