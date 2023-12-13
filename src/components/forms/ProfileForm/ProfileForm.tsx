import React, { useState } from "react";
import { useContext } from "react";
import userContext from "../../../context/UserContext";
import "./ProfileForm.css";
import { useNavigate } from "react-router";

/** ProfileForm
 *
 * Props:
 *       - handleProfileEdit: function passed down from App.
 *
 * State:
 *       - formData: Object with Form Data ({username, firstName, lastName, email})
 *
 * Renders a form so that a current user can edit their profile.
 */

type ProfileFormProps = {
  handleProfileEdit: Function;
};

function ProfileForm({ handleProfileEdit }: ProfileFormProps) {
  // USE CONTEXT OF USER: SET CURR FORM DATA TO USERNAME, FIRSTNAME, LASTNAME, EMAIL
  const { user } = useContext(userContext);
  const [formData, setFormData] = useState({
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
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
  /** handleSubmit of the form. Call function in props */
  function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const updateData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
    };
    handleProfileEdit(user.username, updateData);
    navigate("/");
  }

  return (
    <div className="pt-5">
      <div className="ProfileForm col-md-6 col-lg-4 offset-md-3 offset-lg-4">
        <h3 className="ProfileForm-message">Update Profile</h3>
        <div className="card">
          <div className="card-body">
            <form className="ProfileForm-Form" onSubmit={handleSubmit}>
              <label htmlFor="username">Username</label>
              <input
                id="username"
                name="username"
                className="form-control form-control-lg"
                onChange={handleChange}
                value={formData.username}
                aria-label="username"
                disabled
              />
              <label htmlFor="firstName">First Name</label>
              <input
                id="first-name"
                name="firstName"
                className="form-control form-control-lg"
                onChange={handleChange}
                value={formData.firstName}
                placeholder="First Name"
                required
                aria-label="firstName"
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
                type="email"
                className="form-control form-control-lg"
                onChange={handleChange}
                value={formData.email}
                placeholder="E-Mail"
                aria-label="email"
                required
              />
              <div className="ProfileForm-button">
                <button className="btn search-btn btn-lg btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileForm;
