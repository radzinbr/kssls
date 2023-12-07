import Posts from '../../models/Postsmodel.js'


const Getpost = async (req, res) => {
    try {
        const postData = req.body
        const [rows] = await Posts.GetPost(postData.user_id)
        if(rows.length === 0){
            res.status(404).json({
                error:`post id: ${postData.user_id} não encontrado!`
            })
        }else {
            res.json({
                success:"post encontrado com sucesso",
                user:rows[0]
            })
        }
    } catch(error){
        console.log(error)
        res.status(500).json({error:"erro no servidor"})
    }
}

export default Getpost;