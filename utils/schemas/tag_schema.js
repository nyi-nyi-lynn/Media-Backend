import Joi from "joi";

const tag_schema = {
    add : Joi.object({
        name : Joi.string().required()
    }),

    patch : Joi.object({
        name : Joi.string().required(),
    })
}

export default tag_schema;