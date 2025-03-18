function validation(values) {
  let errors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordPattern = /^[a-zA-Z0-9]{6,}$/; // At least 6 characters, letters and numbers only
  
  // Name validation
  if (values.name !== undefined) {
    if (!values.name) {
      errors.name = "Name is required";
    } else if (values.name.length < 2) {
      errors.name = "Name must be at least 2 characters";
    } else if (values.name.length > 50) {
      errors.name = "Name cannot exceed 50 characters";
    } else if (!/^[a-zA-Z\s]+$/.test(values.name)) {
      errors.name = "Name can only contain letters and spaces";
    }
  }
  
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