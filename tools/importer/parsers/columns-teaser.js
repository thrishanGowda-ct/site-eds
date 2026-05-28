/* eslint-disable */
/* global WebImporter */

/**
 * Parser: columns-teaser
 * Base block: columns
 * Source selector: main > section:nth-child(2) .grid-layout
 * Source: https://wknd-trendsetters.site/
 * Generated: 2026-05-27
 *
 * Extracts a two-column teaser layout:
 *   Column 1: cover image
 *   Column 2: breadcrumbs, heading, author/date metadata
 */
export default function parse(element, { document }) {
  // Get the two column containers (direct div children of the grid)
  const columns = element.querySelectorAll(':scope > div');

  // Column 1: Image
  const imageCol = columns[0];
  const image = imageCol ? imageCol.querySelector('img.cover-image, img') : null;

  // Column 2: Content (breadcrumbs, heading, author metadata)
  const contentCol = columns[1];

  // Extract breadcrumbs
  const breadcrumbs = contentCol ? contentCol.querySelector('.breadcrumbs') : null;

  // Extract heading
  const heading = contentCol ? contentCol.querySelector('h2.h2-heading, h2, h1, h3') : null;

  // Extract author/date metadata container
  const metaContainer = contentCol ? contentCol.querySelectorAll(':scope > div > div') : [];

  // Build content cell elements
  const contentCell = [];
  if (breadcrumbs) contentCell.push(breadcrumbs);
  if (heading) contentCell.push(heading);
  // Add author/date metadata divs
  metaContainer.forEach((meta) => {
    contentCell.push(meta);
  });

  // Build cells array: single row with two columns
  const cells = [];

  const imageCell = [];
  if (image) imageCell.push(image);

  cells.push([imageCell, contentCell]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-teaser', cells });
  element.replaceWith(block);
}
