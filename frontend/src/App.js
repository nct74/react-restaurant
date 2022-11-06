import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Customer from "./components/Customer"
import Homepage from "./components/Homepage"
import Login from "./components/Login"
import Profile from "./components/Profile"
import RegisterForm from "./components/RegisterForm"
import Support from "./components/Support"
import WithHeader from "./components/WithHeader"

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<Login />} />
				<Route path="/" element={<WithHeader />}>
					<Route index element={<Homepage />} />
					<Route path="form/register" element={<RegisterForm />} />
					<Route path="support" element={<Support />} />
					<Route path="profile" element={<Profile />} />
					<Route path="/users/:user_id" element={<Customer />} />
				</Route>
			</Routes>
		</BrowserRouter>
	)
}

export default App
