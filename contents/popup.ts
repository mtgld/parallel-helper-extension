import '../assets/styles.css'

// Create the hover popup element
const popup = document.createElement('div');
let isShiftPressed = false;

let hoveredElement = null;
popup.classList.add('text-hover-popup');
popup.style.position = 'absolute';
popup.style.backgroundColor = '#fff';
popup.style.border = '1px solid #000';
popup.style.color = 'red';
popup.style.padding = '5px';
popup.style.display = 'none';
popup.style.zIndex = '100000';
popup.tabIndex = -1;  // This makes it focusable, but not reachable via sequential keyboard navigation.

document.body.appendChild(popup);

// Update the state of the Shift key
document.addEventListener('keydown', (event) => {
  if (event.key === 'Shift') {
    isShiftPressed = true;
    if (hoveredElement && (hoveredElement.classList.contains('marked-word') || hoveredElement.closest('.marked-word'))) {
      showPopup({ target: hoveredElement });
    }
  }
});

document.addEventListener('keyup', (event) => {
  if (event.key === 'Shift') {
    isShiftPressed = false;
  }
});

// When the popup loses focus, hide it
popup.addEventListener('blur', hidePopup);

// Function to show the popup
function showPopup(event) {
  if (!isShiftPressed) return; // Exit early if Shift is not pressed

  const target = event.target;
  if (target.classList.contains('marked-word') || target.closest('.marked-word')) {
    popup.textContent = 'Your hover content here';
    const rect = target.getBoundingClientRect();
    popup.style.left = `${rect.left}px`;
    popup.style.top = `${rect.bottom + window.scrollY}px`;
    popup.style.display = 'block';

    popup.focus();  // Focus the popup so it can receive the blur event

  }
}

// Update the hoveredElement when moving the mouse
document.addEventListener('mousemove', (event) => {
  hoveredElement = event.target;
});

function hidePopup() {
  popup.style.display = 'none';
}

document.addEventListener('mouseover', showPopup);