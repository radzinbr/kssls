import Posts from '../../models/Postsmodel.js'


const allPost = async (req, res) => {
    try {
        const PostData = req.body
        const [rows] = await Posts.PostAll(PostData)
    
            res.json({
                success:"posts encontrados com sucesso",
                user:rows
            })
        }
        
catch (error) {
    console.log(error)
    res.status(500).json({ error: "erro no servidor" })
}
}
export default allPost;