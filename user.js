import { mockUsers } from "./db.js";
import { generateRandomPassword } from "./helperUser.js";
import { validateUser } from "./validate.js";
// Function to initialize user scripts
function initializeUserScripts() {
  const userForm = document.getElementById("user-form");
  const userList = document.getElementById("user-list");
  const deleteUserButton = document.getElementById("delete-user");
  const updateUserButton = document.getElementById("update-user");

  // Fetch and display users
  function fetchUsers() {
    userList.innerHTML = "";
    mockUsers.forEach((user) => {
      const li = document.createElement("li");
      li.textContent = `${user.name} (${user.email}) - ${user.role}`;
      li.dataset.id = user.id;
      li.addEventListener("click", () => loadUser(user));
      userList.appendChild(li);
    });
  }

  // Load user into form
  function loadUser(user) {
    document.getElementById("user-id").value = user.id;
    document.getElementById("user-name").value = user.name;
    document.getElementById("user-email").value = user.email;
    document.getElementById("user-role").value = user.role;
  }

  // Handle form submission
  userForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = document.getElementById("user-id").value;
    const name = document.getElementById("user-name").value;
    const email = document.getElementById("user-email").value;
    const role = document.getElementById("user-role").value;

    const user = {
      id: id ? parseInt(id) : Date.now(),
      name,
      email,
      role,
      password: generateRandomPassword(),
    };

    // Validate user
    const { isValid, errors } = validateUser(user);
    if (!isValid) {
      alert(errors.join("\n"));
      return;
    }

  // Check if user already exists
  const existingUserIndex = mockUsers.findIndex((u) => u.id === user.id);
  if (existingUserIndex !== -1) {
    // Update existing user
    mockUsers[existingUserIndex] = user;
  } else {
    // Create new user
    user.id = mockUsers.length + 1;
    mockUsers.push(user);
    console.log(mockUsers);
  }

    fetchUsers();
    userForm.reset();
  });

  // Handle delete user
  deleteUserButton.addEventListener("click", () => {
    const id = document.getElementById("user-id").value;
    if (id) {
      const index = mockUsers.findIndex((u) => u.id === parseInt(id));
      if (index !== -1) {
        mockUsers.splice(index, 1);
      }
      fetchUsers();
      userForm.reset();
    }
  });

  // Handle update user
  updateUserButton.addEventListener("click", () => {
    const id = document.getElementById("user-id").value;
    if (id) {
      const name = document.getElementById("user-name").value;
      const email = document.getElementById("user-email").value;
      const role = document.getElementById("user-role").value;

      const user = { id: parseInt(id), name, email, role };

      const index = mockUsers.findIndex((u) => u.id === parseInt(id));
      if (index !== -1) {
        mockUsers[index] = user;
      }

      fetchUsers();
      userForm.reset();
    }
  });

  fetchUsers();
}

export default initializeUserScripts;
