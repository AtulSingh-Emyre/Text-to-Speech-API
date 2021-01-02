import {Router, Response, Request} from 'express';
import {authorize} from 'passport';
import {AuthController} from '../controllers/AuthController';

//@Route: /auth
//@AUTH not required
//@FUNCTIONS all auth related work

class AuthRouter {
  public router: Router;
  constructor() {
    this.router = Router();
    this.getRoutes();
    this.postRoutes();
  }
  getRoutes() {}

  postRoutes() {
    this.router.post('/otp', AuthController.otp);
    this.router.post('/verify/email', AuthController.verifEmail);
    this.router.post('/login', AuthController.login);
    this.router.post('/purge', AuthController.purge);
  }
}
export default new AuthRouter().router;
