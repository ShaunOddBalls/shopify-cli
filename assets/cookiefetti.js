  const images = [
    "https://cdn.shopify.com/s/files/1/0353/7249/files/Cookie-1.png?v=1758200614",
    "https://cdn.shopify.com/s/files/1/0353/7249/files/Cookie-2.png?v=1758200628",
    "https://cdn.shopify.com/s/files/1/0353/7249/files/Crumbs.png?v=1758200635"
  ];
let rainingCookies;
  window.startCookieRain = () => {
    rainingCookies = setInterval(() => {
      const cookie = document.createElement("img");
      cookie.src = images[Math.floor(Math.random() * images.length)];
      cookie.classList.add("cookie");
      cookie.style.left = Math.random() * window.innerWidth + "px";
      const size = 30 + Math.random() * 50;
      cookie.style.width = size + "px";
      const duration = 2 + Math.random() * 4;
      cookie.style.animationDuration = duration + "s";
      const drift = (Math.random() - 0.5) * 200;
      cookie.style.transform = `translateX(${drift}px)`;
      document.body.appendChild(cookie);
      setTimeout(() => {
        cookie.remove();
      }, duration * 1000);
    }, 100);
  }

  window.stopCookieRain = () =>{
    clearInterval(rainingCookies);
  }
