const { ShortendURLModel } = require("../models");

// class to interact with shortened url DB
class ShortenedURLRepository {
	// create shortend URL
	async CreateShortenedURL(data) {
		try {
			const newShortenedURL = await new ShortendURLModel(data);
			return await newShortenedURL.save();
		} catch (error) {
			console.error(error);
			return { error: "Something Went Wrong!" };
		}
	}

	// get original URL
	async GetOriginlURL(shortenedURL) {
		try {
			const existingURL = await ShortendURLModel.findOne({ shortenedURL });
			return existingURL;
		} catch (error) {
			console.error(error);
			return { error: "Something Went Wrong!" };
		}
	}
	// get shortened URL
	async GetShortenedURL(originalURL) {
		try {
			const existingURL = await ShortendURLModel.findOne({ originalURL });
			return existingURL;
		} catch (error) {
			console.error(error);
			return { error: "Something Went Wrong!" };
		}
	}
}

module.exports = ShortenedURLRepository;
