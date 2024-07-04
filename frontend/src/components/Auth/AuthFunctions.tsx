// -----ERRORS-----
// password:
const PASSWORD_LENGTH = "The password must be at least 8 characters long";
const PASSWORD_CHARACTRES =
  "The password must contain an uppercase letter, a lowercase letter, a number and a special character";
const CONFIRM_PASSWORD = "The password and password verification must be equal";

export function CheckEmail(email: string) {
  const pattern = /^[a-zA-Z0-9_.±]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
  return !!(email.match(pattern));
}

export function CheckPassword(password: string) {
  const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_])[A-Za-z\d~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_]{8,}$/;
  return !!(password.match(pattern));
}

export function CheckConfirmPassword(password: string, confirmPassword: string) {
  return password === confirmPassword;
}

export function CheckAge(age: number) {
  return age > 0 && age <= 120;
}

export function CheckName(name: string) {
  const letters = /^[a-zA-Z]+(?:\s+[a-zA-Z]+)*$/;
  return !!name.match(letters);

}
