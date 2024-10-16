import { validationResult } from 'express-validator';
import Post from '../models/postModel.js';

const postCntrl = {};

// Create a post
postCntrl.create = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const body = req.body;
    const file = req.file ? `/uploads/${req.file.filename}` : undefined; // Handle file upload
    if (file) body.file = file; // Attach file to body if it exists

    try {
        const post = new Post({ ...body, user: req.userId }); // Include user in post creation
        await post.save();
        res.status(201).json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Edit a post
postCntrl.edit = async (req, res) => {
    const { id } = req.params;

    let post;
    if (req.role === 'admin' || req.role === 'moderator') {
        post = await Post.findById(id); // Admins and moderators can edit any post
    } else {
        post = await Post.findOne({ _id: id, user: req.userId }); // Regular users can only edit their own posts
    }

    if (post) {
        const body = req.body;
        const file = req.file ? `/uploads/${req.file.filename}` : undefined; // Handle file upload in edit
        if (file) post.file = file; // Update the file if a new one is uploaded

        // Update other fields conditionally
        post.type = body.type || post.type;
        post.propertyType = body.propertyType || post.propertyType;
        post.mapLocation = body.mapLocation || post.mapLocation;
        post.description = body.description || post.description;
        post.city = body.city || post.city;
        post.locality = body.locality || post.locality;
        post.address = body.address || post.address;
        post.area = body.area || post.area;
        post.unitMeasurement = body.unitMeasurement || post.unitMeasurement;
        post.ownerShip = body.ownerShip || post.ownerShip;
        post.price = body.price || post.price;

        await post.save();
        res.status(200).json(post);
    } else {
        res.status(404).json({ error: "Post not found or you are not authorized to edit it" });
    }
};

// Delete a post
postCntrl.deletePost = async (req, res) => {
    const { id } = req.params;

    let post;
    if (req.role === 'admin' || req.role === 'moderator') {
        post = await Post.findByIdAndDelete(id); // Admins and moderators can delete any post
    } else {
        post = await Post.findOneAndDelete({ _id: id, user: req.userId }); // Users can only delete their own posts
    }

    if (!post) {
        return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json(post);
};


// Get all posts
postCntrl.allPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        if (posts.length > 0) {
            res.status(200).json(posts);
        } else {
            res.status(404).json("No posts found");
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all posts of a user
postCntrl.allPostsOfUser = async (req, res) => {
    try {
        const posts = await Post.find({ user: req.userId });
        if (posts.length > 0) {
            res.status(200).json(posts);
        } else {
            res.status(404).json("No posts found");
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a single post by ID
postCntrl.getPost = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findById(id);
        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json("No post found");
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

postCntrl.approvePosts = async (req, res) => {
    const { id } = req.params;
    try {
        const post = await Post.findByIdAndUpdate(id, { approved: true }, { new: true })
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.status(200).json("Post approved successfully");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

postCntrl.views = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        post.views += 1;
        await post.save();
        res.status(200)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


export default postCntrl;
