const { user } = require("../../models");
const { accessToken } = require("./accesstoken");
const axios = require("axios");
const models = require("../../models");
const dotenv = require("dotenv");

module.exports = {
  post: async (req, res) => {
    const { login_method, email, googleId } = req.body.profileObj;
    const googleCreate = await models.user.findOrCreate({
      where: {
        email: email,
        login_method: "2",
      },
      default: {
        nickname: `google ${googleId}`,
        password: null,
      },
    });
    if (login_method === "2") {
      return res.status(200).json({
        data: {
          accessToken: await accessToken(googleCreate[0].email),
          id: googleCreate[0].id,
          email: googleCreate[0].email,
          nickname: googleCreate[0].nickname,
          login_method: googleCreate[0].login_method,
        },
      });
    } else {
      return res.status(401).json({ message: "login err" });
    }
  },
};
