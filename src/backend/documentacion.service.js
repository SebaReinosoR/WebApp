const db = require('./db');

const getDocumentacion = () => {
  return db.query('SELECT * FROM documentacion');
};

const getDocumentacionById = (id) => {
  return db.query('SELECT * FROM documentacion WHERE id = ?', [id]);
};

const createDocumentacion = (nombre, informacion) => {
  return db.query('INSERT INTO documentacion (nombre, informacion) VALUES (?, ?)', [nombre, informacion]);
};

const updateDocumentacion = (id, nombre, informacion) => {
  return db.query('UPDATE documentacion SET nombre = ?, informacion = ? WHERE id = ?', [nombre, informacion, id]);
};

const deleteDocumentacion = (id) => {
  return db.query('DELETE FROM documentacion WHERE idDocumentacion = ?', [id]);
};

module.exports = { getDocumentacion, getDocumentacionById, createDocumentacion, updateDocumentacion, deleteDocumentacion };

