const { FormService, FormResponseService } = require("../services");
const userAuth = require("./middlewares/auth");

module.exports = (app) => {
	const service = new FormService();
	const formResponseService = new FormResponseService();

	// Create Form  /* working */
	app.post("/form/create", userAuth, async (req, res, next) => {
		const { _id } = req.user;
		const { formData } = req.body;

		if (!formData) {
			return res.status(409).json({ error: "Form data is required!" });
		}

		const data = await service.addForm(_id, formData);
		if (data.error) {
			return res.status(409).json({ error: data.error });
		}
		return res.status(200).json(data.data);
	});

	// Delete Form   /* working */
	app.delete("/form/:id", userAuth, async (req, res, next) => {
		const { _id } = req.user;
		const { id } = req.params;

		const data = await service.deleteForm(_id, id);

		if (data.error) {
			return res.status(409).json({ error: data.error });
		}
		return res.status(200).json(data.data);
	});

	// Update Form  /* working */
	app.put("/form/:id", userAuth, async (req, res, next) => {
		const { _id } = req.user;
		const { id } = req.params;
		const { formData } = req.body;

		if (!formData) {
			return res.status(409).json({ error: "Form data is required!" });
		}

		const data = await service.updateForm(_id, id, formData);

		if (data.error) {
			return res.status(409).json({ error: data.error });
		}
		return res.status(200).json(data.data);
	});

	// Load Form edit  /* working */
	app.get("/form/:id/edit", userAuth, async (req, res, next) => {
		const { id } = req.params;
		const { _id } = req.user;

		const data = await service.getForm(id);

		if (data.data && data.data.owner.toString() !== _id) {
			return res.status(409).json({ error: "Not Authorized!" });
		}

		if (data.error) {
			return res.status(409).json({ error: data.error });
		}
		return res.status(200).json(data.data);
	});

	// load Form view /**  Un-Protected **/  /* working */
	app.get("/form/:id/view", async (req, res, next) => {
		const { id } = req.params;

		const data = await service.getForm(id);

		if (data.error) {
			return res.status(409).json({ error: data.error });
		}
		return res.status(200).json(data.data);
	});

	// Load Forms  /* working */
	app.get("/form/all", userAuth, async (req, res, next) => {
		const { _id } = req.user;

		const data = await service.getUserForms(_id);

		if (data.error) {
			return res.status(409).json({ error: data.error });
		}
		return res.status(200).json(data.data);
	});

	// submit form response
	app.post("/form/:id/response", async (req, res, next) => {
		const { formResponseData } = req.body;

		if (!formResponseData) {
			return res.status(409).json({ error: "Form response data is required!" });
		}

		const data = await formResponseService.addFormResponse(formResponseData);

		if (data.error) {
			return res.status(409).json({ error: data.error });
		}
		return res.status(200).json(data.data);
	});

	// load form responses
	app.get("/form/:id/responses", userAuth, async (req, res, next) => {
		const { _id } = req.user;
		const { id } = req.params;

		const data = await formResponseService.getFormResponses(_id, id);

		if (data.error) {
			return res.status(409).json({ error: data.error });
		}
		return res.status(200).json(data.data);
	});
};
