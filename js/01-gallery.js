import { galleryItems } from "./gallery-items.js";
// Change code below this line

// console.log(galleryItems);

const gallery = document.querySelector(".gallery");

const markup = galleryItems.map(
  ({ preview, original, description }) => `<li class="gallery__item">
  <a class="gallery__link js-target"  href='${original}'>
    <img
      class="gallery__image js-target"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`
);

gallery.insertAdjacentHTML("beforeend", markup.join(""));
gallery.addEventListener("click", onClick);

function onClick(event) {
  event.preventDefault();

  if (!event.target.classList.contains("js-target")) {
    return;
  }
  const imgSource = event.target.dataset.source;
  const currentItem = galleryItems.find(
    ({ original }) => original === imgSource
  );

  const instance = basicLightbox.create(
    `
	<img src="${currentItem.original}" width="800" height="600">
`,
    {
      onClose: (instance) => {
        document.addEventListener("keydown", onEscape);
      },
      onShow: (instance) => {
        document.addEventListener("keydown", onEscape);
      },
    }
  );
  instance.show();

  function onEscape(evt) {
    if (evt.code !== "Escape") {
      return;
    }
    instance.close();
  }
}
