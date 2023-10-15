const publicKey = "d42f1676983d64bea3f02d3013f5aaf2";
const privateKey = "fbfe5dea50fb05c66cd5966df9003b3d975835c4";
const api = "https://gateway.marvel.com/v1/public/c";
const search = document.querySelector(".search");
const searchItemInput = document.getElementById("searchItem");
const onSeachResults = document.querySelector(".onSeachResults");
const oneHeroResults = document.querySelector(".oneHeroResults");
searchItemInput.addEventListener("keyup", async () => {
  if (searchItemInput.value == "") {
    onSeachResults.innerHTML = "";
  } else {
    onSeachResults.innerHTML = "";
    const charName = searchItemInput.value;
    const ts = new Date().getTime();
    const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();
    const api = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${charName}&ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=4`;
    const result = await fetch(api);
    const data = await result.json();
    const topFourChar = data.data.results;
    topFourChar.forEach((element) => {
      const eachResult = document.createElement("div");
      eachResult.classList.add("eachResult");
      eachResult.innerHTML = `
      <div class="details">
        <img src="${element.thumbnail.path}/landscape_incredible.${element.thumbnail.extension}" alt="">
        <p class="charname">${element.name}</p>
      </div>`;
      onSeachResults.append(eachResult);
    });
    while (onSeachResults.childElementCount > 4) {
      onSeachResults.removeChild(onSeachResults.firstChild);
    }
    const addFav = document.querySelectorAll(".addFav");
    const SearchcharNames = document.querySelectorAll(".charname");
    SearchcharNames.forEach((eachName) => {
      eachName.addEventListener("click", async (e) => {
        // e.preventDefault();
        const api = `https://gateway.marvel.com/v1/public/characters?name=${eachName.innerText}&ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=4`;
        const result = await fetch(api);
        const data = await result.json();
        const mainData = data.data.results;
        search.style.display = "none";
        console.log(mainData);
        const secOneHero = document.createElement("section");
        secOneHero.classList.add("oneHero");
        secOneHero.innerHTML = `<div class="upperPart">
        <h3 class="charHeading">${eachName.innerText}</h3>
        <h3 class="exit">X</h3>
      </div>
      <div class="midPart">
        <div class="leftPart">
          <img src="${mainData[0].thumbnail.path}/landscape_incredible.${mainData[0].thumbnail.extension}" alt=""/>
        </div>
        <div class="rightPart">
          <div class="description">
          ${mainData[0].description}
          </div>
          <div class="role">
            <h3 class="roleHeading">Roles:</h3>
            <p>Comics:${mainData[0].comics.available}</p>
            <p>Series:${mainData[0].series.available}</p>
            <p>Stories:${mainData[0].stories.available}</p>
          </div>
        </div>
      </div>`;
        oneHeroResults.append(secOneHero);
        console.log(oneHeroResults);
        const exit = document.querySelector(".exit");
        exit.addEventListener("click", () => {
          oneHeroResults.removeChild(oneHeroResults.firstElementChild);
          search.style.display = "block";
        });
      });
    });
  }
});
