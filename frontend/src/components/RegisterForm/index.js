import React, { useState } from "react"

import styles from "./RegisterForm.module.scss"
import globalStyles from "../../App.module.scss"
import { Form, Modal } from "react-bootstrap"
import axios from "axios"

export default function Register() {
	const [showModal, setShowModal] = useState(false)
	const [modalText, setModalText] = useState({
		title: "",
		body: ""
	})

	const closeModal = () => {
		if (showModal) setShowModal(false)
	}

	return (
		<div className={styles.container}>
			<Modal show={showModal} onHide={closeModal}>
				<Modal.Header closeButton>
					<Modal.Title>{modalText.title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>{modalText.body}</Modal.Body>
			</Modal>

			<p className={styles.heading}>Đăng ký khách hàng</p>

			<Form
				className={styles.form}
				onSubmit={(e) => {
					e.preventDefault()

					const data = {
						username: e.target.username.value,
						password: e.target.password.value,
						fname: e.target.fname.value,
						lname: e.target.lname.value,
						year: e.target.year.value,
						sex: e.target.sex.value,
						address: e.target.address.value,
						email: e.target.email.value,
						phonenumber: e.target.phonenumber.value,
						recent_shopping_date: e.target.recent_shopping_date.value,
						ssn: e.target.ssn.value,
					}

					if (localStorage.getItem("token"))
						axios.post("/api/users", data, {
							headers: {
								Authorization: `Bearer ${localStorage.getItem(
									"token"
								)}`,
							},
						}).then(res => {
							if(res.data === "Success") {
								setModalText({
									title: "Added new customer",
									body: "A new customer has been added to the database"
								})
								setShowModal(true)
							}
						}).catch(err => {
							setModalText({
								title: "Request failed",
								body: err.message
							})
							setShowModal(true)
						}) 
					else {
						setModalText({
							title: "Unauthorized permission",
							body: "Only an Employee can register a Customer"
						})
						setShowModal(true)
					}
				}}
			>
				<Form.Group className="mb-3" controlId="username">
					<Form.Label>Username</Form.Label>
					<Form.Control type="text" name="username" required />
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" name="password" required />
				</Form.Group>
				<div className={styles.twoFields}>
					<Form.Group className="mb-3">
						<Form.Label>Họ và tên lót</Form.Label>
						<Form.Control
							type="text"
							placeholder="Nguyễn Văn"
							name="fname"
							required
						/>
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Tên</Form.Label>
						<Form.Control
							type="text"
							placeholder="A"
							name="lname"
							required
						/>
					</Form.Group>
				</div>

				<div className={styles.twoFields}>
					<Form.Group className="mb-3">
						<Form.Label>Năm sinh</Form.Label>
						<Form.Control type="text" name="year" required />
					</Form.Group>
					<Form.Group className="mb-3">
						<Form.Label>Giới tính</Form.Label>
						<Form.Select
							aria-label="Nhập năm sinh"
							name="sex"
							required
						>
							<option value="Nam">Nam</option>
							<option value="Nữ">Nữ</option>
							<option value="Other">Khác</option>
						</Form.Select>
					</Form.Group>
				</div>
				<Form.Group className="mb-3">
					<Form.Label>Địa chỉ</Form.Label>
					<Form.Control type="Text" name="address" required />
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Email</Form.Label>
					<Form.Control type="email" name="email" required />
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Số điện thoại</Form.Label>
					<Form.Control type="Text" name="phonenumber" required />
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>Ngày giao dịch gần nhất</Form.Label>
					<Form.Control type="date" name="recent_shopping_date" required />
				</Form.Group>
				<Form.Group className="mb-3">
					<Form.Label>CMND/ CCCD</Form.Label>
					<Form.Control type="Text" name="ssn" required />
				</Form.Group>
				<button className={globalStyles.button}>Đăng ký</button>
			</Form>
		</div>
	)
}
