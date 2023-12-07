import Post from '../../models/Postsmodel.js'

const Postupd = async (req, res) => {
    try {
        const postData = req.body
        const [Result] = await Post.PostUpdate(postData)
        if (Result.affectedRows === 1) [
            res.json({
                success: "post atualizado com sucesso",
                user: {
                    ...postData
                }
            })
        ]
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "erro no servidor" })
    }
}

export default Postupd ;