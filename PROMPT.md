for skillsSection card modal preview, the structure should look like this

some already exists in the codebase,
but still need all this from data

- thumbnail
- Features
- Gallery
- Story behind it (markdown content)

if a part in this list already exists, then fix it it doesn show on my page.

```html

  <div class="thumbnail">
    <img src="path/to/js-thumb.jpg" alt="JavaScript thumbnail">
  </div>

  <h3>Detailled desciprion</h3>
  <div class="markdown-content"> // already have markdown content component 'selectedSkill.overview?.desc'
  </div>

  <h3>Features</h3>
  <ul>
    <li data-key="0">Asynchronous programming (Promises & async/await)</li>
    <li data-key="1">DOM Manipulation and Event Handling</li>
  </ul>

  <h3>Gallery</h3>
  <div class="imgs-gal">
    <div class="gal-item" data-key="item-0">
      <img src="gallery-img1.jpg" alt="JavaScript">
    </div>
    <div class="gal-item blured" data-key="item-1">
      <img src="gallery-img2.jpg" alt="JavaScript" class="mobile-img">
    </div>
  </div>

  <h3>Track Story Behind It</h3>
  <div class="markdown-content">
    <p>I started learning JS back in college to make elements move on a page...</p>
  </div>
```
