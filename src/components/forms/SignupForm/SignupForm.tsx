import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignupForm.css";

/** Signup Form
 *
 * Props:
 *       - handleSignup: Func def passed from app.js
 *
 * State:
 *       - FormData: {username, password, firstName, lastName, email}
 *       - ApiError: {isError, errorMessage}
 *
 * App -> SignupForm
 *
 */

type SignupFormProps = {
  handleSignup: Function;
};

function SignupForm({ handleSignup }: SignupFormProps) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  const [apiError, setApiError] = useState({
    isError: false,
    errorMessage: "",
  });

  const navigate = useNavigate();

  /** Handles keystrokes in searchbar and updates formData */
  function handleChange(evt: React.ChangeEvent<HTMLInputElement>) {
    const fieldName = evt.target.name;
    const value = evt.target.value;

    setFormData((currData: any) => {
      currData[fieldName] = value;
      return { ...currData };
    });
  }

  /** Navigates to signup page if successfully logged in, else shows error msg*/
  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    try {
      await handleSignup(formData);
      navigate("/");
    } catch (err: any) {
      console.log(err);
      setApiError({
        isError: true,
        errorMessage: err,
      });
    }
  }

  return (
    <div className="SignupForm">
      <div className="container col-md-6 offset-md-3 col-lg-4 offset-lg-4">
        <h1 className="SignupForm-Message">Sign Up</h1>
        <div className="card">
          <div className="card-body">
            <form className="SignupForm-Form" onSubmit={handleSubmit}>
              <label htmlFor="username">Username</label>
              <input
                id="username"
                name="username"
                className="form-control form-control-lg"
                onChange={handleChange}
                value={formData.username}
                aria-label="username"
                placeholder="username"
                required
              />
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                className="form-control form-control-lg"
                onChange={handleChange}
                value={formData.password}
                aria-label="password"
                type="password"
                placeholder="password"
                minLength={5}
                required
              />
              <label htmlFor="firstName">First Name</label>
              <input
                id="first-name"
                name="firstName"
                className="form-control form-control-lg"
                onChange={handleChange}
                value={formData.firstName}
                aria-label="firstName"
                placeholder="First Name"
                required
              />
              <label htmlFor="lastName">Last Name</label>
              <input
                id="last-name"
                name="lastName"
                className="form-control form-control-lg"
                onChange={handleChange}
                value={formData.lastName}
                placeholder="Last Name"
                aria-label="lastName"
                required
              />
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                className="form-control form-control-lg"
                onChange={handleChange}
                value={formData.email}
                placeholder="Email"
                aria-label="email"
                required
              />
              <div className="SignupForm-button d-grid">
                <button className="btn search-btn btn-lg btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
        {apiError.isError && <p>{apiError.errorMessage}</p>}
      </div>
    </div>
  );
}

export default SignupForm;
