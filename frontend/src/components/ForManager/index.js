import axios from "axios"
import React, { useEffect, useState } from "react"
import { Form, Button, Modal, FormControl } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

import styles from "./ForManager.module.scss"

export default function () {
	const [user, setUser] = useState(undefined)
	const [allCustomers, setAllCustomers] = useState([])
	const navigate = useNavigate()

	const [modalController, setModalController] = useState({
		open: false,
		title: "",
		message: "",
	})

	const handleClose = () => {
		setModalController({
			open: false,
			title: "",
			message: "",
		})
	}

	useEffect(() => {
		if (localStorage.getItem("token")) {
			axios
				.get("/api/users/info", {
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"token"
						)}`,
					},
				})
				.then((res) => setUser(res.data))
		} else navigate("/")
	}, [])

	useEffect(() => {
		axios
			.get("/api/users/", {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			})
			.then((res) => {
				setAllCustomers(res.data)
			})
	}, [])

	return (
		<div className={styles.container}>
			<Modal show={modalController.open} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>{modalController.title}</Modal.Title>
				</Modal.Header>
				<Modal.Body>{modalController.message}</Modal.Body>
			</Modal>

			{user ? (
				<>
					<div className={styles.info}>
						<div>
							<img src="/avatar.png" alt="avatar" />
						</div>
						<div>
							<p className="name">{user.name}</p>
							<p className="title">Quản lý</p>
							<p className="other">
								Tổng số nhân viên: {user.total_employee}
							</p>
						</div>
					</div>
					<p className={styles.heading}>
						CHỈNH SỬA THÔNG TIN KHÁCH HÀNG
					</p>

					<Form
						className={styles.form}
						onSubmit={(e) => {
							e.preventDefault()

							const data = {
								fname: e.target.fname.value,
								lname: e.target.lname.value,
								sex: e.target.sex.value,
								year: e.target.year.value,
								address: e.target.address.value,
								cmnd: e.target.ssn.value,
							}

							const customer_id = e.target.customer_id.value

							axios
								.put(`/api/users/${customer_id}`, data, {
									headers: {
										Authorization: `Bearer ${localStorage.getItem(
											"token"
										)}`,
									},
								})
								.then((res) => {
									if (!modalController.open)
										setModalController({
											open: true,
											title: "Đã cập nhật",
											message: `Đã cập nhật thông tin cho khách hàng`,
										})
								})
								.catch((err) => {
									if (!modalController.open)
										setModalController({
											open: true,
											title: "Xảy ra lỗi",
											message: err.message,
										})
								})
						}}
					>
						<Form.Group className="mb-3">
							<Form.Label>Chọn khách hàng</Form.Label>
							<Form.Select name="customer_id">
								{allCustomers.map((cus) => (
									<option key={cus.id} value={cus.id}>{cus.name}</option>
								))}
							</Form.Select>
						</Form.Group>

						<div className={styles.twoFields}>
							<Form.Group className="mb-3">
								<Form.Label>Họ và tên lót</Form.Label>
								<Form.Control type="text" name="fname" />
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Tên</Form.Label>
								<Form.Control type="text" name="lname" />
							</Form.Group>
						</div>

						<div className={styles.twoFields}>
							<Form.Group className="mb-3">
								<Form.Label>Năm sinh</Form.Label>
								<Form.Control type="text" name="year" />
							</Form.Group>

							<Form.Group className="mb-3">
								<Form.Label>Giới tính</Form.Label>
								<Form.Select name="sex">
									<option value="Nam">Nam</option>
									<option value="Nữ">Nữ</option>
								</Form.Select>
							</Form.Group>
						</div>

						<Form.Group className="mb-3">
							<Form.Label>Địa chỉ</Form.Label>
							<Form.Control type="text" name="address" />
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label>Số CMND/ CCCD</Form.Label>
							<Form.Control type="text" name="ssn" />
						</Form.Group>

						<Button className="mb-3" type="submit">Cập nhật</Button>
					</Form>
				</>
			) : (
				<div>Loading...</div>
			)}
		</div>
	)
}
