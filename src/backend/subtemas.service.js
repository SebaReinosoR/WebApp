const db = require('./db');

const getSubtemas = () => {
  return db.query('SELECT * FROM subtema');
};

const getSubtemaById = (id) => {
  return db.query('SELECT * FROM subtemas WHERE idSubtema = ?', [id]);
};

const createSubtema = (nombre, informacion, link, referencia) => {
  return db.query('INSERT INTO subtemas (Nombre, Informacion, Link_git, Referencia) VALUES (?, ?)', [nombre, informacion, link, referencia]);
};

const updateSubtema = (id, nombre, informacion, link, referencia) => {
  return db.query('UPDATE subtemas SET Nombre = ?, Informacion = ?, Link_git = ?, Referencia = ? WHERE idSubtema = ?', [id, nombre, informacion, link, referencia]);
};

const deleteSubtema = (id) => {
  return db.query('DELETE FROM subtemas WHERE idSubtema = ?', [id]);
};

module.exports = { getSubtemas, getSubtemaById, createSubtema, updateSubtema, deleteSubtema };