import UserService from "../services/user_service.js";
import { Encoder, Msg, Token } from "../utils/facade.js";

const UserController = {
  register: async (req, res, next) => {
    try {
      const name = req.body.name.toLowerCase();
      const { phone, displayName } = req.body;

      const namedUser = await UserService.getByName(name);
      if (namedUser) {
        return next(new Error("User already exists with that name"));
      }

      const phonedUser = await UserService.getByPhone(phone);
      if (phonedUser) {
        return next(new Error("User already exists with that phone number"));
      }

      const password = Encoder.encode(req.body.password);
      const profile = `${process.env.IMAGE_PATH || ""}/user1.png`;
      const user = await UserService.add(
        name,
        displayName,
        phone,
        password,
        profile,
      );
      const result = user.toObject();
      delete result.password;

      return Msg(res, "Register Success", result);
    } catch (error) {
      return next(error);
    }
  },

  login: async (req, res, next) => {
    try {
      const name = req.body.name.toLowerCase();
      const password = req.body.password;

      const namedUser = await UserService.getByName(name);
      if (!namedUser) {
        return next(new Error("Credential Error"));
      }

      if (!Encoder.compare(password, namedUser.password)) {
        return next(new Error("Credential Error"));
      }
      await UserService.setCacheUser(namedUser.id.toString());

      let token = Token.makeToken(namedUser.id.toString());
      return Msg(res, "Login Success", token);
    } catch (error) {
      return next(error);
    }
  },

  getme: async (req, res, next) => {
    let userid = req.userId;
    let user = req.user;
    Msg(res, "Get me", { userid, user });
  },

  getUsers: async(req, res, next) => {
    const userIndex = req.params.index;
    let users = await UserService.getUsers(userIndex);
    Msg(res,`All User with Paginated index ${userIndex}`,users);
  },
};

export default UserController;
