import PostModel from "../models/post_model.js";

const PostService = {
  getById: async (id) => {
    return PostModel.findById(id);
  },
  add: async (post) => {
    let result;
    try {
      result = await new PostModel(post).save();
    } catch (error) {
      console.log(error);
    } finally {
      return result;
    }
  },
  getPaginate: async (pageIndex) => {
    let pageCount = 10;
    let posts;
    try {
      posts = await PostModel.find()
        .skip(pageIndex * pageCount)
        .sort({ created: -1 })
        .limit(pageCount);
    } catch (error) {
      console.log("Get Posts Error", error);
    } finally {
      return posts;
    }
  },
  getByTag: async (tagId, pageIndex) => {
    let pageCount = 10;
    let posts;
    try {
      posts = await PostModel.find({ tag: tagId })
        .skip(pageIndex * pageCount)
        .sort({ created: -1 })
        .limit(pageCount);
    } catch (error) {
      console.log("Get posts error", error);
    } finally {
      return posts;
    }
  },
  getByCategory: async (catId, pageIndex) => {
    let postCount = 10;
    let posts = null;
    try {
      posts = await PostModel.find({ category: catId })
        .skip(pageIndex * postCount)
        .sort({ created: -1 })
        .limit(postCount);
    } catch (error) {
      console.log("Get post by category in Error", error);
    } finally {
      return posts;
    }
  },
    getByAuthor: async (authorId, pageIndex) => {
    let postCount = 10;
    let posts = null;
    try {
      posts = await PostModel.find({ author: authorId })
        .skip(pageIndex * postCount)
        .sort({ created: -1 })
        .limit(postCount);
    } catch (error) {
      console.log("Get post by Author in Error", error);
    } finally {
      return posts;
    }
  },
  update: async (id, data) => {
    let result = null;
    try {
      result = await PostModel.findOneAndUpdate(
        { _id: id },
        { $set: data },
        { new: true },
      );
    } catch (error) {
      console.log("Post Update Error", error);
    } finally {
      return result;
    }
  },
  delete: async (id) => {
    return await PostModel.findOneAndDelete({ _id: id });
  },
};

export default PostService;
