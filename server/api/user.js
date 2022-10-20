const userAuth = require("./middlewares/auth");
const { UserService } = require("../services");

// user apis
module.exports = (app) => {
	// user service instance
	const userService = new UserService();

	// signin Route
	app.post("/user/login", async (req, res, next) => {
		const { email, password } = req.body;
		if (!(email && password)) {
			return res.status(409).json({ error: "Email & Password are required!" });
		}
		const data = await userService.loginUser({ email, password });
		if (data.error) {
			return res.status(409).json({ error: data.error });
		}
		return res.status(200).json({ data });
	});

	//register Route
	app.post("/user/register", async (req, res, next) => {
		const { email, password, confirmPassword } = req.body;
		if (!(email && password && confirmPassword)) {
			return res.status(409).json({ error: "Registration Data is required!" });
		}

		const data = await userService.registerUser({
			email,
			password,
			confirmPassword,
		});

		if (data.error) {
			return res.status(409).json({ error: data.error });
		}
		return res.status(200).json({ data });
	});

	//auth route
	app.get("/user/auth", userAuth, async (req, res, next) => {
		const { _id } = req.user;
		const data = await userService.getUser(_id);
		if (data.error) {
			return res.status(409).json({ error: data.error });
		}
		return res.status(200).json({ data });
	});
};
