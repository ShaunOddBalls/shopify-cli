window.addCollectionSpecificBanners = (id) =>{
  try{
const collectionHandles = [
  "sunglasses",
  "ankle-socks-bundle",
  "grooming-kits",
  "wash-bags",
  "ankle-socks",
  "picnic-blankets",
  "reusable-water-bottles",
  "bab-summer-towels",
  "bab-summer-swimming-briefs",
  "bab-summer-swimming-shorts",
  "bab-swimmers",
  "summer-bundle-underwear-mens-boxer-shorts",
  "summer-bundle-underwear-mens-boxer-briefs",
  "summer-bundle-underwear-mens-bamboo",
  "summer-bundle-underwear-ladies-boxer-shorts",
  "summer-bundle-underwear-low-rise-briefs",
  "summer-bundle-mens-underwear",
  "summer-bundle-underwear-seamless",
  "summer-bundle-underwear-bralette",
  "summer-bundle-underwear-ladies-bamboo"
];
      const wrappers = Array.from(document.querySelectorAll(".product-card"))
      const bannerHTML = `
      <div class="w-full px-2 py-2 text-magenta-500" style="background-color: #fbf7c9;
    color: #a75600;">
        10% OFF WITH SUMMER10  😎
      </div>
      `
      wrappers.forEach((wrapper)=>{
        if(!wrapper.classList.contains("nosto_element")){
          
        const prodInfo = JSON.parse(wrapper.querySelector(".prod-info").value);
        prodInfo.categories = prodInfo.categories.map((item) =>{
          return item.toLowerCase().replace(/ /g, "-");
        })
        const matchesCategory = collectionHandles.some((handle) =>{
            return prodInfo.categories.includes(handle)
        }
          );
        
        if(matchesCategory){
          
        // wrapper.innerHTML += bannerHTML;
        }
        }
      }
      )
  }catch(error){
    console.error("error adding banners");
    console.error(error)
  }
}