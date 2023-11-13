
const db = require('./db');

const getCodigos = () => {
  return db.query('SELECT * FROM codigos');
};

const getCodigosById = (id) => {
  return db.query('SELECT * FROM codigos WHERE idCodigos = ?', [id]);
};

const createCodigos = (nombre, descripcion, link) => {
  return db.query('INSERT INTO codigos (Nombre, Descripcion, Link) VALUES (?, ?, ?)', [nombre, descripcion, link]);
};

const updateCodigos = (id, nombre, descripcion, link) => {
  return db.query('UPDATE codigos SET Nombre = ?, Duracion = ?, Link = ? WHERE idCodigos = ?', [nombre, descripcion, link, id]);
};

const deleteCodigos = (id) => {
  return db.query('DELETE FROM codigos WHERE idCodigos = ?', [id]);
};

module.exports = { getCodigos, getCodigosById, createCodigos, updateCodigos, deleteCodigos };


