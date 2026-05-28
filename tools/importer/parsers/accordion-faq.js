/* eslint-disable */
/* global WebImporter */

/**
 * Parser for accordion-faq
 * Base block: accordion
 * Source: https://wknd-trendsetters.site/
 * Selector: .faq-list
 * Generated: 2026-05-27
 *
 * Source structure:
 *   div.faq-list
 *     details.faq-item (multiple)
 *       summary.faq-question > span (question text)
 *       div.faq-answer > p (answer text)
 *
 * Target: One row per FAQ item with question heading and answer content.
 */
export default function parse(element, { document }) {
  // Extract all FAQ items from the source
  const faqItems = element.querySelectorAll('details.faq-item, details');

  const cells = [];

  faqItems.forEach((item) => {
    // Extract question text from summary > span or summary directly
    const questionSpan = item.querySelector('summary .faq-question span, summary span, summary');
    const questionText = questionSpan ? questionSpan.textContent.trim() : '';

    // Extract answer content from .faq-answer or the content after summary
    const answerDiv = item.querySelector('.faq-answer, div:not(summary)');
    const answerParagraphs = answerDiv
      ? Array.from(answerDiv.querySelectorAll('p, li, div'))
      : [];

    if (questionText) {
      // Create heading element for the question
      const heading = document.createElement('h3');
      heading.textContent = questionText;

      // Build the cell content: heading + answer paragraphs
      const cellContent = [heading];

      if (answerParagraphs.length > 0) {
        answerParagraphs.forEach((p) => {
          cellContent.push(p);
        });
      } else if (answerDiv) {
        // Fallback: use the answer div text as a paragraph
        const p = document.createElement('p');
        p.textContent = answerDiv.textContent.trim();
        cellContent.push(p);
      }

      // Each FAQ item is one row with a single cell containing question + answer
      cells.push(cellContent);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'accordion-faq', cells });
  element.replaceWith(block);
}
