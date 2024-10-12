import { mockCustomers } from "./db.js";
import { HandleCustomerFormSubmit } from "./helpers.js";
import { fetchCustomers,searchForCustomer } from "./helpers.js";


// Function to initialize customer scripts
function initializeCustomerScripts() {
  const customerForm = document.getElementById("customer-form");
  const customerList = document.getElementById("customer-list");
  const deleteCustomerButton = document.getElementById("delete-customer");
  const updateCustomerButton = document.getElementById("update-customer");
  const searchCustomer = document.getElementById("search-customer");
  const searchCustomerButton = document.getElementById("search-customer-btn");

  
  // Handle search customer
  searchCustomerButton.addEventListener("click", () => searchForCustomer(searchCustomer, customerList));

  // Handle form submission
  customerForm.addEventListener("submit", (e) => HandleCustomerFormSubmit(e, customerForm,customerList));
    
  // Handle delete customer
  deleteCustomerButton.addEventListener("click", () => {
    const id = document.getElementById("customer-id").value;
    if (id) {
      const index = mockCustomers.findIndex((c) => c.id === parseInt(id));
      if (index !== -1) {
        mockCustomers.splice(index, 1);
      }
      fetchCustomers(customerList);
      customerForm.reset();
    }
  });

  // Handle update customer
  updateCustomerButton.addEventListener("click", () => {
    const id = document.getElementById("customer-id").value;
    if (id) {
      const name = document.getElementById("customer-name").value;
      const email = document.getElementById("customer-email").value;
      const phone = document.getElementById("customer-phone").value;
      const address = document.getElementById("customer-address").value;
      const dob = document.getElementById("customer-dob").value;
      const accountType = document.getElementById(
        "customer-account-type"
      ).value;

      const customer = {
        id: parseInt(id),
        name,
        email,
        phone,
        address,
        dob,
        accountType,
      };

      const index = mockCustomers.findIndex((c) => c.id === parseInt(id));
      if (index !== -1) {
        mockCustomers[index] = customer;
      }

      fetchCustomers(customerList);
      customerForm.reset();
    }
  });

 fetchCustomers(customerList);
}

export default initializeCustomerScripts;

