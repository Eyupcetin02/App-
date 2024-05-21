const postSchema = require("../models/post.js");

const getPosts = async (req, res) => {
  try {
    const getpost = await postSchema.find();

    res.status(200).json(getpost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createPost = async (req, res) => {
  try {
    const newPost = await postSchema.create(req.body);

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const {comments} = req.body
    console.log(comments);

    const update = await postSchema.findByIdAndUpdate(id , {comments : comments})

    console.log(update);

   
  } catch (error) {
    res.status(499).json({ message: error.message });
  }
};




const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await postSchema.findByIdAndDelete(id);

    res.status(201).json({ message: "delete" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getPosts, createPost, updatePost, deletePost };
