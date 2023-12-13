import "./App.css";
import Navbar from "./components/Navigation/Navbar.js";
import RoutesList from "./RoutesList";
import { BrowserRouter } from "react-router-dom";
import CalvinAndJobbesApi from "./utils/api.js";
import userContext from "./context/UserContext.js";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

/** App
 *
 * Props: None
 *
 * State:
 *       - user: localStorage(user) -> { username, firstName, lastName, email, isAdmin, applications}
 *       - token: localStorage(token) -> string of token
 *
 * App -> Nav
 * App -> RoutesList
 */

// interface JwtPayload {
//   username: string;
// }

function App() {
  const [user, setUser] = useState(null);
  // DEV BUILD TOKEN:
  const [token, setToken] = useState<string | null>(CalvinAndJobbesApi.token);

  // PRODUCTION BUILD TOKEN:
  // const [token, setToken] = useState(localStorage.getItem("token"));

  /** Updates state for user and token whenever token changes. Adds token and user to local storage. */
  useEffect(
    function fetchUserOnTokenChange() {
      async function getUser(username: string) {
        try {
          const user = await CalvinAndJobbesApi.getUser(username);
          console.log('user=', user);
          setUser(user);
        } catch (err) {
          return;
        }
      }
      if (token) {
        const decodedToken = jwtDecode<any>(token);
        const { username } = decodedToken;
        CalvinAndJobbesApi.token = token;
        getUser(username);
        localStorage.setItem("token", token);
      }
    },
    [token]
  );
  
  /** Makes api call to log in user, updates state token */
  async function handleLogin({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    const token = await CalvinAndJobbesApi.loginUser({ username, password });
    setToken(token);
  }

  /** Makes api call to sign up new user, updates state for token */
  // Destructure formdata when passing info from formData
  async function handleSignup(formData: {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
  }) {
    const token = await CalvinAndJobbesApi.registerUser(formData);
    setToken(token);
  }

  /** Sets all states to null (logs out user and removes token/user from localStorage) */
  function logOut() {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  }

  /** TODO: Work on this */
  async function handleProfileEdit(username: string, formData: any) {
    try {
      const user = await CalvinAndJobbesApi.editUser(username, formData);
      setUser(user);
    } catch (err) {
      return err;
    }
  }

  if (token && !user) {
    return `loading...`;
  }

  return (
    <div className="App">
      <userContext.Provider value={{ user }}>
        <BrowserRouter>
          <Navbar logOut={logOut} />
          <RoutesList
            handleLogin={handleLogin}
            handleSignup={handleSignup}
            handleProfileEdit={handleProfileEdit}
          />
        </BrowserRouter>
      </userContext.Provider>
      {/* <div className='Testing'>Testing</div> */}
    </div>
  );
}

export default App;
