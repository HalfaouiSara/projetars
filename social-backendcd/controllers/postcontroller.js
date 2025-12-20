const Post = require('../Models/posts');
const User = require('../Models/users');

exports.createPost = async (req, res) => { res.send("createPost ok"); };
exports.getFeed = async (req, res) => { res.send("getFeed ok"); };
exports.likePost = async (req, res) => { res.send("likePost ok"); };

// Recommandation posts
exports.recommendPosts = async (req, res) => {
  const user = await User.findById(req.user.id);
  const posts = await Post.find().populate('author', 'username interests');

  const recommended = posts.map(post => {
    const commonInterests = post.author.interests.filter(i => user.interests.includes(i)).length;
    const score = commonInterests + (post.likes.includes(user._id) ? 1 : 0);
    return { post, score };
  }).sort((a,b) => b.score - a.score).slice(0,10);

  res.json(recommended);
};
