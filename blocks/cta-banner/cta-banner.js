import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * @param {Element} block
 */
export default function decorate(block) {
  const banner = document.createElement('div');
  banner.className = 'cta-banner-inner';

  [...block.children].forEach((row) => {
    const img = row.querySelector('img');
    if (img) {
      const media = document.createElement('div');
      media.className = 'cta-banner-media';
      const optimized = createOptimizedPicture(img.src, img.alt, true, [{ width: '1200' }]);
      row.querySelector('picture')?.replaceWith(optimized);
      media.append(optimized);
      banner.append(media);
      return;
    }
    const content = banner.querySelector('.cta-banner-content') || document.createElement('div');
    content.className = 'cta-banner-content';
    content.append(row);
    if (!banner.contains(content)) banner.append(content);
  });

  const overlay = document.createElement('div');
  overlay.className = 'cta-banner-overlay';
  overlay.setAttribute('aria-hidden', 'true');
  banner.prepend(overlay);

  block.replaceChildren(banner);
}
