import { Router } from 'express';
import { AuthSetup } from '../middlewares/authentication-setup';
import { CommentValidators } from '../validators/CommentValidators';
import { CommentController } from '../controllers/CommentController';

class CommentRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.getRoutes();
    this.postRoutes();
    this.patchRoutes();
    this.deleteRoutes();
  }

  //@PATH: /post/comment
  //@Auth: required
  //@FUNCTIONS: CUD of comments
  getRoutes() {}

  postRoutes() {
    this.router.post(
      '/add',
      AuthSetup.isAuthenticated,
      CommentValidators.addComment(),
      CommentController.addComment
    );
  }

  patchRoutes() {
    this.router.patch(
      '/edit/:id',
      AuthSetup.isAuthenticated,
      CommentValidators.editComment(),
      CommentController.editComment
    );
  }

  deleteRoutes() {
    this.router.delete(
      '/delete/:id',
      AuthSetup.isAuthenticated,
      CommentValidators.deleteComment(),
      CommentController.deleteComment
    );
  }
}

export default new CommentRouter().router;
