const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");
let photosArray = [];
let ready = false;
let imagesLoaded = 0;
let totalImages = 0;

// Unsplash API
let imageCount = 5;
const apiKey = "xBoUBk_lifN9xZ8G3PlS-ExwzpG1OWAabyYUzbXIeZM";
let apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${imageCount}`;

// Check if images are loaded
function imageloaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    imageCount = 30;
  }
}

// Helper function to set attribute
function setAttributeHelper(elements, attributes) {
  for (const key in attributes) {
    elements.setAttribute(key, attributes[key]);
  }
}

function displayPhotos() {
  totalImages = photosArray.length;
  // Running forEach loop for every photos fetched
  photosArray.forEach((photo) => {
    const anchorTag = document.createElement("a");
    setAttributeHelper(anchorTag, { href: photo.links.html, target: "_blank" });
    const img = document.createElement("img");
    setAttributeHelper(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });

    // Appending the tags within each-other
    imageloaded();
    anchorTag.appendChild(img);
    imageContainer.appendChild(anchorTag);
  });
  apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${imageCount}`;
  imagesLoaded = 0;
}

// Get photos from API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {}
}

// If scroller at the bottom of page, get more photos
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// On Load
getPhotos();
