
const db = require('./db');

const getTemas = () => {
  return db.query('SELECT * FROM temas');
};

const getTemaById = (id) => {
  return db.query('SELECT * FROM temas WHERE idTema = ?', [id]);
};

const createTema = (id_admin,Nombre) => {
  return db.query('INSERT INTO temas (id_admin, Nombre) VALUES (?, ?)', [id_admin, Nombre]);
};             //   'INSERT INTO temas (id_admin, Nombre) VALUES (?, ?)'

const updateTema = (id, id_admin, Nombre) => {
  return db.query('UPDATE temas SET Nombre = ?, id_admin = ? WHERE idTema = ?', [Nombre, id_admin, id]);
};

const deleteTema = (id) => {
  return db.query('DELETE FROM temas WHERE idTema = ?', [id]);
};

module.exports = { getTemas, getTemaById, createTema, updateTema, deleteTema };
