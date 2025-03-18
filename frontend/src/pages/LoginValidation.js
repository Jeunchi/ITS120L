function validation(values) {
  let errors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordPattern = /^[a-zA-Z0-9]{6,}$/; // At least 6 characters, letters and numbers only
  

  
  // Email validation
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!emailPattern.test(values.email)) {
    errors.email = "Email format is invalid";
  }
  
  // Password validation
  if (!values.password) {
    errors.password = "Password is required";
  } else if (!passwordPattern.test(values.password)) {
    errors.password = "Password must be at least 6 characters with letters and numbers only";
  }
  
  return errors;
}

export default validation;