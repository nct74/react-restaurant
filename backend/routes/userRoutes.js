const router = require("express").Router()
const connection = require("../dbConfig")
const bcrypt = require("bcryptjs")
const userSQL = require("../SQL/userSQL")
const authMiddleware = require("../middleware/authMiddleware")
const jwt = require("jsonwebtoken")
const { v4: uuidv4 } = require("uuid")

router.post("/login", (req, res) => {
	const { username, password } = req.body

	if (!username || !password) res.status(400).send("Missing fields")

	connection.query(userSQL.getPassword(username), function (
		error,
		results,
		fields
	) {
		if (error) throw error

		if (!results[0].password) res.status(400).send("Invalid username")

		if (bcrypt.compareSync(password, results[0].password)) {
			const token = jwt.sign(
				{ id: results[0].id },
				process.env.JWT_SECRET,
				{ expiresIn: "1d" }
			)

			res.json({
				token,
			})
		} else {
			res.status(400).send("Wrong password")
		}
	})
})

router.get("/role", authMiddleware, (req, res) => {
	res.json({
		role: req.role,
	})
})

router.get("/info", authMiddleware, (req, res) => {
	if (req.role === "Customer") {
		connection.query(userSQL.getCustomerInfo(req.associated_id), function (
			error,
			results,
			fields
		) {
			if (error) throw error

			res.json({
				id: results[0].Ma_khach_hang,
				name: results[0].name,
				role: req.role,
				point: results[0].Diem_tich_luy,
				rank: results[0].Ten_nhom,
			})
		})
	} else if (req.role === "Employee") {
		connection.query(userSQL.getEmployeeInfo(req.associated_id), function (
			error,
			secondResults,
			fields
		) {
			if (error) throw error

			res.json({
				name: secondResults[0].name,
				role: req.role,
				registered_customer_count:
					secondResults[0].registered_customer_count,
				new_question_count: secondResults[0].new_question_count,
			})
		})
	} else if (req.role === "Manager") {
		connection.query(userSQL.getManagerInfo(req.associated_id), function (
			error,
			secondResults,
			fields
		) {
			if (error) throw error

			res.json({
				name: secondResults[0].name,
				role: req.role,
				total_employee: secondResults[0].total_employee,
			})
		})
	} else {
		res.status(500).send("User not exists.")
	}
})

router.get("/", authMiddleware, (req, res) => {
	if (req.role !== "Employee" && req.role !== "Manager")
		res.status(401).send("Invalid permission")
	else {
		connection.query(userSQL.getAllCustomer(), function (
			error,
			results,
			fields
		) {
			if (error) throw error

			res.json(results)
		})
	}
})

router.get("/:id", authMiddleware, (req, res) => {
	connection.query(userSQL.getCustomer(req.params.id), function (
		error,
		results,
		fields
	) {
		if (error) throw error

		res.json({
			id: results[0].Ma_khach_hang,
			fname: results[0].Ho_va_ten_lot,
			lname: results[0].Ten,
			year: results[0].Nam_sinh,
			address: results[0].Dia_chi,
			ssn: results[0].So_CMND,
		})
	})
})

router.post("/", authMiddleware, (req, res) => {
	if (req.role !== "Employee") res.status(401).send("Invalid permission")
	else {
		const {
			username,
			password,
			email,
			sex,
			fname,
			lname,
			year,
			address,
			ssn,
			recent_shopping_date,
			phonenumber,
		} = req.body

		const date = new Date()

		const registerDate = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
		const hashedPassword = bcrypt.hashSync(password, 10)
		const phone = phonenumber.split(",")
		const customer_id = uuidv4()

		connection.query(
			userSQL.newCustomer(
				customer_id,
				email,
				sex,
				fname,
				lname,
				year,
				address,
				ssn,
				recent_shopping_date,
				req.associated_id,
				registerDate
			),
			function (error, results, fields) {
				if (error) {
					res.status(500).send(error.message)
				} else {
					phone.forEach((number) => {
						connection.query(
							userSQL.addPhonenumber(customer_id, number),
							function (error, results, fields) {
								if (error) throw error
							}
						)
					})

					connection.query(
						userSQL.newUser(
							uuidv4(),
							username,
							hashedPassword,
							customer_id
						),
						function (error, results, fields) {
							if (error) {
								res.status(500).send(error.message)
							} else res.status(201).send("Success")
						}
					)
				}
			}
		)
	}
})

router.put("/:id", authMiddleware, (req, res) => {
	if (req.role !== "Manager") {
		res.status(401).send("Invalid permission")
	} else {
		const { fname, lname, sex, year, address, cmnd } = req.body
		const customer_id = req.params.id

		connection.query(
			userSQL.updateCustomer(
				customer_id,
				fname,
				lname,
				sex,
				year,
				address,
				cmnd
			),
			function (error, results, fields) {
				if (error) throw error

				res.send("Success")
			}
		)
	}
})

module.exports = router
