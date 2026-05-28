/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: wknd-trendsetters cleanup.
 * Removes non-authorable site-wide elements.
 * Selectors validated against migration-work/cleaned.html.
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Remove skip-link (site shell accessibility element)
    // Found in cleaned.html: <a href="#main-content" class="skip-link">
    WebImporter.DOMUtils.remove(element, ['.skip-link']);
  }

  if (hookName === TransformHook.afterTransform) {
    // Remove non-authorable site chrome
    // Found in cleaned.html: <div class="navbar">
    // Found in cleaned.html: <footer class="footer inverse-footer">
    // Found in cleaned.html: <div class="breadcrumbs">
    WebImporter.DOMUtils.remove(element, [
      '.navbar',
      'footer',
      '.breadcrumbs',
    ]);

    // Remove noscript and link elements (non-authorable)
    WebImporter.DOMUtils.remove(element, ['noscript', 'link']);
  }
}
