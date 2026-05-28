export default function decorate(block) {
  // Get the text cell (first cell of first row)
  const row = block.querySelector(':scope > div');
  if (!row) return;

  const textCell = row.querySelector(':scope > div:first-child');
  const imageCell = row.querySelector(':scope > div:last-child');

  // Restructure text cell: wrap CTA links in a button-group div
  if (textCell) {
    const links = textCell.querySelectorAll('a');
    if (links.length > 0) {
      const buttonGroup = document.createElement('div');
      buttonGroup.className = 'button-group';

      links.forEach((link) => {
        // Remove the parent <p> wrapper
        const parentP = link.closest('p');
        if (parentP) {
          parentP.remove();
        }
        // Remove any button classes EDS might have added
        link.classList.remove('button', 'primary', 'secondary');
        buttonGroup.append(link);
      });

      textCell.append(buttonGroup);
    }
  }

  // Restructure image cell: extract pictures from <p> wrapper into grid
  if (imageCell) {
    const pictures = imageCell.querySelectorAll('picture');
    if (pictures.length > 0) {
      const imageGrid = document.createElement('div');
      imageGrid.className = 'image-grid';

      pictures.forEach((picture) => {
        imageGrid.append(picture);
      });

      // Clear the cell and add the grid
      imageCell.textContent = '';
      imageCell.append(imageGrid);
    }
  }
}
