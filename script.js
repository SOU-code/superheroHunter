const navLinks = document.querySelectorAll("a");
const homeSection = document.querySelector(".homeSection");
const apiResultSection = document.querySelector(".apiResultSection");
const marvelLogo = document.querySelector(".marvelLogo");
const showMore = document.querySelector(".showMore");
navLinks.forEach((eachNavItem) => {
  eachNavItem.addEventListener("click", async () => {
    homeSection.style.display = "none";
    apiResultSection.innerHTML = "";
    const searchItems = eachNavItem.className;
    let page = 1;
    async function loadApi() {
      showMore.style.display = "none";
      const timeStamp = Date.now().toString();
      const privateKey = "fbfe5dea50fb05c66cd5966df9003b3d975835c4";
      const publicKey = "d42f1676983d64bea3f02d3013f5aaf2";
      const hash = CryptoJS.MD5(timeStamp + privateKey + publicKey).toString();
      const api = `https://gateway.marvel.com/v1/public/${searchItems}?ts=${timeStamp}&apikey=${publicKey}&hash=${hash}&limit=12&offset=${page}`;
      const result = await fetch(api);
      const data = await result.json();
      const finalArrayResult = data.data.results;
      console.log(finalArrayResult);
      finalArrayResult.forEach((eachResult) => {
        console.log(eachResult);
        let name;
        if (searchItems === "characters") {
          name = eachResult.name;
        } else if (searchItems === "creators") {
          name = eachResult.fullName;
        } else {
          name = eachResult.title;
        }
        const imgSrc =
          eachResult.thumbnail.path +
          "/portrait_xlarge." +
          eachResult.thumbnail.extension;
        const eachResultSection = document.createElement("div");
        eachResultSection.classList.add("eachResultSection");
        eachResultSection.innerHTML = `<img src="${imgSrc}" alt="">
      <p>${name}</p>`;
        apiResultSection.append(eachResultSection);
      });
      showMore.style.display = "block";
    }
    loadApi();
    showMore.addEventListener("click", () => {
      page++;
      loadApi();
    });
  });
});
marvelLogo.addEventListener("click", () => {
  homeSection.style.display = "block";
  apiResultSection.innerHTML = "";
});
