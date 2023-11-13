// admin.service.js
const db = require('./db');

const getAdministradores = () => {
  return db.query('SELECT * FROM administrador');
};

const getAdministradorById = (idAdministrador) => {
  return db.query('SELECT * FROM administrador WHERE idAdministrador = ?', [idAdministrador]);
};

const createAdministrador = (usuario, contrasena) => {
  return db.query('INSERT INTO administrador (usuario, contraseña) VALUES (?, ?)', [usuario, contrasena]);
};

const updateAdministrador = (idAdministrador, usuario, contrasena) => {
  return db.query('UPDATE administrador SET usuario = ?, contraseña = ? WHERE idAdministrador = ?', [idAdministrador, usuario, contrasena]);
};

const deleteAdministrador = (idAdministrador) => {
  return db.query('DELETE FROM administrador WHERE idAdministrador = ?', [idAdministrador]);
};

module.exports = { getAdministradores, getAdministradorById, createAdministrador, updateAdministrador, deleteAdministrador };


