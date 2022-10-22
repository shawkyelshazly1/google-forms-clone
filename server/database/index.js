module.exports = {
	initDatabaseConnection: require("./connection"),
	UserRepository: require("./repository/userRepository"),
	FormRepository: require("./repository/formRepository"),
	FormResponseRepository: require("./repository/formResponseRepository"),
	ShortenedURLRepository: require("./repository/shortenedURLRepository"),
};
