import bcryptjs from 'bcryptjs';
import DBLocal from 'db-local';
import crypto from 'node:crypto';
import { SALT_ROUNDS } from './config.js';

// Creació de la conexió amb la base de dades
const { Schema } = new DBLocal({ path: './db' });

// Creem un esquema per les dades amb els camps especificats
const User = Schema('User', {
    _id: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true }
});

// Exportem en una classe per crear usuaris i fer login
export class UserRepository {
    static async create({ username, password }) {
        // 1. Validació opcional dels camps
        Validation.username(username);
        Validation.password(password);

        // 2. Asegurarse que el username no existe
        const user = await User.findOne({ username });
        // Si el usuario existe salta error
        if (user) throw new Error('Username already exists'); // si entra en este if se corta la ejecución

        // 3. Creamos un id si fuera una base de datos normal
        // mejor que lo genere la base de datos
        const id = crypto.randomUUID();

        // Hasheamos la contraseña
        const hashedPassword = await bcryptjs.hash(password, SALT_ROUNDS);

        // 4. Creamos el usuario
        await User.create({
            _id: id,
            username,
            password: hashedPassword
        }).save();

        return id;
    }

    // Método login pendiente de implementación
    static async login({ username, password }) {
        // Aquí se implementaría la lógica de login usando bcryptjs.compare
    }
}

// Clase de validación de campos
class Validation {
    static username(username) {
        if (typeof username !== 'string') throw new Error('username must be a string');
        if (username.length < 3) throw new Error('Username debe tener más de 3 caracteres');
    }
    static password(password) {
        if (typeof password !== 'string') throw new Error('password must be a string');
        if (password.length < 6) throw new Error('password debe tener más de 5 caracteres');
    }
}
