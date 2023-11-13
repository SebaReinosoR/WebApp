
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./db.js'); // Importa el módulo de conexión a la base de datos

const temasService = require('./temas.service.js');
const adminService = require('./administrador.service');
const subtemaService = require('./subtemas.service');
const encargadoService = require('./encargados.service');
const codigoService = require('./codigo.service.js');
const programacionService = require('./programacion.service.js');
const documentacionService = require('./documentacion.service');
const publicacionesService = require('./publicaciones.service');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


// --------------------------Obtener todos los temas----------------------------------
app.get('/temas', async (req, res) => {
  try {
    const temas = await temasService.getTemas();
    res.status(200).json(temas);
  } catch (error) {
    console.error('Error al obtener los temas:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Obtener un tema por ID
app.get('/temas/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const tema = await temasService.getTemaById(id);
    res.status(200).json(tema);
  } catch (error) {
    console.error('Error al obtener el tema por ID:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Crear un nuevo tema
app.post('/temas', async (req, res) => {
  const { nombre, id_subtema } = req.body;
  try {
    await temasService.createTema(nombre, id_subtema);
    res.status(201).send('Tema creado exitosamente');
  } catch (error) {
    console.error('Error al crear un nuevo tema:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Actualizar un tema por ID
app.put('/temas/:id', async (req, res) => {
  const id = req.params.id;
  const { nombre, id_subtema } = req.body;
  try {
    await temasService.updateTema(id, nombre, id_subtema);
    res.status(200).send('Tema actualizado exitosamente');
  } catch (error) {
    console.error('Error al actualizar el tema por ID:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Eliminar un tema por ID
app.delete('/temas/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await temasService.deleteTema(id);
    res.status(200).send('Tema eliminado exitosamente');
  } catch (error) {
    console.error('Error al eliminar el tema por ID:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// ------------------------------Obtener todos los administradores----------------------------------------------
app.get('/administradores', async (req, res) => {
  try {
    const administradores = await adminService.getAdministradores();
    res.status(200).json(administradores);
  } catch (error) {
    console.error('Error al obtener los administradores:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Obtener un administrador por ID
app.get('/administradores/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const administrador = await adminService.getAdministradorById(id);
    res.status(200).json(administrador);
  } catch (error) {
    console.error('Error al obtener el administrador por ID:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Crear un nuevo administrador
app.post('/administradores', async (req, res) => {
  const { usuario, contrasena } = req.body;
  try {
    await adminService.createAdministrador(usuario, contrasena);
    res.status(201).send('Administrador creado exitosamente');
  } catch (error) {
    console.error('Error al crear un nuevo administrador:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Actualizar un administrador por ID
app.put('/administradores/:id', async (req, res) => {
  const id = req.params.id;
  const { usuario, contrasena } = req.body;
  try {
    await adminService.updateAdministrador(id, usuario, contrasena);
    res.status(200).send('Administrador actualizado exitosamente');
  } catch (error) {
    console.error('Error al actualizar el administrador por ID:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Eliminar un administrador por ID
app.delete('/administradores/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await adminService.deleteAdministrador(id);
    res.status(200).send('Administrador eliminado exitosamente');
  } catch (error) {
    console.error('Error al eliminar el administrador por ID:', error);
    res.status(500).send('Error interno del servidor');
  }
});
// ------------------------------Subtemas----------------------------------------------
/*CRUD SUBTEMAS*/
// Obtener todos los subtemas
app.get('/subtemas', async (req, res) => {
  try {
    const subtemas = await subtemaService.getSubtemas();
    res.status(200).json(subtemas);
  } catch (error) {
    console.error('Error al obtener los subtemas:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Obtener un subtema por ID
app.get('/subtemas/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const subtema = await subtemaService.getSubtemaById(id);
    res.status(200).json(subtema);
  } catch (error) {
    console.error('Error al obtener el subtema por ID:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Crear un nuevo subtema
app.post('/subtemas', async (req, res) => {
  const { nombre, id_tema } = req.body;
  try {
    await subtemaService.createSubtema(nombre, id_tema);
    res.status(201).send('Subtema creado exitosamente');
  } catch (error) {
    console.error('Error al crear un nuevo subtema:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Actualizar un subtema por ID
app.put('/subtemas/:id', async (req, res) => {
  const id = req.params.id;
  const { nombre, id_tema } = req.body;
  try {
    await subtemaService.updateSubtema(id, nombre, id_tema);
    res.status(200).send('Subtema actualizado exitosamente');
  } catch (error) {
    console.error('Error al actualizar el subtema por ID:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Eliminar un subtema por ID
app.delete('/subtemas/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await subtemaService.deleteSubtema(id);
    res.status(200).send('Subtema eliminado exitosamente');
  } catch (error) {
    console.error('Error al eliminar el subtema por ID:', error);
    res.status(500).send('Error interno del servidor');
  }
});


/*-------------------------CRUD ENCARGADOS--------------------------------*/
// Obtener todos los encargados
app.get('/encargados', async (req, res) => {
  try {
    const encargados = await encargadoService.getEncargados();
    res.status(200).json(encargados);
  } catch (error) {
    console.error('Error al obtener los encargados:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Obtener un encargado por ID
app.get('/encargados/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const encargado = await encargadoService.getEncargadoById(id);
    res.status(200).json(encargado);
  } catch (error) {
    console.error('Error al obtener el encargado por ID:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Crear un nuevo encargado
app.post('/encargados', async (req, res) => {
  const { nombre,  carrera, especialidad, investigacion, universidad} = req.body;
  try {
    await encargadoService.createEncargado(nombre, carrera, especialidad, investigacion, universidad);
    res.status(201).send('Encargado creado exitosamente');
  } catch (error) {
    console.error('Error al crear un nuevo encargado:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Actualizar un encargado por ID
app.put('/encargados/:id', async (req, res) => {
  const id = req.params.id;
  const { nombre,  carrera, especialidad, investigacion, universidad} = req.body;
  try {
    await encargadoService.updateEncargado(id, nombre, carrera, especialidad, investigacion, universidad);
    res.status(200).send('Encargado actualizado exitosamente');
  } catch (error) {
    console.error('Error al actualizar el encargado por ID:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Eliminar un encargado por ID
app.delete('/encargados/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await encargadoService.deleteEncargado(id);
    res.status(200).send('Encargado eliminado exitosamente');
  } catch (error) {
    console.error('Error al eliminar el encargado por ID:', error);
    res.status(500).send('Error interno del servidor');
  }
});

//--------------------------------codigo-------------------------------------------------
// Obtener todos los codigos
app.get('/codigo', async (req, res) => {
  try {
    const codigos = await codigoService.getCodigos();
    res.status(200).json(codigos);
  } catch (error) {
    console.error('Error al obtener los codigos:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Obtener una codigo por ID
app.get('/codigo/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const codigos = await codigoService.getCodigosById(id);
    res.status(200).json(codigos);
  } catch (error) {
    console.error('Error al obtener la código por ID:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Crear una nuevo codigo
app.post('/codigo', async (req, res) => {
  const { nombre, descripcion, link } = req.body;
  try {
    await codigoService.createCodigos(nombre, descripcion, link);
    res.status(201).send('Código creado exitosamente');
  } catch (error) {
    console.error('Error al crear un nuevo código:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Actualizar una codigo por ID
app.put('/codigo/:id', async (req, res) => {
  const id = req.params.id;
  const { nombre,  descripcion, link } = req.body;
  try {
    await programacionService.updateCodigos(id, nombre, descripcion, link);
    res.status(200).send('Programacion actualizada exitosamente');
  } catch (error) {
    console.error('Error al actualizar la programacion por ID:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Eliminar una codigo por ID
app.delete('/codigo/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await codigoService.deleteCodigos(id);
    res.status(200).send('codigo eliminado exitosamente');
  } catch (error) {
    console.error('Error al eliminar la programacion por ID:', error);
    res.status(500).send('Error interno del servidor');
  }
});
/*------------------------------------------CRUDS programacion------------------------------------------------ */
/// Obtener todas la programacion
app.get('/programacion', async (req, res) => {
  try {
    const programacion = await programacionService.getProgramacion();
    res.status(200).json(programacion);
  } catch (error) {
    console.error('Error al obtener la programacion:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Obtener una programacion por ID
app.get('/programacion/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const programacion = await programacionService.getProgramacionById(id);
    res.status(200).json(programacion);
  } catch (error) {
    console.error('Error al obtener la buena práctica por ID:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Crear una programacion
app.post('/progrmacion', async (req, res) => {
  const { nombre, informacion } = req.body;
  try {
    await programacionService.createProgramacion(nombre, informacion);
    res.status(201).send('Programacion creada exitosamente');
  } catch (error) {
    console.error('Error al crear una nueva programacion:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Actualizar una programacion por ID
app.put('/programacion/:id', async (req, res) => {
  const id = req.params.id;
  const { nombre, informacion } = req.body;
  try {
    await programacionService.updateProgramacion(id, nombre, informacion);
    res.status(200).send('programacion actualizada exitosamente');
  } catch (error) {
    console.error('Error al actualizar la programacion por ID:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Eliminar una programacion por ID
app.delete('/programacion/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await programacionService.deleteProgramacion(id);
    res.status(200).send('Programacion eliminada exitosamente');
  } catch (error) {
    console.error('Error al eliminar la programacion por ID:', error);
    res.status(500).send('Error interno del servidor');
  }
});
/*------------------------------------------CRUDS PUBLICACIONES-----------------------------------------------*/
// Obtener todas las publicaciones
app.get('/publicaciones', async (req, res) => {
  try {
    const publicaciones = await publicacionesService.getPublicacion();
    res.status(200).json(publicaciones);
  } catch (error) {
    console.error('Error al obtener las publicaciones:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Obtener una publicación por ID
app.get('/publicaciones/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const publicacion = await publicacionesService.getPublicacionById(id);
    res.status(200).json(publicacion);
  } catch (error) {
    console.error('Error al obtener la publicación por ID:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Crear una nueva publicación
app.post('/publicaciones', async (req, res) => {
  const { nombre,fecha,cuerpo,referencia,autor} = req.body;
  try {
    await publicacionesService.createPublicacion(nombre,fecha,cuerpo,referencia,autor);
    res.status(201).send('Publicación creada exitosamente');
  } catch (error) {
    console.error('Error al crear una nueva publicación:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Actualizar una publicación por ID
app.put('/publicaciones/:id', async (req, res) => {
  const id = req.params.id;
  const { nombre,fecha,cuerpo,referencia,autor} = req.body;
  try {
    await publicacionesService.updatePublicacion(id, nombre,fecha,cuerpo,referencia,autor);
    res.status(200).send('Publicación actualizada exitosamente');
  } catch (error) {
    console.error('Error al actualizar la publicación por ID:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Eliminar una publicación por ID
app.delete('/publicaciones/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await publicacionesService.deletePublicacion(id);
    res.status(200).send('Publicación eliminada exitosamente');
  } catch (error) {
    console.error('Error al eliminar la publicación por ID:', error);
    res.status(500).send('Error interno del servidor');
  }
});


/*------------------------------------------CRUDS DOCUMENTACION-----------------------------------------------*/
// Rutas para documentacion
app.get('/documentacion', async (req, res) => {
  try {
    const documentacion = await documentacionService.getDocumentacion();
    res.status(200).json(documentacion);
  } catch (error) {
    console.error('Error en la ruta /documentacion', error);
    res.status(500).send('Error interno del servidor');
  }
});

app.get('/documentacion/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const documentacion = await documentacionService.getDocumentacionById(id);
    res.status(200).json(documentacion);
  } catch (error) {
    console.error('Error en la ruta /documentacion/:id', error);
    res.status(500).send('Error interno del servidor');
  }
});

app.post('/documentacion', async (req, res) => {
  const { nombre, informacion } = req.body;
  try {
    await documentacionService.createDocumentacion(nombre, informacion);
    res.status(201).send('Documentación creada exitosamente');
  } catch (error) {
    console.error('Error en la ruta /documentacion', error);
    res.status(500).send('Error interno del servidor');
  }
});

app.put('/documentacion/:id', async (req, res) => {
  const { id } = req.params;
  const { nombre, informacion } = req.body;
  try {
    await documentacionService.updateDocumentacion(id, nombre, informacion);
    res.status(200).send('Documentación actualizada exitosamente');
  } catch (error) {
    console.error('Error en la ruta /documentacion/:id', error);
    res.status(500).send('Error interno del servidor');
  }
});

app.delete('/documentacion/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await documentacionService.deleteDocumentacion(id);
    res.status(200).send('Documentación eliminada exitosamente');
  } catch (error) {
    console.error('Error en la ruta /documentacion/:id', error);
    res.status(500).send('Error interno del servidor');
  }
});


//inicia servidor para solicitudes en el puerto especificado
const PORT = 3000;
app.listen(PORT, async () => {
  try {
    await db.connectDB();
    console.log(`App listening at http://localhost:${PORT}`);
  } catch (error) {
    console.error('Error connecting to the database', error);
  }
});