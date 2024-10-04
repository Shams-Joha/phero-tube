
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

// -------------------------------Display Functions----------------------------------
// display the Categories
const displayData = (categories) => {
    const categoryContainer = document.getElementById('categories');
    categories.forEach((item) => {
        const button = document.createElement("button");
        button.classList = "btn";
        button.innerText = item.category;
        categoryContainer.appendChild(button);

    });
}

const cardDemo = {

    category_id: "1001",
    video_id: "aaaa",
    thumbnail: "https://i.ibb.co/L1b6xSq/shape.jpg",
    title: "Shape of You",
    authors: [
        {
            profile_picture: "https://i.ibb.co/D9wWRM6/olivia.jpg",
            profile_name: "Olivia Mitchell",
            verified: ""
        }
    ],
    others: {
        views: "100K",
        posted_date: "16278"
    },
    description: "Dive into the rhythm of 'Shape of You,' a captivating track that blends pop sensibilities with vibrant beats. Created by Olivia Mitchell, this song has already gained 100K views since its release. With its infectious melody and heartfelt lyrics, 'Shape of You' is perfect for fans looking for an uplifting musical experience. Let the music take over as Olivia's vocal prowess and unique style create a memorable listening journey."

};


// display the Videos

const displayVideos = (videos) => {
    const videoContainer = document.getElementById('videos');
    videos.forEach((item) => {
        console.log(item);
        const card = document.createElement('div');
        card.classList = "card card-compact";
        card.innerHTML =
            `<figure class="h-[200px] relative">
    <img class="h-full w-full object-cover"
      src=${item.thumbnail}/>
      <span class="absolute right-2 bottom-2 text-white bg-black rounded-lg p-1 font-semibold">${item.others.posted_date}</span>
    </figure>
    <div class="px-0 py-2 flex gap-2 items-start">
    <div>
    <img class="w-10 h-10 object-cover rounded-full" src="${item.authors[0].profile_picture}" />
    </div>
    <div>
     <h2 class="font-bold">${item.title}</h2>
     <div class= "flex gap-2 items-center">
     <p>${item.authors[0].profile_name}</p>
     ${item.authors[0].verified === true ? `<img class="w-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png" /img>` : "" }
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