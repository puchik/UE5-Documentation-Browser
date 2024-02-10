const { ipcRenderer } = require("electron");

window.addEventListener('DOMContentLoaded', () => {
  // Hide header and footer (search page or docs pages)
  const header = document.getElementsByTagName('unrealengine-navigation')[0];
  if (header) {
    header.style.display = 'none';
  }
  const footer = document.getElementById('egf');
  if (footer) {
    footer.style.display = 'none';
  }
  const docsHeader = document.getElementById('head');
  if (docsHeader) {
    docsHeader.style.display = 'none';
  }
  const docsFooter = document.getElementById('footer');
  if (docsFooter) {
    docsFooter.style.display = 'none';
  }
  const newsletter = document.getElementById('ue-newsletter');
  if (newsletter) {
    newsletter.style.display = 'none';
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
  // All
  waitForElement('div.ue-filter-tab[tabindex="0"]').then((elm) => {
    elm.style.display = 'none';
  });
  // News
  waitForElement('div.ue-filter-tab[tabindex="1"]').then((elm) => {
    elm.style.display = 'none';
  });
  // Forum
  waitForElement('div.ue-filter-tab[tabindex="3"]').then((elm) => {
    elm.style.display = 'none';
  });
  // UDK
  waitForElement('div.ue-filter-tab[tabindex="7"]').then((elm) => {
    elm.style.display = 'none';
  });
}