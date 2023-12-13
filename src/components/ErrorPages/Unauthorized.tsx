import "./Unauthorized.css";

/** Unauthorized
 *
 * Renders 403 page
 *
 * RoutesList -> Unauthorized
 */

function Unauthorized() {
  return (
    <div className="Unauthorized">
      <img className="Unauthorized-photo" src="../unauthorized.jpg"></img>
      <h3 className="Unauthorized-message">
        Please login to access this page!
      </h3>
    </div>
  );
}

export default Unauthorized;
