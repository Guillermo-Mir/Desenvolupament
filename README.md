Aquest repositori conté una aplicació web funcional per gestionar **videogames** i **Pokémon**, amb dades d'exemple en fitxers `.json`.

---

## Contingut del repositori

db/ ├─ db.json → Base de dades principal (Pokémons i Videojocs) └─ User.json → Fitxer d’usuaris registrats public/ ├─ *.css → Fitxers d’estils (home.css, login.css, etc.) routes/ ├─ pokemons.js → Rutes CRUD per Pokémons └─ videogames.js → Rutes CRUD per Videojocs views/ ├─ create_pokemon.ejs ├─ edit_pokemon.ejs ├─ detail_pokemon.ejs ├─ create_videogame.ejs ├─ edit_videogame.ejs ├─ detail_videogame.ejs ├─ home.ejs ├─ login.ejs └─ ... → Vistes EJS per cada acció config.js → Configuració general (ports, paths, etc.) server.js → Punt d’entrada del servidor Express user-repository.js → Gestió d’usuaris (login, validació, etc.) request.http → Fitxer per proves d’API README.md → Documentació

---
