/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-landing
 * Base block: hero
 * Source: https://wknd-trendsetters.site/
 * Selector: header.secondary-section .grid-layout
 * Generated: 2026-05-27
 *
 * Source structure:
 * - div.grid-layout.tablet-1-column.grid-gap-xxl (root)
 *   - div (content): h1.h1-heading, p.subheading, div.button-group > a.button links
 *   - div.grid-layout (images): multiple img.cover-image
 */
export default function parse(element, { document }) {
  // Extract heading (h1 with class h1-heading, fallback to any h1/h2)
  const heading = element.querySelector('h1.h1-heading, h1, h2');

  // Extract description/subheading
  const description = element.querySelector('p.subheading, p');

  // Extract CTA buttons from button-group
  const ctaLinks = Array.from(
    element.querySelectorAll('.button-group a.button, a.button'),
  );

  // Extract hero images from the image grid
  const images = Array.from(
    element.querySelectorAll('.grid-layout img.cover-image, img.cover-image, img'),
  );

  // Build content cell: heading + description + CTAs
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (description) contentCell.push(description);
  if (ctaLinks.length > 0) contentCell.push(...ctaLinks);

  // Build image cell: all hero images
  const imageCell = [];
  if (images.length > 0) imageCell.push(...images);

  // Build cells array - single row with content and images side by side
  const cells = [];
  if (imageCell.length > 0) {
    cells.push([contentCell, imageCell]);
  } else {
    cells.push(contentCell);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-landing', cells });
  element.replaceWith(block);
}
