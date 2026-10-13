import model from "../models/user_model.js";
import { RDB } from "../utils/utils.js";

const UserService = {
  getById: async (id) => {
    let user = await model.findById(id).select("-password");
    return user;
  },
  getByName: async (name) => {
    let user = await model.findOne({ name });
    return user;
  },

  getByPhone: async (phone) => {
    let user = await model.findOne({ phone });
    return user;
  },

  add: async (name, displayName, phone, password, profile) => {
    let newUser = await new model({
      name,
      displayName,
      phone,
      password,
      profile,
    }).save();
    return newUser;
  },

  setCacheUser: async (key) => {
    let user = await UserService.getById(key);
    if (!user) return null;
    await RDB.set(key, user);
    return user;
  },

  getCacheUser: async (key) => {
    let user = await RDB.get(key);
    return user;
  },

  getUsers: async (userIndex) => {
    let paginateLimit = 3;
    let users = await model
      .find({
        $or: [{ role: 1, role: 2 }],
      })
      .skip(userIndex * paginateLimit)
      .sort({ created: -1 })
      .limit(userIndex);
    return users;
  },

  getSingleUser: async (userid) => {
    let user = await model.findById(userid);
    return user;
  },

  changeRole: async (userid, role) => {
    await model.findByIdAndUpdate(userid, { role });
  },
};
export default UserService;
