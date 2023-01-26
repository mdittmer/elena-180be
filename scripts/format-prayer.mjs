'use strict';

export function insertPrayer(prayer, container) {
  while(container.firstChild) {
    container.removeChild(container.lastChild);
  }

  for (let i = 0; i < prayer.paragraphs.length; i++) {
    const paragraph = prayer.paragraphs[i];
    const p = document.createElement('p');
    if (i === 0) {
      const firstLetterSpan = document.createElement('span');
      firstLetterSpan.className = 'focus-letter';
      firstLetterSpan.textContent = paragraph.charAt(0);
      const restSpan = document.createElement('span');
      restSpan.textContent = paragraph.substring(1);
      p.appendChild(firstLetterSpan);
      p.appendChild(restSpan);
    } else {
      p.textContent = paragraph;
    }
    container.appendChild(p);
  }

  const attribution = document.createElement('p');
  attribution.className = 'attribution';
  attribution.textContent = prayer.attribution;
  container.appendChild(attribution);
}
