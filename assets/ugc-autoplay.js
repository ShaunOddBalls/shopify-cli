document.addEventListener('click', handleEvent, { once: true });
document.addEventListener('keydown', handleEvent, { once: true });
document.addEventListener('scroll', handleEvent, { once: true });

function handleEvent() {
  const videos = Array.from(document.querySelectorAll('#ugc-wrapper video'));
  let currentVideoIndex = 0;

  function playVideo(index) {
    if (index < videos.length) {
      const video = videos[index];
      video.play().catch(error => console.error("Playback failed: ", error));
      video.addEventListener('ended', onVideoEnd);
    }
  }

  function onVideoEnd() {
    videos[currentVideoIndex].removeEventListener('ended', onVideoEnd);
    currentVideoIndex++;
    if (currentVideoIndex >= videos.length) currentVideoIndex = 0;
    playVideo(currentVideoIndex);
  }

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        observer.unobserve(entry.target);
        playVideo(currentVideoIndex);
      }
    });
  }, { threshold: 0.5 });

  if (videos.length > 0) observer.observe(videos[0]);
}
