import { getAssetById } from './mediaManager';
const designs = [
  {
    id: 1,
    src: getAssetById('skills-1-figma-arkani').path,
    alt: "Figma Arkani UI",
    caption: "Figma • Arkani UI",
    isMobile: false
  },
  {
    id: 2,
    src: getAssetById('skills-1-figma-stockmanagement').path,
    alt: "Figma Stock Management UI",
    caption: "Figma • Stock Management",
    isMobile: false
  },
  {
    id: 3,
    src: getAssetById('skills-1-figma-pharma').path,
    alt: "Figma Pharma UI",
    caption: "Figma • Pharma",
    isMobile: false
  },
  {
    id: 4,
    src: getAssetById('skills-1-canva-gdd').path,
    alt: "Canva GDD",
    caption: "Canva • Game Design Doc",
    isMobile: false
  },
  {
    id: 5,
    src: getAssetById('skills-1-vs-style').path,
    alt: "UI style theme draft",
    caption: "UI Style • Theme Draft",
    isMobile: false
  }
];

export default designs;
