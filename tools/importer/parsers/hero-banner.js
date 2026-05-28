/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-banner
 * Base block: hero
 * Source: https://wknd-trendsetters.site/
 * Selector: section.inverse-section .utility-position-relative
 * Generated: 2026-05-27
 *
 * Source structure:
 * - Background image: img.cover-image
 * - Overlay div: .overlay
 * - Card body: .card-body containing heading, subheading, button-group
 *
 * Target structure:
 * - Row 1: Background image
 * - Row 2: Content (heading + description + CTA buttons)
 */
export default function parse(element, { document }) {
  // Extract background image
  const bgImage = element.querySelector('img.cover-image, img[class*="cover"], img[class*="overlay"]');

  // Extract heading (h2.h1-heading in source, fallback to h1, h2, h3)
  const heading = element.querySelector('.card-body h2, .card-body h1, h2.h1-heading, h1, h2, h3, [class*="heading"]');

  // Extract description/subheading
  const description = element.querySelector('.card-body p.subheading, .card-body p, p.subheading, p[class*="subtitle"], p[class*="description"]');

  // Extract CTA links from button group
  const ctaLinks = Array.from(
    element.querySelectorAll('.button-group a, a.button, a.inverse-button, a[class*="cta"]')
  );

  // Build cells array matching hero block structure
  const cells = [];

  // Row 1: Background image (if present)
  if (bgImage) {
    cells.push([bgImage]);
  }

  // Row 2: Content cell - heading, description, and CTAs combined in one cell
  const contentContainer = document.createElement('div');
  if (heading) contentContainer.appendChild(heading);
  if (description) contentContainer.appendChild(description);
  if (ctaLinks.length > 0) {
    const linkContainer = document.createElement('p');
    ctaLinks.forEach((link) => {
      linkContainer.appendChild(link);
    });
    contentContainer.appendChild(linkContainer);
  }
  if (contentContainer.children.length > 0) {
    cells.push([contentContainer]);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-banner', cells });
  element.replaceWith(block);
}
