import { Router } from "express";
import { createBlog ,getAllBlogs, getBlogById} from "../controllers/blog.controller.js";
import upload from "../middlewares/multer.js";
import auth from "../middlewares/auth.js";

const blogRouter = Router();

blogRouter.post("/create", upload.single('image'), auth,createBlog)
blogRouter.get("/all", getAllBlogs)
// blogRouter.get("/")

export default blogRouter;