import {Request, Response, NextFunction, query} from 'express';
import AnalystPostBuySell, {
  AnalystPostBuySellDocument,
} from '../models/Analyst/AnalystPostBuySell';
// import Comment from '../models/mongoDB/Comment';
// import Posts from '../models/mongoDB/AnalystPostBuySell';

enum Errors {
  STATUS_401 = 'invalid data provided',
  STATUS_501 = 'server error,please try again',
}

export class AnalystPostController {
  static async savePost(req: Request, res: Response, next: NextFunction) {
    try {
      const postDoc = {
        ...req.body.post,
        subscibeClient: await JSON.parse(req.body.post.subscibeClient),
      };
      const newPost = await new AnalystPostBuySell(postDoc);
      await newPost.save();
      res.status(200).json({
        data: {_id: newPost._id},
        success: true,
      });
    } catch (error) {
      next(error);
    }
  }

  static async getPostByQuery(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body);
      type body = {
        user: {
          isUser?: boolean;
          id?: string;
          group: Array<string>;
        };
        time: {
          isAll?: boolean;
          isIntraday?: boolean;
          isInterday?: boolean;
        };
        options: {
          skip: number;
          limit: number;
        };
      };
      var queryTime = {};
      // Time-period-wise filter :
      if (req.body.time.isAll) {
      } else if (!(req.body.isIntraday && req.body.isInterday)) {
        if (req.body.time.isIntraday) {
          queryTime = {...queryTime, isIntraday: true};
        } else if (req.body.time.isInterday) {
          queryTime = {...queryTime, isIntraday: false};
        } else {
        }
      }
      var queryUser = {};
      // User-group wise filter :
      if (req.body.user.isUser) {
        queryUser = {...queryUser, analyst: req.body.user.id};
      } else if (req.body.user.groups) {
        queryUser = {
          ...queryUser,
          'subscibeClient.groupId': {$in: req.body.user.groups},
        };
      } else {
      }

      console.log(queryUser);

      const posts: any = req.body.user.isUser
        ? await AnalystPostBuySell.find({
            ...queryTime,
            ...queryUser,
          })
            .skip(req.body.options.skip)
            .limit(req.body.options.limit)
            .sort({
              updated_at: -1,
            })
        : await AnalystPostBuySell.find({
            $or: [
              {...queryTime, ...queryUser},
              {...queryTime, isFree: true},
            ],
          })
            .skip(req.body.options.skip)
            .limit(req.body.options.limit)
            .sort({
              updated_at: -1,
            });

      console.log(posts);
      return res.json({
        success: true,
        data: posts,
        message: 'post data gained',
      });
    } catch (error) {
      next(error);
    }
  }
  static async deletePost(req: Request, res: Response, next: NextFunction) {
    try {
      await AnalystPostBuySell.deleteMany({}, (err) => {
        if (!err) {
          res.json({
            status: 'ok',

            success: 'Deletion was successful',
          });
        } else {
          throw new Error('request failed');
        }
      });
    } catch (err) {
      next(err);
    }
  }

  static async likePost(req: Request, res: Response, next: NextFunction) {
    try {
      const post = await AnalystPostBuySell.findById(req.body.post.id);
      if (!post) {
        throw new Error('Post not found');
      } else {
      }
      if (post.like.indexOf(req.body.user.id) != -1) {
        console.log('post is liked');
        post.like.splice(post.like.indexOf(req.body.user.id));
      } else {
        console.log('post is not liked');
        post.like.push(req.body.user.id);
      }
      await post.save();
      return res.json({
        success: true,
        data: {
          message: 'Like status changed successfully',
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
