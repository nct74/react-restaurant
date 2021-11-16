require("dotenv").config()

const express = require("express")
const app = express()
const path = require("path")
const mysql = require("mysql")

const connection = mysql.createConnection({
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env.PASSWORD,
	database: process.env.DATABASE
})

connection.connect((err) => {
	if(err)
		throw err;

	console.log("Database connected.")
})

if (process.env.NODE_ENV === "production") {
	const pathToFrontend = path.join(path.resolve(), "frontend", "build")

	app.use(express.static(pathToFrontend))

	app.get("*", (req, res) => {
		res.sendFile(path.join(pathToFrontend, "index.html"))
	})
}

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
