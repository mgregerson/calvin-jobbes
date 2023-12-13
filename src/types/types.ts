export type LoginData = {
  username: string;
  password: string;
};

export type RegisterData = LoginData & {
  firstName: string;
  lastName: string;
  email: string;
};

export type Job = {
  id: string;
  title: string;
  salary: number;
  equity: number;
  companyHandle: string;
  companyName: string;
};

export type User = {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  isAdmin: boolean;
  applications: any[];
};

export type Company = {
  handle: string;
  name: string;
  description: string;
  numEmployees: number;
  logoUrl: string;
};

export type CompanyDetails = Company & {
  jobs: Job[];
};