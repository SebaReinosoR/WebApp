

const db = require('./db');

const getSubtemas = () => {
  return db.query('SELECT * FROM subtema');
};

const getSubtemaById = (id) => {
  return db.query('SELECT * FROM subtema WHERE idSubtema = ?', [id]);
};
const getSubTemaByIdTema = (id) => {
  return db.query('SELECT * FROM subtema WHERE id_tema = ?', [id]);
};

const createSubtema = (id_tema, Nombre, Body, Link, Referencia) => {
  return db.query('INSERT INTO subtema (id_tema, Nombre, Body, Link, Referencia) VALUES (?, ?,?,?,?)', [id_tema, Nombre, Body, Link, Referencia]);
};

const updateSubtema = (id, id_tema, Nombre, Body, Link, Referencia) => {
  return db.query('UPDATE subtema SET id_tema = ?, Nombre = ?, Body = ?, Link= ?, Referencia = ? WHERE idSubtema = ?', [id_tema, Nombre, Body, Link, Referencia, id]);
};

const deleteSubtema = (id) => {
  return db.query('DELETE FROM subtema WHERE idSubtema = ?', [id]);
};

module.exports = { getSubTemaByIdTema, getSubtemas, getSubtemaById, createSubtema, updateSubtema, deleteSubtema };