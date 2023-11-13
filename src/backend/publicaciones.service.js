const db = require('./db');

const getPublicacion = () => {
  return db.query('SELECT * FROM publicacion');
};

const getPublicacionById = (id) => {
  return db.query('SELECT * FROM publicacion WHERE idPublicacion = ?', [id]);
};

const createPublicacion = (nombre, fecha, cuerpo, referencia, autor) => {
  return db.query('INSERT INTO publicacion (Nombre, Fecha, Cuerpo, Referencia, Autor) VALUES (?, ?, ?, ?, ?)', [nombre, fecha, cuerpo, referencia, autor]);
};

const updatePublicacion = (id, nombre, fecha, cuerpo, referencia, autor) => {
  return db.query('UPDATE publicacion SET Nombre = ?, Fecha = ?, Cuerpo = ?, Referencia = ?, Autor = ? WHERE idPublicacion = ?', [id, nombre, fecha, cuerpo, referencia, autor]);
};

const deletePublicacion = (id) => {
  return db.query('DELETE FROM temas WHERE idPublicacion = ?', [id]);
};

module.exports = { getPublicacion, getPublicacionById, createPublicacion, updatePublicacion, deletePublicacion };
