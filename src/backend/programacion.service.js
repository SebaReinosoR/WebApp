
const db = require('./db');

const getProgramacion = () => {
  return db.query('SELECT * FROM programacion');
};

const getProgramacionById = (id) => {
  return db.query('SELECT * FROM programacion WHERE idProgramacion = ?', [id]);
};

const createProgramacion = (id_admin,Nombre, Body, Link) => {
  return db.query('INSERT INTO programacion ( id_admin,Nombre, Body,Link) VALUES (?, ?,?,?)', [ id_admin,Nombre, Body, Link]);
};

const updateProgramacion = (id, Nombre, Body, Link, id_admin) => {
  return db.query('UPDATE programacion SET Nombre = ?, Body = ? , Link = ? , id_admin = ? WHERE idProgramacion = ?', [Nombre, Body, Link, id_admin, id]);
};

const deleteProgramacion = (id) => {
  return db.query('DELETE FROM programacion WHERE idProgramacion = ?', [id]);
};

module.exports = { getProgramacion, getProgramacionById, createProgramacion, updateProgramacion, deleteProgramacion };


