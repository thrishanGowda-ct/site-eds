import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * @param {Element} block
 */
export default function decorate(block) {
  const rows = [...block.children];
  const media = document.createElement('div');
  media.className = 'article-highlight-media';
  const content = document.createElement('div');
  content.className = 'article-highlight-content';
  const breadcrumbs = document.createElement('nav');
  breadcrumbs.className = 'article-highlight-breadcrumbs';
  breadcrumbs.setAttribute('aria-label', 'Breadcrumb');

  rows.forEach((row) => {
    const picture = row.querySelector('picture');
    if (picture) {
      const img = row.querySelector('img');
      if (img) {
        const optimized = createOptimizedPicture(img.src, img.alt, false, [{ width: '900' }]);
        picture.replaceWith(optimized);
      }
      media.append(row);
      return;
    }

    const links = row.querySelectorAll('a');
    if (links.length >= 2 && !row.querySelector('h2')) {
      const list = document.createElement('ol');
      links.forEach((link, index) => {
        const li = document.createElement('li');
        li.append(link);
        list.append(li);
        if (index < links.length - 1) {
          const sep = document.createElement('span');
          sep.className = 'article-highlight-breadcrumb-sep';
          sep.setAttribute('aria-hidden', 'true');
          sep.textContent = '/';
          li.append(sep);
        }
      });
      breadcrumbs.append(list);
      return;
    }

    if (row.querySelector('h2')) {
      content.append(breadcrumbs);
    }

    const meta = document.createElement('div');
    meta.className = 'article-highlight-meta';
    const text = row.textContent.trim();
    if (text.toLowerCase().startsWith('by ') || row.querySelector('strong')) {
      meta.classList.add('article-highlight-author');
      content.append(meta);
      meta.append(row);
      return;
    }
    if (text.includes('•') || text.match(/\d{4}/)) {
      meta.classList.add('article-highlight-date');
      if (!content.querySelector('.article-highlight-meta.article-highlight-author')) {
        content.append(meta);
      } else {
        content.querySelector('.article-highlight-meta')?.append(row);
      }
      meta.append(row);
      return;
    }

    content.append(row);
  });

  if (!content.querySelector('.article-highlight-breadcrumbs') && breadcrumbs.children.length) {
    content.prepend(breadcrumbs);
  }

  block.replaceChildren(media, content);
}
