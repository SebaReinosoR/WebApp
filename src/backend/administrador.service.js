// admin.service.js
const db = require('./db');

const getAdministradores = () => {
  return db.query('SELECT * FROM administrador');
};

const getAdministradorById = (idAdministrador) => {
  return db.query('SELECT * FROM administrador WHERE idAdministrador = ?', [idAdministrador]);
};

const postLogin = (usuario, contrasena) => {
  return db.query('SELECT * FROM administrador WHERE usuario = ? AND contrasena = ?', [usuario, contrasena]);
};

const createAdministrador = (usuario, contrasena) => {
  return db.query('INSERT INTO administrador (usuario, contrasena) VALUES (?, ?)', [usuario, contrasena]);
};

const updateAdministrador = (idAdministrador, usuario, contrasena) => {
  return db.query('UPDATE administrador SET usuario = ?, contrasena = ? WHERE idAdministrador = ?', [usuario, contrasena,idAdministrador]);
};

const deleteAdministrador = (idAdministrador) => {
  return db.query('DELETE FROM administrador WHERE idAdministrador = ?', [idAdministrador]);
};

module.exports = {postLogin, getAdministradores, getAdministradorById, createAdministrador, updateAdministrador, deleteAdministrador };


