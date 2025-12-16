import express from 'express';
import fs from 'fs';

const router = express.Router();

const readData = () => JSON.parse(fs.readFileSync('./db/db.json'));
const writeData = (data) => fs.writeFileSync('./db/db.json', JSON.stringify(data));


router.get('/', (req, res) => {
    const data = readData();
    const user = { name: "Guillermo" };
    const htmlMessage = `<a href="/">Home</a>`;
    res.render("pokemon", { user, data, htmlMessage });//hay que modificar todos los renders
});


router.get('/edit_pokemon/:id', (req, res) => {
    const user = { name: "Guillermo" };
    const htmlMessage = `<a href="/">Home</a>`;

    const data = readData();
    const pokemon = data.pokemons.find(p => p.id === parseInt(req.params.id));

    if (!pokemon) return res.status(404).send('Pokemon not found');

    res.render("edit_pokemon", { user, pokemon, htmlMessage });
});

router.get('/create', (req, res) => {
    res.render("create_pokemon");
});

router.get('/:id', (req, res) => {
    const user = { name: "Guillermo" };
    const htmlMessage = `<a href="/">Home</a>`;
    const data = readData();
    const id = parseInt(req.params.id);
    const pokemon = data.pokemons.find(pokemon => pokemon.id === id);
    if (!pokemon) return res.status(404).send('Pokemon not found');
    res.render("detall_pokemon", { user, pokemon, htmlMessage });
});



router.post('/createPokemon/', (req, res) => {
    const data = readData();
    const { name, type, generation } = req.body;

    if (!name || !type || !generation) return res.status(400).send('Falten camps obligatoris');

    const newPokemon = {
        id: data.pokemons.length + 1,
        name,
        type,
        generation,
    };

    data.pokemons.push(newPokemon);
    writeData(data);
    res.redirect('/pokemons');
});


router.put('/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const pokemonIndex = data.pokemons.findIndex(pokemon => pokemon.id === id);
    if (pokemonIndex === -1) return res.status(404).send('Pokemon not found');
    data.pokemons[pokemonIndex] = { ...data.pokemons[pokemonIndex], ...req.body };
    writeData(data);
    //res.json({ message: "Pokemon updated successfully" });
});

router.delete('/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const pokemonIndex = data.pokemons.findIndex(pokemon => pokemon.id === id);
    if (pokemonIndex === -1) return res.status(404).send('Pokemon not found');
    data.pokemons.splice(pokemonIndex, 1);
    writeData(data);
    res.redirect('/pokemons')
    //res.json({ message: "Pokemon deleted successfully" });
});

export default router;
