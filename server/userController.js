module.exports = {
  getAllUsers: async (req, res) => {
    const db = req.app.get("db");

    const users = await db.all_users();

    res.status(200).send(users);
  },

  getUser: async (req, res) => {
    const db = req.app.get("db");

    const { userId } = req.params;

    const user = await db.user(userId);

    res.status(200).send(user);
  },
  updateUser: async (req, res) => {
    const db = req.app.get("db");
    const { userId } = req.params;
    const { user_id } = req.session.user;
    const { username, user_email, user_image, user_banner } = req.body;
    const updatedUser = await db.user.update_user(
      userId,
      username,
      user_email,
      user_image,
      user_banner
    );
    if (userId === user_id) {
      return res.status(200).send(updatedUser);
    }
    return res.sendStatus(200);
  },
};
