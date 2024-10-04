
// Load the Categories

const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then((res) => res.json())
        .then((data) => displayData(data.categories))
        .catch((error) => console.log(error));
}

// Load the videos
const loadVideos = async () => {
    try {
        let response = await fetch('https://openapi.programming-hero.com/api/phero-tube/videos')

        let data = await response.json();
        displayVideos(data.videos);

    }
    catch (error) {
        console.log('Error:', error);
    }
}

// Remove active class fn

const removeActiveClass = () => {
    // Remote active class from all buttons
    const allButtons = document.querySelectorAll('.category-btn');
    allButtons.forEach((item) => {
        item.classList.remove('active');
    })

}

// Load Category Videos

const loadCategoryVideos = async (id) => {
    try {
        let response = await fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
        let data = await response.json();
        removeActiveClass();
        // Add Active class to selected button
        const activeBtn = document.getElementById(`${id}`);
        activeBtn.classList.add('active');
        displayVideos(data.category);

    }
    catch (error) {
        console.log('Error:', error);
    }
}

// -------------------------------Display Functions----------------------------------
// display the Categories
const displayData = (categories) => {
    const categoryContainer = document.getElementById('categories');
    categories.forEach((item) => {
        const buttonContainer = document.createElement('div');
        buttonContainer.innerHTML =
            `
       <button id="${item.category_id}" onclick = "loadCategoryVideos(${item.category_id})" class ="btn category-btn">
       ${item.category}
       </button>
       `

        categoryContainer.appendChild(buttonContainer);

    });
}



// display the Videos

const displayVideos = (videos) => {

    const videoContainer = document.getElementById('videos');
    videoContainer.innerHTML = "";

    if (videos.length == 0) {
        videoContainer.classList.remove('grid');
        videoContainer.innerHTML = `
        <div class = "min-h-[300px] w-full flex flex-col gap-5 justify-center items-center">
        <img src="assets/icon.png">
        <h2 class = "text-xl text-center">No Content here in this category</h2>
        </div>
        `;
        return;
    }
    else {
        videoContainer.classList.add('grid');
    }
    videos.forEach((item) => {
        const card = document.createElement('div');
        card.classList = "card card-compact";
        card.innerHTML =
            `<figure class="h-[200px] relative">
    <img class="h-full w-full object-cover"
      src=${item.thumbnail}/>
      ${item.others.posted_date !== "" ? `<span class="absolute right-2 bottom-2 text-white bg-black rounded-lg p-1 font-semibold text-xs">
        ${getTimeString(item.others.posted_date)}</span>` : ""}
      
    </figure>
    <div class="px-0 py-2 flex gap-2 items-start">
    <div>
    <img class="w-10 h-10 object-cover rounded-full" src="${item.authors[0].profile_picture}" />
    </div>
    <div>
     <h2 class="font-bold">${item.title}</h2>
     <div class= "flex gap-2 items-center">
     <p>${item.authors[0].profile_name}</p>
     ${item.authors[0].verified === true ? `<img class="w-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png" /img>` : ""}
     </div>
     
     <p>${item.others.views} Views</p>
     </div>
  </div>
        `
        videoContainer.append(card);
    })
}


// ------------Call functions -----------------------
loadCategories();
loadVideos();

// --------------------------Get time function ----------------------
function getTimeString(time) {
    const hour = parseInt(time / 3600);
    let remainingSecond = time % 3600;
    const minute = parseInt(remainingSecond / 60);
    remainingSecond = minute % 60;
    return `${hour} h ${minute} min ${remainingSecond} sec ago`;

}