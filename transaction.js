import { mockCustomers } from './db.js';

function initializeTransactions(event) {
    event.preventDefault();
    
    fetch('./transaction.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('main-content').innerHTML = data;
            setupTransactionForm();
        })
        .catch(error => console.error('Error loading transactions:', error));
}

function setupTransactionForm() {
    const form = document.getElementById('transaction-form');
    const tableBody = document.getElementById('transaction-table-body');
    const customerSelect = document.getElementById('customer-select'); // Assuming you have a dropdown to select customer

    // Populate customer dropdown
    mockCustomers.forEach(customer => {
        const option = document.createElement('option');
        option.value = customer.id;
        option.textContent = `${customer.name} (${customer.accountNumber})`;
        customerSelect.appendChild(option);
    });

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const customerId = parseInt(customerSelect.value);
        const description = document.getElementById('description').value;
        const amount = parseFloat(document.getElementById('amount').value);

        const customer = mockCustomers.find(c => c.id === customerId);
        if (customer) {
            customer.balance += amount;

            const newRow = document.createElement('tr');
            newRow.innerHTML = `
                <td>${new Date().toLocaleDateString()}</td>
                <td>${description}</td>
                <td>${amount.toFixed(2)}</td>
                <td>${customer.balance.toFixed(2)}</td>
            `;
            tableBody.appendChild(newRow);

            form.reset();
        } else {
            alert('Customer not found');
        }
    });
}

export default initializeTransactions;