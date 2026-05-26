import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * @param {Element} block
 */
export default function decorate(block) {
  const rows = [...block.children];
  const header = document.createElement('div');
  header.className = 'article-cards-header';

  while (rows[0] && !rows[0].querySelector('picture')) {
    header.append(rows.shift());
  }

  const ul = document.createElement('ul');
  rows.forEach((row) => {
    const li = document.createElement('li');
    const link = row.querySelector('a[href]');
    const card = document.createElement(link ? 'a' : 'div');
    card.className = 'article-cards-card';
    if (link) {
      card.href = link.href;
      card.title = link.textContent.trim();
    }

    const imageDiv = document.createElement('div');
    imageDiv.className = 'article-cards-image';
    const body = document.createElement('div');
    body.className = 'article-cards-body';
    const meta = document.createElement('div');
    meta.className = 'article-cards-meta';

    [...row.children].forEach((cell) => {
      if (cell.querySelector('picture')) {
        const img = cell.querySelector('img');
        if (img) {
          cell.querySelector('picture').replaceWith(
            createOptimizedPicture(img.src, img.alt, true, [{ width: '750' }]),
          );
        }
        imageDiv.append(cell);
        return;
      }
      const tag = cell.querySelector('p')?.textContent?.trim();
      const heading = cell.querySelector('h3, h4');
      if (heading) {
        if (!link) {
          const titleLink = document.createElement('a');
          titleLink.href = '#';
          titleLink.append(heading.cloneNode(true));
          body.append(titleLink);
        } else {
          body.append(heading);
        }
        return;
      }
      if (tag && !cell.querySelector('h3')) {
        const tagEl = document.createElement('span');
        tagEl.className = 'article-cards-tag';
        tagEl.textContent = tag;
        meta.append(tagEl);
        return;
      }
      if (cell.textContent.match(/\b\d{4}\b/) || cell.textContent.match(/[A-Z][a-z]{2}\s+\d{1,2}/)) {
        const date = document.createElement('span');
        date.className = 'article-cards-date';
        date.textContent = cell.textContent.trim();
        meta.append(date);
      }
    });

    if (meta.children.length) body.prepend(meta);
    if (imageDiv.children.length) card.append(imageDiv);
    card.append(body);
    li.append(card);
    ul.append(li);
  });
  if (header.children.length) {
    block.replaceChildren(header, ul);
  } else {
    block.replaceChildren(ul);
  }
}
