import  initializeCustomerScripts  from './customer.js';
import  initializeUserScripts  from './user.js';
import { handleLogout } from './login.js';

document.addEventListener('DOMContentLoaded', () => {
    const mainContent = document.getElementById('main-content');
    const loadCustomersLink = document.getElementById('load-customers');
    const loadUsersLink = document.getElementById('load-users');
    const logout = document.getElementById('load-logout');
   
    // Function to load content into main content area
    function loadContent(url, callback) {
        fetch(url)
            .then(response => response.text())
            .then(html => {
                mainContent.innerHTML = html;
                if (callback) callback();
            });
    }

    // Event listeners for sidenav links
    loadCustomersLink.addEventListener('click', (e) => {
        e.preventDefault();
        loadContent('./customer.html', initializeCustomerScripts);
    });

    loadUsersLink.addEventListener('click', (e) => {
        e.preventDefault();
        loadContent('./user.html', initializeUserScripts);
    });

    logout.addEventListener('click', handleLogout);

   
});

