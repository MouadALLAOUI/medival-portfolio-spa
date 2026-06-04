import { loadMarkdownAsset } from '../lib/utils/assetUtils.js';

export const blogs = [
  {
    id: "blog-your-first-beginner-course-to-html",
    content: loadMarkdownAsset("blog-your-first-beginner-course-to-html")
  },
  {
    id: "blog-how-to-implement-css-into-your-html",
    content: loadMarkdownAsset("blog-how-to-implement-css-into-your-html")
  },
  {
    id: "blog-add-javascript-to-your-first-static-website",
    content: loadMarkdownAsset("blog-add-javascript-to-your-first-static-website")
  },
  {
    id: "blog-essential-html-tags-you-should-know",
    content: loadMarkdownAsset("blog-essential-html-tags-you-should-know")
  },
  {
    id: "blog-dont-underestimate-css-advanced-tricks-you-need",
    content: loadMarkdownAsset("blog-dont-underestimate-css-advanced-tricks-you-need")
  },
  {
    id: "blog-javascript-dom-manipulation-for-beginners",
    content: loadMarkdownAsset("blog-javascript-dom-manipulation-for-beginners")
  },
  {
    id: "blog-understanding-variables-data-types-and-operators-in-js",
    content: loadMarkdownAsset("blog-understanding-variables-data-types-and-operators-in-js")
  },
  {
    id: "blog-how-to-debug-javascript-like-a-pro",
    content: loadMarkdownAsset("blog-how-to-debug-javascript-like-a-pro")
  },
  {
    id: "blog-intro-to-responsive-web-design-with-media-queries",
    content: loadMarkdownAsset("blog-intro-to-responsive-web-design-with-media-queries")
  },
  {
    id: "blog-from-zero-to-deploy-hosting-your-first-website",
    content: loadMarkdownAsset("blog-from-zero-to-deploy-hosting-your-first-website")
  }
];

export const blogTags = [...new Set(blogs.flatMap((b) => b.tags))];

export default blogs;
