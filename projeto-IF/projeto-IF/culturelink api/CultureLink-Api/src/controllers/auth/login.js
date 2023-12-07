import user from '../../models/userModel.js'
import session from '../../models/sessionModel.js'
import { compare } from 'bcrypt'
import jwt from 'jsonwebtoken'
import { TOKEN_SECRET } from '../../config.js'

const login = async (req, res) => {
  
    try{
        const userData = req.body
        const [rows] = await user.getByEmail(userData.email)
        if(rows.length === 0){
            return res.status(400).json({
                error: `Usuário ou senha inválidos!`
            })
        } 
        const userFound = rows[0]
        let passIsValid = false
        try{
            passIsValid = await compare(userData.senha.trim(), userFound.senha.trim());
            console.log('Senha fornecida:', userData.senha);
            console.log('Senha no banco de dados:', userFound.senha);
            console.log('Resultado da comparação:', passIsValid);
         
            
         
        } catch (error){
            return res.status(400).json({
                error: `Usuário ou senha inválidos!`
            })
        }
        if (!passIsValid) {
            return res.status(400).json({
                error: `Usuário ou senha inválidos!`
            });
        }
        
        const token = jwt.sign({
            id: userFound.id,
            username: userFound.username
        }, TOKEN_SECRET)    
        await session.create(userFound.id, token)
        res.cookie('token', token, { httpOnly: true, sameSite: 'none', secure: true, maxAge: 90 * 24 * 60 * 60 * 1000 })
        return res.json({
            
            success: `Usuário Logado com Sucesso!`,
            
            user: {
                id: userFound.id,
                username: userFound.username,
                email: userFound.email,
            }
                
        })
        
    } catch (error){
        console.log(error)
        res.status(500).json({
            error: "Erro no servidor!",
        })
    }
   
}

export default login