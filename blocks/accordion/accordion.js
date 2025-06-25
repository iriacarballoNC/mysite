/*
 * Accordion Block
 * Recreate an accordion
 * https://www.hlx.live/developer/block-collection/accordion
 */

export default async function decorate(block) {
  await loadTooltips('http://localhost:3000/placeholder.json', 'EN');

  [...block.children].forEach((row) => {
    // decorate accordion item label
    const label = row.children[0];
    const summary = document.createElement('summary');
    summary.className = 'accordion-item-label';
    summary.append(...label.childNodes);

    // decorate accordion item body
    const body = row.children[1];
    body.className = 'accordion-item-body';

    // decorate accordion item
    const details = document.createElement('details');
    details.className = 'accordion-item';
    details.append(summary, body);

    // replace original row with details
    row.replaceWith(details);

    // initialize tooltip
    updateTooltip(details);

    // update tooltip on toggle
    details.addEventListener('toggle', () => updateTooltip(details));
  });
}

function updateTooltip(element) {
  element.setAttribute('title', element.open ? tooltipLabels.close : tooltipLabels.open);
}

let tooltipLabels = { open: '', close: '' };

async function loadTooltips(url, lang = 'EN') {
  const response = await fetch(url);
  const json = await response.json();
  json.data.forEach(item => {
    if (item.Key === 'key:close') tooltipLabels.close = item[lang];
    if (item.Key === 'key:open') tooltipLabels.open = item[lang];
  });
}
