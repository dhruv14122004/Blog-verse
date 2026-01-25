import fs from "fs";
import imagekit from "../configs/imagekit.js";
import BLOG from "../models/blog.model.js";

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
        const { blogId } = req.parse
        const blog = await BLOG.find(blogId)
        if (!blog) {
            return res.status(404).json({
                success: "false",
                message: "Blog not found"
            })
        }
        res.status(200).json({
            success: "true",
            message: blog
        })
    } catch (error) {
        return res.status(500).json({
            success: "false",
            message: error.message
        })
    }
}

export const deleteBlogById = async (req,res)=>{
    try {
        const {id} = req.body
        await BLOG.findByIdAndDelete(id)
        res.status(200).json({
            success : "true",
            message : "Blog deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            success : "false",
            message : error.message
        })
    }
}
