import { mockCustomers } from "./db.js";
import { validateCustomer } from "./validate.js";

export function HandleCustomerFormSubmit(e, customerForm, customerList) {
  e.preventDefault();
  const id = document.getElementById("customer-id").value;
  const name = document.getElementById("customer-name").value;
  const email = document.getElementById("customer-email").value;
  const phone = document.getElementById("customer-phone").value;
  const address = document.getElementById("customer-address").value;
  const dob = document.getElementById("customer-dob").value;
  const accountType = document.getElementById("customer-account-type").value;

  const customer = {
    id: id ? parseInt(id) : Date.now(),
    name,
    email,
    phone,
    address,
    dob,
    accountType,
    balance: 0,
    accountNumber: null,
  };

  //validate customer
  const { isValid, errors } = validateCustomer(customer);
  if (!isValid) {
    alert(errors.join("\n"));
    return;
  }

  // Check if account number is already generated
  if (!id) {
    customer.accountNumber = generateAccountNumber();
  }

// Check if customer already exists
const existingCustomerIndex = mockCustomers.findIndex((c) => c.id === customer.id);
if (existingCustomerIndex !== -1) {
    // Update existing customer
    mockCustomers[existingCustomerIndex] = customer;
} else {
    // Create new customer
    customer.id = mockCustomers.length + 1;
    mockCustomers.push(customer);
    console.log(mockCustomers);
}

    fetchCustomers(customerList);  
  customerForm.reset();
}

export function fetchCustomers(customerList, customers = mockCustomers) {
  customerList.innerHTML = "";
  customers.forEach((customer) => {
    const li = document.createElement("li");
    li.textContent = `${customer.name} (${customer.email}) - ${customer.accountType}`;
    li.dataset.id = customer.id;
    li.addEventListener("click", () => loadCustomer(customer));
    customerList.appendChild(li);
  });
}

 // Load customer into form
 function loadCustomer(customer) {
    document.getElementById("customer-id").value = customer.id;
    document.getElementById("customer-name").value = customer.name;
    document.getElementById("customer-email").value = customer.email;
    document.getElementById("customer-phone").value = customer.phone;
    document.getElementById("customer-address").value = customer.address;
    document.getElementById("customer-dob").value = customer.dob;
    document.getElementById("customer-account-type").value = customer.accountType;
  }

  //create a search feature in the customer list
  export function searchForCustomer(searchCustomer, customerList) {
    const searchValue = searchCustomer.value.toLowerCase();
    const filteredCustomers = mockCustomers.filter((customer) => {
      return (
        customer.name.toLowerCase().includes(searchValue) ||
        customer.email.toLowerCase().includes(searchValue) ||
        customer.accountType.toLowerCase().includes(searchValue)||
       parseInt(customer.accountNumber) === parseInt(searchValue)
      );
    });
    fetchCustomers(customerList, filteredCustomers);
  }

   // Function to generate account number
   function generateAccountNumber() {
    const min = 1;
    const max = 100000000000;
    const randNum = Math.floor(Math.random() * (max - min)) + min;

    return randNum.toString().padStart(10, "0");
  }