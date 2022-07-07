import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setIsLoading } from "../../features/modalSlice";
import { login } from "../../features/userSlice";
import useFetch from "../../hooks/useFetch";
import { registerService } from "../../services/authServices";
import DataList from "../DataList/DataList";

const initialForm = { name: "", password: "", email: "", dob: "" };

const Register = ({ setIsRegistering }) => {
	const [form, setForm] = useState(initialForm);
	const dispatch = useDispatch();
	const customFetch = useFetch();

	const registerHandler = async e => {
		e.preventDefault();
		dispatch(setIsLoading(true));
		const data = await customFetch(registerService, form);
		if (data) dispatch(login(data));
		dispatch(setIsLoading(false));
	};

	const updateForm = (key, e) => {
		setForm(form => ({ ...form, [key]: e.target.value }));
	};

	return (
		<form onSubmit={registerHandler} className="register">
			<div className="email">
				<label htmlFor="email">Email</label>
				<input
					type="email"
					id="email"
					placeholder="johndoe@example.com"
					value={form.email}
					required
					onChange={e => updateForm("email", e)}
				/>
				<DataList email={form.email} setEmail={value => setForm(form => ({ ...form, email: value }))} />
			</div>
			<label htmlFor="name">Username</label>
			<input
				type="text"
				id="name"
				placeholder="john doe"
				value={form.name}
				required
				onChange={e => updateForm("name", e)}
			/>
			<label htmlFor="dob">Date of birth</label>
			<input type="date" id="dob" required value={form.dob} onChange={e => updateForm("dob", e)} />
			<label htmlFor="password">Password</label>
			<input
				type="password"
				id="password"
				placeholder="Top secret"
				required
				value={form.password}
				onChange={e => updateForm("password", e)}
			/>
			<button type="submit">Register</button>
			<p>
				Already have an account? <span onClick={() => setIsRegistering(false)}>Login</span>
			</p>
		</form>
	);
};

export default Register;
