const mongoose = require("mongoose");

const shortendURLSchema = mongoose.Schema({
	originalURL: { type: String, required: true },
	shortenedURL: { type: String, required: true },
});

module.exports = mongoose.model("ShortendURL", shortendURLSchema);
