# Nella Mente del Gatto

Sito della Dott.ssa Maria Letizia Cau, medico veterinario esperto in
comportamento felino.

Sito statico in HTML, CSS e JavaScript, senza framework né dipendenze.
Non c'è nessun passaggio di build: si modificano direttamente i file in `public/`.

## Struttura

```
public/
├── index.html
├── chi-sono.html
├── come-lavoro.html
├── privacy.html      informativa privacy (testo unico per desktop e mobile)
├── 404.html          pagina per gli indirizzi inesistenti
└── assets/
    ├── css/style.css
    ├── js/main.js
    ├── fonts/        Newsreader e Work Sans (licenza SIL OFL)
    └── img/
```

## Modificare il sito

- Ogni pagina contiene due versioni: quella desktop dentro `<div class="v-desk">`
  e quella mobile dentro `<div class="v-mob">`. Da 1200px di larghezza in su si
  vede la desktop. Un testo va quindi cambiato in entrambe.
- Header e footer sono ripetuti in tutte e tre le pagine.
- Nella versione mobile gli `id` delle sezioni hanno il prefisso `m-`
  (`#m-contatti`, `#m-form`...).
- In `style.css` ci sono, nell'ordine: i font, le regole comuni (`@layer base`)
  e poi una classe per ogni elemento, con nome `pagina-sezione__tag`
  (per esempio `home-hero__h1`); header e footer, comuni a tutte le pagine,
  usano `header__…` e `footer__…`. Le classi della versione mobile iniziano con `m-`.
- I pulsanti "Richiedi una consulenza" puntano al Google Form: per cambiarlo
  cerca `docs.google.com/forms` nelle tre pagine.

## Indirizzi delle pagine

I link interni non hanno l'estensione: `chi-sono` invece di `chi-sono.html`,
`./` per la home. GitHub Pages risponde a `/chi-sono` con `chi-sono.html`.

## Anteprima in locale

```sh
python3 scripts/anteprima.py
```

e apri http://localhost:8765. Su macOS basta un doppio clic su
`scripts/anteprima.command`. Lo script si comporta come GitHub Pages; il server
standard (`python3 -m http.server`) non trova gli indirizzi senza `.html`.

## Pubblicazione

Il sito è pubblicato con GitHub Pages: a ogni push sul branch `main` il workflow
`.github/workflows/pages.yml` pubblica il contenuto di `public/`.
