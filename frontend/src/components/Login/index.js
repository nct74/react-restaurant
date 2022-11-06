import axios from "axios"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import styles from "./Login.module.scss"

export default function Login() {
	useEffect(() => {
		document.getElementById("loading-layout")?.classList.add("hide--layout")
	}, [])

	const [errorMsg, setErrorMsg] = useState([])
	const navigate = useNavigate()

	return (
		<div className={styles.container}>
			<form
				className={styles.form}
				onSubmit={(e) => {
					e.preventDefault()

					const data = {
						username: e.target.username.value,
						password: e.target.password.value,
					}

					if (!data.username)
						setErrorMsg((msg) =>
							msg.concat("Username cannot be empty")
						)
					if (!data.password)
						setErrorMsg((msg) =>
							msg.concat("Password cannot be empty")
						)

					if (data.username && data.password) {
						axios
							.post("/api/users/login", data)
							.then((res) => {
								localStorage.setItem("token", res.data.token)
								navigate("/")
							})
							.catch((err) => {
								setErrorMsg((msg) =>
									msg.concat("Invalid username or password")
								)
								console.log(err)
							})
					}
				}}
			>
				<p className={styles.heading}>Login</p>
				<input
					type="text"
					name="username"
					placeholder="Enter your username"
					className={styles.input}
				/>
				<input
					type="password"
					name="password"
					placeholder="Enter your password"
					className={styles.input}
				/>

				<ul>
					{errorMsg &&
						errorMsg.map((err, id) => <li key={id}>{err}</li>)}
				</ul>

				<button className={styles.button}>Log in</button>
			</form>
		</div>
	)
}
