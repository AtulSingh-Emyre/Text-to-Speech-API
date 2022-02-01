/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as express from 'express';
import { Response } from 'express';
import * as bodyParser from 'body-parser';
//server file imports
import APICallRouter from './routers/APICallRouter';

export class Server {
  public app: express.Application = express();
  constructor() {
    // these scripts run at start up of the server
    this.setConfigurations();
    this.setRoutes();
    this.error404Handler();
    this.handleErrors();
  }

  setConfigurations() {
    // boilerplate configuration of the packages
    this.configureBodyParser();
    console.log('Configurations have been successfully setup');
  }

  configureBodyParser() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    console.log('body-parser setup');
  }

  setRoutes() {
    // all the server api routes go here
    this.app.use('/api', APICallRouter);
  }

  error404Handler() {
    // Error when api request with invalid path is fired to the server
    this.app.use((req, res) => {
      res.status(404).json({
        message: 'Not Found',
        status_code: 404
      });
    });
  }

  handleErrors() {
    // Global Error Handling : All the errors that occur in the server are managed here
    this.app.use((error: any, req: any, res: Response) => {
      const errorStatus = req.errorStatus || 500;
      res.status(errorStatus).json({
        message: error.message || 'Something Went Wrong. Please Try Again',
        status_code: errorStatus,
        success: false
      });
    });
  }
}
