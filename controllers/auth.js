import User from "../models/User";

export const register = async (req, res) => {
  try {
    const { firstName, lastName, age, gender, phoneNumber, emergencyContact } = req.body;
    const { email, uid } = req.user;
  
    const userFound = await User.findOne({uid});
  
    if (userFound) {
      return res.status(400).send("User already exist");
    } else {
      const newUser = new User( { firstName, lastName, age, gender, phoneNumber, emergencyContact, email, uid });
  
      await newUser.save();
  
      return res.json({sucess: true});
    }
  } catch (err) {
    return res.status(400).send(err);
  }
}

export const login = (req, res) => {
  try {
    // return res.json({sucess: true});
    if (req.user) {
      return res.json({sucess: true});
    }
  } catch {
    return res.status(401).send("User not found");
  }
}