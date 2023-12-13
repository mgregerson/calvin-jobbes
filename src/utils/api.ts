import axios from "axios";
import { LoginData, RegisterData } from "../types/types";



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

  static BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
  // Individual API routes
  
  // Auth

  /** POST Register new user function */

  static async registerUser(inputData: RegisterData) {
    const { username, password, firstName, lastName, email } = inputData;
    const response = await axios.post(
      `${this.BASE_URL}/auth/register`,
      { username, password, firstName, lastName, email },
      { headers: { Authorization: `Bearer ${CalvinAndJobbesApi.token}` } }
    );

    this.token = response.data.token;
    return this.token;
  }

  /** POST Log in user. Returns user token and sets token in class. */

  static async loginUser(inputData: LoginData) {
    const { username, password } = inputData;
    const response = await axios.post(
      `${this.BASE_URL}/auth/token`,
      { username, password },
      { headers: { Authorization: `Bearer ${CalvinAndJobbesApi.token}` } }
    );

    this.token = response.data.token;
    return this.token;
  }

  // Users

  /** GET User by username */

  static async getUser(username: string) {
    try {
      console.log('calling get user');
      const response = await axios.get(`${this.BASE_URL}/users/${username}`, {
        headers: { Authorization: `Bearer ${CalvinAndJobbesApi.token}` },
      });
  
      console.log('res=', response.data);
      return response.data.user;
    } catch (error) {
      console.error('Error in getUser:', error);
  
      // You may want to throw the error or handle it appropriately based on your application's needs.
      throw error;
    }
  }

  /** PATCH Edit user */
  // TODO: Update type of updateData
  static async editUser(username: string, updateData: any) {
    const response = await axios.patch(
      `${this.BASE_URL}/users/${username}`,
      updateData,
      { headers: { Authorization: `Bearer ${CalvinAndJobbesApi.token}` } }
    );
    return response.data.user;
  }

  /** POST Apply to Job */

  static async applyToJob(username: string, id: string) {
    const response = await axios.post(
      `${this.BASE_URL}/users/${username}/jobs/${id}`,
      {},
      { headers: { Authorization: `Bearer ${CalvinAndJobbesApi.token}` } }
    );
    return response.data.applied;
  }

  /** POST Remove Application to Job */

  static async removeApplication(username: string, id: string) {
    const response = await axios.post(
      `${this.BASE_URL}/users/${username}/jobs/${id}/remove`,
      {},
      { headers: { Authorization: `Bearer ${CalvinAndJobbesApi.token}` } }
    );
    return response.data.unapplied;
  }

  /** GET Jobs use has applied to */

  static async getAppliedJobs(username: string) {
    const response = await axios.get(`${this.BASE_URL}/users/${username}/jobs`, {
      headers: { Authorization: `Bearer ${CalvinAndJobbesApi.token}` },
    });
    return response.data.jobs;
  }

  // APPLICATIONS

  static async getJobApplicationDetails(username: string) {
    const response = await axios.get(
      `${this.BASE_URL}/users/${username}/applications`,
      { headers: { Authorization: `Bearer ${CalvinAndJobbesApi.token}` } }
    );
    return response.data.jobs;
  }

  // COMPANIES

  /** Get details on a company by handle. */

  static async getCompany(handle: string) {
    const response = await axios.get(`${this.BASE_URL}/companies/${handle}`, {
      headers: { Authorization: `Bearer ${CalvinAndJobbesApi.token}` },
    });
    return response.data.company;
  }

  /** Get details on all companies */

  static async getCompanies() {
    const response = await axios.get(`${this.BASE_URL}/companies`, {
      headers: { Authorization: `Bearer ${CalvinAndJobbesApi.token}` },
    });
   
    return response.data.companies;
  }

  /** Search for company by title */

  static async searchCompaniesByHandle(term: string) {
    const response = await axios.get(`${this.BASE_URL}/companies?nameLike=${term}`, {
      headers: { Authorization: `Bearer ${CalvinAndJobbesApi.token}` },
    });
    return response.data.companies;
  }

  // JOBS

  /** Get job details by id */
  static async getJob(id: string) {
    const response = await axios.get(`${this.BASE_URL}/jobs/${id}`, {
      headers: { Authorization: `Bearer ${CalvinAndJobbesApi.token}` },
    });
    return response.data.job;
  }

  /** Get all jobs */
  static async getJobs() {
    const response = await axios.get(`${this.BASE_URL}/jobs`, {
      headers: { Authorization: `Bearer ${CalvinAndJobbesApi.token}` },
    });
    return response.data.jobs;
  }

  /** Search for jobs by title */

  static async searchJobsByTitle(title: string) {
    const response = await axios.get(`${this.BASE_URL}/jobs?title=${title}`, {
      headers: { Authorization: `Bearer ${CalvinAndJobbesApi.token}` },
    });
    return response.data.jobs;
  }
}

export default CalvinAndJobbesApi;
