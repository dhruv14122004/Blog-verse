import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    subTitle: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        required: true 
    },
    image: {
        type: String,
        required: true
    },
    category: { 
        type: String, 
        required: true 
    },
    author: { 
        type: String,
        required: true 
    },
    isPublished: {
        type: Boolean,
        default: true
    },
    comments : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "comment"
        }
    ]   
}, {
    timestamps: true
})

const BLOG = mongoose.model("blog", blogSchema)

export default BLOG
