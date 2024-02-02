import User from "../models/User";


export const register = async (req, res) => {
  try {
    const { firstName, lastName, age, gender, phoneNumber, emergencyContact } = req.body;
    const { email, uid } = req.user;

    console.log(email);
  
    const userFound = await User.findOne({uid});
  
    if (userFound) {
      return res.status(400).send("User already exist");
    } else {
      const newUser = new User( { firstName, lastName, age, gender, phoneNumber, emergencyContact, email, uid });
  
      await newUser.save();
  
      return res.json({ user: newUser });
    }
  } catch (err) {
    return res.status(400).send(err);
  }
}

export const login = (req, res) => {
  console.log(req.body);
  res.send('login user response from controller')
}