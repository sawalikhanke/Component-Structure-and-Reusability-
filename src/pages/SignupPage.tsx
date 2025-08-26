import React, { useState } from "react";
import FormInput from "../components/FormInput";
import { useNavigate, Link } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const tempErrors: typeof errors = {};
    if (!formData.name.trim()) tempErrors.name = "Name is required";
    else if (formData.name.length < 3) tempErrors.name = "Name must be at least 3 characters";

    if (!formData.email.trim()) tempErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) tempErrors.email = "Enter a valid email";

    if (!formData.password.trim()) tempErrors.password = "Password is required";
    else if (formData.password.length < 6) tempErrors.password = "Password must be at least 6 characters";

    if (!formData.confirmPassword.trim()) tempErrors.confirmPassword = "Confirm Password is required";
    else if (formData.confirmPassword !== formData.password) tempErrors.confirmPassword = "Passwords do not match";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    // Save user in localStorage
    localStorage.setItem(
      "registeredUser",
      JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      })
    );

    alert("Signup successful! Please login.");
    navigate("/login"); // redirect to login page
  };

  return (
    <div className="card shadow-lg p-4 col-md-6 mx-auto mt-5">
      <h3 className="mb-3 text-center">Signup</h3>
      <form onSubmit={handleSubmit}>
        <FormInput name="name" label="Name" value={formData.name} onChange={handleChange} error={errors.name} />
        <FormInput name="email" label="Email" type="email" value={formData.email} onChange={handleChange} error={errors.email} />
        <FormInput name="password" label="Password" type="password" value={formData.password} onChange={handleChange} error={errors.password} />
        <FormInput name="confirmPassword" label="Confirm Password" type="password" value={formData.confirmPassword} onChange={handleChange} error={errors.confirmPassword} />

        <button type="submit" className="btn btn-success w-100 mt-3">Signup</button>
      </form>
      <p className="mt-3 text-center">
        Already have an account? <Link to="/login">Login here</Link>
      </p>
    </div>
  );
};

export default SignupPage;
