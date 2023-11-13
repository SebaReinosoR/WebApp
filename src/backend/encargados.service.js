// encargado.service.js
const db = require('./db');

const getEncargados = () => {
  return db.query('SELECT * FROM encargados');
};

const getEncargadoById = (id) => {
  return db.query('SELECT * FROM encargados WHERE id = ?', [id]);
};

const createEncargado = (nombre, carrera, especialidad, investigacion,universidad) => {
  return db.query('INSERT INTO encargados (Nombre, Carrera, Especialidad, Investigacion, Universidad) VALUES (?, ?, ?, ?, ?)', [nombre, carrera, especialidad, investigacion,universidad]);
};

const updateEncargado = (idEncargado,nombre, carrera, especialidad, investigacion, universidad) => {
  return db.query('UPDATE encargados SET Nombre = ?, Carrera = ? WHERE id = ?', [nombre, carrera, especialidad, investigacion, universidad, idEncargado]);
};

const deleteEncargado = (id) => {
  return db.query('DELETE FROM encargados WHERE idEncargado = ?', [id]);
};

module.exports = { getEncargados, getEncargadoById, createEncargado, updateEncargado, deleteEncargado };
