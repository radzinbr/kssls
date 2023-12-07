import user from '../../models/userModel.js';
import bcrypt from 'bcrypt';

const insertUser = async (req, res) => {
    try {
        const userData = req.body;

        // Hash da senha usando bcrypt
        const hashedPassword = await bcrypt.hash(userData.senha, 10);

        // Substitua a senha no objeto userData pela senha criptografada
        userData.senha = hashedPassword;

        // Insere o usuário no banco de dados
        const [result] = await user.create(userData);

        // Remova a senha do objeto userData antes de enviar a resposta
        delete userData.senha;

        if (result.affectedRows === 1 ) {
            res.json({
                success: "Usuário inserido com Sucesso!",
                user: {
                    id: result.insertId,
                    ...userData
                }
            });
        } else {
            res.status(500).json({
                error: "Falha ao inserir usuário no banco de dados.",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Erro no servidor!",
        });
    }
};

export default insertUser;
