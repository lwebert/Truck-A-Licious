import { useState, type FormEvent, type ChangeEvent } from "react";
import Auth from "../utils/auth";
import { signup } from "../api/authAPI";
import type { UserSignup } from "../interfaces/UserSignup";

const Signup = () => {
  const [signupData, setSignupData] = useState<UserSignup>({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSignupData({
      ...signupData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await signup(signupData); // a token
      Auth.login(data.token);
    } catch (err) {
      console.error("Failed to login", err);
    }
  };

  return (
    <div className="rp-Container">
      <div className="rp-card"> 
        <div className="form-contorl">
      <form className="form login-form" onSubmit={handleSubmit}>
        <h1>Sign Up</h1>
        <div className="form-group">
          <label>Username</label>
          <input
            className="form-input form-lable form-control"
            type="text"
            name="username"
            value={signupData.username || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            className="form-input form-control"
            type="email"
            name="email"
            value={signupData.email || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            className="form-input form-control"
            type="password"
            name="password"
            value={signupData.password || ""}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <button className="btn-btn-primary" type="submit">
            Login
          </button>
        </div>
        <div className="text-center mt-3">
						<p>
							I have an account! <a href="/Login">Log In</a>
						</p>
					</div>
      </form>
    </div>
  </div>
  </div>
  );
};

export default Signup;