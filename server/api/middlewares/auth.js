const { validateAccessToken } = require("../../utils");

// user auth middleware
module.exports = async (req, res, next) => {
	try {
		const isAuthenticated = await validateAccessToken(req);
		if (isAuthenticated) {
			return next();
		}
		return res.status(403).json({ error: "Not Authorized!" });
	} catch (error) {
		return res.status(403).json({ error: "Not Authorized!" });
	}
};
