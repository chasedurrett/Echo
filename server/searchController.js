module.exports = {
  getPosts: async (req, res) => {
    const db = req.app.get("db");
    let val = req.query.input;
    console.log(val);

    let data;
    if (!req.session.user) {
      data = await db.search.get_search_posts_no_user(val);
    } else {
      const { user_id } = req.session.user;
      data = await db.search.get_search_posts(val, user_id);
    }

    if (data.length === 0) {
      res.status(500).send(`Couldn't get posts, we're fixing that!`);
    }
    res.status(200).send(data);
  },

  getSubforums: async (req, res) => {
    const db = req.app.get("db");
    let val = req.query.input;

    if (!req.session.user) {
      const data = await db.search.get_search_subforums_no_user(val);

      if (data.length === 0) {
        res.status(500).send(`Couldn't get any Chambers, we're fixing that!`);
      }
      res.status(200).send(data);
    } else {
      let { user_id } = req.session.user;
      console.log(user_id);
      const data = await db.search.get_search_subforums(val, user_id);
      console.log(data);

      if (data.length === 0) {
        res.status(500).send(`Couldn't get any Chambers, we're fixing that!`);
      }
      res.status(200).send(data);
    }
  },

  getUsers: async (req, res) => {
    const db = req.app.get("db");
    let val = req.query.input;

    const data = await db.search.get_search_users(val);

    if (data.length === 0) {
      res.status(500).send(`Couldn't get any users, we're fixing that!`);
    }
    res.status(200).send(data);
  },
};
