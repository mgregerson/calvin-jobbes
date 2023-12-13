import "./JobCard.css";
import { useState } from "react";
import CalvinAndJobbesApi from "../../utils/api";
import { useContext } from "react";
import userContext from "../../context/UserContext";
import { useEffect } from "react";

/** JobCard
 *
 * Props:
 *      - title
 *      - companyName
 *      - salary
 *      - equity
 *      - id
 *
 * Renders individual Job Card
 *
 * JobCardList -> JobCard
 */

type JobCardProps = {
  title: string;
  companyName: string;
  salary: number | null;
  equity: number | null;
  id: string;
};

type ApiError = {
  isError?: boolean;
  errorMessage?: string;
};

function JobCard({ title, companyName, salary, equity, id }: JobCardProps) {
  const [hasApplied, setHasApplied] = useState(false);
  const [apiError, setApiError] = useState<ApiError>({});
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(userContext);

  useEffect(
    function fetchApplicationStatus() {
      async function getApplicationStatus() {
        try {
          const applications = await CalvinAndJobbesApi.getJobApplicationDetails(
            user.username
          );
          if (applications.includes(id)) {
            setHasApplied(true);
          }
        } catch (err: any) {
          setIsLoading(false);
          console.log(err);
          setApiError({
            isError: true,
            errorMessage: err[0],
          });
        }
      }
      if (isLoading === true) {
        getApplicationStatus();
      }
    },
    [hasApplied]
  );

  async function applyToJob() {
    await CalvinAndJobbesApi.applyToJob(user.username, id);
    setHasApplied(true);
  }

  async function removeApplication() {
    await CalvinAndJobbesApi.removeApplication(user.username, id);
    setHasApplied(false);
  }

  return (
    <div className="JobCard-container">
      <div className="JobCard card my-2">
        <div className="JobCard-body">
          <h6 className="JobCard-title">{title}</h6>
          <p className="JobCard-company-name">{companyName}</p>
          {salary !== null ? (
            <div>
              <small className="JobCard-salary">Salary: {salary}</small>
            </div>
          ) : (
            <div>
              <small className="JobCard-salary">Unpaid Internship</small>
            </div>
          )}
          {equity !== null && (
            <div>
              <small className="JobCard-equity">Equity: {equity}</small>
            </div>
          )}
          {!hasApplied ? (
            <button
              type="button"
              className="JobCard-apply btn search-btn btn-sm btn-success"
              style={{ marginRight: "5px", marginBottom: "5px" }}
              onClick={applyToJob}
            >
              Apply Now
            </button>
          ) : (
            <button
              type="button"
              className="JobCard-apply btn search-btn btn-sm btn-danger"
              style={{ marginRight: "5px", marginBottom: "5px" }}
              onClick={removeApplication}
            >
              Unapply
            </button>
          )}
          {apiError.isError && <p>{apiError.errorMessage}</p>}
        </div>
      </div>
    </div>
  );
}

export default JobCard;
