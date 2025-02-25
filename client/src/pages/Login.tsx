/* Brandon was here 2/20 */

import { useState, type FormEvent, type ChangeEvent } from 'react';
import Auth from '../utils/auth';
import { login } from '../api/authAPI';
import type { UserLogin } from '../interfaces/UserLogin';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
	const [loginData, setLoginData] = useState<UserLogin>({
		username: '',
		password: '',
	});

	const handleChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { name, value } = e.target;
		setLoginData({
			...loginData,
			[name]: value,
		});
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		try {
			const data = await login(loginData);
			Auth.login(data.token);
		} catch (err) {
			console.error('Failed to login', err);
		}
	};

	return (
		<div className="lp-Container">
			<div className="lp-card">
				<h1 className="lp-brand">Truck-A-Licious</h1>
				<form onSubmit={handleSubmit}>
					<div className="lp-mb-3">
						<label htmlFor="username" className="form-label">
							Username
						</label>
						<input
							type="text"
							className="form-control"
							id="username"
							name="username"
							value={loginData.username || ''}
							onChange={handleChange}
						/>
					</div>
					<div className="lp-mb-3">
						<label htmlFor="password" className="form-label">
							Password
						</label>
						<input
							type="password"
							className="form-control"
							id="password"
							name="password"
							value={loginData.password || ''}
							onChange={handleChange}
						/>
					</div>
					<div className="lp-mb-4">
						<button type="submit" className="btn-btn-primary">
							Login
						</button>
					</div>
					<div className="text-center">
						<p>
							Don't have an account? <a href="/signup">Sign Up</a>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Login;
