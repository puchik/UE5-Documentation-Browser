const { app, ipcRenderer } = require("electron")

window.addEventListener('DOMContentLoaded', () => {
  // Set up navigation buttons
  backButton = document.getElementById('back-button');
  if (backButton) {
    backButton.addEventListener('click', () => {
      ipcRenderer.invoke('goBack');
    })
  }
  forwardButton = document.getElementById('forward-button');
  if (forwardButton) {
    forwardButton.addEventListener('click', () => {
      ipcRenderer.invoke('goForward');
    })
  }
  homeButton = document.getElementById('home-button');
  if (homeButton) {
    homeButton.addEventListener('click', () => {
      ipcRenderer.invoke('goHome');
    })
  }
  homeCppButton = document.getElementById('home-cpp-button');
  if (homeCppButton) {
    homeCppButton.addEventListener('click', () => {
      ipcRenderer.invoke('goHomeCpp');
    })
  }
  homeBpButton = document.getElementById('home-bp-button');
  if (homeBpButton) {
    homeBpButton.addEventListener('click', () => {
      ipcRenderer.invoke('goHomeBp');
    })
  }

  // Search bar
  searchInput = document.getElementById('search-input');
  if (searchInput) {
    // Differentiate new input vs keypress search triggers.
    searchInput.addEventListener('input', (event) => {
      handleSearch(searchInput.value, false, true);
    });
    searchInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        handleSearch(searchInput.value, true, !event.shiftKey);
      }
    });
    // Search shortcut
    ipcRenderer.on('focusSearch', function (event) {
      searchInput.focus();
    })
  }

  // Pin/unpin buttons
  pinButton = document.getElementById('pin-button');
  unpinButton = document.getElementById('unpin-button');

  if (pinButton) {
    pinButton.addEventListener('click', () => {
      ipcRenderer.invoke('pin');
      pinButton.style.display = 'none';
      unpinButton.style.display = 'inline';
    })
  }

  if (unpinButton) {
    unpinButton.addEventListener('click', () => {
      ipcRenderer.invoke('unpin');
      unpinButton.style.display = 'none';
      pinButton.style.display = 'inline';
    })
    unpinButton.style.display = 'none';
  }

  // Catch title updates
  ipcRenderer.on('updateTitle', function (event, newTitle) {
    const pageTitleElement = document.getElementById('page-title');
    if (pageTitleElement) {
      pageTitleElement.innerText = newTitle;
    }
    const windowTitleElement = document.getElementById('window-title');
    if (windowTitleElement) {
      windowTitleElement.innerText = newTitle;
    }
  })
})

function handleSearch(searchTerm, keypress, searchForward) {
  if (searchTerm.length <= 0) {
    ipcRenderer.invoke('stopSearch', searchTerm);
    return;
  }
  // Intuitively, it may make sense to not start a new search when
  // the last search term is a substring of the new search term,
  // but this can cause problems with highlighting.
  // Electron does not seem to support clearing it (without stoppig search entirely) 
  // during searches yet. So, just do a new search on new input every time.
  newSearch = true;
  if (keypress) {
    newSearch = false;
  }

  ipcRenderer.invoke('search', searchTerm, newSearch, searchForward);
}