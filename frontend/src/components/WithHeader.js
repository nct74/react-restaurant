import axios from "axios"
import React, { useEffect, useState } from "react"
import { Outlet } from "react-router-dom"
import Header from "./Header"
import globalStyles from "../App.module.scss"

export default function () {
	const [role, setRole] = useState(undefined)

	useEffect(() => {
		if (localStorage.getItem("token")) {
			axios
				.get("/api/users/role", {
					headers: {
						Authorization: `Bearer ${localStorage.getItem(
							"token"
						)}`,
					},
				})
				.then((res) => {
					setRole(res.data.role)
				})
		}
	}, [])

	return (
		<div>
			<Header role={role} />

			<div className={globalStyles.content}>
				<Outlet />
			</div>
		</div>
	)
}
