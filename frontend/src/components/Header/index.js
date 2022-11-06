import React from "react"
import styles from "./Header.module.scss"
import home from "../../svg/home.svg"
import logout from "../../svg/logout.svg"
import account from "../../svg/account.svg"
import { useNavigate } from "react-router-dom"

export default function Header(props) {
	const navigate = useNavigate()

	return (
		<header className={styles.container}>
			<div className={styles.header}>
				<img src={home} alt="home icon" onClick={() => navigate("/")} />

				<div className="left">
					{!props.role ? (
						<button
							onClick={() => navigate("/login")}
							className={styles.button}
						>
							Log in
						</button>
					) : (
						<div>
							{props.role === "Customer" && (
								<img
									src={account}
									onClick={() => navigate("/profile")}
									alt="account button"
								/>
							)}
							<img
								onClick={() => {
									localStorage.removeItem("token")
									navigate("/")
									window.location.reload()
								}}
								src={logout}
								className="logout"
								alt="logout button"
							/>
						</div>
					)}
				</div>
			</div>
		</header>
	)
}
