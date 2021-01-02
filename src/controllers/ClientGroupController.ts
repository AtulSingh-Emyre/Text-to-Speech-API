import {Request, Response, NextFunction, query} from 'express';
import ClientGroup from '../models/client/ClientGroup';
import UserDetail from '../models/User/UserAuthDetails';

export class ClientGroupController {
  static async addClientGroup(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body);
      const newClientGroup = await new ClientGroup({
        analystId: req.body.id,
        groupName: req.body.groupName,
        groupClients: [],
      });
      await newClientGroup.save();
      res.status(200).json({
        data: {_id: newClientGroup._id},
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }
  static async removeClient(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body);
      const group = await ClientGroup.findById(req.body.groupId);
      if (group) {
        await group.userList.splice(req.body.clientIndex);
        await group.save();
      } else {
        throw new Error('group does not exists');
      }
      const user = await UserDetail.findById(req.body.clientId);
      if (!user) {
        throw new Error('user does not exists');
      } else {
        await user.user_groups.splice(
          user.user_groups.indexOf(req.body.groupId),
        );
        await user.save();
      }
      res.status(200).json({
        success: true,
        data: {},
      });
    } catch (error) {
      next(error);
    }
  }

  static async addClient(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body);
      const clientGroup = await ClientGroup.findById(req.body.groupId);
      if (clientGroup) {
        const userList = clientGroup.userList;
        const user =
          req.body.phone == 0
            ? await UserDetail.findOne({work_mail: req.body.email})
            : await UserDetail.findOne({phone: req.body.phone});
        console.log(user);
        if (!user) {
          throw new Error('user does not exists');
        }
        const userType = {
          id: user._id,
          email: user.work_mail,
          mob: user.phone,
          name: user.name,
        };
        await ClientGroup.findByIdAndUpdate(req.body.groupId, {
          userList: [...userList, userType],
        });
        user.user_groups = [
          ...JSON.parse(JSON.stringify(user.user_groups)),
          req.body.groupId,
        ];
        await user.save();
        return res.json({
          data: {user: userType},
          success: true,
          message: 'User found and added',
        });
      }
      return res.json({
        status: 404,
        message: 'client group not found',
      });
    } catch (error) {
      next(error);
    }
  }

  static async renameGroups(req: Request, res: Response, next: NextFunction) {
    try {
      await ClientGroup.findByIdAndUpdate(req.body.groupId, {
        groupName: req.body.newName,
      });
      res.json({
        data: {
          message: 'group renamed',
        },
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }
  static async deleteGroup(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('checkpoint');
      console.log(req.body);
      await ClientGroup.findByIdAndDelete(req.body.groupId);
      res.json({
        data: {
          message: 'group deleted',
        },
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }
  static async purge(req: Request, res: Response, next: NextFunction) {
    await ClientGroup.deleteMany({});
  }
}
