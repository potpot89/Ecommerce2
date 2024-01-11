/*
  Suggerimenti: 
    V faccio un fetch sull'endpoint per ottenere le categorie
    V creo i pulsanti per ogni categoria
    V inserisco i pulsanti nel DOM
    V creo il listener per i pulsanti
    - ogni pulsante chiama la stessa funzione, ma con parametri diversi
    - questa funzione farà la fetch all'endpoint per ottenere i prodotti della categoria specificata come argomento
    - faccio un ciclo per generare un l'elenco di prodotti nel DOM
    - per ogni prodotto potrei mostrare titolo, descrizione, prezzo e foto
*/

//fetch the categories from the API
fetch("https://fakestoreapi.com/products/categories")
  .then((res) => res.json())
  //add elements in this function to manipulate the DOM
  .then((json) => {
    console.log(json);
    let mainHTML = document.querySelector(`main`);

    //add a button in the DOM, for each category of products
    json.forEach((cat) => {
      let categoryButton = document.createElement(`button`);
      categoryButton.textContent = cat;
      mainHTML.appendChild(categoryButton);

      //addEventListener to each button
      categoryButton.addEventListener(`click`, hello);
      function hello() {
        return alert(`hello`);
      }
    });
  });
