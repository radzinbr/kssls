import Express from "express";

import GetPost from "../controllers/posts/Getpost.js";
import allPost from "../controllers/posts/allpost.js";
import createP from "../controllers/posts/createpost.js";
import Postupd from "../controllers/posts/updatepost.js";
import Postdel from "../controllers/posts/Delpost.js";

const router = Express.Router()

router.get("/",GetPost)
router.get("/list",allPost)
router.post("/",createP)
router.delete("/",Postdel)
router.put("/",Postupd)


export default router ;