import { CompanyDetails } from "../../types/types";
import "./CompanyCard.css";

/** CompanyCard
 *
 * Props:
 *      - company: {
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
 *
 * CompanyList -> CompanyCard
 *
 */

type CompanyCardProps = {
  company: CompanyDetails;
};

function CompanyCard({ company }: CompanyCardProps) {
  return (
    <a className="CompanyCard card" href={`companies/${company.handle}`}>
      <div className="Company Card card-body">
        <div className="CompanyCard card-title">
          <h6 className="CompanyCard-company">{company.name}</h6>
          {company.logoUrl !== null && (
            <img
              className="CompanyCard-img float-end ms-5"
              src={`${company.logoUrl}`}
              alt={company.name}
            />
          )}
        </div>
        <small className="CompanyCard-description float-start">
          {company.description}
        </small>
      </div>
    </a>
  );
}

export default CompanyCard;
