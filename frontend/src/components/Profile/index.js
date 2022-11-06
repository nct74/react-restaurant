import axios from "axios"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./Profile.module.scss"
import globalStyles from "../../App.module.scss"
import { Form, Modal } from "react-bootstrap"

export default function Profile() {
	const [user, setUser] = useState(undefined)
	const [orders, setOrders] = useState([])
	const [open, setOpen] = useState(false)
	const navigate = useNavigate()

	const handleClose = () => {
		setOpen(false)
	}

	useEffect(() => {
		document
			.getElementById("loading-layout")
			?.classList.remove("hide--layout")

		if (localStorage.getItem("token")) {
			axios
				.get("/api/users/info", {
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"token"
						)}`,
					},
				})
				.then((res) => {
					setUser(res.data)
				})

			document
				.getElementById("loading-layout")
				?.classList.add("hide--layout")
		} else {
			navigate("/")
		}
	}, [])

	useEffect(() => {
		axios
			.get("/api/orders", {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			})
			.then((res) => {
				setOrders(res.data)
			})
	}, [])

	return (
		<div className={styles.container}>
			<Modal show={open} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Đặt câu hỏi</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form
						onSubmit={(e) => {
							e.preventDefault()

							const data = {
								title: e.target.title.value,
								content: e.target.title.value,
								token: localStorage.getItem("token"),
							}

							axios.post("/api/questions", data).then((res) => {
								handleClose()
							})
						}}
					>
						<Form.Group className="mb-3">
							<Form.Label>Tiêu đề</Form.Label>
							<Form.Control type="text" name="title" />
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Nội dung</Form.Label>
							<Form.Control type="text" name="content" />
						</Form.Group>

						<button className={globalStyles.button}>Gửi</button>
					</Form>
				</Modal.Body>
			</Modal>
			{user ? (
				<>
					<div className={styles.info}>
						<div>
							<img src="/avatar.png" alt="avatar" />
						</div>
						<div>
							<p className="name">{user.name}</p>
							<div className="title">
								<p>Hạng: {user.rank}</p>
								<p>Điểm: {user.point}</p>
							</div>
							<div className="nav">
								<button
									className={globalStyles.button}
									onClick={() => navigate(`/users/${user.id}`)}
								>
									Xem thông tin
								</button>
								<button
									className={globalStyles.button}
									onClick={() => setOpen(true)}
								>
									Gửi câu hỏi
								</button>
							</div>
						</div>
					</div>

					<div className="orders">
						<p className={styles.heading}>Đơn hàng</p>

						{orders.map((order) => (
							<div key={order.id} className={styles.order}>
								<p className="heading">
									Đơn hàng mã # {order.id}
								</p>
								<p className="other">
									Số lượng sản phẩm: {order.product_count}
								</p>
								<p className="other">
									Nhân viên thanh toán: {order.employee_name}
								</p>
								<p className="other">
									Tổng tiền:{" "}
									<span className="red">
										{order.total_price}đ
									</span>
								</p>
							</div>
						))}
					</div>
				</>
			) : (
				<p>Loading...</p>
			)}
		</div>
	)
}
