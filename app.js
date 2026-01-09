const loadQuoteBtn = document.querySelector("#load-quote-btn");
const messageArea = document.querySelector("#message-area");
const quoteOutput = document.querySelector("#quote-output");

// State
let loading = false;
let data = null;
let error = null;

// Render
function render() {
  loadQuoteBtn.disabled = loading;

  // Reset message + breath state
  quoteOutput.classList.remove("is-alive");

  if (loading) {
    messageArea.textContent = "…";
    quoteOutput.classList.add("is-hidden");
    return;
  }

  if (error) {
    messageArea.textContent = error;
    quoteOutput.classList.add("is-hidden");
    return;
  }

  messageArea.textContent = "";

  if (!data) {
    quoteOutput.classList.add("is-hidden");
    return;
  }

  // Success
  quoteOutput.classList.remove("is-hidden");

  const quoteText = data?.slip?.advice ?? "";
  renderAnimatedQuote(`“${quoteText}”`);

  quoteOutput.classList.add("is-alive");
}

// Animation
function renderAnimatedQuote(text) {
  quoteOutput.innerHTML = "";

  const letters = text.split("");
  const baseDelay = 0.04;

  letters.forEach((char, index) => {
    const span = document.createElement("span");
    span.textContent = char === " " ? "\u00A0" : char;
    span.className = "letter";

    if (char === "“" || char === "”") {
      span.classList.add("quote-mark");
    }

    const organicDelay = index * baseDelay + Math.random() * 0.15;
    span.style.animationDelay = `${organicDelay}s`;

    quoteOutput.appendChild(span);
  });
}

// Data
async function loadQuote() {
  loading = true;
  data = null;
  error = null;
  render();

  await new Promise((resolve) => setTimeout(resolve, 300));

  try {
    const response = await fetch("https://api.adviceslip.com/advice");

    if (!response.ok) {
      throw new Error(
        `Errore ${response.status}. Impossibile caricare la citazione.`
      );
    }

    const raw = await response.text();
    data = JSON.parse(raw);
  } catch (e) {
    error = e.message;
  } finally {
    loading = false;
    render();
  }
}

loadQuoteBtn.addEventListener("click", loadQuote);
