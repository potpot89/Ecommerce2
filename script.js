//links for API
// https://fakestoreapi.com/products/categories
// https://fakestoreapi.com/products/category/productname

const buttonsContainer = document.getElementById(`navMenu`);

let mainHTML = document.querySelector(`main`);

//fetch the categories from the API
function getCategories() {
  fetch("https://fakestoreapi.com/products/categories")
    .then((response) => response.json()) // it convert the response of the server in a json file which is readable to human
    .then((categories) => createButtons(categories)); // it takes the categories and runs the createButtons(categories) function, to create a button for each category -> write the createButtons() (1)
}

//(2) create the getProductsByCategory(category) function that fetches the products from the endpoint / API
function getProductsByCategory(category) {
  fetch(`https://fakestoreapi.com/products/category/${category}`)
    //then create the response we will get from the server and transform it into json()
    .then((response) => response.json())
    //then take the elements we will get (that in this case we call `products` and pass them in a function that will give us the list of the products - create the function (3)
    .then((products) => createProducts(products));
}

//(1) create the function createButtons(categories) that creates a button for each category
function createButtons(categories) {
  categories.forEach((category) => {
    let button = document.createElement(`button`);
    button.textContent = category;
    navMenu.appendChild(button);
  });
}

//(3) create the createProducts(products) function
function createProducts(products) {
  //start by clearing the content every time another button is pressed
  mainHTML.textContent = "";

  //for each product, create the various html elements that have to be imported in the DOM
  products.forEach((product) => {
    let productContainer = document.createElement(`article`);
    //add the title of each product to its article
    let articleTitle = document.createElement(`h2`);
    articleTitle.textContent = product.title;
    mainHTML.appendChild(productContainer);
    productContainer.appendChild(articleTitle);
    //add the description of each element to its article
    let description = document.createElement(`p`);
    description.textContent = product.description;
    productContainer.appendChild(description);
    //add the image of each element to its article
    let productImage = document.createElement(`img`);
    productImage.src = product.image;
    productContainer.appendChild(productImage);
    //add the price of each element to its article
    let price = document.createElement(`p`);
    price.textContent = `Price: ${product.price}$`;
    productContainer.appendChild(price);
    //add the rating
    let rating = document.createElement(`p`);
    rating.textContent = `${product.rating.rate} ⭐ /
    ${product.rating.count} reviews`;

    productContainer.appendChild(rating);
  });
}

getCategories();

//addEventListener to the nav to trigger the same function for all buttons.
//write an event function directly inside the addEventListener
navMenu.addEventListener(`click`, (e) => {
  //trigger the event only if an element of type button is clicked
  if (e.target.tagName === `BUTTON`) {
    //then run the function that is triggered when a button is pressed and create it back where the createButtons() is.
    //e.target.textContent will return the category of the button that is pressed
    getProductsByCategory(e.target.textContent);
  }
});
