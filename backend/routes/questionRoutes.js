const router = require("express").Router()
const jwt = require("jsonwebtoken")
const connection = require("../dbConfig")
const { v4: uuidv4 } = require("uuid")
const authMiddleware = require("../middleware/authMiddleware")
const questionSQL = require("../SQL/questionSQL")
const userSQL = require("../SQL/userSQL")

router.post("/", (req, res) => {
	const { title, content, token } = req.body

	if (!title || !content) res.status(400).send("Missing required fields")
	else {
		if (token) {
			const { id } = jwt.decode(token, process.env.JWT_SECRET)

			connection.query(userSQL.getUser(id), function (
				error,
				results,
				fields
			) {
				if (error) throw error

				const associated_id = results[0].associated_id

				connection.query(
					questionSQL.create(uuidv4(), title, content, associated_id),
					function (error, results, fields) {
						if (error) throw error

						res.status(201).send("Success")
					}
				)
			})
		} else {
			connection.query(
				questionSQL.createCognito(uuidv4(), title, content),
				function (error, results, fields) {
					if (error) throw error

					res.status(201).send("Success")
				}
			)
		}
	}
})

router.get("/", (req, res) => {
	if (req.query.unanswered) {
		connection.query(questionSQL.getUnansweredQuestions(), function (
			error,
			results,
			fields
		) {
			if (error) throw error

			res.json({
				questions: results,
			})
		})
	} else {
		connection.query(questionSQL.getAnsweredQuestions(), function (
			error,
			results,
			fields
		) {
			if (error) throw error

			res.json({
				questions: results,
			})
		})
	}
})

router.put("/:question_id/answer", authMiddleware, (req, res) => {
	if (req.role !== "Employee") res.status(401).send("Invalid permission")

	const { answer } = req.body

	if (!answer) res.status(400).send("Missing required fields")
	else {
		connection.query(
			questionSQL.answerQuestion(
				req.params.question_id,
				answer,
				req.associated_id
			),
			function (error, results, fields) {
				if (error) throw error

				res.send("Success")
			}
		)
	}
})

module.exports = router
