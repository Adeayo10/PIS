export function generateRandomPassword() {
    return (
      Math.random().toString(36).slice(2) +
      "." +
      Math.random().toString(36).toUpperCase().slice(2)
    );
  }