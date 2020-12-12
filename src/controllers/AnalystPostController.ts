import { Request, Response, NextFunction, query } from 'express';
import AnalystPostBuySell from '../models/Analyst/AnalystPostBuySell';
// import Comment from '../models/mongoDB/Comment';
// import Posts from '../models/mongoDB/AnalystPostBuySell';

enum Errors {
  STATUS_401 = 'invalid data provided',
  STATUS_501 = 'server error,please try again'
}

export class AnalystPostController {
  static async savePost(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req.body);
      const newPost = await new AnalystPostBuySell(req.body.post);
      await newPost.save((err: Error) => {
        if (err) {
          return res.status(401).json({
            message: Errors.STATUS_401
          });
        }
        res.status(200).json({
          data: { _id: newPost._id }
        });
      });
    } catch (error) {
      next(error);
    }
  }
  // static async getPost(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     await Posts.find(req.body.query).exec(async (err, docs) => {
  //       if (!docs || err) throw new Error('data failed to load');
  //       res.json({
  //         status: 'ok',
  //         data: docs,
  //         message: 'post data gained'
  //       });
  //     });
  //   } catch (err) {
  //     next(err);
  //   }
  // }
  // static async getOnePost(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     Posts.find({ _id: req.params.postId }, (err, post) => {
  //       if (err || !post) throw new Error('Post was not found');
  //       Comment.find({ postId: req.params.postId })
  //         .populate('user')
  //         .exec((err, comments) => {
  //           if (err) throw new Error('error while retrieving comments');
  //           res.json({
  //             status: 'ok',
  //             data: { post, comments },
  //             message: 'post data with comments gained'
  //           });
  //         });
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // }
  // static async addPost(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     console.log(req.body);
  //     const newPost = await new Posts(req.body);
  //     await newPost.save((err, docs) => {
  //       if (err) throw new Error(err);
  //       console.log('save sucessfull');
  //       res.json({
  //         status: 'ok',
  //         data: { _id: newPost._id },
  //         success: 'Post added successfully'
  //       });
  //     });
  //   } catch (err) {
  //     next(err);
  //   }
  // }
  // static async updatePost(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     await Posts.findOneAndUpdate(
  //       { _id: req.params.postId },
  //       { ...req.body.post, updated_at: new Date() },
  //       (err, docs) => {
  //         if (!err && docs) {
  //           res.json({
  //             status: 'ok',
  //             data: { _id: req.params.postId },
  //             success: 'Post update successful'
  //           });
  //         } else {
  //           throw new Error('request failed');
  //         }
  //       }
  //     );
  //   } catch (err) {
  //     next(err);
  //   }
  // }
  // static async deletePost(req: Request, res: Response, next: NextFunction) {
  //   try {
  //     console.log(req.params.postId);
  //     await Posts.deleteMany({ _id: req.params.postId }, (err) => {
  //       if (!err) {
  //         res.json({
  //           status: 'ok',
  //           data: { _id: req.params.postId },
  //           success: 'Deletion was successful'
  //         });
  //       } else {
  //         throw new Error('request failed');
  //       }
  //     });
  //   } catch (err) {
  //     next(err);
  //   }
  // }
}
