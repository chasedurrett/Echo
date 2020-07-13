const moment = require("moment");

module.exports = {
  createSubforum: async (req, res) => {
    const db = req.app.get("db"),
      { id } = req.session.user,
      {
        subforum_name,
        subforum_img,
        subforum_banner,
        rules_section,
        description,
      } = req.body,
      cake_day = moment().format('LL');
      subforum = await db.create_subforum(
        subforum_name,
        id,
        subforum_img,
        subforum_banner,
        rules_section,
        description,
        cake_day
      );
  },
  getSubforums: async (req, res) => {
    const db = req.app.get("db");
    const subforums = await db.get_subforums()
    if (!subforums) {
      return res
        .status(500)
        .send(`Couldn't get subforums, we're working on that!`);
    }
    return res.status(200).send(subforums);
  },
};
