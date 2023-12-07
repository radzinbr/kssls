import Post from "../../models/Postsmodel.js";


const Postdel = async (req, res) => {
    try {
        const PostData = req.body;
        const [rows] = await Post.PostDel(PostData.user_id);
        if (rows.length === 0) {
            res.status(404).json({
                error: `poste de id: ${PostData.user_id} não encontrado!`
            });
        } else {
            await Post.PostDel(PostData.user_id);

            res.json({
                success: "post excluído com sucesso"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Erro no servidor" });
    }
};

export default Postdel;
