const login = (req, res) => {
  const { username, password } = req.body;
  try {
    const adminuser = process.env.ADMIN_USER;
    const adminpass = process.env.ADMIN_PASS;

    if (username === adminuser && password === adminpass) {
      return res.status(200).json({ message: `Login Successful` });
    }
  } catch (error) {
    return res.status(401).json({ message: `Invalid credential`})
  }
};

module.exports = {login};
