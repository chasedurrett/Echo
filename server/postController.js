//includes comments
const moment = require("moment");

module.exports = {
  getAllSubforumPosts: async (req, res) => {
    const db = req.app.get("db");

    const { subforumId } = req.params;

    let posts = await db.post.get_all_posts(subforumId);

    res.status(200).send(posts);
  },

  createSubforumPost: async (req, res) => {
    const db = req.app.get("db");

    const post_time = moment().format("LT");
    // const {post_author_id} = req.session.user
    const { subforumId } = req.params;
    const { post_title, post_content, post_type_id, post_author_id } = req.body;

    let post = await db.post.create_subforum_post(
      post_title,
      post_content,
      post_author_id,
      subforumId,
      post_type_id,
      post_time
    );

    res.status(200).send(post);
  },

  getSingleSubforumPost: async (req, res) => {
    const db = req.app.get("db");

    const { subforumId, postId } = req.params;

    let post = await db.post.get_single_post(subforumId, postId);

    res.status(200).send(post);
  },

  updateSubforumPost: async (req, res) => {
    const db = req.app.get("db");

    const { subforumId, postId } = req.params;
    const { post_title, post_content } = req.body;

    let udpatedPost = await db.post.update_post(
      postId,
      subforumId,
      post_title,
      post_content
    );

    res.status(200).send(udpatedPost);
  },

  deleteSubforumPost: (req, res) => {
    const db = req.app.get("db");

    const { postId } = req.params;

    db.post.delete_post(postId);

    res.sendStatus(200);
  },
  getAllPostsNoUser: async (req, res) => {
    const db = req.app.get("db");

    const allPosts = await db.post.get_all_posts_no_user();
    res.status(200).send(allPosts);
  },
};
