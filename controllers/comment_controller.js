import CommentService from "../services/comment_service.js";
import { Msg } from "../utils/facade.js";

const CommentController = {
  all: async (req, res, next) => {
    let postId = req.params.postId;
    let role = req.user.role;
    let comments = await CommentService.getByPostId(postId, role);
    if (!comments) {
      next(new Error("No comments in that post"));
    }
    Msg(res, "All comments By Post", comments);
  },
  add: async (req, res, next) => {
    let obj = {
      postId: req.params.postId,
      user: req.userId,
      content: req.body.content,
      image: req.body.image,
    };
    let result = await CommentService.add(obj);
    Msg(res, "Comment Added", result);
  },
  modify: async (req, res, next) => {
    let id = req.params.commentId;
    let data = req.body;
    let result = await CommentService.modify(id, data);
    Msg(res, "Comment Updated", result);
  },
  drop: async (req, res, next) => {
    let id = req.params.commentId;
    let dbComment = await CommentService.getById(id);
    if (!dbComment) {
      next(new Error("No comment with that id"));
    }
    await CommentService.drop(id);
    Msg(res, "Comment Deleted !", {});
  },
};

export default CommentController;
