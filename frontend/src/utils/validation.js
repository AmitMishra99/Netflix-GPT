const validation = (email, password) => {
  const emailValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
    email,
  );
  const passwordValid =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      password,
    );

  if (!emailValid) return "Please enter a valid email address.";
  if (!passwordValid)
    return "Password must be at least 8 characters long and include at least one uppercase letter, one number, and one special character.";
  return null;
};

export default validation;
