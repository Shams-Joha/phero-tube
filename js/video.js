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

// {
//     "category_id": "1001",
//     "category": "Music"
// }

// create display Categories.
const displayCategories = (categories) => {
    const categoryContainer = document.getElementById('categories');



    // add data in html
    categories.forEach((item) => {
        console.log(item);
        //create a button
        const button = document.createElement('button');
        button.classList = "btn";
        button.innerText = item.category;
        categoryContainer.appendChild(button);

    });

}