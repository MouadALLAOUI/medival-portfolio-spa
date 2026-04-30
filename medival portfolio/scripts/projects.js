import { markdownToHtml } from "./markdowntohtml.js";
import getColorForTag, { colors } from "./colors.js";
import renderImage from "./viewimage.js";
import projects from "../content/projects.js";

const projectsGridContainer = document.querySelector('.projects-container');
const projectsOverviewContainer = document.querySelector('.projects-overview');

function createTagElement(tag) {
  let tagcolor = getColorForTag(tag);
  const el = document.createElement('span');
  el.className = 'tech-item';
  el.textContent = tag;
  el.style.backgroundColor = tagcolor.bg;
  el.style.color = tagcolor.color;
  el.style.borderColor = tagcolor.border;

  el.addEventListener('mouseenter', () => {
    el.style.backgroundColor = tagcolor.hover.bg;
    el.style.borderColor = tagcolor.hover.border;
  });
  el.addEventListener('mouseleave', () => {
    el.style.backgroundColor = tagcolor.bg;
    el.style.borderColor = tagcolor.border;
  });

  return el;
}

function overviewProject(element) {
  projectsOverviewContainer.innerHTML = "";
  const itemClass = `item-${element.id}`;
  const overview = element.overview;

  if (
    projectsOverviewContainer.classList.contains("active") &&
    projectsOverviewContainer.classList.contains(itemClass)
  ) {
    projectsOverviewContainer.classList.remove("active", itemClass);
    projectsGridContainer.classList.remove("active", itemClass);
    return; // Exit early
  }

  projectsOverviewContainer.classList.forEach(cls => {
    if (cls.startsWith("item-")) {
      projectsOverviewContainer.classList.remove(cls);
    }
  });
  projectsOverviewContainer.classList.add("active", itemClass);
  projectsGridContainer.classList.add("active");

  // setup element

  // set Title
  const OverviewTitle = document.createElement("h1");
  OverviewTitle.className = "title";
  OverviewTitle.textContent = element.title;

  projectsOverviewContainer.append(OverviewTitle);

  // set thumbnail
  const OverviewThumbnail = document.createElement("div");
  OverviewThumbnail.className = "thumbnail";

  const OverviewThumbnailImg = document.createElement("img");
  OverviewThumbnailImg.setAttribute("src", overview.thumbnail ? overview.thumbnail : 'https://placehold.co/4000x2000');
  OverviewThumbnailImg.setAttribute("alt", element.title);

  OverviewThumbnail.append(OverviewThumbnailImg);

  projectsOverviewContainer.append(OverviewThumbnail);

  // set tags span
  const tags = element.tags;
  if (Array.isArray(tags) && tags.length > 0) {
    const techStack = document.createElement('div');
    techStack.className = 'tech-stack';
    tags.forEach(tag => {
      const techStackItem = createTagElement(tag);
      techStack.append(techStackItem);
    })

    projectsOverviewContainer.append(techStack);
  }

  // set the intro

  if (overview.intro) {
    const OverviewIntroTitle = document.createElement("h3");
    OverviewIntroTitle.textContent = "Intro";

    const OverviewIntroText = document.createElement("p");
    OverviewIntroText.innerHTML = element.overview.intro;

    projectsOverviewContainer.append(OverviewIntroTitle, OverviewIntroText);
  }

  // set the Detailed description

  if (overview.desc) {
    const OverviewDetailedDescTitle = document.createElement("h3");
    OverviewDetailedDescTitle.textContent = "Detailed description";

    const OverviewDetailedDescText = document.createElement("div");
    OverviewDetailedDescText.className = "markdown-content";
    OverviewDetailedDescText.innerHTML = markdownToHtml(element.overview.desc);

    projectsOverviewContainer.append(OverviewDetailedDescTitle, OverviewDetailedDescText);
  }
  // set the features
  const features = overview.features;
  if (features.length > 0) {
    const OverviewFeaturesTitle = document.createElement("h3");
    OverviewFeaturesTitle.textContent = "Features";

    const featuresStack = document.createElement('ul');

    features.forEach(feature => {
      const featuresStackItem = document.createElement('li');
      featuresStackItem.textContent = feature;
      featuresStack.append(featuresStackItem);
    })

    projectsOverviewContainer.append(OverviewFeaturesTitle, featuresStack);
  }

  // set gallery
  const imgs = overview.imgs;
  if (imgs.length > 0) {
    const OverviewGalleryTitle = document.createElement("h3");
    OverviewGalleryTitle.textContent = "Gallery";

    const imgsStack = document.createElement('div');
    imgsStack.className = "imgs-gal";

    imgs.map((img, i) => {
      const imgsStackItemContainer = document.createElement('div');
      imgsStackItemContainer.className = "gal-item";
      if (img.isBlur) {
        imgsStackItemContainer.className += " blured"
      }
      imgsStackItemContainer.setAttribute("data-key", `item-${i}`)

      const imgsStackItemImg = document.createElement('img');
      imgsStackItemImg.setAttribute("src", img.src);
      imgsStackItemImg.setAttribute("alt", img.alt ? img.alt : element.title);

      imgsStackItemContainer.addEventListener("click", e => renderImage(img.src, img.ismobile))
      imgsStackItemContainer.append(imgsStackItemImg);
      imgsStack.append(imgsStackItemContainer);
    })

    projectsOverviewContainer.append(OverviewGalleryTitle, imgsStack);
  }

  // set links
  const links = overview.link;
  if (links.length > 0) {

    const OverviewLinksTitle = document.createElement("h3");
    OverviewLinksTitle.textContent = "links";

    const linkStack = document.createElement('div');
    linkStack.className = 'overview-links';

    links.map((link, i) => {
      const linkStackItem = document.createElement(link.isDisabled ? "span" : "a");
      linkStackItem.className = `overview-link ${link.isDisabled ? "disabled" : ""}`;
      if (link.href && link.href !== "#") {
        linkStackItem.setAttribute("href", link.href)
        linkStackItem.setAttribute("target", "_blank")
      } else {
        linkStackItem.setAttribute("href", "#")
      }
      linkStackItem.setAttribute("key", i)

      linkStackItem.innerHTML = `<span>${link.icon}</span>${link.label}`;

      linkStack.append(linkStackItem);
    })

    projectsOverviewContainer.append(OverviewLinksTitle, linkStack);
  }

  // set timestamp

  const OverviewTimeStamp = document.createElement("div");
  OverviewTimeStamp.className = "timestamp-date";

  const OverviewTimeStampText = document.createElement("p");
  OverviewTimeStampText.innerHTML = `${overview.startdate ? overview.startdate : "unkonwn"} | ${overview.enddate ? overview.enddate : overview.status ? overview.status : "unkonwn"}`;

  OverviewTimeStamp.append(OverviewTimeStampText)

  projectsOverviewContainer.append(OverviewTimeStamp);
}

function renderProjects() {
  projectsGridContainer.innerHTML = "";
  // const projectCardsTitle = document.createElement('div');
  // projectCardsTitle.className = `project-cards-title`;
  // projectCardsTitle.textContent = "Arcane Archives";

  // projectsGridContainer.appendChild(projectCardsTitle);

  const projectCardsContainer = document.createElement('div');
  projectCardsContainer.className = `project-cards-container`;

  projects.forEach(element => {
    // set card container
    const projectCard = document.createElement('div');
    projectCard.className = `project-card`;
    projectCard.id = `project-${element.id}`;
    projectCard.addEventListener("click", () => overviewProject(element));
    const bgImgUrl = element.overview.thumbnail ? '../' + element.overview.thumbnail : '../../media/download.png';
    projectCard.style.setProperty('--bg-img', `url(${bgImgUrl})`);

    // set name tag
    const projectName = document.createElement('h3');
    projectName.className = 'project-title';
    projectName.textContent = element.title;

    projectCard.append(projectName);

    // set desc tag
    const projectDesc = document.createElement('p');
    projectDesc.className = 'project-description';
    projectDesc.innerHTML = element.desc;

    projectCard.append(projectDesc);

    // set tags span
    let tags = element.tags;

    const techStack = document.createElement('div');
    techStack.className = 'tech-stack';
    tags.forEach(tag => {
      const techStackItem = createTagElement(tag);
      techStack.append(techStackItem);
    })

    projectCard.append(techStack);

    const projectLink = document.createElement('a');
    projectLink.href = element.link.link;
    projectLink.setAttribute("target", "_blank");
    projectLink.className = 'project-link';
    projectLink.innerHTML = `<span class="project-link-icon">${element.link.icon}</span>${element.link.link}`;

    projectCard.append(projectLink);

    // add project card to container
    projectCardsContainer.appendChild(projectCard);
  })

  projectsGridContainer.appendChild(projectCardsContainer);
}

document.addEventListener('DOMContentLoaded', () => {
  // overviewProject(projects[0]); // Show the first project by default
  renderProjects()
});