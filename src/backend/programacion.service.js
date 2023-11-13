
const db = require('./db');

const getProgramacion = () => {
  return db.query('SELECT * FROM programacion');
};

const getProgramacionById = (id) => {
  return db.query('SELECT * FROM programacion WHERE id = ?', [id]);
};

const createProgramacion = (nombre, informacion) => {
  return db.query('INSERT INTO programacion (Nombre, Informacion) VALUES (?, ?)', [nombre, informacion]);
};

const updateProgramacion = (id, nombre, informacion) => {
  return db.query('UPDATE programacion SET Nombre = ?, Descripcion = ? WHERE idProgramacion = ?', [nombre,informacion, id]);
};

const deleteProgramacion = (id) => {
  return db.query('DELETE FROM programacion WHERE idProgramacion = ?', [id]);
};

module.exports = { getProgramacion, getProgramacionById, createProgramacion, updateProgramacion, deleteProgramacion };


