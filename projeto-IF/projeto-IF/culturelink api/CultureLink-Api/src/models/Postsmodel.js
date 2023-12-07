import db from '../database/db.js';

const GetPost = async (user_id) => {
  try {
    const result = await db.query("SELECT public_id, content, likes FROM publications WHERE user_id = ?", [user_id]);
    return result;
  } catch (error) {
    console.error('Error in GetPost:', error);
    throw error;
  }
};

const PostUpdate = async (user) => {
  try {
    const { public_id, content, dir } = user;
    const result = await db.query("UPDATE publications SET content=?, dir=? WHERE public_id = ?", [content, dir, public_id]);
    return result;
  } catch (error) {
    console.error('Error in PostUpdate:', error);
    throw error;
  }
};

const PostAdd = async (content, dir) => {
  try {
    const result = await db.query("INSERT INTO publications (content, dir) VALUES (?, ?)", [content, dir]);
    return result;
  } catch (error) {
    console.error('Error in PostAdd:', error);
    throw error;
  }
};

const PostDel = async (public_id) => {
  try {
    const result = await db.query("DELETE FROM publications WHERE public_id = ?", [public_id]);
    return result;
  } catch (error) {
    console.error('Error in PostDel:', error);
    throw error;
  }
};

const PostAll = async () => {
  try {
    const result = await db.query('SELECT * FROM publications');
    return result;
  } catch (error) {
    console.error('Error in PostAll:', error);
    throw error;
  }
};

export default { GetPost, PostUpdate, PostAdd, PostDel, PostAll };
