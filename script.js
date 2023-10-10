const publicKey = "d42f1676983d64bea3f02d3013f5aaf2";
const privateKey = "fbfe5dea50fb05c66cd5966df9003b3d975835c4";
const api = "https://gateway.marvel.com/v1/public/c";
const searchItemInput = document.getElementById("searchItem");
const onSeachResults = document.querySelector(".onSeachResults");

searchItemInput.addEventListener("keyup", async () => {
  if (searchItemInput.value == "") {
    onSeachResults.innerHTML = "";
    return;
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
      <img src="${element.thumbnail.path + "/portrait_xlarge.jpg"}" alt="">
      <p>${element.name}</p>
          </div>
          <div class="addFav">
            <i class="fa-solid fa-plus"></i> Add to Favourite
          </div>`;
      onSeachResults.append(eachResult);
    });
    while (onSeachResults.childElementCount > 4) {
      onSeachResults.removeChild(onSeachResults.firstChild);
    }
  }
});
