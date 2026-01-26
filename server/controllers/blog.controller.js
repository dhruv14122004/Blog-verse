import fs from "fs";
import imagekit from "../configs/imagekit.js";
import BLOG from "../models/blog.model.js";
import COMMENT from "../models/comment.model.js";
import auth from "../middlewares/auth.js";
import main from "../configs/gemini.js";
import mistral from "../configs/mistral.js";

export const createBlog = async (req, res) => {
    try {
        const {title, subtitle, description, category, author, isPublished } = req.body;
        const subTitle = subtitle; // Mapping frontend 'subtitle' to model 'subTitle'
        const imageFile = req.file
        if (!title || !subTitle || !description || !category || !author) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields"
            })
        }
        const fileBuffer = fs.readFileSync(imageFile.path)

        // Upload image to ImageKit
        const response = await imagekit.upload({
            file: fileBuffer,
            fileName: imageFile.originalname,
            folder: "/blogs"
        })

        // Optimize the image using ImageKit
        const optimizedImageURL = imagekit.url({
            path: response.filePath,
            transformation: [{
                quality: "auto"
            }, {
                format: "webp"
            }, {
                width: 1200,
                height: 600,
                crop: "fill"
            }]
        })

        const image = optimizedImageURL;
        const blog = new BLOG({
            title,
            subTitle,
            description,
            category,
            author,
            image,
            isPublished
        })
        await blog.save();
        res.status(201).json({ success: true, message: "Blog Created Successfully" })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await BLOG.find({ isPublished: true }).sort({ createdAt: -1 })
        res.status(200).json({ success: true, blogs })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

export const getBlogById = async (req, res) => {
    try {
        const { blogId } = req.params
        const blog = await BLOG.findById(blogId)
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            })
        }
        res.status(200).json({
            success: true,
            blog
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const deleteBlogById = async (req, res) => {
    try {
        const { id } = req.params
        await BLOG.findByIdAndDelete(id)
        await COMMENT.deleteMany({ blogId: id })
        res.status(200).json({
            success: true,
            message: "Blog deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


export const togglePublished = async (req, res) => {
    try {
        const { id } = req.body
        const blog = await BLOG.findById(id)
        if (!blog) {
            return res.status(404).json({
                success: "false",
                message: "Blog not found"
            })
        }
        blog.isPublished = !blog.isPublished
        await blog.save()
        res.status(200).json({
            success: "true",
            message: "Blog published status updated successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: "false",
            message: error.message
        })
    }
}

export const createComment = async (req, res) => {
    try {
        const { blogId } = req.params
        const { content, authorName } = req.body
        const blog = await BLOG.findById(blogId)
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            })
        }
        const comment = new COMMENT({
            content,
            blogId,
            authorName: authorName
        })
        await comment.save()
        blog.comments.unshift(comment._id)
        await blog.save()
        res.status(201).json({
            success: true,
            message: "Comment created successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


export const getBlogComments = async (req, res) => {
    try {
        const { blogId } = req.params
        const blog = await BLOG.findById(blogId)
        if (!blog) {
            return res.status(404).json({
                success: false,
                message: "Blog not found"
            })
        }
        const comments = await COMMENT.find({ blogId, isApproved: true }).sort({ createdAt: -1 })
        res.status(200).json({
            success: true,
            comments
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


export const generateBlogContentGemini = async (req, res) => {
    try {
        const prompt = req.body.prompt;
        const content = await main(prompt + "Generate a blog content for this topic in markdown format. Dont add any extra content other than the blog content");
        res.status(200).json({
            success: true,
            content
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


export const generateBlogContentMistral = async (req, res) => {
    try {
        const prompt = req.body.prompt;
        const content = await mistral(prompt + "Generate a blog content for this topic in markdown format. Dont add any extra content other than the blog content. also dont add markdown``` in the starting of the content");
        res.status(200).json({
            success: true,
            content
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }

}

