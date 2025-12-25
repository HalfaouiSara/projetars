const Post = require('../Models/posts');
const User = require('../Models/users');

// 1. Créer un post
exports.createPost = async (req, res) => {
  try {
    const { content, image, tags } = req.body;
    const newPost = new Post({
      author: req.user.id,
      content,
      image,
      tags
    });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 2. Fil d'actualité
exports.getFeed = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const feed = await Post.find({
      author: { $in: [...user.friends, req.user.id] }
    })
      .populate('author', 'username profilePicture')
      .sort({ createdAt: -1 });
    res.json(feed);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 3. Likes
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (post.likes.includes(req.user.id)) {
      post.likes = post.likes.filter(id => id.toString() !== req.user.id);
    } else {
      post.likes.push(req.user.id);
    }
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 4. Recommandation
exports.recommendPosts = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const posts = await Post.find({ author: { $ne: req.user.id } })
      .populate('author', 'username interests');

    const recommended = posts
      .map(post => {
        const commonTags = post.tags.filter(tag =>
          user.interests.map(i => i.toLowerCase()).includes(tag.toLowerCase())
        ).length;
        const popularity = post.likes.length;
        const score = (commonTags * 2) + (popularity * 0.5);

        return { post, score };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);

    res.json(recommended.map(item => item.post));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 5. Suppression
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ message: 'Post non trouvé' });
    }

    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Action non autorisée' });
    }

    await post.deleteOne();
    res.json({ message: 'Post supprimé' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Ajouter un commentaire
exports.addComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);

    if (!post) {
      return res.status(404).json({ message: 'Post non trouvé' });
    }

    post.comments.push({
      user: req.user.id,
      text: req.body.text
    });

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
