import { Router } from 'express';
import { AnalystPostController } from '../controllers/AnalystPostController';
import { AuthSetup } from '../middlewares/authentication-setup';
import { PostValidators } from '../validators/PostValidators';

//@PATH /analyst
//@AUTH required
//@FUNCTIONS CRUD of analyst posts

class AnalystPostRouter {
  public router: Router;
  constructor() {
    this.router = Router();
    this.getRoutes();
    this.postRoutes();
    this.updateRoutes();
    this.deleteRoutes();
  }
  getRoutes() {
    this.router.get(
      '/post/get',
      AuthSetup.isAuthenticated,
      AnalystPostController.getPost
    );
    this.router.get(
      '/post/:postId',
      AuthSetup.isAuthenticated,
      AnalystPostController.getOnePost
    );
  }
  postRoutes() {
    this.router.post(
      '/post/post',
      AuthSetup.isAuthenticated,
      AnalystPostController.addPost
    );
  }
  updateRoutes() {
    this.router.put(
      '/post/edit/:postId',
      AuthSetup.isAuthenticated,
      AnalystPostController.updatePost
    );
  }
  deleteRoutes() {
    this.router.delete(
      '/post/delete/:postId',
      AuthSetup.isAuthenticated,
      PostValidators.deletePost(),
      AnalystPostController.deletePost
    );
  }
}

export default new AnalystPostRouter().router;
