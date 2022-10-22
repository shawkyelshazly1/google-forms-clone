// shortened url service to handle APIs and DB calls
const { ShortenedURLRepository } = require("../database");
const ids = require("short-id");

class ShortenedURLService {
	constructor() {
		this.repository = new ShortenedURLRepository();
	}

	// add shortened URl
	async addShortenedURL(originalURL) {
		try {
			const existingURL = await this.repository.GetShortenedURL(originalURL);

			if (existingURL) {
				return { data: existingURL };
			}

			const data = {
				originalURL,
				shortenedURL: ids.generate(),
			};
			console.log(data);
			const newURL = await this.repository.CreateShortenedURL(data);
			return { data: newURL };
		} catch (error) {
			console.error(error);
			return { error: "Something Went Wrong!" };
		}
	}

	// get shortend URL
	async getOriginalURL(shortenedURL) {
		try {
			const originalUrl = await this.repository.GetOriginlURL(shortenedURL);
			if (!originalUrl) {
				return { error: "Something Went Wrong!" };
			}
			return { data: originalUrl };
		} catch (error) {
			console.error(error);
			return { error: "Something Went Wrong!" };
		}
	}
}

module.exports = ShortenedURLService;
