import {Router, Response, Request} from 'express';
import {ClientGroupController} from '../controllers/ClientGroupController';
import {AuthSetup} from '../middlewares/authentication-setup';

//@Route: /client-group-management
//@AUTH required
//@FUNCTIONS crud operations of the client groups

class ClientGroupCRUDRouter {
  public router: Router;
  constructor() {
    this.router = Router();
    this.getRoutes();
    this.postRoutes();
    this.putRoutes();
    this.deleteRoutes();
  }
  getRoutes() {}
  postRoutes() {
    this.router.post(
      '/add-user-to-group',
      AuthSetup.isAuthenticated,
      ClientGroupController.addClient,
    );

    this.router.post(
      '/analyst/remove-user',
      AuthSetup.isAuthenticated,
      ClientGroupController.removeClient,
    );

    this.router.post(
      '/analyst/new-group',
      AuthSetup.isAuthenticated,
      ClientGroupController.addClientGroup,
    );

    this.router.post('/group-data/purge', ClientGroupController.purge);
  }
  putRoutes() {
    this.router.put(
      '/analyst/group/rename',
      AuthSetup.isAuthenticated,
      ClientGroupController.renameGroups,
    );
  }
  deleteRoutes() {
    this.router.put(
      '/analyst/group/delete',
      AuthSetup.isAuthenticated,
      ClientGroupController.deleteGroup,
    );
  }
}

export default new ClientGroupCRUDRouter().router;
