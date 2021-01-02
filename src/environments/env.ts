import { ProdEnvironment } from './prod.env';
import { DevEnvironment } from './dev.env';

export interface Environment {
  db_url: string;
  jwt_secret: string;
  facebook_App_Id: string;
  facebook_App_Secret: string;
  google_Client_Id: string;
  google_Client_Secret: string;
  serviceID: string;
  accountSID: string;
  authToken: string;
  phoneAuthapi: string;
  password:string;
  email:string;
}

export function getEnvironmentVariables() {
  if (process.env.NODE_ENV === 'production') {
    return ProdEnvironment;
  } else {
    return DevEnvironment;
  }
}
