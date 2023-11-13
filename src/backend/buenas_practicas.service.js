// buenasPracticas.service.js
const db = require('./db');

const getBuenasPracticas = () => {
  return db.query('SELECT * FROM buenas_practicas');
};

const getBuenasPracticasById = (id) => {
  return db.query('SELECT * FROM buenas_practicas WHERE id = ?', [id]);
};

const createBuenasPracticas = (titulo, descripcion) => {
  return db.query('INSERT INTO buenas_practicas (titulo, descripcion) VALUES (?, ?)', [titulo, descripcion]);
};

const updateBuenasPracticas = (id, titulo, descripcion) => {
  return db.query('UPDATE buenas_practicas SET titulo = ?, descripcion = ? WHERE id = ?', [titulo, descripcion, id]);
};

const deleteBuenasPracticas = (id) => {
  return db.query('DELETE FROM buenas_practicas WHERE id = ?', [id]);
};

module.exports = { getBuenasPracticas, getBuenasPracticasById, createBuenasPracticas, updateBuenasPracticas, deleteBuenasPracticas };


