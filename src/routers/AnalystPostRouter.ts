import {Router} from 'express';
import {AnalystPostController} from '../controllers/AnalystPostController';
import {AuthSetup} from '../middlewares/authentication-setup';

//@PATH /analyst
//@AUTH required
//@FUNCTIONS CRUD of analyst posts

class AnalystPostRouter {
  public router: Router;
  constructor() {
    this.router = Router();
    this.getRoutes();
    this.postRoutes();
    this.deleteRoutes();
  }
  getRoutes() {
    this.router.post(
      '/post/like',
      AuthSetup.isAuthenticated,
      AnalystPostController.likePost,
    );
  }

  postRoutes() {
    this.router.post(
      '/post/post',
      AuthSetup.isAuthenticated,
      AnalystPostController.savePost,
    );
    this.router.post(
      '/post/query',
      AuthSetup.isAuthenticated,
      AnalystPostController.getPostByQuery,
    );
  }
  deleteRoutes() {
    this.router.delete('/post/delete', AnalystPostController.deletePost);
  }
}

export default new AnalystPostRouter().router;
