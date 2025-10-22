import express from 'express';
import fs from 'fs';

const router = express.Router();

const readData = () => JSON.parse(fs.readFileSync('./db/db.json'));
const writeData = (data) => fs.writeFileSync('./db/db.json', JSON.stringify(data));

router.get('/', (req, res) => {
    const data = readData();
    const user = { name: "Guillermo" };
    const htmlMessage = `<a href="/">Home</a>`;
    res.render("videogame", { user, data, htmlMessage });
});


router.get('/edit_videogame/:id', (req, res) => {
    const user = { name: "Guillermo" };
    const htmlMessage = `<a href="/">Home</a>`;
    
    const data = readData();
    const videogame = data.videogames.find(p => p.id === parseInt(req.params.id));
    
    if (!videogame) return res.status(404).send('Videogame not found');

    res.render("edit_videogame", { user, videogame, htmlMessage });
});

router.get('/create',(req, res) => {
    res.render("create_videogame"); 
});

router.get('/:id', (req, res) => {
    const user = { name: "Guillermo" };
    const htmlMessage = `<a href="/">Home</a>`;
    const data = readData();
    const id = parseInt(req.params.id);
    const videogame = data.videogames.find(v => v.id === id);
    if (!videogame) return res.status(404).send('Videogame not found');
    res.render("detall_videogame", { user, videogame, htmlMessage });
});

router.post('/createVideogame/', (req, res) => {
 const data = readData();
    const { name, type, creator } = req.body; 
    
    if (!name || !type || !creator) return res.status(400).send('Falten camps obligatoris');
    
    const newVideogame = { 
        id: data.videogames.length + 1, 
        name, 
        type, 
        creator,
    };
    
    data.videogames.push(newVideogame);
    writeData(data);
    res.redirect('/videogames');
});

router.put('/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const videogameIndex = data.videogames.findIndex(v => v.id === id);
    if (videogameIndex === -1) return res.status(404).send('Videogame not found');
    data.videogames[videogameIndex] = { ...data.videogames[videogameIndex], ...req.body };
    writeData(data);
    //res.json({ message: "Videogame updated successfully" });
});

router.delete('/:id', (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const videogameIndex = data.videogames.findIndex(v => v.id === id);
    if (videogameIndex === -1) return res.status(404).send('Videogame not found');
    data.videogames.splice(videogameIndex, 1);
    writeData(data);
    res.redirect('/videogames')
    //res.json({ message: "Videogame deleted successfully" });
});

export default router;
