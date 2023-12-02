
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
const multer = require('multer');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


// Configuración de Multer para cargar archivos
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/'); // La carpeta donde se almacenarán los archivos
  },
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + getExtension(file.originalname));
  }
});
// Función auxiliar para obtener la extensión del archivo
function getExtension(filename) {
  const parts = filename.split('.');
  return parts[parts.length - 1];
}
const upload = multer({ storage: storage });

// Servir archivos estáticos
app.post('/upload', upload.single('imagen'), (req, res) => {
  // 'miArchivo' es el nombre del campo en el formulario
  if (req.file) {
    res.send('Archivo cargado con éxito');
  } else {
    res.send('Error al cargar el archivo');
  }
});
// --------------------------Obtener todos los temas----------------------------------
app.get('/temas', async (req, res) => { 
  try {
    const tema = await temasService.getTemas();
    res.status(200).json(tema);
  } catch (error) {
    console.error('Error al obtener los temas y subtemas', error);
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
  const { id_admin,Nombre } = req.body;
  try {
    await temasService.createTema(id_admin,Nombre);
    res.status(201).json({ message: 'Tema agregado exitosamente' });
  } catch (error) {
    console.error('Error al crear un nuevo tema:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Actualizar un tema por ID
app.put('/temas/:id', async (req, res) => {
  const id = req.params.id;
  const {Nombre, id_admin} = req.body;
  try {
    await temasService.updateTema(id, id_admin, Nombre);
    res.status(200).json({ message:'Tema actualizado exitosamente'});
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
    res.status(200).json({ message: 'Subtema eliminado exitosamente' });
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

//obtener boolean de confirmacion para login
app.post('/administrador', async (req, res) => {
  const { usuario, contrasena } = req.body;  
  try {
    const administrador = await adminService.postLogin(usuario, contrasena);
    res.status(200).json(administrador);
  } catch (error) {
    console.error('Error al obtener el administrador para el login:', error);
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
    res.status(200).json({ message: 'Administrador eliminado exitosamente' });
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

//obtener subtemas por ID tema

app.get('/subtemas/tema/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const subtema = await subtemaService.getSubTemaByIdTema(id);
    res.status(200).json(subtema);
  } catch (error) {
    console.error('Error al obtener el subtema por IDTema:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Crear un nuevo subtema
app.post('/subtemas', async (req, res) => {
  const { id_tema, Nombre, Body, Link, Referencia } = req.body;
  try {
    await subtemaService.createSubtema(id_tema, Nombre, Body, Link, Referencia);
    res.status(200).json({ message: 'Subtema agregado exitosamente' });
  } catch (error) {
    console.error('Error al crear un nuevo subtema:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Actualizar un subtema por ID
app.put('/subtemas/:id', async (req, res) => {
  const id = req.params.id;
  const { id_tema, Nombre, Body, Link, Referencia} = req.body;
  try {
    await subtemaService.updateSubtema(id, id_tema, Nombre, Body, Link, Referencia);
    res.status(200).json({message:'Subtema actualizado exitosamente'});
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
    res.status(200).json({ message: 'Subtema eliminado exitosamente' });
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
app.post('/encargados',upload.single('imagen'), async (req, res, next) => {
  const {  id_admin, Nombre, Apellido, Carrera, Especialidad, Investigacion, Universidad} = req.body;
  const imagenPath = req.file ? req.file.path : null;

  if (!file) {
    return res.status(400).send({ message: 'Por favor, carga una imagen.' });
  }

  try {
    await encargadoService.createEncargado(id_admin,Nombre, Apellido, Carrera, Especialidad, Investigacion, Universidad, imagenPath);
    res.status(201).json({ message: 'Encargado creado exitosamente' });;
  } catch (error) {
    console.error('Error al crear un nuevo encargado:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Actualizar un encargado por ID
app.put('/encargados/:id', upload.single('imagen'), async (req, res) => {
  const id = req.params.id;
  const {id_admin,Nombre, Apellido, Carrera, Especialidad, Investigacion, Universidad} = req.body;
  const imagenPath = req.file ? req.file.path : null;

  try {
    await encargadoService.updateEncargado(id, id_admin,Nombre, Apellido, Carrera, Especialidad, Investigacion, Universidad, imagenPath);
    res.status(200).json({message:'Encargado actualizado exitosamente'});
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
    res.status(200).json({ message: 'Encargado eliminado exitosamente' });
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
  const {id_admin, Nombre, Body , Link, Referencia } = req.body;
  try {
    await codigoService.createCodigos(id_admin, Nombre, Body , Link, Referencia);
    res.status(201).json({ message: 'Codigo creado exitosamente' });
  } catch (error) {
    console.error('Error al crear un nuevo código:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Actualizar una codigo por ID
app.put('/codigo/:id', async (req, res) => {
  const id = req.params.id;
  const { id_admin, Nombre, Body , Link, Referencia } = req.body;
  try {
    await codigoService.updateCodigos(id, id_admin, Nombre, Body , Link, Referencia);
    res.status(200).json({ message: 'Codigo actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar la Codigo por ID:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Eliminar una codigo por ID
app.delete('/codigo/:id', async (req, res) => {
  const id = req.params.id;
  try {
    await codigoService.deleteCodigos(id);
    res.status(200).json({ message: 'Codigo eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar la Codigo por ID:', error);
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
app.post('/programacion', upload.single('imagen'), cors(), async (req, res) => {
  
  const { id_admin, Nombre, Body, Link} = req.body;
  const imagenPath = req.file ? req.file.path : null;

  if (!req.file) {
    return res.status(400).send({ message: 'Por favor, carga una imagen.' });
  }

  try {
    await programacionService.createProgramacion( id_admin,Nombre, Body, Link,imagenPath);
    res.status(201).json({ message: 'Programacion actualizado exitosamente' });
  } catch (error) {
    console.error('Error al crear una nueva programacion:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Actualizar una programacion por ID
app.put('/programacion/:id', upload.single('imagen'), async (req, res) => {
  
  const {Nombre, Body, Link, id_admin } = req.body;
  const imagenPath = req.file ? req.file.path : null;
  try {
    await programacionService.updateProgramacion(id,Nombre, Body, Link, id_admin, imagenPath);
    res.status(200).json({message:'programacion actualizada exitosamente'});
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
    res.status(200).json({ message: 'Programación eliminado exitosamente' });
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
app.post('/publicaciones',upload.single('imagen'), async (req, res) => {
  
  const {id_admin, Nombre,Fecha,Body,Referencia,Autor, Link} = req.body;
  const imagenPath = req.file ? req.file.path : null;

  if (!file) {
    return res.status(400).send({ message: 'Por favor, carga una imagen.' });
  }

  try {
    await publicacionesService.createPublicacion(id_admin,Nombre,Fecha,Body,Referencia,Autor, Link, imagenPath);
    res.status(201).json({message: 'Publicación creada exitosamente' });
  } catch (error) {
    console.error('Error al crear una nueva publicación:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Actualizar una publicación por ID
app.put('/publicaciones/:id',upload.single('imagen'), async (req, res) => {
  
  const { Nombre,Fecha,Body,Referencia,Autor, Link} = req.body;
  const imagenPath = req.file ? req.file.path : null;
  try {
    await publicacionesService.updatePublicacion(id, Nombre,Fecha,Body,Referencia,Autor, Link, imagenPath );
    res.status(200).json({message:'Publicación actualizada exitosamente'});
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
    res.status(200).json({ message: 'Publicación eliminado exitosamente' });

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

app.post('/documentacion', upload.single('imagen'), async (req, res) => {
  
  const {id_admin, Nombre,Body,Referencia, Link} = req.body;
  const imagenPath = req.file ? req.file.path : null;

  if (!file) {
    return res.status(400).send({ message: 'Por favor, carga una imagen.' });
  }

  try {
    await documentacionService.createDocumentacion(id_admin,Nombre,Body, Link , Referencia, imagenPath);
    res.status(200).json({ message: 'Documentación eliminado exitosamente' });
  } catch (error) {
    console.error('Error en la ruta /documentacion', error);
    res.status(500).send('Error interno del servidor');
  }
});

app.put('/documentacion/:id', upload.single('imagen'), async (req, res) => {
  
  const { id_admin,Nombre,Body, Link ,Referencia } = req.body;
  const imagenPath = req.file ? req.file.path : null;
  try {
    await documentacionService.updateDocumentacion(id,id_admin,Nombre,Body, Link ,Referencia,imagenPath);
    res.status(200).json({message:'Documentación actualizada exitosamente'});
  } catch (error) {
    console.error('Error en la ruta /documentacion/:id', error);
    res.status(500).send('Error interno del servidor');
  }
});

app.delete('/documentacion/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await documentacionService.deleteDocumentacion(id);
    res.status(200).json({ message: 'Documentación eliminado exitosamente' });
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