# Random Quote Machine

Piccola web app che mostra una frase casuale recuperata da un’API esterna (**Advice Slip API**).  
L’obiettivo del progetto è allenare fetch, gestione stati UI e rendering pulito.

---

## Live / Demo
- Demo: https://simonesbds.github.io/quote-machine/

---

## Tech Stack
- HTML
- CSS
- JavaScript (ES6+)
- Fetch API
- Advice Slip API

---

## Funzionalità
- Recupero di una frase casuale da API al click del bottone
- Gestione stati UI:
  - **loading** (disabilita bottone + placeholder)
  - **error** (messaggio di errore)
  - **success** (mostra la frase)
- Rendering “letter-by-letter” con animazione
- Reset della UI ad ogni richiesta (niente contenuti vecchi in pagina)

---

## Come funziona
L’app è costruita con un approccio a stati:

- `loading` controlla se la richiesta è in corso
- `data` contiene la risposta valida
- `error` contiene eventuali errori

Ogni cambiamento di stato richiama `render()` che aggiorna l’interfaccia in modo coerente.

---

## Struttura
- `index.html` → markup
- `style.css` → stile + animazioni
- `script.js` → logica fetch + rendering + stati

---

## Note
L’API di Advice Slip a volte ritorna risposte cache.  
Per questo nel codice viene letta la risposta come `text()` e poi convertita con `JSON.parse()`.

---
