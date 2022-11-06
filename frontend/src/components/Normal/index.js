import React, { useState } from "react"

import styles from "./Normal.module.scss"
import globalstyles from "../../App.module.scss"
import Slider from "react-slick"
import { useNavigate } from "react-router-dom"
import { Modal, Form } from "react-bootstrap"
import axios from "axios"

function Greeting() {
	const navigate = useNavigate()
	const [open, setOpen] = useState(false)

	const handleClose = () => {
		setOpen(false)
	}

	return (
		<>
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
								content: e.target.content.value,
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

						<button className={globalstyles.button}>Gửi</button>
					</Form>
				</Modal.Body>
			</Modal>

			<div className={styles.greeting}>
				<img src="/left-speaker.png" alt="speaker" />
				<div>
					<p className="heading">
						Đăng kí ngay để nhận những ưu đãi sốc
					</p>
					<div className="action">
						<button
							className={globalstyles.button}
							onClick={() => {
								navigate("/support")
							}}
						>
							Thông tin hỗ trợ
						</button>
						<button
							className={globalstyles.button}
							onClick={() => setOpen(true)}
						>
							Đặt câu hỏi
						</button>
					</div>
				</div>
				<img src="/right-speaker.png" alt="speaker" />
			</div>
		</>
	)
}

function Carousel() {
	return (
		<Slider
			dots={true}
			infinite={true}
			speed={500}
			slidesToShow={1}
			slidesToScroll={1}
		>
			<div>
				<img src="/first-backdrop.png" alt="first backdrop" />
			</div>
			<div>
				<img src="/second-backdrop.png" alt="second backdrop" />
			</div>
			<div>
				<img src="/third-backdrop.png" alt="third backdrop" />
			</div>
		</Slider>
	)
}

export default function Normal(props) {
	return (
		<div className={styles.container}>
			{!props.isCustomer && <Greeting />}
			<Carousel />
		</div>
	)
}
