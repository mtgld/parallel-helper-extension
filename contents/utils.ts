export const adjustPopupPosition = (target, popup) => {
  const rect = target.getBoundingClientRect();
  const popupWidth = 201.5;
  const popupHeight = 305.5;

  // Vertical Adjustment
  const spaceBelow = window.innerHeight - rect.bottom;
  const spaceAbove = rect.top;

  if (spaceBelow < popupHeight) {
    if (spaceAbove > spaceBelow) {
      popup.style.top = `${rect.top - popupHeight + window.scrollY}px`;
    }
  } else {
    popup.style.top = `${rect.bottom + window.scrollY}px`;
  }

  const centeredLeftPosition = rect.left + (rect.width / 2) - (popupWidth / 2);

  if (centeredLeftPosition < 0) {
    popup.style.left = '0px';
  } else if (centeredLeftPosition + popupWidth > window.innerWidth) {
    popup.style.left = `${window.innerWidth - popupWidth}px`;
  } else {
    popup.style.left = `${centeredLeftPosition}px`;
  }
}

export const getCardHTML = (card) => {
  const costTemplate = (cost: number) => `
    <div class="card-stat">
      <svg width="30" height="30" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M47 13h-6.958v30H47V13ZM31.479 23.842H24.52V43h6.958V23.842ZM15.958 33.42H9V43h6.958v-9.58Z" fill="#545454"></path>
          <path fill-rule="evenodd" clip-rule="evenodd" d="m51.696 18.717-18.78 18.227-14.039-8.822L5.66 39.751l-1.32-1.502 14.337-12.614 13.974 8.78 17.652-17.133 1.393 1.435Z" fill="#fff"></path>
      </svg>
      <div class="card-stat-text">Cost</div>
      <div class="card-stat-value">${cost}</div>
    </div>`;

  const attackTemplate = (attack: number) => `
    <div class="card-stat">
      <svg width="30" height="30" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M40 12H16v32h24V12Z" fill="#545454"></path>
          <path fill-rule="evenodd" clip-rule="evenodd" 
                d="M29 9v8h-2V9h2ZM29 39v8h-2v-8h2ZM48 29h-7v-2h7v2ZM15 29H9v-2h6v2ZM21.086 28l7.071-7.071L35.228 28l-7.071 7.071L21.086 28Zm2.828 0 4.243 4.243L32.4 28l-4.243-4.243L23.914 28Z" 
                fill="#fff">
          </path>
      </svg>
      <div class="card-stat-text">Attack</div>
      <div class="card-stat-value">${attack}</div>
    </div>`;

  const healthTemplate = (health: number) => `
    <div class="card-stat">
      <svg width="30" height="30" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M48 22.528c0 3.452-1.467 6.489-3.733 8.629L28 48 11.4 30.812C9.333 28.74 8 25.772 8 22.528 8 16.178 13 11 19.133 11c3.6 0 6.8 1.795 8.867 4.556C30 12.795 33.267 11 36.867 11 43 11 48 16.177 48 22.528Z" fill="#545454"></path>
          <path fill-rule="evenodd" clip-rule="evenodd" 
                d="m25.128 17.636 3.102 8.23-1.872.705-1.529-4.057-4.367 8.335H4v-2h15.252l5.876-11.213ZM28.948 27.68l.706 2.095-1.896.639-.706-2.095 1.896-.639ZM35.723 28.849H52v2H36.765l-5.64 8.067-2.64-6.56 1.854-.748 1.263 3.136 4.12-5.895Z" 
                fill="#fff">
          </path>
      </svg>
      <div class="card-stat-text">Health</div>
      <div class="card-stat-value">${health}</div>
    </div>`;

  const typeTemplate = (type: string) => `
    <div class="card-stat">
      <svg width="30" height="30" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M18 15h20v26H18V15Zm2 2v22h16V17H20Z" fill="#fff"></path>
          <path d="M17 10h-4v4h4v-4ZM43 10h-4v4h4v-4Z" fill="#545454"></path>
          <path d="M30 10h-4v4h4v-4Z" fill="#fff"></path>
          <path d="M35 18H21v20h14V18ZM17 42h-4v4h4v-4ZM43 42h-4v4h4v-4Z" fill="#545454"></path>
      </svg>
      <div class="card-stat-text">Type</div>
      <div class="card-stat-value">${type}</div>
    </div>`;

  return `
      <div id="parallel-card-stats-ext" class="card-container">
        <span class="card-name">
          <a id="link" target="_blank" href="https://parallel.life/cards/${card.tokenId}/">
            ${card.name}
          </a>
        </span>
        <span class="card-desc">
          ${card.gameData.functionText}
        </span>
        <div class="card-stats">
          ${costTemplate(card.gameData.cost)}
          ${card.gameData.cardType === 'Unit' ? attackTemplate(card.gameData.attack) : ''}
          ${card.gameData.cardType === 'Unit' ? healthTemplate(card.gameData.health) : ''}
          ${typeTemplate(card.gameData.cardType)}
        </div>
      </div>
  `
}

export const getImmediateText = (element) => {
  let text = '';
  for (let node of element.childNodes) {
    if (node.nodeType === Node.TEXT_NODE) {
      text += node.nodeValue;
    }
  }
  return text;
}

export const isDescendant = (parent, child) => {
  let node = child.parentNode;
  while (node !== null) {
    if (node === parent) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
}
