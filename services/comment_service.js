import CommentModel from "../models/comment_model.js";

const CommentService = {
  getByPostId: async (id, role) => {
    let comments = null;
    try {
      switch (role) {
        case 0:
          comments = await CommentModel.find({ postId: id });
          break;
        default:
          comments = await CommentModel.find({ postId: id, status: "DONE" });
      }
    } catch (error) {
      console.log("Get All commnets by post id in Error", error);
    } finally {
      return comments;
    }
  },

  getById : async(id)=> await CommentModel.findById(id) ,
  add: async (obj) => {
    let newComment = await new CommentModel(obj).save();
    return newComment;
  },
  modify: async (id, data) => {
    let result = await CommentModel.findByIdAndUpdate(id, data, { new: true });
    return result;
  },
  drop: async (id) => {
    return await CommentModel.findByIdAndDelete(id);
  },
};

export default CommentService;
