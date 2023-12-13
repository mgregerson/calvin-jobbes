import CalvinAndJobbesApi from "../../utils/api";
import JobCardList from "../Jobs/JobCardList";
import { useState, useEffect } from "react";
import { User } from "../../types/types";

/**
 * JobCardList
 *
 * Props:
 *      - User: {username, firstName, lastName, isAdmin, email, applications}
 *
 * App -> RoutesList -> ApplicationsList -> JobCardList -> JobCard
 *
 * Accessed at "/applications"
 */

type JobCardListProps = {
  user: User;
};

function ApplicationsList({ user }: JobCardListProps) {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // we are going to need to do a useEffect that fetches all jobs that this user has applied to
  useEffect(function fetchJobApplications() {
    async function getJobs() {
      const companies = await CalvinAndJobbesApi.getAppliedJobs(user.username);
      setJobs(companies);
      setIsLoading(false);
    }
    if (isLoading === true) {
      getJobs();
    }
  }, []);

  if (isLoading === true) {
    return <div className="Loading">Loading Jobs You've Applied To....</div>;
  }

  return (
    <div className="ApplicationsList col-md-8 mx-auto pt-5">
      <h1>Your Applications</h1>
      <JobCardList jobs={jobs} />
    </div>
  );
}

export default ApplicationsList;
