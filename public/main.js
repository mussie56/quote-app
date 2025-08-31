const btn_1 = document.getElementById("btn_1");
const quoteEl = document.getElementById("quote");
const authorEl = document.getElementById("author");
const resultEl = document.getElementById("result");
const refresh = document.getElementById("refresh");
const fav = document.getElementById("fav");
const favUse = document.getElementById("favUse");
const likeSvg = document.getElementById("like");
const likeUse = document.getElementById("likeUse");
const dislikeSvg = document.getElementById("dislike");
const dislikeUse = document.getElementById("dislikeUse");

const favories = document.getElementById("favorites");
const favorites = document.getElementById("favories");
const searchIcon = document.getElementById("searchIcon");
const searchBox = document.getElementById("searchBox");
const btn = document.getElementById("btn"); 
const loading = document.getElementById("loading");
const generate = document.getElementById("generate");
const browes = document.getElementById("browes");
const main_2 = document.getElementById("main_2");
const main_1 = document.getElementById("main_1");
const main_3 = document.getElementById("main_3");
const nav = document.getElementById("nav");
const navi_toggle = document.getElementById("navi-toggle");
const main = document.getElementById("main");
const about = document.getElementById("about");
const main_4 = document.getElementById("main_4");

const fav_container = document.querySelector(".favorite");

let default_tag = "motivational";
let count = 0;
isRemove = true;
let removeId = null;

const container = [{
    author: "Elizabeth Barrett Browning",
    pk: 491367,
    quote: "Whoso loves, beleives the impossible. Elizabbeth Barrett Browning",
    tags: ['love']
}];

favories.addEventListener("click", event=>{
    main.innerHTML = "";
    displayFavotites();
    main_3.style.display = "block";
    main_2.style.display = "none";
    main_1.style.display = "none";
    main_4.style.display = "none";
    navi_toggle.checked = false;
    fav_container.classList.add("favorite_active");
});

favorites.addEventListener("click", event=>{
    main.innerHTML = "";
    displayFavotites();
    main_3.style.display = "block";
    main_2.style.display = "none";
    main_1.style.display = "none";
    main_4.style.display = "none";
    navi_toggle.checked = false;
    fav_container.classList.add("favorite_active");
});

document.addEventListener("DOMContentLoaded", ()=>{
    loading.style.display = "block";
    console.log("DOM fully loaded and parsed");
    loadDom();
});

generate.addEventListener("click", event=>{
  main_2.style.display = "flex";
  main_1.style.display = "none";
  main_3.style.display = "none";
  main_4.style.display = "none";
  navi_toggle.checked = false;
  fav_container.classList.remove("favorite_active");
});

browes.addEventListener("click", event=>{
  main_1.style.display = "block";
  main_2.style.display = "none";
  main_3.style.display = "none";
  main_4.style.display = "none";
  navi_toggle.checked = false;
  fav_container.classList.remove("favorite_active");
});

refresh.addEventListener("click", () => {
    let tag_1 = `another ${document.getElementById("tag").value.trim()}`;
    favUse.setAttribute("href", "img/black-heart-outline-3512.svg");
    likeUse.setAttribute("href", "img/thumbs-up-11229.svg");
    dislikeUse.setAttribute("href", "img/thumbs-down-14918.svg");

  fetchBackend(tag_1);
});

about.addEventListener("click", event=>{
    main.innerHTML = "";
    main_4.style.display = "block";
    main_2.style.display = "none";
    main_1.style.display = "none";
    main_3.style.display = "none";
    navi_toggle.checked = false;
    fav_container.classList.remove("favorite_active");
});

btn_1.addEventListener("click", async () => {   
    let tag_1 = document.getElementById("tag").value.trim() || "motivational";
    fetchBackend(tag_1); });

async function fetchBackend(tag) {
    const randNum = Math.floor(Math.random() * 99999) + 1;
  try {
    const res = await fetch(`/api/quote?tag=${tag}`);

    const data = await res.json();
    quoteEl.innerText = data.quote;
    authorEl.innerText = "Generated";
    resultEl.style.display = "block";

    fav.addEventListener("click", event=> { 

        if(!container.some(q => q.quote === data.quote)) {
            container.push({ author: "Ai Generated", 
                     pk: randNum, 
                     quote: data.quote|| "Generated quotes will be displayed here", 
                     tags: [tag]});
            displayFavotites();
        }
        favUse.setAttribute("href", "img/heart-329 - Copy.svg");
        
    });
    likeSvg.addEventListener("click", event=> { likeUse.setAttribute("href", "img/black-thumbs-up-11241.svg"); dislikeUse.setAttribute("href", "img/thumbs-down-14918.svg");});
    dislikeSvg.addEventListener("click", event=> { dislikeUse.setAttribute("href", "img/thumbs-down-14920.svg"); likeUse.setAttribute("href", "img/thumbs-up-11229.svg");});
    
    console.log(container);

  } catch (err) {
    console.error(err);
    quoteEl.innerText = "Failed to get quote.";
  }
}

searchIcon.addEventListener("click", event=>{
    console.log(searchBox.value);
    searchBox.textContent = "thumbs up";
    let tag = searchBox.value.trim();
    count = 0;
    isRemove = true;
    fetchQoute(tag);
});

searchBox.addEventListener("keyup", event=>{
        if(event.key === 'Enter'){
            let tag = event.target.value;
            count =0;
            isRemove = true;
        tag = tag.trim();
        fetchQoute(tag);    
        }
});

btn.addEventListener("click", event =>{
    let tag = searchBox.value.trim();
    isRemove = false;
    count+=5;
    tag === '' ? loadDom() : fetchQoute(tag);
});

async function fetchQoute(tag = default_tag) { 
    default_tag = tag;

    if(isRemove){
        const oldQuotes = document.querySelectorAll("#append .content");
        oldQuotes.forEach(el => el.remove());
        loading.style.display = "block";
    }

    else{
        btn.textContent = "Loading...";
    }

    try {
        const response = await fetch(`https://api.paperquotes.com/apiv1/quotes/?tags=${tag}&offset=${count}`);
        const response1 = await fetch(`https://api.paperquotes.com/apiv1/quotes/?author=${tag}&offset=${count}`);

        const tagData = await response.json();
        const authData = await response1.json();

        console.log(tagData);

        btn.textContent = "Load More";

        if(authData.results.length == 0 && tagData.results.length == 0){
            throw new Error("error fetching the data");
        }
        else if(authData.results.length > 0 && tagData.results.length == 0){
            loading.style.display = "none";
            console.log(authData.results);

            authData.results.forEach(array=>{
                let isLiked = false;
                const {author, quote, pk, tags} = array;
                
                    const newDiv = document.createElement("div");
                    newDiv.classList.add("content");
                    newDiv.id = `newDiv${pk}`;

                    const newQuote = document.createElement("p");
                    newQuote.textContent = quote;
                    newQuote.classList.add("quote");

                    const newAuthor = document.createElement("p");
                    newAuthor.textContent = `By ${author}`;
                    newAuthor.classList.add("author");

                    const newSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                    newSvg.classList.add("fav__icon");
                    newSvg.id = `newSvg${pk}`;

                    const newUse = document.createElementNS("http://www.w3.org/2000/svg", "use");
                    newUse.setAttribute("href", "img/black-heart-outline-3512.svg");

                    const newSvgTUp = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                    newSvgTUp.classList.add("like__icon");
                    newSvgTUp.id = `newSvgTUp${pk}`;

                    const newUseTUp = document.createElementNS("http://www.w3.org/2000/svg", "use");
                    newUseTUp.setAttribute("href", "img/thumbs-up-11229.svg");

                    const newSvgTDown = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                    newSvgTDown.classList.add("dislike__icon");
                    newSvgTDown.id = `newSvgTDown${pk}`;

                    const newUseTDown = document.createElementNS("http://www.w3.org/2000/svg", "use");
                    newUseTDown.setAttribute("href", "img/thumbs-down-14918.svg");

                    document.getElementById("append").insertBefore(newDiv, btn);

                    document.getElementById(`newDiv${pk}`).append(newQuote, newAuthor, newSvg, newSvgTUp, newSvgTDown);

                    document.getElementById(`newSvg${pk}`).appendChild(newUse);
                    document.getElementById(`newSvgTUp${pk}`).appendChild(newUseTUp);
                    document.getElementById(`newSvgTDown${pk}`).appendChild(newUseTDown);

                    newSvg.addEventListener("click", event=> {
                        if(!isLiked){
                            newUse.setAttribute("href", "img/heart-329 - Copy.svg");
                            container.push({author, pk, quote, tags});
                            console.log(container);
                            isLiked = true;
                        } 
                        else{
                            newUse.setAttribute("href", "img/black-heart-outline-3512.svg");
                            const index = container.findIndex(q => q.pk === pk);
                            if(index != -1){
                                container.splice(index, 1);
                                isLiked = false;
                            }
                            isLiked = false;
                        }
                        
                    });
                    newSvgTUp.addEventListener("click", event=> { newUseTUp.setAttribute("href", "img/black-thumbs-up-11241.svg"); newUseTDown.setAttribute("href", "img/thumbs-down-14918.svg");});
                    newSvgTDown.addEventListener("click", event=> { newUseTDown.setAttribute("href", "img/thumbs-down-14920.svg"); newUseTUp.setAttribute("href", "img/thumbs-up-11229.svg");});
            });
            console.log(authData);
        }
        else if(authData.results.length == 0 && tagData.results.length > 0){
            loading.style.display = "none";
            console.log(tagData.results);
            
            tagData.results.forEach(array=>{
                let isLiked = false;
                const {author, quote, pk, tags} = array;
                
                    const newDiv = document.createElement("div");
                    newDiv.classList.add("content");
                    newDiv.id = `newDiv${pk}`;

                    const newQuote = document.createElement("p");
                    newQuote.textContent = quote;
                    newQuote.classList.add("quote");

                    const newAuthor = document.createElement("p");
                    newAuthor.textContent = `By ${author}`;
                    newAuthor.classList.add("author");

                    const newSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                    newSvg.classList.add("fav__icon");
                    newSvg.id = `newSvg${pk}`;

                    const newUse = document.createElementNS("http://www.w3.org/2000/svg", "use");
                    newUse.setAttribute("href", "img/black-heart-outline-3512.svg");

                    const newSvgTUp = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                    newSvgTUp.classList.add("like__icon");
                    newSvgTUp.id = `newSvgTUp${pk}`;

                    const newUseTUp = document.createElementNS("http://www.w3.org/2000/svg", "use");
                    newUseTUp.setAttribute("href", "img/thumbs-up-11229.svg");

                    const newSvgTDown = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                    newSvgTDown.classList.add("dislike__icon");
                    newSvgTDown.id = `newSvgTDown${pk}`;

                    const newUseTDown = document.createElementNS("http://www.w3.org/2000/svg", "use");
                    newUseTDown.setAttribute("href", "img/thumbs-down-14918.svg");

                    document.getElementById("append").insertBefore(newDiv, btn);

                    document.getElementById(`newDiv${pk}`).append(newQuote, newAuthor, newSvg, newSvgTUp, newSvgTDown);

                    document.getElementById(`newSvg${pk}`).appendChild(newUse);
                    document.getElementById(`newSvgTUp${pk}`).appendChild(newUseTUp);
                    document.getElementById(`newSvgTDown${pk}`).appendChild(newUseTDown);

                    newSvg.addEventListener("click", event=> { 
                        if(!isLiked){
                            newUse.setAttribute("href", "img/heart-329 - Copy.svg");
                            container.push({author, pk, quote, tags});
                            console.log(container);
                            isLiked = true;
                        } 
                        else{
                            newUse.setAttribute("href", "img/black-heart-outline-3512.svg");
                            const index = container.findIndex(q => q.pk === pk);
                            if(index != -1){
                                container.splice(index, 1);
                                isLiked = false;
                            }
                            isLiked = false;
                        }
                    });
                    newSvgTUp.addEventListener("click", event=> { newUseTUp.setAttribute("href", "img/black-thumbs-up-11241.svg"); newUseTDown.setAttribute("href", "img/thumbs-down-14918.svg");});
                    newSvgTDown.addEventListener("click", event=> { newUseTDown.setAttribute("href", "img/thumbs-down-14920.svg"); newUseTUp.setAttribute("href", "img/thumbs-up-11229.svg");});
                });
            console.log(tagData);
        }
        else{
            loading.style.display = "none";
            tagData.results.forEach(array=>{
                let isLiked = false;
                const {author, quote, pk, tags} = array;
                
                    const newDiv = document.createElement("div");
                    newDiv.classList.add("content");
                    newDiv.id = `newDiv${pk}`;

                    const newQuote = document.createElement("p");
                    newQuote.textContent = quote;
                    newQuote.classList.add("quote");

                    const newAuthor = document.createElement("p");
                    newAuthor.textContent = `By ${author}`;
                    newAuthor.classList.add("author");

                    const newSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                    newSvg.classList.add("fav__icon");
                    newSvg.id = `newSvg${pk}`;

                    const newUse = document.createElementNS("http://www.w3.org/2000/svg", "use");
                    newUse.setAttribute("href", "img/black-heart-outline-3512.svg");

                    const newSvgTUp = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                    newSvgTUp.classList.add("like__icon");
                    newSvgTUp.id = `newSvgTUp${pk}`;

                    const newUseTUp = document.createElementNS("http://www.w3.org/2000/svg", "use");
                    newUseTUp.setAttribute("href", "img/thumbs-up-11229.svg");

                    const newSvgTDown = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                    newSvgTDown.classList.add("dislike__icon");
                    newSvgTDown.id = `newSvgTDown${pk}`;

                    const newUseTDown = document.createElementNS("http://www.w3.org/2000/svg", "use");
                    newUseTDown.setAttribute("href", "img/thumbs-down-14918.svg");

                    document.getElementById("append").insertBefore(newDiv, btn);

                    document.getElementById(`newDiv${pk}`).append(newQuote, newAuthor, newSvg, newSvgTUp, newSvgTDown);

                    document.getElementById(`newSvg${pk}`).appendChild(newUse);
                    document.getElementById(`newSvgTUp${pk}`).appendChild(newUseTUp);
                    document.getElementById(`newSvgTDown${pk}`).appendChild(newUseTDown);

                    newSvg.addEventListener("click", event=> { 
                        if(!isLiked){
                            newUse.setAttribute("href", "img/heart-329 - Copy.svg");
                            container.push({author, pk, quote, tags});
                            console.log(container);
                            isLiked = true;
                        } 
                        else{
                            newUse.setAttribute("href", "img/black-heart-outline-3512.svg");
                            const index = container.findIndex(q => q.pk === pk);
                            if(index != -1){
                                container.splice(index, 1);
                                isLiked = false;
                            }
                            isLiked = false;
                        }
                    });
                    newSvgTUp.addEventListener("click", event=> { newUseTUp.setAttribute("href", "img/black-thumbs-up-11241.svg"); newUseTDown.setAttribute("href", "img/thumbs-down-14918.svg");});
                    newSvgTDown.addEventListener("click", event=> { newUseTDown.setAttribute("href", "img/thumbs-down-14920.svg"); newUseTUp.setAttribute("href", "img/thumbs-up-11229.svg");});
                });
            authData.results.forEach(array=>{
                let isLiked = false;
                const {author, quote, pk, tags} = array;
                
                    const newDiv = document.createElement("div");
                    newDiv.classList.add("content");
                    newDiv.id = `newDiv${pk}`;

                    const newQuote = document.createElement("p");
                    newQuote.textContent = quote;
                    newQuote.classList.add("quote");

                    const newAuthor = document.createElement("p");
                    newAuthor.textContent = `By ${author}`;
                    newAuthor.classList.add("author");

                    const newSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                    newSvg.classList.add("fav__icon");
                    newSvg.id = `newSvg${pk}`;

                    const newUse = document.createElementNS("http://www.w3.org/2000/svg", "use");
                    newUse.setAttribute("href", "img/black-heart-outline-3512.svg");

                    const newSvgTUp = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                    newSvgTUp.classList.add("like__icon");
                    newSvgTUp.id = `newSvgTUp${pk}`;

                    const newUseTUp = document.createElementNS("http://www.w3.org/2000/svg", "use");
                    newUseTUp.setAttribute("href", "img/thumbs-up-11229.svg");

                    const newSvgTDown = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                    newSvgTDown.classList.add("dislike__icon");
                    newSvgTDown.id = `newSvgTDown${pk}`;

                    const newUseTDown = document.createElementNS("http://www.w3.org/2000/svg", "use");
                    newUseTDown.setAttribute("href", "img/thumbs-down-14918.svg");

                    document.getElementById("append").insertBefore(newDiv, btn);

                    document.getElementById(`newDiv${pk}`).append(newQuote, newAuthor, newSvg, newSvgTUp, newSvgTDown);

                    document.getElementById(`newSvg${pk}`).appendChild(newUse);
                    document.getElementById(`newSvgTUp${pk}`).appendChild(newUseTUp);
                    document.getElementById(`newSvgTDown${pk}`).appendChild(newUseTDown);

                    newSvg.addEventListener("click", event=> { 
                        if(!isLiked){
                            newUse.setAttribute("href", "img/heart-329 - Copy.svg");
                            container.push({author, pk, quote, tags});
                            console.log(container);
                            isLiked = true;
                        } 
                        else{
                            newUse.setAttribute("href", "img/black-heart-outline-3512.svg");
                            const index = container.findIndex(q => q.pk === pk);
                            if(index != -1){
                                container.splice(index, 1);
                                isLiked = false;
                            }
                            isLiked = false;
                        }
                    });
                    newSvgTUp.addEventListener("click", event=> { newUseTUp.setAttribute("href", "img/black-thumbs-up-11241.svg"); newUseTDown.setAttribute("href", "img/thumbs-down-14918.svg");});
                    newSvgTDown.addEventListener("click", event=> { newUseTDown.setAttribute("href", "img/thumbs-down-14920.svg"); newUseTUp.setAttribute("href", "img/thumbs-up-11229.svg");});
                });
        }
    } catch (error) {
        console.error(error);
    }
}

function displayFavotites(){
    main.innerHTML = "";
    container.forEach(contain =>{
        console.log(`newdiv${contain.pk}`);
        
        const newdiv = document.createElement("div");
        newdiv.id = `newdiv${contain.pk}`;
        newdiv.classList.add("content");
        
        const newquote = document.createElement("p");
        newquote.classList.add("quote");
        newquote.textContent = contain.quote;

        const newAuthor = document.createElement("p");
        newAuthor.classList.add("author");
        newAuthor.textContent = `By ${contain.author}`;

        const newSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        newSvg.classList.add("fav__icon");
        newSvg.id = `newSvg${contain.pk}`;

        const newSvgTUp = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        newSvgTUp.classList.add("like__icon");
        newSvgTUp.id = `newSvgTUp${contain.pk}`;

        const newSvgTDown = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        newSvgTDown.classList.add("dislike__icon");
        newSvgTDown.id = `newSvgTDown${contain.pk}`;

        const newUse = document.createElementNS("http://www.w3.org/2000/svg", "use");
        newUse.setAttribute("href", "img/heart-329 - Copy.svg");
        
        const newUseTUp = document.createElementNS("http://www.w3.org/2000/svg", "use");
        newUseTUp.setAttribute("href", "img/thumbs-up-11229.svg");

        const newUseTDown = document.createElementNS("http://www.w3.org/2000/svg", "use");
        newUseTDown.setAttribute("href", "img/thumbs-down-14918.svg");

        main.append(newdiv);
        document.getElementById(`newdiv${contain.pk}`).append(newquote, newAuthor, newSvg, newSvgTUp, newSvgTDown);
        document.getElementById(`newSvg${contain.pk}`).append(newUse);
        document.getElementById(`newSvgTUp${contain.pk}`).append(newUseTUp);
        document.getElementById(`newSvgTDown${contain.pk}`).append(newUseTDown);

        newSvg.addEventListener("click", event=> { 
            const index = container.findIndex(q => q.pk === contain.pk);
            container.splice(index, 1);
            removeId = contain.pk;
            main.removeChild(newdiv);
        });
        newSvgTUp.addEventListener("click", event=> { newUseTUp.setAttribute("href", "img/black-thumbs-up-11241.svg"); newUseTDown.setAttribute("href", "img/thumbs-down-14918.svg");});
        newSvgTDown.addEventListener("click", event=> { newUseTDown.setAttribute("href", "img/thumbs-down-14920.svg"); newUseTUp.setAttribute("href", "img/thumbs-up-11229.svg");});
                
    });
}


async function loadDom() {
    console.log("loadDom called");
    
    const randomOffset = Math.floor(Math.random() * 1000);
    try {
        const response = await fetch(`https://api.paperquotes.com/apiv1/quotes/?random&offset=${randomOffset}`);
        const data = await response.json();
        data.results.forEach(array=>{
            let isLiked = false;
                const {author, quote, pk, tags} = array;
                
                    const newDiv = document.createElement("div");
                    newDiv.classList.add("content");
                    newDiv.id = `newDiv${pk}l`;

                    const newQuote = document.createElement("p");
                    newQuote.textContent = quote;
                    newQuote.classList.add("quote");

                    const newAuthor = document.createElement("p");
                    newAuthor.textContent = `By ${author}`;
                    newAuthor.classList.add("author");

                    const newSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                    newSvg.classList.add("fav__icon");
                    newSvg.id = `newSvg${pk}l`;

                    const newUse = document.createElementNS("http://www.w3.org/2000/svg", "use");
                    newUse.setAttribute("href", "img/black-heart-outline-3512.svg");

                    const newSvgTUp = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                    newSvgTUp.classList.add("like__icon");
                    newSvgTUp.id = `newSvgTUp${pk}l`;

                    const newUseTUp = document.createElementNS("http://www.w3.org/2000/svg", "use");
                    newUseTUp.setAttribute("href", "img/thumbs-up-11229.svg");

                    const newSvgTDown = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                    newSvgTDown.classList.add("dislike__icon");
                    newSvgTDown.id = `newSvgTDown${pk}l`;

                    const newUseTDown = document.createElementNS("http://www.w3.org/2000/svg", "use");
                    newUseTDown.setAttribute("href", "img/thumbs-down-14918.svg");

                    document.getElementById("append").insertBefore(newDiv, btn);

                    document.getElementById(`newDiv${pk}l`).append(newQuote, newAuthor, newSvg, newSvgTUp, newSvgTDown);

                    document.getElementById(`newSvg${pk}l`).appendChild(newUse);
                    document.getElementById(`newSvgTUp${pk}l`).appendChild(newUseTUp);
                    document.getElementById(`newSvgTDown${pk}l`).appendChild(newUseTDown);

                    newSvg.addEventListener("click", event=> { 
                        if(!isLiked){
                            newUse.setAttribute("href", "img/heart-329 - Copy.svg");
                            container.push({author, pk, quote, tags});
                            console.log(container);
                            isLiked = true;
                        } 
                        else{
                            newUse.setAttribute("href", "img/black-heart-outline-3512.svg");
                            const index = container.findIndex(q => q.pk === pk);
                            if(index != -1){
                                container.splice(index, 1);
                                isLiked = false;
                            }
                            isLiked = false;
                        }
                        
                    });
                    newSvgTUp.addEventListener("click", event=> { newUseTUp.setAttribute("href", "img/black-thumbs-up-11241.svg"); newUseTDown.setAttribute("href", "img/thumbs-down-14918.svg");});
                    newSvgTDown.addEventListener("click", event=> { newUseTDown.setAttribute("href", "img/thumbs-down-14920.svg"); newUseTUp.setAttribute("href", "img/thumbs-up-11229.svg");});
            });

    } catch (error) {
        console.error(error);
    }
    loading.style.display = "none";
}