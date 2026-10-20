import Joi from "joi";

const PostSchema = {
  add: Joi.object({
    title: Joi.string().min(5).required(),
    content: Joi.string().required(),
    tag: Joi.string().required(),
    category: Joi.string().required(),
  }),
};

export default PostSchema;
