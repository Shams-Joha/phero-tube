
// Load the Categories

const loadCategories = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        .then((res) => res.json())
        .then((data) => displayData(data.categories))
        .catch((error) => console.log(error));
}


//  {
// "status": true,
//     "message": "successfully fetched all the videos",
//     "videos": [
//       {
//         "category_id": "1001",
//         "video_id": "aaaa",
//         "thumbnail": "https://i.ibb.co/L1b6xSq/shape.jpg",
//         "title": "Shape of You",
//         "authors": [
//           {
//             "profile_picture": "https://i.ibb.co/D9wWRM6/olivia.jpg",
//             "profile_name": "Olivia Mitchell",
//             "verified": ""
//           }
//         ],
//         "others": {
//           "views": "100K",
//           "posted_date": "16278"
//         },
//         "description": "Dive into the rhythm of 'Shape of You,' a 
//         captivating track that blends pop sensibilities with vibrant beats.
//          Created by Olivia Mitchell, this song has already gained 100K views since its release.
//           With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for
//            an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique
//             style create a memorable listening journey."]]

//       }

// Load Details

const loadDetails = async (videoID) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoID}`;
    const res = await fetch(url);
    const data = await res.json();
    displayDetails(data.video);

}


// Load the videos
const loadVideos = async (searchText = "") => {
    try {
        let response = await fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`)
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

// display Details

const displayDetails = (video) => {
    const modalContainer = document.getElementById('modal-content');
    // way-1
    // document.getElementById("showModalData").click();
    // way-2
    document.getElementById("customModal").showModal();
    modalContainer.innerHTML = `
    <img src=${video.thumbnail} />
    <p>${video.description}</p>
    `
}

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
      <p> <button onclick="loadDetails('${item.video_id}')" class ="btn btn-sm btn-error">Details</button></p>
     </div>
  </div>
        `
        videoContainer.append(card);
    })
}


// ------------Call functions -----------------------
document.getElementById('search-input').addEventListener("keyup", function (e) {
    loadVideos(e.target.value);
});
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