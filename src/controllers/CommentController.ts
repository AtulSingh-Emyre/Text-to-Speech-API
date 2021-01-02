import Comment from '../models/mongoDB/Comment';
import {Request, Response, NextFunction, query} from 'express';

export class CommentController {
  static async addComment(req: any, res: Response, next: NextFunction) {
    try {
      const newComment = new Comment({
        user: req.body.userId,
        content: req.body.comment.content,
        postId: req.body.comment.postId,
      });
      await newComment.save((err, docs) => {
        if (err) throw new Error('comment failed to save');
        res.json({
          status: 'ok',
          data: {newComment, user: req.body.userId},
          success: 'Comment Successfully added',
        });
      });
    } catch (e) {
      next(e);
    }
  }

  static async editComment(req: Request, res: Response, next: NextFunction) {
    const content = req.body.content;
    const commentId = req.params.id;
    try {
      const updatedComment = await Comment.findOneAndUpdate(
        {_id: commentId},
        {
          content: content,
          updated_at: new Date(),
        },
        {new: true},
      );
      if (updatedComment) {
        res.json({
          status: 'ok',
          data: {...updatedComment},
          success: 'Comment successfully added',
        });
      } else {
        throw new Error('Comment Does Not Exist');
      }
    } catch (e) {
      next(e);
    }
  }

  static async deleteComment(req: any, res: Response, next: NextFunction) {
    try {
      await Comment.deleteMany({_id: req.params.commentId}, (err) => {
        if (!err) {
          res.json({
            status: 'ok',
            data: {_id: req.params.commentId},
            success: 'Deletion was successful',
          });
        } else {
          throw new Error('request failed');
        }
      });
    } catch (e) {
      next(e);
    }
  }
}
