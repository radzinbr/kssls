// controllers/registro.js
import bcrypt from 'bcrypt';
import user from '../../models/userModel.js';

const registrarUsuario = async (req, res) => {
    try {
        const { username, email, senha } = req.body;

        const existingUser = await user.getByEmail(email);

        if (existingUser && existingUser.length > 0) {
            const trimmedExistingEmail = existingUser[0].email?.trim()?.toLowerCase();
            const trimmedProvidedEmail = email.trim().toLowerCase();

            if (trimmedExistingEmail === trimmedProvidedEmail) {
                return res.status(400).json({ error: 'Email já cadastrado.' });
            }
        }

        const hashedPassword = await bcrypt.hash(senha, 10);

        const novoUsuario = {
            username: username,
            email: email,
            senha: hashedPassword,
        };

        const [resultado] = await user.create(novoUsuario);
        delete novoUsuario.senha 
        novoUsuario.id = resultado.insertId
        console.log(resultado , novoUsuario)
        res.json({ success: 'Usuário registrado com sucesso!', user: novoUsuario });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro no servidor.' });
    }
};

export default registrarUsuario;
