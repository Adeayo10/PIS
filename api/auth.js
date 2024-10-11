import { mockUsers } from '../db.js';
export function authenticateUser(username, password) {
    const user = mockUsers.find((user) => user.email === username && user.password === password);
    return user;
}