import express from "express";
import passport from "passport";
import {
  create,
  Login,
  Auth,
  Strangers,
  AddFriends,
  Friend_Request_Confirm,
  fetchFriends,
  fetchLoginData,
} from "../controller/users.controller.js";

let users = express.Router();

users.post("/create", create);
users.post("/login", Login);
users.get("/auth", passport.authenticate("jwt", { session: false }), Auth);

users.get(
  "/AddFriends",
  passport.authenticate("jwt", { session: false }),
  Strangers
);

users.put(
  "/friendRequest/:id",
  passport.authenticate("jwt", { session: false }),
  AddFriends
);
users.put(
  "/friendRequestConfirm/:id",
  passport.authenticate("jwt", { session: false }),
  Friend_Request_Confirm
);

users.get(
  "/friends",
  passport.authenticate("jwt", { session: false }),
  fetchFriends
);

users.get(
  "/loginData",
  passport.authenticate("jwt", { session: false }),
  fetchLoginData
);
export { users };
