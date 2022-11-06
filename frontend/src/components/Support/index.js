import axios from "axios"
import React, { useEffect, useState } from "react"

import styles from "./Support.module.scss"

export default function Support() {
	const [questions, setQuestions] = useState([])

	useEffect(() => {
		axios.get("/api/questions").then((res) => {
			setQuestions(res.data.questions)
		})
	}, [])

	return (
		<div className={styles.container}>
			<p className={styles.heading}>Thông tin hỗ trợ</p>

			<div className={styles.middle}>
				<ol className={styles.list}>
					{questions.map((ques) => (
						<li key={ques.question_id}>
							<p className="title">{ques.title}</p>
							<p className="content">{ques.content}</p>
                            <p className="highlight">Trả lời</p>
							<p className="answer">{ques.answer}</p>
						</li>
					))}
				</ol>
			</div>
		</div>
	)
}
