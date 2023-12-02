const db = require('./db');

const getDocumentacion = () => {
  return db.query('SELECT * FROM documentacion');
};

const getDocumentacionById = (id) => {
  return db.query('SELECT * FROM documentacion WHERE idDocumentacion = ?', [id]);
};

const createDocumentacion = (id_admin,Nombre,Body, Link ,Referencia, imagenPath) => {
  return db.query('INSERT INTO documentacion (id_admin,Nombre,Body, Link ,Referencia, imagen) VALUES (?, ? , ? , ?, ?, ? )', [id_admin,Nombre,Body, Link ,Referencia,imagenPath]);
};

const updateDocumentacion = (id, id_admin,Nombre,Body, Link ,Referencia, imagenPath) => {
  return db.query('UPDATE documentacion SET id_admin = ?,Nombre = ?,Body = ?, Link = ? ,Referencia = ?, imagen = ? WHERE idDocumentacion = ?', [id_admin,Nombre,Body, Link ,Referencia, imagenPath, id]);
};

const deleteDocumentacion = (id) => {
  return db.query('DELETE FROM documentacion WHERE idDocumentacion = ?', [id]);
};

module.exports = { getDocumentacion, getDocumentacionById, createDocumentacion, updateDocumentacion, deleteDocumentacion };

