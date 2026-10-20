import PostService from "../services/post_service.js";
import { deleteImageByLink } from "../utils/gallery.js";
import { Msg } from "../utils/utils.js";

const PostController = {
  add: async (req, res, next) => {
    req.body["author"] = req.userId;
    let newPost = req.body;
    let result = await PostService.add(newPost);
    if (!result) {
      next(new Error("Post Create Error"));
    }
    Msg(res, "Post Created Successful", result);
  },
  get: async (req, res, next) => {
    let pageIndex = req.params.index;
    let posts = await PostService.getPaginate(pageIndex);
    if (!posts) {
      next(new Error("No posts found!"));
    }
    Msg(res, "Paginated posts", posts);
  },
  getByTag: async (req, res, next) => {
    let pageIndex = req.params.index;
    let tagId = req.params.id;
    let result = await PostService.getByTag(tagId, pageIndex);
    Msg(res, `Paginated posts with tag-id : ${tagId}`, result);
  },
  getByCat: async (req, res, next) => {
    let catId = req.params.id;
    let pageIndex = req.params.index;
    let result = await PostService.getByCategory(catId, pageIndex);
    Msg(res, "Paginated posts with category id", result);
  },
    getByAuthor: async (req, res, next) => {
    let authorId = req.params.id;
    let pageIndex = req.params.index;
    let result = await PostService.getByAuthor(authorId, pageIndex);
    Msg(res, "Paginated posts with author id", result);
  },
  update: async (req, res, next) => {
    let id = req.params.id;
    let dbPost = PostService.getById(id);
    let postData = req.body;
    if (dbPost) {
      if (Object.keys(postData).includes("files")) {
        dbPost.images.forEach((image) => deleteImageByLink(image));
      }
      let result = await PostService.update(id, postData);
      Msg(res, "Post Updated", result);
    } else {
      next(new Error("No post with that id"));
    }
  },
  delete: async (req, res, next) => {
    let id = req.params.id;
    let dbPost = await PostService.getById(id);
    if (dbPost) {
      if (dbPost.images.length > 0) {
        dbPost.images.forEach((image) => deleteImageByLink(image));
      }
      await PostService.delete(dbPost._id);
      Msg(res, "Post Deleted !");
    } else {
      next(new Error("No Post with that id"));
    }
  },
};

export default PostController;
