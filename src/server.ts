import express from 'express';
import {Request, Response, NextFunction} from 'express';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';
//server file imports
import AuthRouter from './routers/AuthRouter';
import UserRouter from './routers/UserRouter';
import {getEnvironmentVariables} from './environments/env';
import AnalystPostRouter from './routers/AnalystPostRouter';
import CommentRouter from './routers/CommentRouter';
import ClientGroupCRUDrouter from './routers/ClientGroupCRUDrouter';

export class Server {
  public app: express.Application = express();
  constructor() {
    this.setConfigurations();
    this.setRoutes();
    this.error404Handler();
    this.handleErrors();
  }

  setConfigurations() {
    this.app.use(cookieParser());
    this.connectMongoDb();
    this.configureBodyParser();
    this.configureExpressSession();
    this.configurePassport();
    console.log('Configurations have been successfully setup');
  }

  configureExpressSession() {
    this.app.use(
      session({
        secret: 'abcdefg',
        resave: true,
        saveUninitialized: false,
      }),
    );
    console.log('Express session configured');
  }

  configurePassport() {
    this.app.use(passport.initialize());
    this.app.use(passport.session());
    console.log('passport initialize and session setup');
  }

  configureBodyParser() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({extended: true}));
    console.log('body-parser setup');
  }

  setRoutes() {
    this.app.use('/auth', AuthRouter);
    this.app.use('/user-management', UserRouter);
    this.app.use('/analyst', AnalystPostRouter);
    this.app.use('/client-group-management', ClientGroupCRUDrouter);
    // this.app.use('/post/comment', CommentRouter);
  }

  connectMongoDb() {
    const databaseUrl = getEnvironmentVariables().db_url;
    mongoose.connect(databaseUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    mongoose.connection.on('open', () => {
      console.log('connection successfully made with database');
    });
  }

  error404Handler() {
    this.app.use((req, res) => {
      res.status(404).json({
        message: 'Not Found',
        status_code: 404,
      });
    });
  }

  handleErrors() {
    this.app.use((error: any, req: any, res: Response, next: NextFunction) => {
      const errorStatus = req.errorStatus || 500;
      res.status(errorStatus).json({
        message: error.message || 'Something Went Wrong. Please Try Again',
        status_code: errorStatus,
        success: false,
      });
    });
  }
}
