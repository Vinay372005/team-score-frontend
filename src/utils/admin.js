export const isAdmin = (enteredPin) => {
  const ADMIN_PIN = "2005"; // You can change this PIN
  return enteredPin === ADMIN_PIN;
};
