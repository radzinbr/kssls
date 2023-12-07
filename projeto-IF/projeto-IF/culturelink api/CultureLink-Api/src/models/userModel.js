import db from '../database/db.js'

const getById = async (id) => {
    return await db.query("SELECT username, email, photo , bandeira , profissao , localizacao , idioma FROM usuarios Where id = ?", [id])
}

const getByEmail = async (email) => {
    return await db.query("SELECT * FROM usuarios Where email = ?;", [email])
}

const getAll = async () => {
    return await db.query("SELECT id, username, nome_completo, email , profissao , idioma , localizacao, bandeira FROM usuarios");
}

// models/userModel.js
const create = async (user) => {
    const { username, email, senha } = user;
    return await db.query("INSERT INTO usuarios (username,email,senha) VALUES (?,?,?);", [username, email, senha]);
}


const update = async (user) => {
    const { username, nome_completo, photo, localizacao, profissao, bandeira } = user;
    return await db.query("UPDATE usuarios SET username = ?, nome_completo = ?, photo = ?, localizacao = ?, profissao = ?, bandeira = ?, idioma = ?  WHERE email = ?; ", [username, nome_completo, photo, localizacao, profissao, bandeira, email]);
}


const remove = async (id) => {
    // Considere adicionar lógica para remover também as postagens, curtidas e comentários associados ao usuário
    return await db.query("DELETE FROM usuarios WHERE id = ?", [id]);
}

export default { getById, getByEmail, create, update, remove, getAll }