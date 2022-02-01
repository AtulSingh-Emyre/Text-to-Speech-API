import { Router } from 'express';
import { APICallController } from '../controllers/APICallController';

// The file is responsible to process the api requests and call the required middleware, validator and controller in a centralized place

//@Route: /auth
//@AUTH not required
//@FUNCTIONS all auth related work

class AuthRouter {
  public router: Router;
  constructor() {
    this.router = Router();
    this.getRoutes();
    this.postRoutes();
    this.putRoutes();
    this.deleteRoutes();
  }
  getRoutes(): void {
    // add all get routes here
  }
  postRoutes(): void {
    // add all post routes here
    this.router.post(
      '/conv', // path of api request
      APICallController.convertToSpeech // Main business logic of the server that returns the required response.
    );
  }
  putRoutes(): void {
    // add all get routes here
    // this.router.put()
  }
  deleteRoutes(): void {
    // add all get routes here
    // this.router.delete()
  }
}
export default new AuthRouter().router;
