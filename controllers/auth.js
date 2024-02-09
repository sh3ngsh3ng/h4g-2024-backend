import User from "../models/User";

export const register = async (req, res) => {
  try {
    const { firstName, lastName, age, gender, phoneNumber, emergencyContact } = req.body;
    const { email, uid } = req.user;
    const userFound = await User.findOne({ uid });
    if (userFound) {
      return res.status(400).send("User already exist");
    } else {
      const newUser = new User({
        firstName,
        lastName,
        age,
        gender,
        phoneNumber,
        emergencyContact,
        email,
        uid,
      });

      await newUser.save();
      return res.json({ success: true });
    }
  } catch (err) {
    return res.status(400).send(err);
  }
};

export const login = (req, res) => {
  try {
    // return res.json({sucess: true});
    if (req.user) {
      return res.json({ sucess: true });
    }
  } catch {
    return res.status(401).send("User not found");
  }
};

export const getUserById = async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await User.findOne({ uid });
    console.log(user);
    console.log(uid);
    if (user) {
      return res.json(user);
    } else {
      return res.status(404).send("User not found");
    }
  } catch (err) {
    return res.status(400).send(err);
  }
};

export const updateUser = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    age,
    skills,
    interest,
    phoneNumber,
    emergencyContact,
    dateOfBirth,
    gender,
    occupation,
    school,
    canDrive,
    ownVehicle,
    immigrationStatus,
  } = req.body;
  const { uid } = req.params;
  try {
    const user = await User.findOne({ uid });
    if (!user) {
      return res.status(404).send("User not found");
    } else {
      var updatedUser = {};
      updatedUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        age: age,
        skills: skills,
        interest: interest,
        phoneNumber: phoneNumber,
        emergencyContact: emergencyContact,
        dateOfBirth: dateOfBirth,
        gender: gender,
        occupation: occupation,
        school: school,
        canDrive: canDrive,
        ownVehicle: ownVehicle,
        immigrationStatus: immigrationStatus,
      };
      await User.updateOne(
        {
          uid: uid,
        },
        updatedUser
      );
      res.json({ message: "User updated successfully", user: updatedUser });
    }
  } catch (err) {
    return res.status(400).send(err);
  }
};
