const { FormRepository } = require("../database");

// class that interacts with DB repositories working on validation and functions
class FormService {
	constructor() {
		this.repository = new FormRepository();
	}

	// create new form
	// load user forms
	// get form by id
	// delete form by id
	// update form by id
}

module.exports = FormService;
