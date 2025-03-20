const Post = require('../models/blogModel');

exports.getAllPosts = async () => {
    return await Post.findAll();
};

exports.getPostById = async (id) => {
    return await Post.findByPk(id);
};

exports.createPost = async (title, content) => {
    return await Post.create({title, content});
};

exports.updatePost = async (id, title, content) => {
    const post = await Post.findByPk(id);
    if (post) {
        post.title = title;
        post.content = content;
        await post.save();
        return post;
    }
    return null;
};

exports.deletePost = async (id) => {
    const post = await Post.findByPk(id);
    if (post) {
        await post.destroy();
        return post;
    }
    return null;
};
