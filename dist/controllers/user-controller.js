import { User, Thought } from '../models/index.js';
// get all users
export const getUsers = async (_req, res) => {
    try {
        const dbUserData = await User.find()
            .select('-__v');
        return res.json(dbUserData);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};
// get single user by id
export const getSingleUser = async (req, res) => {
    try {
        const dbUserData = await User.findOne({ _id: req.params.userId })
            .select('-__v')
            .populate('friends')
            .populate('thoughts');
        if (!dbUserData) {
            return res.status(404).json({ message: 'No user with this id!' });
        }
        return res.json(dbUserData);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};
// create user
export const createUser = async (req, res) => {
    try {
        const dbUserData = await User.create(req.body);
        return res.json(dbUserData);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};
// update user by id
export const updateUser = async (req, res) => {
    try {
        const dbUserData = await User.findOneAndUpdate({ _id: req.params.userId }, {
            $set: req.body,
        }, {
            runValidators: true,
            new: true,
        });
        if (!dbUserData) {
            return res.status(404).json({ message: 'No user with this id!' });
        }
        return res.json(dbUserData);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};
// delete user (BONUS: delete user's thoughts as well)
export const deleteUser = async (req, res) => {
    try {
        const dbUserData = await User.findOneAndDelete({ _id: req.params.userId });
        if (!dbUserData) {
            return res.status(404).json({ message: 'No user with this id!' });
        }
        // BONUS: remove a user's thoughts when deleted
        await Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
        return res.json({ message: 'User and associated thoughts deleted!' });
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};
// add friend to friend list
export const addFriend = async (req, res) => {
    try {
        const dbUserData = await User.findOneAndUpdate({ _id: req.params.userId }, { $addToSet: { friends: req.params.friendId } }, { new: true });
        if (!dbUserData) {
            return res.status(404).json({ message: 'No user with this id!' });
        }
        return res.json(dbUserData);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};
// remove friend from friend list
export const removeFriend = async (req, res) => {
    try {
        const dbUserData = await User.findOneAndUpdate({ _id: req.params.userId }, { $pull: { friends: req.params.friendId } }, { new: true });
        if (!dbUserData) {
            return res.status(404).json({ message: 'No user with this id!' });
        }
        return res.json(dbUserData);
    }
    catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};
