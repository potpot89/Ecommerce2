/*
  Suggerimenti: 
    V faccio un fetch sull'endpoint per ottenere le categorie
    V creo i pulsanti per ogni categoria
    V inserisco i pulsanti nel DOM
    V creo il listener per i pulsanti
    V ogni pulsante chiama la stessa funzione, ma con parametri diversi
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

      //addEventListener to each button so that each of them calls the same function, that will have different parameters
      categoryButton.addEventListener(`click`, getProduct);
      function getProduct() {
        let categoryLink = "https://fakestoreapi.com/products/category/" + cat;
        return fetch(categoryLink)
          .then((res) => res.json())
          .then((json) => {
            console.log(json);
            json.forEach((product) => {
              console.log({ product });

              //for each product add a div in the <main>

              const objContainer = document.createElement("div");
              mainHTML.appendChild(objContainer);

              //for each product return the key, value pairs in a div

              Object.entries(product).forEach(([key, value]) => {
                const h3 = document.createElement("h3");
                h3.textContent = `${key}: ${value}`;
                objContainer.appendChild(h3);
              });
            });
          });
        //remove the div when clicking another button
      }
    });
  });
