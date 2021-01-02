import {group} from 'console';
import {Request, Response, NextFunction} from 'express';
import UserDetail from '../models/User/UserAuthDetails';
import User from '../models/User/UserAuthDetails';
export class UserController {
  static async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const user = await UserDetail.findById(id);
      if (!user) {
        throw new Error('User not found');
      }
      const userDataToSend = {
        name: user?.name,
        avatar: user?.avatar,
        phone: user?.phone,
        rating: 5,
        work_mail: user?.work_mail,
        role: user?.roles,
        business_account: user?.business_account,
        business_name: user?.business_name,
        website_url: user?.website_url,
        DOB: user.DOB,
        description: user.description,
        interests: user.interests,
        experience: user.experience,
      };
      res.status(200).json({
        data: userDataToSend,
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }

  static async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      await User.findByIdAndUpdate(req.body.id, {
        ...req.body.userData,
        updated_at: new Date(),
      });
      res.status(200).json({
        success: true,
        data: {},
        message: 'user details updated',
      });
    } catch (err) {
      next(err);
    }
  }

  static async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      User.deleteMany({id: req.body.phone}, () => {
        res.json({
          status: 'ok',
          data: {},
          message: 'user data delted',
          error: 'user data failed to be deleted',
        });
      });
    } catch (err) {
      next(err);
    }
  }
  static async getLeaderboard(req: Request, res: Response, next: NextFunction) {
    try {
      const leaderboard = await UserDetail.find({
        roles: [{Analyst: true}, {Trader: false}],
      }).select({
        _id: 1,
        name: 1,
        work_mail: 1,
        phone: 1,
        avatar: 1,
        isActive: 1,
      });
      res.json({
        success: true,
        data: leaderboard,
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
          error: 'user data failed to be deleted',
        });
      });
    } catch (err) {
      next(err);
    }
  }
}
