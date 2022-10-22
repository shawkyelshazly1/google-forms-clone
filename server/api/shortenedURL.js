const { ShortenedURLService } = require("../services");

// apis for shortened urls
module.exports = (app) => {
	const service = new ShortenedURLService();

	// create new shortend url
	app.post("/url/create", async (req, res, next) => {
		const { id } = req.params;
		const { originalURL } = req.body;

		const data = await service.addShortenedURL(originalURL);
		if (data.error) {
			return res.status(409).json({ error: data.error });
		}
		return res.status(200).json(data.data);
	});

	// direct to original url
	app.get("/url/:id", async (req, res, next) => {
		const { id } = req.params;

		const data = await service.getOriginalURL(id);
		if (data.error) {
			console.error(data.error);
			return res.redirect("http://localhost:3000/404");
		}
		res.redirect(data.data.originalURL);
	});
};
