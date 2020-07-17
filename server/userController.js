module.exports = {
  getAllUsers: async (req, res) => {
    const db = req.app.get("db");

    const users = await db.user.all_users();

    res.status(200).send(users);
  },

  getUser: async (req, res) => {
    const db = req.app.get("db");

    const { userId } = req.params;

    const user = await db.user.user(userId);

    res.status(200).send(user);
  },
  updateUser: async (req, res) => {
    const db = req.app.get("db");
    const { userId } = req.params;
    const { user_id } = req.session.user;
    const { user_image, user_banner } = req.body;
    const updatedUser = await db.user.update_user(
      userId,
      user_image,
      user_banner
    );
    if (userId === user_id) {
      return res.status(200).send(updatedUser);
    }
    return res.sendStatus(200);
  },
  addFollower: async (req, res) => {
    const db = req.app.get('db')

    // this is the current user or user_id in our DB
    const {user_id} = req.session.user

    // this is who the current user is following--following_id in our DB
    const {userId} = req.params

    const followUser = await db.user.follow_user(user_id, userId)

    if(!req.session.user) {
      return res.status(500).send(`Couldn't follow user, please log in!`)
    }
    return res.status(200).send(followUser)
  },
  removeFollower: async (req,res) => {
    const db = req.app.get('db');
    const {user_id} = req.session.user;
    const {userId} = req.params;

    const unfollowUser = await db.user.unfollow_user(user_id, userId)
    
    if(!req.session.user){
      return res.status(500).send(`Couldn't unfollow user, please log in!`)
    }
    return res.sendStatus(200).send(unfollowUser)
  },
  getFollowers: async (req, res) => {
    const db = req.app.get('db')
    const {userId} = req.params
    const followers = await db.user.get_followers(userId)

    if(!followers){
      return res.status(500).send(`Couldn't get followers, try again later!`)
    }
    return res.status(200).send(followers)
  },
  getFollowing: async (req, res) => {
    const db = req.app.get('db')
    // const {user_id} = req.session.user
    const {userId} = req.params
    const following = await db.user.get_following(userId)

    if (!following){
      return res.status(500).send(`Couldn't get following, try again later!`)
    }
    return res.status(200).send(following)
  },
  getUserProfileInfo: async (req, res) => {
    const db = req.app.get('db')
    const {userId} = req.params
    console.log('user_id', userId)
    const userInfo = await db.user.get_user_posts_info(userId)

    res.status(200).send(userInfo)
  }
};
