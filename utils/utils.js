import { createClient } from "redis";
import bcrypt from "bcryptjs";
import { configDotenv } from "dotenv";
import JWT from "jsonwebtoken";

configDotenv({ path: ".env" });
const client = await createClient({
  url: process.env.REDIS_URL || "redis://127.0.0.1:6379",
  RESP: 2,
})
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect();

const RDB = {
  set: async (key, value) => {
    return client.set(String(key), JSON.stringify(value));
  },

  get: async (key) => {
    const value = await client.get(String(key));
    return value === null ? null : JSON.parse(value);
  },
  del: async (key) => {
    return client.del(String(key));
  },
  keys: async (pattern) => {
    return client.keys(pattern);
  },
};

const Encoder = {
  encode: (password) => bcrypt.hashSync(password, 10),
  compare: (plain, hash) => bcrypt.compareSync(plain, hash),
};

const Msg = (res, msg = "", result = {}) =>
  res.json({ con: true, msg, result });

const MakeRandom = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const Token = {
  makeToken : payload => 
    JWT.sign({id : payload},process.env.SECRET_KEY,{expiresIn : "1h"})
}

export { RDB, Encoder, Msg, MakeRandom , Token };
