/* eslint-disable */
/* global WebImporter */

/**
 * Parser: tabs-testimonial
 * Base block: tabs
 * Source: https://wknd-trendsetters.site/
 * Selector: .tabs-wrapper
 * Generated: 2026-05-27
 *
 * Structure: Each tab row has two cells:
 *   Cell 1 (tab label): avatar image + name + role (displayed in the tab button)
 *   Cell 2 (tab panel): content image + name + role + testimonial quote
 */
export default function parse(element, { document }) {
  const cells = [];

  // Get all tab panes (content panels)
  const tabPanes = element.querySelectorAll('.tab-pane');
  // Get all tab menu buttons (labels)
  const tabButtons = element.querySelectorAll('button.tab-menu-link');

  tabPanes.forEach((pane, index) => {
    // --- Cell 1: Tab label (from tab-menu button) ---
    const labelCell = [];
    const correspondingButton = tabButtons[index];

    if (correspondingButton) {
      // Extract avatar image from the button
      const avatarImg = correspondingButton.querySelector('.avatar img, img.cover-image');
      if (avatarImg) {
        const img = document.createElement('img');
        img.src = avatarImg.src;
        img.alt = avatarImg.alt || '';
        labelCell.push(img);
      }

      // Extract name from button
      const nameEl = correspondingButton.querySelector('.paragraph-sm strong, strong');
      if (nameEl) {
        const p = document.createElement('p');
        const strong = document.createElement('strong');
        strong.textContent = nameEl.textContent.trim();
        p.appendChild(strong);
        labelCell.push(p);
      }

      // Extract role from button
      const roleEls = correspondingButton.querySelectorAll('.paragraph-sm');
      if (roleEls.length > 1) {
        const p = document.createElement('p');
        p.textContent = roleEls[1].textContent.trim();
        labelCell.push(p);
      }
    }

    // --- Cell 2: Tab panel content ---
    const contentCell = [];

    // Extract main content image from the tab pane
    const contentImg = pane.querySelector('.grid-layout > div:first-child img, img.cover-image');
    if (contentImg) {
      const img = document.createElement('img');
      img.src = contentImg.src;
      img.alt = contentImg.alt || '';
      contentCell.push(img);
    }

    // Extract name from tab pane
    const paneName = pane.querySelector('.paragraph-xl strong, .grid-layout > div:nth-child(2) strong');
    if (paneName) {
      const p = document.createElement('p');
      const strong = document.createElement('strong');
      strong.textContent = paneName.textContent.trim();
      p.appendChild(strong);
      contentCell.push(p);
    }

    // Extract role/subtitle from tab pane
    const paneRoleContainer = pane.querySelector('.paragraph-xl.utility-margin-bottom-0');
    if (paneRoleContainer) {
      const roleDiv = paneRoleContainer.parentElement
        ? paneRoleContainer.parentElement.querySelector('div:not(.paragraph-xl)')
        : null;
      if (roleDiv && !roleDiv.classList.contains('paragraph-xl')) {
        const p = document.createElement('p');
        p.textContent = roleDiv.textContent.trim();
        contentCell.push(p);
      }
    }

    // Extract testimonial quote
    const quote = pane.querySelector('p.paragraph-xl');
    if (quote) {
      const p = document.createElement('p');
      p.textContent = quote.textContent.trim();
      contentCell.push(p);
    }

    cells.push([labelCell, contentCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'tabs-testimonial', cells });
  element.replaceWith(block);
}
