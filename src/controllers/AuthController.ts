import { Request, Response, NextFunction } from 'express';
import { sign } from 'jsonwebtoken';
import { getEnvironmentVariables } from '../environments/env';
import * as request from 'request';
import * as jwt from 'jsonwebtoken';
import User from '../models/User/UserDetail';

enum errorMessages {
  STATUS_401 = 'invalid data provided, please try again',
  STATUS_501 = 'server error, please try again'
}

export class AuthController {
  static async otp(req: Request, res: Response, next: NextFunction) {
    var otp = Math.floor(1000 + Math.random() * 9000);
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
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        form: {}
      };
      await request(options, function (error, response, body) {
        console.log(JSON.parse(body));
        if (JSON.parse(body).Status == 'Success') {
          return res.status(501).json({
            message: errorMessages.STATUS_501
          });
        }
        if (JSON.parse(body).Status !== 'Success')
          return res.status(200).json({
            data: {
              otp
            }
          });
        return res.status(401).json({
          message: errorMessages.STATUS_401
        });
      });
    } catch (err) {
      next(err);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      User.findOne({ phone: req.body.user.phone })
        .lean()
        .exec(async (err, user) => {
          if (user) {
            var token = await jwt.sign(user, 'asdf');
            return res.status(200).json({
              data: { user, token, exists: true }
            });
          }
          if (err) {
            return res.status(401).json({
              message: errorMessages.STATUS_401
            });
          }
          if (!user) {
            const newUser = new User(req.body.user);
            await newUser.save(async (err: Error) => {
              if (err)
                return res.status(401).json({
                  message: errorMessages.STATUS_401
                });
              else {
                await sign(req.body.user, 'asdf', (err: any, token: any) => {
                  if (err)
                    return res.status(401).json({
                      message: errorMessages.STATUS_401
                    });
                  return res.status(200).json({
                    data: {
                      user: newUser,
                      token,
                      exists: false
                    }
                  });
                });
              }
            });
          }
        });
    } catch (err) {
      next(err);
    }
  }
}
