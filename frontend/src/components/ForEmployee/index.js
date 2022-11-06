import React, { useEffect, useState } from "react"

import styles from "./ForEmployee.module.scss"
import globalStyles from "../../App.module.scss"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { Modal, Form } from "react-bootstrap"

export default function ForEmployee() {
	const [user, setUser] = useState(undefined)
	const [questions, setQuestions] = useState([])
	const [allCustomers, setAllCustomers] = useState([])
	const navigate = useNavigate()

	const [answerController, setAnswerController] = useState({
		open: false,
		question_id: null,
	})

	const [openNotify, setOpenNotify] = useState(false)

	const closeAnswerModal = () => {
		setAnswerController({
			open: false,
			question_id: null,
		})
	}

	const closeNotifyModal = () => {
		setOpenNotify(false)
	}

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
			.get("/api/questions?unanswered=true")
			.then((res) => setQuestions(res.data.questions))
	}, [])

	return (
		<div className={styles.container}>
			<Modal show={answerController.open} onHide={closeAnswerModal}>
				<Modal.Header closeButton>
					<Modal.Title>Trả lời câu hỏi</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form
						onSubmit={(e) => {
							e.preventDefault()

							const data = {
								answer: e.target.answer.value,
							}

							axios
								.put(
									`/api/questions/${answerController.question_id}/answer`,
									data,
									{
										headers: {
											Authorization: `Bearer ${localStorage.getItem(
												"token"
											)}`,
										},
									}
								)
								.then((res) => {
									setAnswerController({
										open: false,
										question_id: null,
									})
								})
						}}
					>
						<Form.Group className="mb-3">
							<Form.Label>Câu trả lời</Form.Label>
							<Form.Control
								type="text"
								placeholder="Nhập câu trả lời"
								name="answer"
							/>
						</Form.Group>

						<button className={globalStyles.button}>Trả lời</button>
					</Form>
				</Modal.Body>
			</Modal>

			<Modal show={openNotify} onHide={closeNotifyModal}>
				<Modal.Header closeButton>
					<Modal.Title>Gửi thông báo</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Group className="mb-3">
							<Form.Label>Đến khách hàng</Form.Label>
							<Form.Select name="customer_id" >
                                {allCustomers.map((cus) => <option value={cus.id}>{cus.name}</option>)}
							</Form.Select>
						</Form.Group>
						<Form.Group className="mb-3">
							<Form.Label>Nội dung thông báo</Form.Label>
							<Form.Control
								type="text"
								placeholder="Nhập nội dung"
								name="content"
							/>
						</Form.Group>

						<button className={globalStyles.button}>Trả lời</button>
					</Form>
				</Modal.Body>
			</Modal>
			{user ? (
				<>
					<div className={styles.info}>
						<div>
							<img src="avatar.png" alt="avatar" />
						</div>

						<div>
							<p className="name">{user.name}</p>
							<p className="title">Nhân viên CSKH</p>
							<p className="other">
								Đã đăng ký: {user.registered_customer_count}{" "}
								khách hàng
							</p>
							<div className="nav">
								<button
									className={globalStyles.button}
									onClick={() => navigate("/form/register")}
								>
									Đăng ký khách hàng
								</button>
							</div>
						</div>
					</div>
					<div className={styles.question}>
						<p className={styles.heading}>Danh sách câu hỏi:</p>

						{questions.map((question) => (
							<div
								key={question.question_id}
								className={styles.card}
							>
								<p className="heading">{question.title}</p>
								<p className="from">
									{question.fname
										? question.fname + " " + question.lname
										: "Ẩn danh"}
								</p>
								<p className="content">{question.content}</p>
								<button
									onClick={() => {
										setAnswerController({
											open: true,
											question_id: question.question_id,
										})
									}}
									className={globalStyles.button}
								>
									Trả lời
								</button>
							</div>
						))}
					</div>
				</>
			) : (
				<div>Loading...</div>
			)}
		</div>
	)
}
