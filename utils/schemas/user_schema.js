import Joi from "joi";

const userSchema = {
  register: Joi.object({
    name: Joi.string().min(4).max(30).required(),
    displayName: Joi.string().required(),
    phone: Joi.string().min(7).max(11).required(),
    password: Joi.string()
      .pattern(new RegExp(/^[a-zA-Z0-9]{8,30}$/))
      .required(),
  }),

  login: Joi.object({
    name: Joi.string().min(4).max(30).required(),
    password: Joi.string()
      .pattern(new RegExp(/^[a-zA-Z0-9]{8,30}$/))
      .required(),
  }),
};

export { userSchema };
