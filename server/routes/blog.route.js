import { Router } from "express";
import { createBlog, getAllBlogs, getBlogById, togglePublished, deleteBlogById, createComment, getBlogComments } from "../controllers/blog.controller.js";
import upload from "../middlewares/multer.js";
import auth from "../middlewares/auth.js";

const blogRouter = Router();

blogRouter.post("/create", upload.single('image'), auth, createBlog)
blogRouter.get("/all", getAllBlogs)
blogRouter.get("/:blogId", getBlogById)
blogRouter.post("/toggle-publish", auth, togglePublished)
blogRouter.delete("/delete/:id", auth, deleteBlogById)

// Comments
blogRouter.post("/comment/:blogId", createComment)
blogRouter.get("/comment/:blogId", getBlogComments)


export default blogRouter;