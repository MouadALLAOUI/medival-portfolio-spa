const imageViewer = document.getElementById('image-viewer');
const imageViewerContainer = document.getElementById('image-viewer-container');


function renderImage(src = "", ismobile = false) {
  imageViewer.classList.add("active");
  imageViewerContainer.innerHTML = `<img class="${ismobile ? "portrait" : "land"}" src="${src}" />`;
}

export function closeImage() {
  imageViewer.classList.remove("active");
  imageViewerContainer.innerHTML = ``;
}

export default renderImage;