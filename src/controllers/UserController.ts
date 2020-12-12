import { Request, Response, NextFunction } from 'express';
import User from '../models/User/UserDetail';
export class UserController {
  static async userData(req: Request, res: Response, next: NextFunction) {
    try {
      User.find(req.body.query, (err, user) => {
        if (user)
          res.json({
            status: 'OK',
            data: user,
            message: 'user data recieved',
            error: 'user data retrieval failed'
          });

        if (err) {
          throw new Error(err);
        }
        if (!user) {
          throw new Error('user does not exists');
        }
      });
    } catch (err) {
      next(err);
    }
  }
  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      User.findOneAndUpdate(
        { id: req.body.user.id },
        req.body.user,
        (err, docs) => {
          if (err) {
            console.log(err);
            throw new Error(err);
          } else {
            res.json({
              status: 'OK',
              data: req.body,
              message: 'user data updated',
              error: 'user data failed to be updated'
            });
          }
        }
      );
    } catch (err) {
      next(err);
    }
  }

  static async updatePhoneNumber(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      User.findOneAndUpdate(
        { phone: req.body.phone },
        { id: req.body.updatedPhone, phone: req.body.updatedPhone },
        (err, docs) => {
          if (err) {
            throw new Error(err);
          } else {
            res.json({
              status: 'ok',
              data: docs,
              message: 'phone number updated',
              error: 'user data failed to be updated'
            });
          }
        }
      );
    } catch (err) {
      next(err);
    }
  }

  static async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      User.deleteMany({ id: req.body.phone }, () => {
        res.json({
          status: 'ok',
          data: {},
          message: 'user data delted',
          error: 'user data failed to be deleted'
        });
      });
    } catch (err) {
      next(err);
    }
  }

  static async purgeData(req: Request, res: Response, next: NextFunction) {
    try {
      User.deleteMany({}, () => {
        res.json({
          status: 'ok',
          data: {},
          message: 'all user data delted',
          error: 'user data failed to be deleted'
        });
      });
    } catch (err) {
      next(err);
    }
  }
}
