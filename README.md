# Guess The Year Game

![Banner](static/guess-the-year%20cover.png?raw=true)
Made by : **David Han (@davjhan on github)**
# Try it out!
Play the game here: [`Guess The Year Game`](https://guess-the-year.davjhan.com/)

# Built with
- [`Svelte Kit`](https://kit.svelte.dev/)
- Tailwind CSS (JIT)
- Netlify
- Uses Plausible analytics (cookie-less)

Generates a static app that is hosted on Netlify.

# Get Started

⚠️ This repo will not build out of the box. It has a dependency on [davjhan-core](https://github.
com/davjhan/davjhan-core)
which is not published on npm. If you want to build this project, follow the steps in that package's README.

`davjhan-core` includes common tailwind styles, css, and components (e.g. Navbar) that will be reused between david 
games. I use `yalc link davjhan-core` on my local machine so that it builds.

## Questions database
I sourced Wikipedia to hand-compile a database of questions in Airtable. I then have a script, 
`scripts/download-questions.
ts`, that downloads the questions to a json file. It sits at 12kb for 120+ questions.

# Commands
### Run the dev server
```bash
npm run dev
```

### Download the questions.json from Airtable database
```bash
npm run download-questions
```

### Build and preview
```bash
npm run build
```
```bash
npm run preview
```
### Deploy to Netlify
```bash
npm run deploy
```