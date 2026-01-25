import fs from "fs";
import imagekit from "../configs/imagekit.js";
import BLOG from "../models/blog.model.js";
import COMMENT from "../models/comment.model.js";
import auth from "../middlewares/auth.js";

export const createBlog = async (req, res) => {
    try {
        const { title, subTitle, description, category, author, isPublished } = JSON.parse(req.body.blog);
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
        const blogs = await BLOG.find({ isPublished: true })
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

export const createComment = async(req, res)=>{
    try {
        const {blogId} = req.params
        const {content, authorName} = req.body
        const blog = await BLOG.findById(blogId)
        if(!blog){
            return res.status(404).json({
                success : false,
                message : "Blog not found"
            })
        }
        const comment = new COMMENT({
            content,
            blogId,
            authorName : authorName
        })
        await comment.save()
        blog.comments.unshift(comment._id)
        await blog.save()
        res.status(201).json({
            success : true,
            message : "Comment created successfully"
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

export const deleteComment = async(req, res)=>{
    try {
        const {commentId} = req.params
        await COMMENT.findByIdAndDelete(commentId)
        await BLOG.updateOne({
            $pull : {
                comments : commentId
            }  
        })
        res.status(200).json({
            success : true,
            message : "Comment deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}


export const toggleCommentApproval = async(req, res)=>{
    try {
        const {commentId} = req.params
        const comment = await COMMENT.findById(commentId)
        if(!comment){
            return res.status(404).json({
                success : false,
                message : "Comment not found"
            })
        }
        comment.isApproved = !comment.isApproved
        await comment.save()
        res.status(200).json({
            success : true,
            message : "Comment approval status updated successfully"
        })
    } catch (error) {
        res.status(500).json({
            success : false,
            message : error.message
        })
    }
}

    