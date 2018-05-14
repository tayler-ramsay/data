var requestURL = 'https://mdn.github.io/learning-area/javascript/oojs/json/superheroes.json';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function () {
    var superHeroes = request.response;
    console.log(superHeroes);
}





// function topics(topics) {
//     return `
// <ul class="topics-list">
//     ${topics.map((topic) => `<li>${topic}</li>`).join("")}
// </ul>
// `
// }

// function communities(communities) {
//     return `
// <ul class="topics-list">
//     ${communities.map((community) => `<li>${community}</li>`).join("")}
// </ul>
// `
// }

// function articleTemplate(article) {
//     return `
//     <div>
//         <h1>${article.heading}</h1>
//         <figure>
//             <img class="hero" src="${article.heroImg}"></img>
//             <figcaption>${article.caption}</figcaption>
//         </figure>
//         <h3 class="county">${article.county}</h3>
//         <p class="date">${article.date}</p>
//         ${topics(article.topics)}
//         ${communities(article.communities)}
//     </div>
//     `
// }



// document.getElementById("app").innerHTML =
//     `
//         <div class="app">
//             ${articleObject.map(articleTemplate).join("")}
//         </div>
//         `;