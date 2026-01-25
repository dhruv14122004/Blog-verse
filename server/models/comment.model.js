import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    blogId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "blog",
        required: true
    },
    authorName: { 
        type: String,
        required: true
    },
    likes : {
        type : Number,
        default : 0
    },
    isApproved : {
        type : Boolean,
        default : false
    }   
}, {
    timestamps: true
});

const COMMENT = mongoose.model("comment", commentSchema);

export default COMMENT;
