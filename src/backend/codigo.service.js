
const db = require('./db');

const getCodigos = () => {
  return db.query('SELECT * FROM codigos');
};

const getCodigosById = (id) => {
  return db.query('SELECT * FROM codigos WHERE idCodigos = ?', [id]);
};

const createCodigos = (id_admin, Nombre, Body , Link, Referencia) => {
  return db.query('INSERT INTO codigos (id_admin, Nombre, Body , Link, Referencia) VALUES (?, ?, ?,?,?)', [id_admin, Nombre, Body , Link, Referencia]);
};

const updateCodigos = (id, id_admin, Nombre, Body , Link, Referencia) => {
  return db.query('UPDATE codigos SET id_admin = ?, Nombre = ?, Body = ? , Link = ?, Referencia = ? WHERE idCodigos = ?', [id_admin, Nombre, Body , Link, Referencia, id]);
};

const deleteCodigos = (id) => {
  return db.query('DELETE FROM codigos WHERE idCodigos = ?', [id]);
};

module.exports = { getCodigos, getCodigosById, createCodigos, updateCodigos, deleteCodigos };


