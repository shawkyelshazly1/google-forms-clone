const express = require("express"),
	cors = require("cors"),
	{ initDatabaseConnection } = require("./database"),
	{ UserAPI, FormAPI } = require("./api");

require("dotenv").config();

// set app isntance
const app = express();

// set app dependencies
app.use(cors());
app.use(express.json());

// connect DB
initDatabaseConnection();

// register service routes
UserAPI(app);
FormAPI(app);

// start sever
app.listen(process.env.PORT || 5000, () => {
	console.log(`Server started on port 5000`);
});
