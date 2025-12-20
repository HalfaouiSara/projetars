const User = require('../Models/users');

// Ajouter un ami
exports.addFriend = async (req, res) => {
  const { userId } = req.body;
  const user = await User.findById(req.user.id);
  if (!user.friends.includes(userId)) user.friends.push(userId);
  await user.save();
  res.json(user);
};

// Recommandation amis
exports.recommendFriends = async (req, res) => {
  const user = await User.findById(req.user.id).populate('friends');
  const allUsers = await User.find({ _id: { $ne: user._id } });
  
  const recommendations = allUsers.map(u => {
    const commonFriends = u.friends.filter(f => user.friends.map(f=>f._id.toString()).includes(f.toString())).length;
    const commonInterests = u.interests.filter(i => user.interests.includes(i)).length;
    const score = commonFriends * 0.6 + commonInterests * 0.4;
    return { user: u, score };
  }).sort((a,b) => b.score - a.score).slice(0,5);

  res.json(recommendations);
};
