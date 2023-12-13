import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginForm.css";

/** Signup Form
 *
 * Props:
 *       - handleLogin: Func def passed from app.js
 *
 * State:
 *       - FormData: {username, password, firstName, lastName, email}
 *       - ApiError: {isError, errorMessage}
 *
 * App -> LoginForm
 *
 */

type LoginFormProps = {
    handleLogin: Function;
    };

function LoginForm({ handleLogin }: LoginFormProps) {
  /** Handles keystrokes in searchbar and updates formData */
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [apiError, setApiError] = useState({
    isError: false,
    errorMessage: "",
  });

  const navigate = useNavigate();

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
      await handleLogin(formData);
      navigate("/");
    } catch (err: any) {
      setApiError({
        isError: true,
        errorMessage: err,
      });
    }
  }

  return (
    <div className="pt-5">
      <div className="LoginForm col-md-6 col-lg-4 offset-md-3 offset-lg-4">
        <h3 className="LoginForm-Message">Login</h3>
        <div className="card">
          <div className="card-body">
            <form className="LoginForm-Form" onSubmit={handleSubmit}>
              <label htmlFor="username">Username</label>
              <input
                id="username"
                name="username"
                placeholder="username"
                className="form-control form-control-lg"
                onChange={handleChange}
                value={formData.username}
                aria-label="username"
                required
              />
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="password"
                className="form-control form-control-lg"
                onChange={handleChange}
                value={formData.password}
                aria-label="password"
                required
              />
              <div className="LoginForm-button">
                <button className="btn search-btn btn-lg btn-primary">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
        <h3 className="LoginForm-errors">
          {apiError.isError && <p>{apiError.errorMessage}</p>}
        </h3>
      </div>
    </div>
  );
}

export default LoginForm;
