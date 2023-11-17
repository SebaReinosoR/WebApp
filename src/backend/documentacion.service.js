const db = require('./db');

const getDocumentacion = () => {
  return db.query('SELECT * FROM documentacion');
};

const getDocumentacionById = (id) => {
  return db.query('SELECT * FROM documentacion WHERE idDocumentacion = ?', [id]);
};

const createDocumentacion = (id_admin,Nombre,Body, Link ,Referencia) => {
  return db.query('INSERT INTO documentacion (id_admin,Nombre,Body, Link ,Referencia) VALUES (?, ? , ? , ?, ? )', [id_admin,Nombre,Body, Link ,Referencia]);
};

const updateDocumentacion = (id, id_admin,Nombre,Body, Link ,Referencia) => {
  return db.query('UPDATE documentacion SET id_admin = ?,Nombre = ?,Body = ?, Link = ? ,Referencia = ? WHERE idDocumentacion = ?', [id_admin,Nombre,Body, Link ,Referencia, id]);
};

const deleteDocumentacion = (id) => {
  return db.query('DELETE FROM documentacion WHERE idDocumentacion = ?', [id]);
};

module.exports = { getDocumentacion, getDocumentacionById, createDocumentacion, updateDocumentacion, deleteDocumentacion };

