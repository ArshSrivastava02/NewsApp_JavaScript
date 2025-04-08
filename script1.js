const API_KEY = "46c9bc0dd125456bb097cc020055724c";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", ()=>fetchNews("Technologys"));

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    console.log(data);
    bindData(data.articles)
}

function bindData(articles){
    const cardsContainer = document.getElementById('cardscontainer');
    const newsCardTemplate = document.getElementById('template-news-card');
    cardsContainer.innerHTML = '';

    const limitData = articles.slice(0,36); 

    limitData.forEach((article) => {
        if(!article.urlToImage) return;

        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone,article);
        cardsContainer.appendChild(cardClone)
    });
}   

function fillDataInCard(cardClone,article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = `${article.title.slice(0,35)}...`;
    newsDesc.innerHTML = `${article.description.slice(0,150)}...`;

    const date = new Date(article.publishedAt).toLocaleString("en-US",{timeZone:"Asia/Kolkata"});

    cardClone.firstElementChild.addEventListener("click", ()=>{
        window.open(article.url,"_blank")
    })
}
////////////////

function onNavItemClick(id){
    fetchNews(id);
}
////////////////

const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-text');

searchButton.addEventListener("click",()=>{
    const query = searchText.value;
    if(!query) return;
    fetchNews(query)
})
///////////////////////////////////

// const navLink = document.querySelector('.nav-link');

// navLink.forEach(link=>{
//     link.addEventListener("click", ()=>{
//         navLink.forEach(nav=>nav.classList.remove("active"));

//         this.classList.add("active");
//     })
// })

