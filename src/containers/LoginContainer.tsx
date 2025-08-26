import React, { useState } from "react";
import FormInput from "../components/FormInput";
import { useUser } from "../contexts/UserContext";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
  const { login } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const tempErrors: typeof errors = {};
    if (!formData.email.trim()) tempErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Enter a valid email";

    if (!formData.password.trim()) tempErrors.password = "Password is required";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const storedUser = localStorage.getItem("registeredUser");
    if (storedUser) {
      const { name, email: storedEmail, password: storedPassword } = JSON.parse(storedUser);
      if (formData.email === storedEmail && formData.password === storedPassword) {
        login({ name, email: storedEmail });
        navigate("/dashboard"); // redirect to dashboard
      } else {
        setErrors({ general: "Invalid credentials" });
      }
    } else {
      setErrors({ general: "No account found. Please signup." });
    }
  };

  return (
    <div className="card shadow-lg p-4 col-md-6 mx-auto mt-5">
      <h3 className="mb-3 text-center">Login</h3>
      <form onSubmit={handleSubmit}>
        <FormInput name="email" label="Email" type="email" value={formData.email} onChange={handleChange} error={errors.email} />
        <FormInput name="password" label="Password" type="password" value={formData.password} onChange={handleChange} error={errors.password} />

        {errors.general && <div className="text-danger mb-2">{errors.general}</div>}

        <button type="submit" className="btn btn-primary w-100 mt-3">Login</button>
      </form>
      <p className="mt-3 text-center">
        Don’t have an account? <Link to="/signup">Signup here</Link>
      </p>
    </div>
  );
};

export default LoginPage;
