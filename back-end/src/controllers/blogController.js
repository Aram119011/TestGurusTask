const blogService = require('../services/blogService');

exports.getAllPosts = async (req, res) => {

    try {
        const posts = await blogService.getAllPosts();
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({error: err.message || 'Internal Server Error'});
    }
};

exports.getPostById = async (req, res) => {

    try {
        const post = await blogService.getPostById(req.params.id);
        if (!post) {
            return res.status(404).json({error: 'Post not found'});
        }
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({error: err.message || 'Internal Server Error'});
    }
};

exports.createPost = async (req, res) => {

    try {
        const {title, content} = req.body;
        if (!title || !content) {
            return res.status(400).json({error: 'Title and content are required'});
        }

        const post = await blogService.createPost(title, content);
        res.status(201).json(post);
    } catch (err) {
        res.status(500).json({error: err.message || 'Internal Server Error'});
    }
};

exports.updatePost = async (req, res) => {

    try {
        const {title, content} = req.body;
        if (!title || !content) {
            return res.status(400).json({error: 'Title and content are required'});
        }

        const updatedPost = await blogService.updatePost(req.params.id, title, content);
        if (!updatedPost) {
            return res.status(404).json({error: 'Post not found'});
        }

        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(500).json({error: err.message || 'Internal Server Error'});
    }
};

exports.deletePost = async (req, res) => {

    try {
        const deleted = await blogService.deletePost(req.params.id);
        if (!deleted) {
            return res.status(404).json({error: 'Post not found'});
        }
        res.status(204).send();
    } catch (err) {
        res.status(500).json({error: err.message || 'Internal Server Error'});
    }
};
