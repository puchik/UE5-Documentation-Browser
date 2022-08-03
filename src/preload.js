const { ipcRenderer } = require("electron");

window.addEventListener('DOMContentLoaded', () => {
    // Hide header and footer (search page or docs pages)
    const header = document.getElementById('egh');
    if (header)
    {
        header.style.display = 'none';
    }
    const footer = document.getElementById('egf');
    if (footer)
    {
        footer.style.display = 'none';
    }
    const docsHeader = document.getElementById('head');
    if (docsHeader)
    {
        docsHeader.style.display = 'none';
    }
    const docsFooter = document.getElementById('footer');
    if (docsFooter)
    {
        docsFooter.style.display = 'none';
    }

    /// Hide some tabs (make space and prevent excessive navigation)
    // All
    waitForElement('div.cwYiqZ [tabindex="0"]').then((elm) => {
        elm.style.display = 'none';
    });
    // News
    waitForElement('div.cwYiqZ [tabindex="1"]').then((elm) => {
        elm.style.display = 'none';
    });
    // Forum
    waitForElement('div.cwYiqZ [tabindex="3"]').then((elm) => {
        elm.style.display = 'none';
    });
    // Python
    waitForElement('div.cwYiqZ [tabindex="4"]').then((elm) => {
        elm.style.display = 'none';
    });
    // UDK
    waitForElement('div.cwYiqZ [tabindex="7"]').then((elm) => {
        elm.style.display = 'none';
    });

    ipcRenderer.invoke('updateTitle', document.title);
})

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