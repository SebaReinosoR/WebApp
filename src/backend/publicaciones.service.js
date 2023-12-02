const db = require('./db');

const getPublicacion = () => {
  return db.query('SELECT * FROM publicacion');
};

const getPublicacionById = (id) => {
  return db.query('SELECT * FROM publicacion WHERE idPublicacion = ?', [id]);
};

const createPublicacion = (id_admin,Nombre,Fecha,Body,Referencia,Autor, Link,imagenPath) => {
  return db.query('INSERT INTO publicacion (id_admin,Nombre,Fecha,Body,Referencia,Autor, Link,imagen) VALUES (?,?, ?, ?, ?, ?,?)', [id_admin,Nombre,Fecha,Body,Referencia,Autor, Link, imagenPath]);
};

const updatePublicacion = (id, Nombre,Fecha,Body,Referencia,Autor, Link,imagenPath) => {
  return db.query('UPDATE publicacion SET Nombre = ?, Fecha = ?, Body = ?, Referencia = ?, Autor = ? , Link = ?, imagen = ? WHERE idPublicacion = ?', [Nombre,Fecha,Body,Referencia,Autor, Link,imagenPath,id]);
};

const deletePublicacion = (id) => {
  return db.query('DELETE FROM publicacion WHERE idPublicacion = ?', [id]);
};

module.exports = { getPublicacion, getPublicacionById, createPublicacion, updatePublicacion, deletePublicacion };
