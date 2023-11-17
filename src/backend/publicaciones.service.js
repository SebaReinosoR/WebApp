const db = require('./db');

const getPublicacion = () => {
  return db.query('SELECT * FROM publicacion');
};

const getPublicacionById = (id) => {
  return db.query('SELECT * FROM publicacion WHERE idPublicacion = ?', [id]);
};

const createPublicacion = (id_admin,Nombre,Fecha,Body,Referencia,Autor, Link) => {
  return db.query('INSERT INTO publicacion (id_admin,Nombre,Fecha,Body,Referencia,Autor, Link) VALUES (?,?, ?, ?, ?, ?,?)', [id_admin,Nombre,Fecha,Body,Referencia,Autor, Link]);
};

const updatePublicacion = (id, Nombre,Fecha,Body,Referencia,Autor, Link) => {
  return db.query('UPDATE publicacion SET Nombre = ?, Fecha = ?, Body = ?, Referencia = ?, Autor = ? , Link = ? WHERE idPublicacion = ?', [Nombre,Fecha,Body,Referencia,Autor, Link,id]);
};

const deletePublicacion = (id) => {
  return db.query('DELETE FROM publicacion WHERE idPublicacion = ?', [id]);
};

module.exports = { getPublicacion, getPublicacionById, createPublicacion, updatePublicacion, deletePublicacion };
