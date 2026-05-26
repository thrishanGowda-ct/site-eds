import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * @param {Element} wrapper
 */
function initTabs(wrapper) {
  const tablist = wrapper.querySelector('[role="tablist"]');
  const tabs = [...tablist.querySelectorAll('[role="tab"]')];
  const panels = [...wrapper.querySelectorAll('[role="tabpanel"]')];

  function activate(tab) {
    const index = tab.dataset.tabIndex;
    tabs.forEach((t) => {
      t.classList.remove('is-active');
      t.setAttribute('aria-selected', 'false');
      t.setAttribute('tabindex', '-1');
    });
    panels.forEach((p) => {
      p.classList.remove('is-active');
      p.hidden = true;
    });
    tab.classList.add('is-active');
    tab.setAttribute('aria-selected', 'true');
    tab.setAttribute('tabindex', '0');
    const panel = panels.find((p) => p.dataset.tabIndex === index);
    if (panel) {
      panel.classList.add('is-active');
      panel.hidden = false;
    }
  }

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => activate(tab));
    tab.addEventListener('keydown', (e) => {
      const i = tabs.indexOf(tab);
      let next = -1;
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        next = (i + 1) % tabs.length;
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        next = (i - 1 + tabs.length) % tabs.length;
      } else if (e.key === 'Home') {
        e.preventDefault();
        next = 0;
      } else if (e.key === 'End') {
        e.preventDefault();
        next = tabs.length - 1;
      }
      if (next >= 0) activate(tabs[next]);
    });
  });
}

/**
 * @param {Element} block
 */
export default function decorate(block) {
  const rows = [...block.children];
  const wrapper = document.createElement('div');
  wrapper.className = 'tabs-wrapper';
  const tablist = document.createElement('div');
  tablist.className = 'tabs-menu';
  tablist.setAttribute('role', 'tablist');
  tablist.setAttribute('aria-orientation', 'vertical');
  const panels = document.createElement('div');
  panels.className = 'tabs-panels';

  rows.forEach((row, index) => {
    const cells = [...row.children];
    const avatarCell = cells[0];
    const nameCell = cells[1] || cells[0];
    const roleCell = cells[2];
    const featureCell = cells[3] || cells[1];
    const quoteCell = cells[4] || cells[cells.length - 1];

    const featureImg = featureCell?.querySelector('picture') ? featureCell : row;
    if (featureImg?.querySelector('img')) {
      const feature = featureImg.querySelector('img');
      featureImg.querySelector('picture')?.replaceWith(
        createOptimizedPicture(feature.src, feature.alt, true, [{ width: '800' }]),
      );
    }
    if (avatarCell?.querySelector('img')) {
      const av = avatarCell.querySelector('img');
      avatarCell.querySelector('picture')?.replaceWith(
        createOptimizedPicture(av.src, av.alt, true, [{ width: '96' }]),
      );
    }

    const name = nameCell?.textContent?.trim() || `Tab ${index + 1}`;
    const role = roleCell?.textContent?.trim() || '';

    const tab = document.createElement('button');
    tab.type = 'button';
    tab.className = `tabs-menu-link${index === 0 ? ' is-active' : ''}`;
    tab.setAttribute('role', 'tab');
    tab.id = `tab-${index}`;
    tab.setAttribute('aria-controls', `tabpanel-${index}`);
    tab.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
    tab.setAttribute('tabindex', index === 0 ? '0' : '-1');
    tab.dataset.tabIndex = String(index);

    const tabInner = document.createElement('div');
    tabInner.className = 'tabs-menu-link-inner';
    if (avatarCell?.querySelector('picture')) {
      const av = document.createElement('div');
      av.className = 'tabs-avatar';
      av.append(avatarCell.querySelector('picture').cloneNode(true));
      tabInner.append(av);
    }
    const labels = document.createElement('div');
    labels.innerHTML = `<p class="tabs-name">${name}</p>${role ? `<p class="tabs-role">${role}</p>` : ''}`;
    tabInner.append(labels);
    tab.append(tabInner);
    tablist.append(tab);

    const panel = document.createElement('div');
    panel.className = `tabs-panel${index === 0 ? ' is-active' : ''}`;
    panel.setAttribute('role', 'tabpanel');
    panel.id = `tabpanel-${index}`;
    panel.setAttribute('aria-labelledby', `tab-${index}`);
    panel.dataset.tabIndex = String(index);
    if (index !== 0) panel.hidden = true;

    const panelGrid = document.createElement('div');
    panelGrid.className = 'tabs-panel-grid';
    if (featureImg?.querySelector('picture')) {
      const media = document.createElement('div');
      media.className = 'tabs-panel-media';
      media.append(featureImg.querySelector('picture').cloneNode(true));
      panelGrid.append(media);
    }
    const body = document.createElement('div');
    body.className = 'tabs-panel-body';
    if (quoteCell && quoteCell !== featureCell) {
      body.append(quoteCell.cloneNode(true));
    } else {
      const quote = row.querySelector('p');
      if (quote) body.append(quote.cloneNode(true));
    }
    panelGrid.append(body);
    panel.append(panelGrid);
    panels.append(panel);
  });

  wrapper.append(tablist, panels);
  block.replaceChildren(wrapper);
  initTabs(wrapper);
}
