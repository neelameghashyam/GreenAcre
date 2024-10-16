import { validationResult } from "express-validator";
import Article from "../models/articlesModel.js";
import mongoose from "mongoose";

const articleCntrl = {};

// Create an article
articleCntrl.create = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const body = req.body;
    const file = req.file ? `/uploads/${req.file.filename}` : undefined; // Handle file upload
    if (file) body.file = file; // Attach file to body if exists

    try {
        const article = new Article({ ...body, user: req.userId });
        await article.save();
        res.status(201).json(article);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Edit an article
articleCntrl.edit = async (req, res) => {
    const { id } = req.params;

    let article;
    if (req.role === 'admin' || req.role === 'moderator') {
        article = await Article.findById(id); // Admins and moderators can edit any article
    } else {
        return res.status(403).json({ error: "You are not authorized to edit articles" });
    }

    if (!article) {
        return res.status(404).json({ error: "Article not found" });
    }

    const body = req.body;
    const file = req.file ? `/uploads/${req.file.filename}` : undefined; // Handle file upload in edit
    if (file) article.file = file; // Update the file if a new one is uploaded

    // Update other fields conditionally
    article.title = body.title || article.title;
    article.body = body.body || article.body;
    article.category = body.category || article.category;

    try {
        await article.save();
        res.status(200).json("Article edited successfully");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete an article
// const mongoose = require('mongoose');
// const Article = require('../models/Article'); // Adjust the path based on your project structure

articleCntrl.delete = async (req, res) => {
    const { id } = req.params;

    // Validate if the provided ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Invalid article ID" });
    }

    let article;
    if (req.role === 'admin' || req.role === 'moderator') {
        try {
            article = await Article.findByIdAndDelete(id); // Admins and moderators can delete any article
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    } else {
        return res.status(403).json({ error: "You are not authorized to delete articles" });
    }

    if (!article) {
        return res.status(404).json({ error: "Article not found" });
    }

    try {
        res.status(200).json("Article deleted successfully");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


// Get all articles
articleCntrl.getAll = async (req, res) => {
    try {
        const articles = await Article.find();
        if (articles.length > 0) {
            res.status(200).json(articles);
        } else {
            res.status(404).json("No articles found");
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get a single article by ID
articleCntrl.getArticle = async (req, res) => {
    const { id } = req.params;
    try {
        const article = await Article.findById(id);
        if (article) {
            res.status(200).json(article);
        } else {
            res.status(404).json("Article not found");
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export default articleCntrl;
