import express from "express";
import { PORT, SECRET_JWT_KEY } from "./config.js";
import { UserRepository } from "./user-repository.js";
import cookieParser from "cookie-parser";

const app = express(); // crear el servidor

// Middlewares
app.use(express.json()); // permite que el servidor reciba JSON desde el frontend
app.use(cookieParser()) // habilita el manejo de cookies en el servidor
app.use(express.static("public")); // Carrega css (y otros archivos estáticos como JS, imágenes)

// Configuración de motor de plantillas
app.set('view engine', 'ejs'); // Motor de plantillas
app.set('views', './views');   // Carpeta donde están las vistas

// Inicia el servidor
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// --- Inici dels endpoints --- //

// Ruta principal, renderiza la vista 'register'
//app.get('quin punt s'ha sol·licitat', (req, res) => {Quina resposta donare});
app.get('/', (req, res) => {
    // const { user } = req.session   // ejemplo de cómo se usaría una sesión
    res.render('register'); // renderiza el formulario de registro
});

app.get('/protected', (req, res) => {
        res.render('protected'); // renderiza el formulario de registro
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

app.post('/login', async(req, res) => {
try {
    const { username, password } = req.body
    console.log('llego aqui')
    const user = await UserRepository.login(username, password)
    console.log('llego aqui 1')
    const token = jwt.sign(
      { id: user.id, username: user.username },
      SECRET_JWT_KEY,
      { expiresIn: '1h' }
    )
    console.log('llego aqui 2')
    res
      .cookie('access_token', token, {
        httpOnly: true, // la cookie solo se puede acceder en el servidor, no podrem fer un document.cookie
        // secure: true, // la cookie solo funciona en https
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict', // la cookie es pot accedir dins del domini
        maxAge: 1000 * 60 * 60 // la cookie te un temps de validesa d'una hora
      })
      .send({ user, token })
  } catch (error) {
    // 401 = no autoritzacio
    res.status(401).send(error.message)
  }
    
})


