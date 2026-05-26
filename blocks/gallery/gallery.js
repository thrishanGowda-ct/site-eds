import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * @param {Element} block
 */
export default function decorate(block) {
  const header = document.createElement('div');
  header.className = 'gallery-header';
  const grid = document.createElement('ul');
  grid.className = 'gallery-grid';

  [...block.children].forEach((row) => {
    const picture = row.querySelector('picture');
    if (picture) {
      const img = row.querySelector('img');
      if (img) {
        picture.replaceWith(createOptimizedPicture(img.src, img.alt, true, [{ width: '600' }]));
      }
      const li = document.createElement('li');
      li.append(row.firstElementChild || row);
      grid.append(li);
      return;
    }

    header.append(row);
  });

  block.replaceChildren(header, grid);
}
