import React, { useEffect, useState } from "react"
import axios from "axios"
import Normal from "../Normal"
import ForManager from "../ForManager"
import ForEmployee from "../ForEmployee"

export default function () {
	const [role, setRole] = useState(undefined)

	useEffect(() => {
		document
			.getElementById("loading-layout")
			?.classList.remove("hide--layout")

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

		document.getElementById("loading-layout")?.classList.add("hide--layout")
	}, [])

	return role === "Manager" ? (
		<ForManager />
	) : role === "Employee" ? (
		<ForEmployee />
	) : (
		<Normal isCustomer={role === "Customer"} />
	)
}
