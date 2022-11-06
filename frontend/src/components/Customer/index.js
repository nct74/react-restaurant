import axios from "axios"
import React, { useEffect, useState } from "react"
import { Form } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"

import styles from "./Customer.module.scss"

export default function Customer() {
	const [user, setUser] = useState(undefined)
	const { user_id } = useParams()
	const navigate = useNavigate()

	useEffect(() => {
		if (localStorage.getItem("token")) {
			axios
				.get(`/api/users/${user_id}`, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"token"
						)}`,
					},
				})
				.then((res) => setUser(res.data))
		} else navigate("/")
	}, [])

	return (
		<div className={styles.container}>
			<p className={styles.heading}>THÔNG TIN KHÁCH HÀNG</p>

			{user ? (
				<Form className={styles.form}>
					<div className={styles.twoFields}>
						<Form.Group className="mb-3">
							<Form.Label>Họ và tên lót</Form.Label>
							<Form.Control
								type="text"
								name="fname"
								value={user.fname}
								disabled
							/>
						</Form.Group>

						<Form.Group className="mb-3">
							<Form.Label>Tên</Form.Label>
							<Form.Control
								type="text"
								name="lname"
								value={user.lname}
								disabled
							/>
						</Form.Group>
					</div>

					<Form.Group className="mb-3">
						<Form.Label>Năm sinh</Form.Label>
						<Form.Control
							type="text"
							name="year"
							value={user.year}
							disabled
						/>
					</Form.Group>

					<Form.Group className="mb-3">
						<Form.Label>Địa chỉ</Form.Label>
						<Form.Control
							type="text"
							name="address"
							value={user.address}
							disabled
						/>
					</Form.Group>

					<Form.Group className="mb-3">
						<Form.Label>Số CMND/ CCCD</Form.Label>
						<Form.Control
							type="text"
							name="ssn"
							value={user.ssn}
							disabled
						/>
					</Form.Group>
				</Form>
			) : (
				<div>Loading...</div>
			)}
		</div>
	)
}
