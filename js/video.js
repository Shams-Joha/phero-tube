// Fetch, Load and Show Categories on html.
// Create Load Categories

// Create Load Categories
const loadCategories = () => {
    // Fetch the data.
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then((res) => res.json())
    .then((data) => displayCategories(data.categories))
    .catch((error) => console.log(error));

}

loadCategories();


// create display Categories.
const displayCategories = (data) => {
    // add data in html
    console.log(data);

}