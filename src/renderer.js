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
    ipcRenderer.on('updateTitle', function(event, newTitle) {
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