
const db = require('./db');

const getTemas = () => {
  return db.query('SELECT * FROM temas');
};

const getTemaById = (id) => {
  return db.query('SELECT * FROM temas WHERE idTema = ?', [id]);
};

const createTema = (nombre, idSubtema) => {
  return db.query('INSERT INTO temas (nombre, id_subtema) VALUES (?, ?)', [nombre, idSubtema]);
};

const updateTema = (id, nombre, idSubtema) => {
  return db.query('UPDATE temas SET Nombre = ?, ID_subtema = ? WHERE idTema = ?', [nombre, idSubtema, id]);
};

const deleteTema = (id) => {
  return db.query('DELETE FROM temas WHERE idTema = ?', [id]);
};

module.exports = { getTemas, getTemaById, createTema, updateTema, deleteTema };
