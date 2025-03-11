// controllers/userController.js
const users = []; // Array to store user data

// Function to get all users
export const getAllUsers = (req, res) => {
  res.json(users); // Send all users as JSON response
};

// Function to create a new user
export const createUser = (req, res) => {
  const { employeenumber, password } = req.body;
  if (!employeenumber || !password) {
    return res.status(400).json({ message: 'employeenumber and password are required' });
  }
  
  const newUser = { employeenumber, password }; // Create a new user object
  users.push(newUser); // Add the new user to the array
  
  res.status(201).json({ message: 'User registered successfully', user: newUser });
};
