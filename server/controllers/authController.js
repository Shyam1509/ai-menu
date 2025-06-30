const Table = require("../model/tableModel");

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

const generateQr = async (req, res) => {
  const { tableId, tableName } = req.body;

  try {
    const existingTable = await Table.findOne({ tableId });
    if(existingTable){
      return res.status(409).json({ message: "Table is already created"});
    };

    const qrUrl = `${process.env.DEV_FRONTEND_URL}/menu/${tableId}`;

    const newTable = new Table({
      tableId,
      tableName,
      qrUrl,
    })

    await newTable.save();

    res.status(200).json({ message: "QR created successfully", qrUrl });


  } catch (error) {
    console.error("QR Generation failed", error);
    res.status(500).json({ message: "Server error" });    
    
  }
}


module.exports = {login, generateQr};
