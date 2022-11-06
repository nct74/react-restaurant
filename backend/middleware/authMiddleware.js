const jwt = require("jsonwebtoken")
const connection = require("../dbConfig")
const userSQL = require("../SQL/userSQL")

const authMiddleware = (req, res, next) => {
	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		try {
			const token = req.headers.authorization.split(" ")[1]

			const { id } = jwt.decode(token, process.env.JWT_SECRET)

			if (!id) res.status(401).send("Invalid Token")
			else {
				connection.query(userSQL.getUser(id), function (
					error,
					results,
					fields
				) {
					if (error) throw error

					req.role = results[0].role
					req.associated_id = results[0].associated_id

					next()
				})
			}
		} catch (error) {
			console.error(error)
			res.status(401).send("Not authorized, token failed")
		}
	} else {
		res.status(401).send("No Authorization Token.")
	}
}

module.exports = authMiddleware
