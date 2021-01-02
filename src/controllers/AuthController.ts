import {Request, Response, NextFunction} from 'express';
import {getEnvironmentVariables} from '../environments/env';
import request from 'request';
import jwt from 'jsonwebtoken';
import UserDetail, {IUserAuthData} from '../models/User/UserAuthDetails';
import ClientGroup from '../models/client/ClientGroup';
import * as nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
enum errorMessages {
  STATUS_401 = 'invalid data provided, please try again',
  STATUS_501 = 'server error, please try again',
}

export const transporter = nodemailer.createTransport({
  service: 'Gmail',
  secure: true,
  auth: {
    user: getEnvironmentVariables().email,
    pass: getEnvironmentVariables().password,
  },
});
const MailGenerator = new Mailgen({
  theme: 'default',
  product: {
    name: 'Nodemailer',
    link: 'http://localhost:5000/',
  },
});

export class AuthController {
  static async otp(req: Request, res: Response, next: NextFunction) {
    const otp = Math.floor(1000 + Math.random() * 9000);
    console.log(otp);
    try {
      const options = {
        method: 'GET',
        url:
          'http://2factor.in/API/V1/' +
          getEnvironmentVariables().phoneAuthapi +
          '/SMS/' +
          req.body.phone +
          '/' +
          otp,
        headers: {'content-type': 'application/x-www-form-urlencoded'},
        form: {},
      };
      await request(options, function (error: any, response: any, body: any) {
        console.log(JSON.parse(body));
        if (JSON.parse(body).Status == 'Success') {
          return res.status(501).json({
            success: false,
            message: errorMessages.STATUS_501,
          });
        }
        if (JSON.parse(body).Status !== 'Success')
          return res.status(200).json({
            data: {
              otp,
            },
            success: true,
          });
        return res.status(401).json({
          message: errorMessages.STATUS_401,
          success: false,
        });
      });
    } catch (err) {
      next(err);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      let query;
      if (req.body.user.phone) {
        query = {phone: req.body.user.phone};
      }
      if (req.body.user.work_mail) {
        query = {
          work_mail: req.body.user.work_mail,
        };
      }
      const user = await UserDetail.findOne(query);
      if (!user) {
        console.log('creating new user');

        const user = await new UserDetail({
          ...req.body.user,
        });
        await user.save();
        const token = await jwt.sign(user.toJSON(), 'asdf');
        const userAuthData: IUserAuthData = {
          id: user._id,
          name: user.name,
          phone: user.phone,
          role: user.roles,
          experience: user.experience,
          business_account: user.business_account,
          avatar: user.avatar,
          user_groups: user.user_groups,
          work_mail: user.work_mail,
          isProfileComplete: user.isProfileComplete,
          business_name: user.business_name,
          description: user.description,
          website_url: user.website_url,
          DOB: user.DOB,
          interests: user.interests,
          isActive: user.isActive,
        };
        const newGroup = await new ClientGroup({
          groupName: 'Default',
          analystId: user._id,
        });
        await newGroup.save();
        const groups = [
          {
            _id: newGroup._id,
            userList: newGroup.userList,
            groupName: newGroup.groupName,
          },
        ];

        return res.status(200).json({
          data: {
            user: JSON.stringify(userAuthData),
            groups: await JSON.stringify(groups),
            token,
          },
          sucess: true,
        });
      }
      if (user) {
        console.log('existing user found');

        const token = await jwt.sign(user.toJSON(), 'asdf');
        const groups = await ClientGroup.find({analystId: user._id}).select({
          _id: 1,
          userList: 1,
          groupName: 1,
        });
        const userAuthData: IUserAuthData = {
          id: user._id,
          name: user.name,
          phone: user.phone,
          role: user.roles,
          experience: user.experience,
          business_account: user.business_account,
          avatar: user.avatar,
          user_groups: user.user_groups,
          work_mail: user.work_mail,
          isProfileComplete: user.isProfileComplete,
          business_name: user.business_name,
          description: user.description,
          website_url: user.website_url,
          DOB: user.DOB,
          interests: user.interests,
          isActive: user.isActive,
        };
        return res.status(200).json({
          data: {
            user: JSON.stringify(userAuthData),
            groups: JSON.stringify(groups),
            token,
          },
          success: true,
        });
      }
    } catch (err) {
      next(err);
    }
  }
  static async verifEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const otp = Math.floor(1000 + Math.random() * 9000);
      let response = {
        body: {
          intro:
            "Welcome to Tradycoon! We're very excited to have you on board. Your verification otp is: " +
            otp,
        },
      };
      let mail = MailGenerator.generate(response);
      let message = {
        from: getEnvironmentVariables().email,
        to: req.body.userMail,
        subject: 'Verification',
        html: mail,
      };
      await transporter.sendMail(message);
      return res.status(200).json({
        success: true,
        otp: otp,
      });
    } catch (error) {
      next(error);
    }
  }
  static async purge(req: Request, res: Response, next: NextFunction) {
    //purge all user data
    await UserDetail.deleteMany({});
    const user = await UserDetail.find({});
    res.json({
      user,
    });
  }
}
