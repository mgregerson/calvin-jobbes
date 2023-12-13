import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JobCardList from "../Jobs/JobCardList";
import CalvinAndJobbesApi from "../../utils/api";
import "./CompanyDetail.css";
import { CompanyDetails } from "../../types/types";

/** CompanyDetail
 *
 *  Props: None
 *
 *  State:
 *       - company: {
 *                  handle: ""
 *                  name: ""
 *                  description: ""
 *                  numEmployees: num
 *                  logoUrl: jpg
 *                  jobs: [{
 *                   "id": 91,
 *                   "title": "Paramedic",
 *                   "salary": 122000,
 *                   "equity": "0.047"
 *                   } ...]
 *                 }
 *       - isLoading: Boolean
 *       - apiError: Boolean
 *
 *  RoutesList -> CompanyDetail -> JobCardList
 */

function CompanyDetail() {
  const [company, setCompany] = useState<CompanyDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState({
    isError: false,
    errorMessage: "",
  });

  const { handle } = useParams();

  // Use nullish coalescing (??) to provide a default value (an empty string) if handle is undefined
  const companyHandle = handle ?? "";

  useEffect(
    function fetchCompanyOnMount() {
      async function getCompany() {
        try {
          const company = await CalvinAndJobbesApi.getCompany(companyHandle);
          setCompany(company);
          setIsLoading(false);
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
        getCompany();
      }
    },
    [companyHandle, isLoading]
  );

  if (isLoading === true) {
    return <div className="Loading">Loading Company....</div>;
  }

  if (!company || apiError.isError === true) {
    return <h1 className="apiError">{apiError.errorMessage}</h1>;
  }

  return (
    <div className="CompanyDetail col-md-8 offset-md-2 pt-3">
      <h4>{company.name}</h4>
      <p>{company.description}</p>
      <JobCardList jobs={company.jobs} />
    </div>
  );
}

export default CompanyDetail;
