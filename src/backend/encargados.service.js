// encargado.service.js
const db = require('./db');

const getEncargados = () => {
  return db.query('SELECT * FROM encargados');
};

const getEncargadoById = (id) => {
  return db.query('SELECT * FROM encargados WHERE idEncargado = ?', [id]);
};

const createEncargado = (id_admin,Nombre, Apellido, Carrera, Especialidad, Investigacion, Universidad,imagenPath) => {
  return db.query('INSERT INTO encargados (id_admin,Nombre, Apellido, Carrera, Especialidad, Investigacion, Universidad,imagen) VALUES (?, ?,?,?,?,?,?,?)', [id_admin,Nombre, Apellido, Carrera, Especialidad, Investigacion, Universidad, imagenPath]
  )};//

const updateEncargado = (idEncargado,id_admin,Nombre, Apellido, Carrera, Especialidad, Investigacion, Universidad,imagenPath) => {
  return db.query('UPDATE encargados SET id_admin =? ,Nombre = ?, Apellido = ? , Carrera = ?, Especialidad = ?, Investigacion = ?, Universidad = ?, imagen = ? WHERE idEncargado = ?', [id_admin,Nombre, Apellido, Carrera, Especialidad, Investigacion, Universidad, imagenPath, idEncargado]);
};

const deleteEncargado = (id) => {
  return db.query('DELETE FROM encargados WHERE idEncargado = ?', [id]);
};

module.exports = { getEncargados, getEncargadoById, createEncargado, updateEncargado, deleteEncargado };
