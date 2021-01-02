import {Router, Response, Request} from 'express';
import {UserController} from '../controllers/UserController';
import {AuthSetup} from '../middlewares/authentication-setup';

// @Route: user-management/

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
    this.router.get(
      '/user/:id',
      AuthSetup.isAuthenticated,
      UserController.getUser,
    );
    this.router.get(
      '/analyst/leaderboard',
      AuthSetup.isAuthenticated,
      UserController.getLeaderboard,
    );
  }
  postRoutes() {
    this.router.post(
      '/user/update',
      AuthSetup.isAuthenticated,
      UserController.updateUser,
    );
  }
  putRoutes() {}
  deleteRoutes() {
    this.router.delete('/users', UserController.deleteUser);
    this.router.delete('/user/all', UserController.purgeData);
  }
}
export default new UserRouter().router;
