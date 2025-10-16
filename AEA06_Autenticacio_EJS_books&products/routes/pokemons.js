import express from 'express';
import fs from 'fs';

const router = express.Router();

const readData = () => JSON.parse(fs.readFileSync('./db/db.json'));
const writeData = (data) => fs.writeFileSync('./db/db.json', JSON.stringify(data));

router.get('/', (req, res) => {
    const data = readData();
    const user = { name: "Guillermo" };
    const htmlMessage = `<p>Aquest és un text <strong>amb estil</strong> i un enllaç:</p>
                         <a href="/">Home</a>`;
    res.render("pokemon", { user, data, htmlMessage });
});

router.get('/edit_pokemon/:id', (req, res) => {
    const user = { name: "Guillermo" };
    const htmlMessage = `
    <p>Aquest és un text <strong>amb estil</strong> i un enllaç:</p>
    <a href="/products">Llistat de productes</a>`;
    
    const data = readData();
    const pokemon = data.pokemons.find(p => p.id === parseInt(req.params.id));
    
    if (!pokemon) return res.status(404).send('Pokemon not found');

    res.render("edit_pokemon", { user, pokemon, htmlMessage });
});

router.get('/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const pokemon = data.pokemons.find(pokemon => pokemon.id === id);
    if (!pokemon) return res.status(404).send('Pokemon not found');
    res.json(pokemon);
});

router.post('/', (req, res) => {
    const data = readData();
    const body = req.body;
    const newPokemon = { id: data.pokemons.length + 1, ...body };
    data.pokemons.push(newPokemon);
    writeData(data);
    res.json(newPokemon);
});

router.put('/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const pokemonIndex = data.pokemons.findIndex(pokemon => pokemon.id === id);
    if (pokemonIndex === -1) return res.status(404).send('Pokemon not found');
    data.pokemons[pokemonIndex] = { ...data.pokemons[pokemonIndex], ...req.body };
    writeData(data);
    res.json({ message: "Pokemon updated successfully" });
});

router.delete('/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const pokemonIndex = data.pokemons.findIndex(pokemon => pokemon.id === id);
    if (pokemonIndex === -1) return res.status(404).send('Pokemon not found');
    data.pokemons.splice(pokemonIndex, 1);
    writeData(data);
    res.json({ message: "Pokemon deleted successfully" });
});

export default router;
