/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-gallery variant.
 * Base block: cards
 * Source: https://wknd-trendsetters.site/
 * Selector: .grid-layout.desktop-4-column.grid-gap-sm
 * Generated: 2026-05-27
 *
 * Source structure: A grid of div.utility-aspect-1x1 elements each containing
 * a single img.cover-image with alt text. This is a pure image gallery.
 *
 * Target: Cards block with one row per image card.
 */
export default function parse(element, { document }) {
  // Extract all image cards from the grid
  // Each card is a div.utility-aspect-1x1 containing an img.cover-image
  const cardItems = element.querySelectorAll(':scope > .utility-aspect-1x1, :scope > div > img.cover-image');

  const cells = [];

  cardItems.forEach((item) => {
    // Get the image from within the card container
    const img = item.tagName === 'IMG' ? item : item.querySelector('img.cover-image, img');
    if (img) {
      // Each row is a single cell containing the image
      cells.push([img]);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-gallery', cells });
  element.replaceWith(block);
}
