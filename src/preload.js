const { ipcRenderer } = require("electron");

window.addEventListener('DOMContentLoaded', () => {
  // Hide header and footer (search page or docs pages)
  const header = document.getElementsByTagName('site-header')[0];
  if (header) {
    header.style.display = 'none';
  }
  const footer = document.getElementsByTagName('site-footer')[0];
  if (footer) {
    footer.style.display = 'none';
  }

  // Padding at the top is a bit too large once you remove the header, move it up a bit.
  const pageContent = document.getElementsByClassName('site-container')[0];
  if (pageContent) {
    pageContent.style.marginTop = '-3.0em';
  }

  /// Hide some tabs (make space and prevent excessive navigation)
  hideExtraTabs();

  ipcRenderer.invoke('updateTitle', document.title);
})

window.addEventListener('resize', (event) => {
  hideExtraTabs();
}, true);

function waitForElement(selector) {
  return new Promise(resolve => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver(mutations => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector));
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
}

function hideExtraTabs() {
  // To make this neater, let's remove some of the tabs that may
  // be of lower importance. It'll make space and prevent excessive navigation)
  waitForElement('ul.content-items-filters-list').then((elm) => {
    const dateFilter = elm.children[0];
    if (dateFilter) {
      dateFilter.style.display = 'none';
    }

    const appFilter = elm.children[1];
    if (appFilter) {
      appFilter.style.display = 'none';
    }
  });
}