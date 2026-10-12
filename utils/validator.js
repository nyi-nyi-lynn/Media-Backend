import JWT, { decode } from "jsonwebtoken";
import UserService from "../services/user_service.js";

const validateToken = (req, res, next) => {
  if (!req.headers.authorization) {
    next(new Error("Authorization Error"));
  } else {
    let token = req.headers.authorization.split(" ")[1];
    JWT.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        if (err.message == "jwt expired") {
          return next(new Error("Session Expired"));
        } else {
          return new new Error("Authorization Error")();
        }
      } else {
        let userid = decoded.id;
        let user = await UserService.getCacheUser(decoded.id.toString());
        req.userId = userid;
        req.user = user;
        return next();
      }
    });
  }
};

const validateRole = (Role) => {
  return async (req, res, next) => {
    if (req.user.role === Role) {
      return next();
    } else {
      return next(new Error("You are not permitted to use this route"));
    }
  };
};

const validateStaff = (req, res, next) => {
  if (req.user.role <= 1) {
    return next();
  } else {
    return next(new Error("You are not permitted to this route"));
  }
};

const validateBody = (schema) => {
  return (req, res, next) => {
    const result = schema.validate(req.body);
    if (result.error) {
      return next(new Error(result.error.details[0].message));
    }
    return next();
  };
};

export { validateToken, validateRole, validateStaff, validateBody };
