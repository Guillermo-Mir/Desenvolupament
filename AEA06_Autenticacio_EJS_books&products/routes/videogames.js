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
    res.render("videogame", { user, data, htmlMessage });
});

router.get('/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const videogame = data.videogames.find(v => v.id === id);
    if (!videogame) return res.status(404).send('Videogame not found');
    res.json(videogame);
});

router.post('/', (req, res) => {
    const data = readData();
    const body = req.body;
    const newVideogame = { id: data.videogames.length + 1, ...body };
    data.videogames.push(newVideogame);
    writeData(data);
    res.json(newVideogame);
});

router.put('/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const videogameIndex = data.videogames.findIndex(v => v.id === id);
    if (videogameIndex === -1) return res.status(404).send('Videogame not found');
    data.videogames[videogameIndex] = { ...data.videogames[videogameIndex], ...req.body };
    writeData(data);
    res.json({ message: "Videogame updated successfully" });
});

router.delete('/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const videogameIndex = data.videogames.findIndex(v => v.id === id);
    if (videogameIndex === -1) return res.status(404).send('Videogame not found');
    data.videogames.splice(videogameIndex, 1);
    writeData(data);
    res.json({ message: "Videogame deleted successfully" });
});

export default router;
