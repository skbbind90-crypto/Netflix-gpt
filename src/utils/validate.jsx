
export const checkValidaData = (
  email,
  password,
  requireStrongPassword = true,
) => {
  const isEmailValid =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  const isPasswordValid =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password,
    );

  if (!isEmailValid) return "Email address is not valid.";
  if (!password) return "Password is required.";
  if (requireStrongPassword && !isPasswordValid) {
    return "Password must be at least 8 characters and include an uppercase letter, a lowercase letter, a number, and a special character.";
  }

  return null;
};