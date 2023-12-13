import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage.js";
import CompanyList from "./components/companies/CompanyList.js";
import CompanyDetail from "./components/companies/CompanyDetail.js";
import NotFound from "./components/ErrorPages/NotFound.js";
import JobList from "./components/Jobs/JobList.js";
import LoginForm from "./components/forms/LoginForm/LoginForm.js";
import SignupForm from "./components/forms/SignupForm/SignupForm.js";
import Unauthorized from "./components/ErrorPages/Unauthorized.js";
import ProfileForm from "./components/forms/ProfileForm/ProfileForm.js";
import { useContext } from "react";
import userContext from "./context/UserContext";
import ApplicationsList from "./components/applications/ApplicationsList.js";

/** RoutesList
 *
 * Contains site-wide routes + global 404 + global 403 (for non-user accessing protected routes)
 *
 * Props:
 *
 *      - handleSignup: Func
 *      - handleLogin: Func
 *      - handleEditUser: Func
 *
 * App -> RoutesList
 *
 */

type RoutesListProps = {
    handleSignup: Function;
    handleLogin: Function;
    handleProfileEdit: Function;
    };

function RoutesList({ handleSignup, handleLogin, handleProfileEdit }: RoutesListProps) {
  const { user } = useContext(userContext);

  if (user) {
    return (
      <Routes>
        <Route path="/" element={<Homepage user={user} />}></Route>
        <Route path="/companies" element={<CompanyList />}></Route>
        <Route path="/companies/:handle" element={<CompanyDetail />}></Route>
        <Route path="/jobs" element={<JobList />}></Route>
        <Route
          path="/applications"
          element={<ApplicationsList user={user} />}
        ></Route>
        <Route
          path="/profile"
          element={<ProfileForm handleProfileEdit={handleProfileEdit} />}
        ></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Homepage user={user} />}></Route>
      <Route
        path="/login"
        element={<LoginForm handleLogin={handleLogin} />}
      ></Route>
      <Route
        path="/signup"
        element={<SignupForm handleSignup={handleSignup} />}
      ></Route>
      <Route path="/companies" element={<Unauthorized />}></Route>
      <Route path="/companies/:handle" element={<Unauthorized />}></Route>
      <Route path="/jobs" element={<Unauthorized />}></Route>
      <Route path="*" element={<NotFound />}></Route>
    </Routes>
  );
}

export default RoutesList;
