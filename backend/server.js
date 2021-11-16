const express = require("express")
const app = express()
const path = require("path")

if (process.env.NODE_ENV === "production") {
	const pathToFrontend = path.join(path.resolve(), "frontend")

	app.use(express.static(pathToFrontend))

	app.get("*", (req, res) => {
		res.sendFile(path.join(pathToFrontend, "build", "index.html"))
	})
}

const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`)
})
