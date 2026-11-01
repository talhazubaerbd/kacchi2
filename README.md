# Kacchi & Plants

**The ethnobotany of Bangladeshi kacchi biryani.** This website shows how one celebration dish connects plants, traditional cooking knowledge and culture.

By **Talha Zubaer**

## Pages

| Page | What it covers |
| --- | --- |
| `index.html` | Home: hero with animated steam, key numbers, field-to-feast journey |
| `dish.html` | What "kacchi" means, kacchi vs pakki, weddings and Eid, Old Dhaka |
| `method.html` | The marinade, the layers and the four steps of dum pukht |
| `plants.html` | Botanical passport (filter by plant part or origin), spices as medicine, where the plants came from |
| `gallery.html` | Photo gallery with a full-screen viewer |
| `about.html` | Personal connection, what the dish represents, research sources |
| `404.html` | Not-found page |

## Project structure

```
kacchi-site/
├── index.html, dish.html, method.html, plants.html, gallery.html, about.html, 404.html
├── css/style.css      shared styles
├── js/main.js         menu, animations, plant filters, gallery viewer
├── assets/img/        photos
├── assets/favicon.svg
└── .nojekyll          tells GitHub Pages to serve the files as they are
```

It is a plain HTML, CSS and JavaScript site. There is nothing to install or build.

## Publish it on GitHub Pages

1. Create a new **public** repository on GitHub, for example `kacchi-biryani`.
2. Upload everything inside this folder (not the folder itself) to the repository: **Add file → Upload files**, drag the files and folders in, then **Commit changes**.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, set **Source** to *Deploy from a branch*, choose the `main` branch and the `/ (root)` folder, then **Save**.
5. After a minute or two, your site will be live at `https://<your-username>.github.io/kacchi-biryani/`.

## Preview it on your computer

Open `index.html` in any browser, or run a small local server from this folder:

```
python -m http.server 8000
```

then visit `http://localhost:8000`.

## Sources

- Tourism Bangladesh: Food, kacchi biryani
- Bangladesh Tourism Board: Kachchi Biriyani
- Dhaka Tribune: Looking back at the history of Kacchi biryani
- The Daily Star: How kachchi biriyani became a symbol of wedding prestige
- Michelin Guide: Kitchen Language, What Is Dum Pukht?
- Jahan Lipa (2021): Bangladeshi Rice Culture
- National Library of Medicine: Herbal Spices as Food and Medicine
- Royal Botanic Gardens, Kew: Plants of the World Online

Medicinal uses described on the site are traditional uses, not medical advice.
