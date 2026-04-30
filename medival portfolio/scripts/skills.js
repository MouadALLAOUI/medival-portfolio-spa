import { markdownToHtml } from "./markdowntohtml.js";
import allSkills from "../content/skills.js";
import renderImage from "./viewimage.js";

const skillsGridContainerP = document.querySelector('.skills-grid-container');
const skillsGridContainer = document.querySelector('.skills-grid');
const skillsGridPag = document.querySelector('.pagination');
const skillsOverviewContainer = document.querySelector('.skills-overview');
const skillsFilterButtons = document.querySelectorAll('.skills-filter-btn');

let skillPerPage = 6;
let currentPage = 1;
let isActiveSkills = false;
let activeSkillId = null;
let isResizing = false;
let currentGroup = "general";

function getSkillGroup(skill) {
  return skill.group || "general";
}

function getFilteredSkills() {
  return allSkills.filter(s => getSkillGroup(s) === currentGroup);
}

function resetOverview() {
  skillsOverviewContainer.innerHTML = "";
  skillsOverviewContainer.classList.remove("active");

  skillsOverviewContainer.classList.forEach(cls => {
    if (cls.startsWith("skill-")) {
      skillsOverviewContainer.classList.remove(cls);
      skillsGridContainerP.classList.remove(cls);
    }
  });

  skillsGridContainerP.classList.remove("active");
  document.querySelectorAll(".skill-card").forEach(c => c.classList.remove("active"));
  isActiveSkills = false;
  activeSkillId = null;
}

function overviewSkills(element) {
  const itemClass = `skill-${element.id}`;
  skillsOverviewContainer.innerHTML = "";
  const overview = element.overview;

  if (
    skillsOverviewContainer.classList.contains("active") &&
    skillsOverviewContainer.classList.contains(itemClass)
  ) {
    skillsOverviewContainer.classList.remove("active", itemClass);
    skillsGridContainerP.classList.remove("active", itemClass);
    isActiveSkills = false;
    activeSkillId = null;
    currentPage = 1;
    update()
    return;
  }

  skillsOverviewContainer.classList.forEach(cls => {
    if (cls.startsWith("skill-")) {
      skillsOverviewContainer.classList.remove(cls);
      skillsGridContainerP.classList.remove(cls);
    }
  });

  document.querySelectorAll(".skill-card").forEach(c => c.classList.remove("active"));
  // console.log("document", document.querySelectorAll(".skill-card").forEach(c => c.classList.remove("active")))
  const card = document.querySelector(`.skill-card[data-skill="skill-${element.id}"]`);

  // console.log("card", card)

  if (card) {
    card.classList.add("active");
    activeSkillId = element.id;
  };

  // ensure the current page shows the selected skill
  const filteredSkills = getFilteredSkills();
  const skillIndex = filteredSkills.findIndex(s => s.id === element.id);
  if (skillIndex !== -1) {
    const pageNum = Math.floor(skillIndex / skillPerPage) + 1;
    currentPage = pageNum;
  }

  isActiveSkills = true;
  skillsOverviewContainer.classList.add("active", itemClass);
  skillsGridContainerP.classList.add("active", itemClass);

  // ----

  const skillOverviewCont = document.createElement('div');
  skillOverviewCont.className = 'skill-overview active';

  const skillThumb = document.createElement('div');
  skillThumb.className = 'thumbnail';

  // add thumbnail

  const skillThumbImg = document.createElement('img');
  skillThumbImg.setAttribute('src', overview.thumbnail)
  skillThumbImg.setAttribute('alt', element.name + " thumbnail")

  skillThumb.append(skillThumbImg)
  skillOverviewCont.append(skillThumb)

  // add title name and intro desc, proficiency
  const skillNameContainer = document.createElement('div');
  skillNameContainer.className = 'skill-name-container';
  const skillNameIcon = document.createElement('div');
  skillNameIcon.className = 'skill-name-icon';
  const skillName = document.createElement('h2');
  skillName.className = 'skill-name';
  skillName.textContent = element.name;
  const skillIcon = document.createElement('p');
  skillIcon.className = 'skill-icon';
  skillIcon.textContent = element.icon;

  skillNameIcon.append(skillIcon, skillName)

  // const skillStartDate = document.createElement('p');
  // skillStartDate.className = 'skill-startdate';
  // skillStartDate.innerHTML = `<strong>Started:</strong> ${overview.startdate || 'Unknown'}`;



  const starContainer = document.createElement('div');
  starContainer.className = 'proficiency';
  let level = element.level;
  for (let i = 0; i < 5; i++) {
    const star = document.createElement('span');
    star.className = 'star';
    if (level >= 1) {
      star.innerHTML = '★';
      star.classList.remove('empty');
      starContainer.appendChild(star);
      level--;
    } else {
      star.innerHTML = '☆';
      star.classList.add('empty');
      starContainer.appendChild(star);
    }
  }

  skillNameContainer.append(skillNameIcon)
  // skillNameContainer.append(skillStartDate)
  skillNameContainer.append(starContainer)
  const skillIntro = document.createElement('p');
  skillIntro.className = 'skill-intro';
  skillIntro.innerHTML = overview.intro || 'not defined';
  skillNameContainer.append(skillIntro)
  skillOverviewCont.append(skillNameContainer)

  // add skill detailed desc
  if (overview.desc) {
    const skillDetailledDscTitle = document.createElement('h3');
    skillDetailledDscTitle.textContent = "Detailled desciprion";

    const skillOverDesc = markdownToHtml(overview.desc);

    const skillDetailledDscContainer = document.createElement('div');
    skillDetailledDscContainer.className = 'markdown-content';
    skillDetailledDscContainer.innerHTML = skillOverDesc;

    skillOverviewCont.append(skillDetailledDscTitle)
    skillOverviewCont.append(skillDetailledDscContainer)
  }
  // Build features list HTML
  if (overview.features && overview.features.length > 0) {
    const skillFeaturesTitle = document.createElement('h3');
    skillFeaturesTitle.textContent = "Features";

    const skillFeaturesContainer = document.createElement('ul');
    skillFeaturesContainer.innerHTML = overview.features.map(
      (f, i) => `<li data-key="${i}">${f}</li>`).join('');

    skillOverviewCont.append(skillFeaturesTitle)
    skillOverviewCont.append(skillFeaturesContainer)
  }
  // Build images gallery HTML
  const imgs = overview.imgs;

  if (imgs && imgs.length > 0) {
    const skillGalTitle = document.createElement('h3');
    skillGalTitle.textContent = "Gallery";

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
      if (img.isMobile) {
        imgsStackItemImg.classList.add("mobile-img");
      }
      imgsStackItemContainer.addEventListener("click", e => renderImage(img.src, img.isMobile))
      imgsStackItemContainer.append(imgsStackItemImg);
      imgsStack.append(imgsStackItemContainer);
    })

    skillOverviewCont.append(skillGalTitle, imgsStack)
  }
  // skill-story
  if (overview.storyBehindIt) {
    const skillStoryTitle = document.createElement('h3');
    skillStoryTitle.textContent = "🛤️ Story Behind It";

    const skillStory = markdownToHtml(overview.storyBehindIt);

    const skillStoryContainer = document.createElement('div');
    skillStoryContainer.className = 'markdown-content';
    skillStoryContainer.innerHTML = skillStory;

    skillOverviewCont.append(skillStoryTitle)
    skillOverviewCont.append(skillStoryContainer)
  }

  skillsOverviewContainer.append(skillOverviewCont);

  setTimeout(() => {
    isResizing = true;
    update();
    isResizing = false;
  }, 150);
}
function renderSkills(page) {
  skillsGridContainer.innerHTML = "";
  const skills = getFilteredSkills();
  const startIndex = (page - 1) * skillPerPage;
  const endIndex = startIndex + skillPerPage;
  const paginatedSkills = skills.slice(startIndex, endIndex);
  paginatedSkills.forEach(element => {
    const skillCard = document.createElement('div');
    skillCard.className = `skill-card skill-${element.id}`;
    skillCard.dataset.skill = `skill-${element.id}`;
    skillCard.addEventListener("click", () => overviewSkills(element));
    skillCard.innerHTML = `
      <div class="skill-name-container">
        <span class="skill-icon">${element.icon}</span>
        <h3 class="skill-name">${element.name}</h3>
      </div>
      <p class="skill-description">${element.description}</p>
    `;
    const starContainer = document.createElement('div');
    starContainer.className = 'proficiency';
    let level = element.level;
    for (let i = 0; i < 5; i++) {
      const star = document.createElement('span');
      star.className = 'star';
      if (level >= 1) {
        star.innerHTML = '★';
        star.classList.remove('empty');
        starContainer.appendChild(star);
        level--;
      } else {
        // star.innerHTML = '☆'; // Empty star
        star.innerHTML = '★'; // Empty star
        star.classList.add('empty');
        starContainer.appendChild(star);
      }
    }
    skillCard.appendChild(starContainer);

    skillsGridContainer.appendChild(skillCard);
  });



  if (activeSkillId) {
    const activeCard = skillsGridContainer.querySelector(`.skill-card[data-skill="skill-${activeSkillId}"]`);
    if (activeCard) activeCard.classList.add("active");
  }
}
function renderPagination() {
  skillsGridPag.innerHTML = "";
  const skills = getFilteredSkills();
  const pageCount = Math.max(1, Math.ceil(skills.length / skillPerPage));

  const nav = document.createElement("nav");
  nav.className = "pagination-container";

  function addPage(num, isActive = false, text = num) {
    const a = document.createElement("a");
    a.href = "#";
    a.textContent = text;
    a.className = "pagination-container-link" + (isActive ? " active" : "");
    if (num && num !== currentPage) {
      a.addEventListener("click", e => {
        e.preventDefault();
        currentPage = num;
        update();
      });
    }
    nav.appendChild(a);
  }
  // Prev

  if (currentPage > 1) {
    // console.log(currentPage)
    addPage(currentPage - 1, false, "<");
  }

  if (pageCount <= 5) {
    for (let i = 1; i <= pageCount; i++) addPage(i, i === currentPage);
  } else {
    if (currentPage <= 1) {
      for (let i = 1; i <= 3; i++) addPage(i, i === currentPage);
    } else if (currentPage >= pageCount) {
      for (let i = pageCount - 2; i <= pageCount; i++) addPage(i, i === currentPage);
    } else {
      addPage(currentPage - 1);
      addPage(currentPage, true);
      addPage(currentPage + 1);
    }
  }

  // Next
  if (currentPage < pageCount) {
    addPage(currentPage + 1, false, ">");
  }

  skillsGridPag.appendChild(nav);
}

function setSkillPerPage(currentWidth) {

  if (currentWidth > 1024 && !isActiveSkills) { skillPerPage = 8; }
  else if (currentWidth > 1024 && isActiveSkills) { skillPerPage = 6; }
  else if (currentWidth > 768 && !isActiveSkills) { skillPerPage = 6; }
  else if (currentWidth > 768 && isActiveSkills) { skillPerPage = 3; }
  else if (currentWidth > 400 && !isActiveSkills) { skillPerPage = 4; }
  else if (currentWidth > 400 && isActiveSkills) { skillPerPage = 2; }
  else { skillPerPage = 2; }
}

function update() {
  setSkillPerPage(window.innerWidth);
  const skills = getFilteredSkills();

  const pageCount = Math.ceil(skills.length / skillPerPage) || 1;
  if (currentPage > pageCount) currentPage = pageCount;
  if (currentPage < 1) currentPage = 1;

  if (activeSkillId !== null) {
    const skillIndex = skills.findIndex(s => s.id === activeSkillId);
    if (skillIndex !== -1) {
      const newPage = Math.floor(skillIndex / skillPerPage) + 1;
      // Only jump if the resize caused a mismatch
      if (isResizing && newPage !== currentPage) {
        currentPage = newPage;
      }
    } else {
      resetOverview();
    }
  }
  renderSkills(currentPage);
  renderPagination();
}

document.addEventListener('DOMContentLoaded', () => {
  let resizeTimeout;

  // overviewSkills(skills[9]); // for test purpose only
  update();

  skillsFilterButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const group = btn.dataset.skillGroup || "general";
      if (group === currentGroup) return;

      currentGroup = group;
      skillsFilterButtons.forEach(b => b.classList.toggle("active", b === btn));
      currentPage = 1;
      resetOverview();
      update();
    });
  });

  window.addEventListener('resize', function () {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      isResizing = true;
      update();
      isResizing = false;
    }, 150);
  });
});
