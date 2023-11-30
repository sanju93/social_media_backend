import User from "../models/User.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
async function create(req, res) {
  try {
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    return res.status(201).send("User has created");
  } catch (err) {
    return res.status(500).send(err.errors);
  }
}

async function Login(req, res) {
  try {
    // console.log(req.body)
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      if (user.password === req.body.password) {
        let token = jwt.sign({ data: user }, process.env.secret, {
          expiresIn: "24h",
        });

        return res.status(200).json({
          token,
          user: { email: user.email, name: user.name },
        });
      } else {
        return res.status(401).send({ data: "Password" });
      }
    } else {
      return res.status(401).send({ data: "Email" });
    }
  } catch (err) {
    // console.log(err);
    return res.status(500).send({ data: "Internal server error" });
  }
}

function Auth(req, res) {
  return res.status(200).json({ data: true });
}

async function Strangers(req, res) {
  try {
    let user = await User.findById(req.user._id);
    let All_Users = (await User.find({}, "id name email")).filter(
      (item) => item.id != user.id
    );
    // console.log(user.friendRequestSentBy,user.friendRequestSentTo);
    let filterUser = user.friendRequestSentBy.concat(user.friendRequestSentTo);

    let strangers = All_Users.filter((item) => {
      if (filterUser.indexOf(item._id.toString()) == -1) {
        return item;
      }
    });

    let requestSentBy = [];
    let requestSentTo = [];
    // console.log(strangers, filterUser);

    strangers = strangers.filter(
      (item) => !user.friends.includes(item._id.toString())
    );

    for (let i = 0; i < user.friendRequestSentBy.length; i++) {
      let u = await User.findById(user.friendRequestSentBy[i]);
      requestSentBy.push({ id: u.id, name: u.name, email: u.email });
    }
    for (let i = 0; i < user.friendRequestSentTo.length; i++) {
      let u = await User.findById(user.friendRequestSentTo[i]);
      requestSentTo.push({
        id: u.id,
        name: u.name,
        email: u.email,
        requestSent: true,
      });
    }

    return res.status(200).json({ strangers, requestSentBy, requestSentTo });
  } catch (err) {
    console.log(err);
    return res.status(500).send("Internal Server Error");
  }
}

async function AddFriends(req, res) {
  try {
    let user = await User.findById(req.user.id);
    user.friendRequestSentTo.push(req.params.id);
    let requestUser = await User.findById(req.params.id);
    requestUser.friendRequestSentBy.push(req.user.id);
    user.save();
    requestUser.save();
    return res.status(200).send("Friend Request sent");
  } catch (err) {
    return res.status(500).send("Internal server error");
  }
}

async function Friend_Request_Confirm(req, res) {
  try {
    let confirm_user = await User.findById(req.user.id);
    let index = confirm_user.friendRequestSentBy.indexOf(req.params.id);
    confirm_user.friendRequestSentBy.splice(index, 1);
    let request_user = await User.findById(req.params.id);
    index = request_user.friendRequestSentTo.indexOf(req.user.id);
    request_user.friendRequestSentTo.splice(index, 1);
    confirm_user.friends.push(req.params.id);
    request_user.friends.push(req.user.id);

    confirm_user.save();
    request_user.save();

    return res.status(200).send("Friend Request Accepted");
  } catch (err) {
    return res.status(500).send("Internal server error");
  }
}

async function fetchFriends(req, res) {
  try {
    let result = [];
    let user = await User.findById(req.user._id);
    for (let i = 0; i < user.friends.length; i++) {
      let friend = await User.findById(user.friends[i]);
      result.push({ name: friend.name });
    }

    return res.status(200).send(result);
  } catch (err) {
    return res.status(500).send("Internal server Error");
  }
}

async function fetchLoginData(req, res) {
  try {
    let user = await User.findById(req.user._id);
    let result = {};
    result.name = user.name;
    result.friends = user.friends.length;
    result.post = user.posts.length;
    return res.status(200).send(result);
  } catch (err) {
    return res.status(500).send("Internal server Error");
  }
}

export {
  create,
  Login,
  Auth,
  Strangers,
  AddFriends,
  Friend_Request_Confirm,
  fetchFriends,
  fetchLoginData,
};
