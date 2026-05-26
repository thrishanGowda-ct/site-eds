/**
 * @param {Element} block
 */
export default function decorate(block) {
  const rows = [...block.children];
  const intro = document.createElement('div');
  intro.className = 'accordion-intro';

  while (rows[0]?.querySelector('h2')) {
    intro.append(rows.shift());
  }

  const list = document.createElement('div');
  list.className = 'accordion-list';

  rows.forEach((row) => {
    const cells = [...row.children];
    const questionCell = cells[0];
    const answerCell = cells[1] || cells[0];

    const details = document.createElement('details');
    details.className = 'accordion-item';

    const summary = document.createElement('summary');
    summary.className = 'accordion-question';
    const questionText = questionCell.querySelector('h3, h4, p, strong') || questionCell;
    summary.append(questionText.cloneNode(true));

    const icon = document.createElement('span');
    icon.className = 'accordion-icon';
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = '+';
    summary.append(icon);

    const answer = document.createElement('div');
    answer.className = 'accordion-answer';
    if (answerCell !== questionCell) {
      answer.append(...answerCell.childNodes.length ? [...answerCell.childNodes] : [answerCell]);
    }

    details.append(summary, answer);
    list.append(details);
  });

  if (intro.children.length) {
    block.classList.add('accordion-split');
    block.replaceChildren(intro, list);
  } else {
    block.replaceChildren(list);
  }
}
