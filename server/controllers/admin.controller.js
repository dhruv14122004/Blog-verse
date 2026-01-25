import jwt from "jsonwebtoken";
import BLOG from "../models/blog.model.js";
import COMMENT from "../models/comment.model.js";

export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: "false",
                error: "Bad Request"
            })
        }
        if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
            return res.status(400).json({
                success: "false",
                message: "Invalid Credentials"
            })
        }
        const token = jwt.sign({ email }, process.env.JWT_SECRET)
        res.json({
            success: true,
            token
        })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}


export const getAllBlogsAdmin = async (req, res) => {
    try {
        const blogs = await BLOG.find({}).sort({ createdAt: -1 })
        res.status(200).json({ success: true, blogs })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}


export const getAllCommentsAdmin = async (req, res) => {
    try {
        const comments = await COMMENT.find({}).populate("blogId").sort({ createdAt: -1 })
        res.status(200).json({ success: true, comments })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}


export const getDashboard = async (req, res) => {
    try {
        const recentBlogs = await BLOG.find({}).sort({ createdAt: -1 }).limit(5)
        const recentComments = await COMMENT.find({}).sort({ createdAt: -1 }).limit(5)
        const totalBlogs = await BLOG.countDocuments()
        const totalComments = await COMMENT.countDocuments()
        const draftBlogs = await BLOG.countDocuments({ isPublished: false })

        const dashboardData = {
            recentBlogs,
            recentComments,
            totalBlogs,
            totalComments,
            draftBlogs
        }

        res.json({
            success: true,
            dashboardData
        })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

export const toggleCommentApproval = async (req, res) => {
    try {
        const { commentId } = req.params
        const comment = await COMMENT.findById(commentId)
        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "Comment not found"
            })
        }
        comment.isApproved = !comment.isApproved
        await comment.save()
        res.status(200).json({
            success: true,
            message: "Comment approval status updated successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

export const deleteComment = async (req, res) => {
    try {
        const { commentId } = req.params
        await COMMENT.findByIdAndDelete(commentId)
        await BLOG.updateOne(
            { comments: commentId },
            {
                $pull: {
                    comments: commentId
                }
            }
        )
        res.status(200).json({
            success: true,
            message: "Comment deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}