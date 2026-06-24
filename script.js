gsap.registerPlugin(ScrollTrigger);

// Hero video
const heroVideo = document.getElementById("bgVideo");

const heroVideoSrc =
  "https://stream.mux.com/01ob2hs00AwqPMSEyTsQifp4CJgAuZvvSS6mf9Kjfr45k.m3u8?max_resolution=1080p&min_resolution=480p&redundant_streams=true";

if (Hls.isSupported()) {
  const hls1 = new Hls();
  hls1.loadSource(heroVideoSrc);
  hls1.attachMedia(heroVideo);
} else if (heroVideo.canPlayType("application/vnd.apple.mpegurl")) {
  heroVideo.src = heroVideoSrc;
}

// Testimonials video
const testimonialVideo = document.querySelector(".video-container-ts video");

const testimonialVideoSrc =
  "https://stream.mux.com/Butf26iijraZQhpmp00oiJiVzwXgoWNtyct1O4JkgwA8.m3u8?max_resolution=1080p&min_resolution=480p&redundant_streams=true";

if (Hls.isSupported()) {
  const hls2 = new Hls();
  hls2.loadSource(testimonialVideoSrc);
  hls2.attachMedia(testimonialVideo);
} else if (testimonialVideo.canPlayType("application/vnd.apple.mpegurl")) {
  testimonialVideo.src = testimonialVideoSrc;
}

// Navbar animation
let lastscroll = 0;
let header = document.querySelector("header");

window.addEventListener("scroll", () => {
  let currentscroll = window.pageYOffset;

  if (currentscroll > window.innerHeight * 0.5) {
    if (currentscroll > lastscroll) {
      gsap.to(header, {
        y: -120,
        duration: 0.4,
        ease: "power2.out"
      });
    } else {
      gsap.to(header, {
        y: 0,
        duration: 0.4,
        ease: "power2.out"
      });
    }
  } else {
    gsap.to(header, {
      y: 0,
      duration: 0.4,
      ease: "power2.out"
    });
  }

  lastscroll = currentscroll;
});

// Page2 text split
let h1 = document.querySelector(".page2 h1");

let words = h1.innerHTML
  .split("<br>")
  .map(line =>
    line
      .trim()
      .split(" ")
      .map(word => `<span>${word}</span>`)
      .join(" ")
  )
  .join("<br>");

h1.innerHTML = words;

// Page2 animation
let tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".page2",
    start: "top top",
    end: "+=1000",
    scrub: 2,
    pin: true,
    anticipatePin: 1,
    markers: false
  }
});

tl.to(".rings", {
  scale: 1.5,
  filter: "blur(30px)",
  opacity: 0.5,
  duration: 1
});

tl.from(
  ".page2 h1 span",
  {
    opacity: 0,
    y: 30,
    stagger: 0.08,
    duration: 1
  },
  0.3
);

// Testimonials animation
gsap.from(".text-ts h1", {
  y: 80,
  opacity: 0,
  duration: 1,
  scrollTrigger: {
    trigger: ".testimonials",
    start: "top 70%",
    end: "top 35%",
    scrub: 2
  }
});