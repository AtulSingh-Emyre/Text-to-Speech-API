import { Router, Response, Request } from 'express';
import { UserController } from '../controllers/UserController';
import { AuthSetup } from '../middlewares/authentication-setup';

class UserRouter {
  public router: Router;
  constructor() {
    this.router = Router();
    this.getRoutes();
    this.postRoutes();
    this.putRoutes();
    this.deleteRoutes();
  }

  getRoutes() {
    this.router.get('/users', UserController.userData);
  }
  postRoutes() {}
  putRoutes() {
    this.router.put('/users', AuthSetup.isAuthenticated, UserController.update);
    this.router.put(
      '/users/phone',
      AuthSetup.isAuthenticated,
      UserController.updatePhoneNumber
    );
  }
  deleteRoutes() {
    this.router.delete('/users', UserController.deleteUser);
    this.router.delete('/user/all', UserController.purgeData);
  }
}
export default new UserRouter().router;
