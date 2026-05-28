/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-article
 * Base block: cards
 * Source: https://wknd-trendsetters.site/
 * Selector: .grid-layout.desktop-4-column.grid-gap-md
 * Generated: 2026-05-27
 *
 * Extracts article cards from a grid layout. Each card contains:
 * - Cover image
 * - Category tag, date, heading — all wrapped in a link
 *
 * Target structure: Cards block with one row per card [image | body content]
 */
export default function parse(element, { document }) {
  // Select all article card links within the grid
  const cards = element.querySelectorAll('a.article-card, a.card-link');

  const cells = [];

  cards.forEach((card) => {
    // Extract image
    const img = card.querySelector('.article-card-image img, img.cover-image');

    // Extract body content
    const tag = card.querySelector('.article-card-meta .tag, .tag');
    const date = card.querySelector('.article-card-meta .paragraph-sm, .article-card-meta span:last-child');
    const heading = card.querySelector('h3, h4, .h4-heading, .article-card-body h3');

    // Build image cell
    const imageCell = [];
    if (img) {
      imageCell.push(img);
    }

    // Build body cell - combine text content with the link
    const bodyCell = [];

    // Create a linked heading that preserves the card's href
    if (heading) {
      const link = document.createElement('a');
      link.href = card.href;
      link.textContent = heading.textContent;
      const h = document.createElement('h3');
      h.appendChild(link);
      bodyCell.push(h);
    }

    // Add tag as emphasized text
    if (tag) {
      const tagEl = document.createElement('p');
      const em = document.createElement('em');
      em.textContent = tag.textContent;
      tagEl.appendChild(em);
      bodyCell.push(tagEl);
    }

    // Add date
    if (date) {
      const dateEl = document.createElement('p');
      dateEl.textContent = date.textContent;
      bodyCell.push(dateEl);
    }

    // Only add the row if we have meaningful content
    if (imageCell.length > 0 || bodyCell.length > 0) {
      cells.push([imageCell, bodyCell]);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-article', cells });
  element.replaceWith(block);
}
