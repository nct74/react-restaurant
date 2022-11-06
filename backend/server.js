require("dotenv").config()

const express = require("express")
const app = express()
const path = require("path")
const userRoutes = require("./routes/userRoutes")
const questionRoutes = require("./routes/questionRoutes")
const orderRoutes = require("./routes/orderRoutes")

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

require("./dbConfig")

app.use("/api/users", userRoutes)
app.use("/api/questions", questionRoutes)
app.use("/api/orders", orderRoutes)

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
