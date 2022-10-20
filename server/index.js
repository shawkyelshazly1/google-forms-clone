const express = require("express"),
	cors = require("cors"),
	{ initDatabaseConnection } = require("./database"),
	{ UserAPI } = require("./api");

require("dotenv").config();

// set app isntance
const app = express();

// set app dependencies
app.use(cors());
app.use(express.json());

// connect DB
initDatabaseConnection();

UserAPI(app);

// start sever
app.listen(5000, () => {
	console.log(`Server started on port 5000`);
});
