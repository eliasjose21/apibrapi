const TOKEN = "52qkmAVUumop1FkcmCL6GB";
const tickers = ["AZUL4", "CRFB3", "HAPV3", "COGN3", "BBAS3", "ITSA4", "PETR4"];

const proxy = "https://cors-anywhere.herokuapp.com/";
const url = `${proxy}https://brapi.dev/api/quote?symbol=${tickers.join(",")}`;

fetch(url, {
  headers: {
    "Authorization": `Bearer ${TOKEN}`
  }
})
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById("banner");

    if (!data.results) {
      throw new Error("Dados não retornados corretamente");
    }

    data.results.forEach(stock => {
      const card = document.createElement("div");
      card.className = "card";

      const price = parseFloat(stock.regularMarketPrice).toFixed(2);
      const change = parseFloat(stock.regularMarketChangePercent).toFixed(2);
      const isPositive = change >= 0;

      card.innerHTML = `
        <div class="ticker">${stock.symbol}</div>
        <div class="company">${stock.shortName}</div>
        <div class="price">R$ ${price}</div>
        <div class="change ${isPositive ? 'positive' : 'negative'}">
          ${isPositive ? '+' : ''}${change}%
        </div>
      `;

      container.appendChild(card);
    });
  })
  .catch(error => {
    console.error("Erro ao buscar dados:", error);
  });
