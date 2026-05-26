import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * @param {HTMLImageElement} img
 */
function optimizeImage(img) {
  const pic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
  const picture = img.closest('picture');
  if (picture) picture.replaceWith(pic);
  else img.replaceWith(pic);
}

/**
 * @param {Element} block
 */
export default function decorate(block) {
  const rows = [...block.children];
  const content = document.createElement('div');
  content.className = 'hero-split-content';
  const media = document.createElement('div');
  media.className = 'hero-split-media';

  const buttons = document.createElement('div');
  buttons.className = 'button-group';

  rows.forEach((row) => {
    const picture = row.querySelector('picture');
    if (picture) {
      row.querySelectorAll('picture > img').forEach(optimizeImage);
      const cell = document.createElement('div');
      cell.className = 'hero-split-media-item';
      cell.append(...row.children);
      media.append(cell);
      return;
    }

    const links = row.querySelectorAll('a');
    if (links.length > 0 && [...links].every((a) => a.closest('p') === row.querySelector('p') || row.children.length <= 2)) {
      links.forEach((a) => buttons.append(a));
      return;
    }

    [...row.children].forEach((cell) => content.append(cell));
  });

  if (buttons.children.length) content.append(buttons);

  block.replaceChildren(content, media);
}
