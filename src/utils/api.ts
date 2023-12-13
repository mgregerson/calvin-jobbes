import axios from "axios";
import { LoginData, RegisterData } from "../types/types";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class CalvinAndJobbesApi {
  // PRODUCTION: Token should be set to empty string so that user's are not automatically logged in.
  // static token = ""

  // DEVELOPMENT: Token is provided for user 'admin' so that user is automatically logged in.
  static token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RhZ" +
    "G1pbiIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4NzQ0NTk2OX0.oileW5hKLpdiIfc-UfBPP23W_Oi" +
    "XwE40PW-NNcJTUnk";

  static async request(endpoint: any, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method, this.token);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${CalvinAndJobbesApi.token}` };
    const params = method === "get" ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err: any) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  // Auth

  /** POST Register new user function */

  static async registerUser(inputData: RegisterData ) {
    const { username, password, firstName, lastName, email } = inputData;

    let res = await this.request(
      "auth/register",
      { username, password, firstName, lastName, email },
      "post"
    );

    this.token = res.token;
    return this.token;
  }

  /** POST Log in user. Returns user token and sets token in class. */

  static async loginUser(inputData: LoginData) {
    const { username, password } = inputData;
    let res = await this.request(`auth/token`, { username, password }, "post");
    this.token = res.token;
    return this.token;
  }

  // Users

  /** GET User by username */

  static async getUser(username: string) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** PATCH Edit user */
    // TODO: Update type of updateData
  static async editUser(username: string, updateData: any) {
    let res = await this.request(`users/${username}`, updateData, "patch");
    return res.user;
  }

  /** POST Apply to Job */

  static async applyToJob(username: string, id: string) {
    let res = await this.request(`users/${username}/jobs/${id}`, {}, "post");
    return res.applied;
  }

  /** POST Remove Application to Job */

  static async removeApplication(username: string, id: string) {
    let res = await this.request(
      `users/${username}/jobs/${id}/remove`,
      {},
      "post"
    );
    return res.unapplied;
  }

  /** GET Jobs use has applied to */

  static async getAppliedJobs(username: string) {
    let res = await this.request(`users/${username}/jobs`);
    return res.jobs;
  }

  // APPLICATIONS

  static async getJobApplicationDetails(username: string) {
    let res = await this.request(`users/${username}/applications`);
    return res.jobs;
  }

  // COMPANIES

  /** Get details on a company by handle. */

  static async getCompany(handle: string) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get details on all companies */

  static async getCompanies() {
    let res = await this.request("companies");
    return res.companies;
  }

  /** Search for company by title */

  static async searchCompaniesByHandle(term: string) {
    let res = await this.request(`companies?nameLike=${term}`);
    return res.companies;
  }

  // JOBS

  /** Get job details by id */
  static async getJob(id: string) {
    let res = await this.request(`jobs/${id}`);
    return res.job;
  }

  /** Get all jobs */
  static async getJobs() {
    let res = await this.request("jobs");
    return res.jobs;
  }

  /** Search for jobs by title */

  static async searchJobsByTitle(title: string) {
    let res = await this.request(`jobs?title=${title}`);
    return res.jobs;
  }
}

export default CalvinAndJobbesApi;
