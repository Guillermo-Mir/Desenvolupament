import bcrypt from 'bcryptjs'
import DBLocal from 'db-local'
import crypto from 'node:crypto'
import { SALT_ROUNDS } from './config'
import { type } from 'node:os'
import { use } from 'react'
// import path from 'node:path'
const { Schema } = new DBLocal({ path: './db' }) //creació de la conexió amb la base de dades

//Creem un esquema per les dades amb els camps especificats
const User = Schema('User', {
    _id: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true }

})

//Exportem en una clase per crear usuaris i fer login
export class UserRepository {
    static async create({ username, password }) {
        //1. Validacio opcional que el 
        Validation.username(username)
        Validation.password(password)
        //2. Asegurarse que el username no existe
        const user = User.fidOne({ username })
        //Si el usuario existe salta error
        if (user) throw new Error('username alrady exist') //si entra en este if se corta la ejecucion

        //3.Creamos un id si fuera una base de datos normal
        // mejor que lo genere la base de datos
        const id = crypto.randomUUID()

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        //4.Creamos el usuario
        User.create({
            _id: id,
            username,
            password: hashedPassword
        }).save()
        return id
    }
    static async login({username, password}){

    } 
}
class Validation {
    static username(username) {
        if (typeof username != 'string') throw new Error('username must be a string');
        if (username.length < 3) throw new Error('Username superior a 3 caracteres');

    }
    static password(password) {
        if (typeof password != 'string') throw new Error('sdfjkl must be a string');
        if (password.length < 6) throw new Error('password superior a 5 caracteres');

    }
}