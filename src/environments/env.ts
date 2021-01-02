import { ProdEnvironment } from './prod.env';
import { DevEnvironment } from './dev.env';

export interface Environment {
  db_url: string;
  jwt_secret: string;
  facebook_App_Id: '1301799296821963';
  facebook_App_Secret: 'ba2f1da549eb2f926a2118406401acfa';
  google_Client_Id: '502920159751-rkv4s4roq08u7p4g6p6nbcnmhv86h7me.apps.googleusercontent.com';
  google_Client_Secret: 'k82oyikfB6va0PG-FBNmsIGP';
  serviceID: 'VA94a4de24d5e1a742c0ce1a2debc76200';
  accountSID: 'ACb718501f7bde59a9a2162d8cf35a73a7';
  authToken: 'e941c951cc086ef49b5b06b3ec163c8f';
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
