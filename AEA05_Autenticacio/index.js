import express from "express";
import { PORT, SECRET_JWT_KEY } from "./config.js";
import { UserRepository } from "./user-repository.js";

const app = express(); // crear el servidor

// Middlewares
app.use(express.json()); // permite que el servidor reciba JSON desde el frontend
app.use(express.static("public")); // Carrega css (y otros archivos estáticos como JS, imágenes)

// Configuración de motor de plantillas
app.set('view engine', 'ejs'); // Motor de plantillas
app.set('views', './views');   // Carpeta donde están las vistas

// Inicia el servidor
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// --- Inici dels endpoints --- //

// Ruta principal, renderiza la vista 'register'
app.get('/', (req, res) => {
    // const { user } = req.session   // ejemplo de cómo se usaría una sesión
    res.render('register'); // renderiza el formulario de registro
});

// Endpoint para registrar usuarios
app.post('/register', async (req, res) => { // Hacer async para poder usar await
    const { username, password } = req.body; // desestructurar del body lo que queremos usar
    console.log(req.body)
    try {
        const id = await UserRepository.create({ username, password }); // await para la creación del usuario
        res.send(id); // respuesta de éxito
    } catch (error) {
        console.error(error);
        res.status(400).send({ error: error.message }); // enviar mensaje de error al cliente
    };
});


