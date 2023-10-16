function mainFunction() {
  // My api keys
  const publicKey = "d42f1676983d64bea3f02d3013f5aaf2";
  const privateKey = "fbfe5dea50fb05c66cd5966df9003b3d975835c4";
  // search box,result and particular result getting by dom
  const search = document.querySelector(".search");
  const searchItemInput = document.getElementById("searchItem");
  const onSeachResults = document.querySelector(".onSeachResults");
  const oneHeroResults = document.querySelector(".oneHeroResults");
  // when keyup on input box 
  searchItemInput.addEventListener("keyup", async () => {
    // If input box empty get results empty
    if (searchItemInput.value == "") {
      onSeachResults.innerHTML = "";
    }
    // Else get 4 hero characters 
    else {
      onSeachResults.innerHTML = ""; //set results none first
      const charName = searchItemInput.value;
      const ts = new Date().getTime();
      const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();
      const api = `https://gateway.marvel.com/v1/public/characters?nameStartsWith=${charName}&ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=4`;
      const result = await fetch(api);
      const data = await result.json();
      const topFourChar = data.data.results; //get four results by api
      // append on onSearchResult
      topFourChar.forEach((element) => {
        const eachResult = document.createElement("div");
        eachResult.classList.add("eachResult");
        eachResult.innerHTML = `
      <div class="details">
        <img src="${element.thumbnail.path}/portrait_uncanny.${element.thumbnail.extension}" alt="">
        <p class="charname">${element.name}</p>
      </div>`;
        onSeachResults.append(eachResult);
      });
      // if results value greater than 4 removed first child for getting recent four child 
      while (onSeachResults.childElementCount > 4) {
        onSeachResults.removeChild(onSeachResults.firstChild);
      }
      // Charname by dom on onSearchResults
      const SearchcharNames = document.querySelectorAll(".charname");
      SearchcharNames.forEach((eachName) => {
        // If Click any one name open it's details
        eachName.addEventListener("click", async (e) => {
          const api = `https://gateway.marvel.com/v1/public/characters?name=${eachName.innerText}&ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=4`;
          const result = await fetch(api);
          const data = await result.json();
          const mainData = data.data.results; //Get it's full information
          search.style.display = "none";
          // Create a section and add all details on onhero that clicked
          const secOneHero = document.createElement("section");
          secOneHero.classList.add("oneHero");
          secOneHero.innerHTML = `<div class="upperPart">
        <h3 class="charHeading">${eachName.innerText}</h3>
        <h3 class="exit">X</h3>
      </div>
      <div class="midPart">
        <div class="leftPart">
          <img src="${mainData[0].thumbnail.path}/portrait_uncanny.${mainData[0].thumbnail.extension}" alt=""/>
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
          // If clicked exit then oneHero information not shown (exits)
          exit.addEventListener("click", () => {
            oneHeroResults.removeChild(oneHeroResults.firstElementChild);
            search.style.display = "block";
          });
        });
      });
    }
  });
}
// All Javascript work done by main function
mainFunction();