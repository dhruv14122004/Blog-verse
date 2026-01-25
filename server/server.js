import "dotenv/config";
import express from "express";
import cors from "cors";
import { connectDb } from "./configs/db.js";
import adminRouter from "./routes/admin.route.js";
import blogRouter from "./routes/blog.route.js";


const app = express();

connectDb();

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(`/api/admin`, adminRouter)
app.use(`/api/blog`, blogRouter)

app.get("/", (req, res) => {
    res.send("Server is running");
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

export default app;