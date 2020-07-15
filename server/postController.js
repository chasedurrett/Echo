//includes comments
const moment = require("moment");

module.exports = {
  getAllSubforumPosts: async (req, res) => {
    const db = req.app.get("db");

    const { subforumId } = req.params;

    if(!req.session.user){
      let posts = await db.post.get_all_subforum_posts_no_user(subforumId);
      res.status(200).send(posts)
    } else {
      const { user_id } = req.session.user
      let posts = await db.post.get_all_subforum_posts_with_user(subforumId, user_id);
      res.status(200).send(posts);
    }

  },

  createSubforumPost: async (req, res) => {
    const db = req.app.get("db");

    const post_time = moment().format("LLL");
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
  getAllPostsWithUser: async (req, res) => {
    const db = req.app.get("db");

    // const {user_id} = req.session.user

    let posts = await db.post.get_all_posts_with_user(1);
    res.status(200).send(posts);
  },

  upvotePost: async (req, res) => {
    const db = req.app.get("db");
    const { user_id } = req.session.user;
    const { postId } = req.params;

    const hasVoted = await db.post.check_if_voted(user_id, postId);

    if (hasVoted.length === 0) {
      // if user hasn't upvoted previously
      await db.post.post_vote_incrementer(postId);
      await db.post.upvote_post(user_id, postId);
    } else {
      // if user previously downvoted
      await db.post.post_vote_incrementer_2(postId);
      await db.post.update_post_upvote(user_id, postId);
    }

    if (!req.session.user) {
      res.status(500).send(`Please log in to vote!`);
    }

    if (req.session.user) {
      res.sendStatus(200);
    }
  },
  downvotePost: async (req, res) => {
    const db = req.app.get("db");
    const { user_id } = req.session.user;
    const { postId } = req.params;

    const hasVoted = await db.post.check_if_voted(user_id, postId);

    if (hasVoted.length === 0) {
      // if user hasn't previously downvoted
      await db.post.downvote_post(postId);
      await db.post.downvote_post_instance(user_id, postId);
    } else {
      // if user previously upvoted
      await db.post.post_vote_decrementer_2(postId);
      await db.post.update_post_downvote(user_id, postId);
    }

    if (!req.session.user) {
      res.status(500).send(`Please log in to vote!`);
    }

    if (req.session.user) {
      res.sendStatus(200);
    }
  },
  removeVote: async (req, res) => {
    const db = req.app.get("db");
    const { user_id } = req.session.user;
    const { postId } = req.params;

    const checkVote = await db.post.check_how_user_voted(user_id, postId);

    if (checkVote.length === 0) {
      // if user had downvoted
      await db.post.post_vote_incrementer(postId);
      await db.post.remove_vote(user_id, postId);
    } else {
      // if user had upvoted
      await db.post.downvote_post(postId);
      await db.post.remove_vote(user_id, postId);
    }

    res.sendStatus(200);
  },
  upvoteComment: async (req, res) => {
    const db = req.app.get("db");
    const { commentId } = req.params;
    const { user_id } = req.session.user;

    const hasVotedOnComment = await db.post.comment.check_if_voted_comment(
      user_id,
      commentId
    );

    if (hasVotedOnComment.length === 0) {
      // if user hasn't upvoted previously
      await db.post.comment.upvote_comment(commentId);
      await db.post.comment.upvote_comment_instance(user_id, commentId);
    } else {
      // if user has downvoted and is pressing upvote
      await db.post.comment.upvote_comment_2(commentId);
      await db.post.comment.update_comment_upvote(user_id, commentId);
    }

    if (!req.session.user) {
      res.status(500).send(`Please log in to vote!`);
    }
    if (req.session.user) {
      res.sendStatus(200);
    }
  },

  downvoteComment: async (req, res) => {
    const db = req.app.get("db");
    const { commentId } = req.params;
    const { user_id } = req.session.user;

    const hasVotedOnComment = await db.post.comment.check_if_voted_comment(
      user_id,
      commentId
    );

    if (hasVotedOnComment.length === 0) {
      // if user hasn't previously downvoted
      await db.post.comment.downvote_comment(commentId);
      await db.post.comment.downvote_comment_instance(user_id, commentId);
    } else {
      // if user has previously upvoted
      await db.post.comment.downvote_comment_2(commentId);
      await db.post.comment.update_comment_downvote(user_id, commentId);
    }

    if (!req.session.user) {
      res.status(500).send(`Please log in to vote!`);
    }
    if (req.session.user) {
      res.sendStatus(200);
    }
  },

  removeCommentVote: async (req, res) => {
    const db = req.app.get("db");
    const { user_id } = req.session.user;
    const { commentId } = req.params;

    const checkVote = await db.post.comment.check_how_user_voted_comment(
      user_id,
      commentId
    );

    if (checkVote.length === 0) {
      // if the user had downvoted
      await db.post.comment.upvote_comment(commentId);
      await db.post.comment.remove_comment_vote(user_id, commentId);
    } else {
      // if the user had upvoted
      await db.post.comment.downvote_comment(commentId);
      await db.post.comment.remove_comment_vote(user_id, commentId);
    }

    res.sendStatus(200);
  },

  getComments: async (req, res) => {
    const db = req.app.get("db");

    const { postId } = req.params;

    let comments = await db.post.comment.get_comments(postId);

    res.status(200).send(comments);
  },

  createComment: async (req, res) => {
    const db = req.app.get("db");

    const { postId } = req.params;
    const { comment, comment_author_id } = req.body;
    // const {comment_author_id} = req.session.user.user_id
    let comment_time = moment().format("LLL");

    let newComment = await db.post.comment.create_comment(
      comment_author_id,
      postId,
      comment,
      comment_time
    );

    res.status(200).send(newComment);
  },

  deleteComment: async (req, res) => {
    const db = req.app.get("db");

    const { postId, commentId } = req.params;

    db.post.comment.delete_comment(postId, commentId);

    res.sendStatus(200);
  },
};
