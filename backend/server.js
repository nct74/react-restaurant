const express = require("express")
const app = express()

const mysql = require("mysql")
const connection = mysql.createConnection({
	host: "localhost:3306",
	user: "me",
	password: "luong156",
	database: "csdl",
})

connection.connect((err) => {
	if (err) throw err

	console.log("Database is running")
})

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
