
import Post from '../../models/Postsmodel.js'

const createP = async (req,res) => {
    try{
        const postData = req.body
        const [result] = await Post.PostAdd(postData.content,postData.dir)
        if(result.affectedRows === 1){
            res.json({
                success:"post inserido com sucesso",
                post:{
                    id:result.insertId,
                    ...postData
                }
            })
        }
    }catch(error){
        console.log(error)
        res.status(500).json({error:"erro no servidor"})
    }
}

export default createP; 

