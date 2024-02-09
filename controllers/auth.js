import User, { SkillCert } from "../models/User";

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
      console.log(req.user)
      return res.json({ sucess: true });
    }
  } catch {
    return res.status(401).send("User not found");
  }
};

export const getUserById = async (req, res) => {
  try {
    const uid = req.user;
    const user = await User.findOne({ uid });
    const certs = await SkillCert.find({user: user.uid});
    console.log(user);
    console.log(uid);
    if (user) {
      return res.json({user, certs});
    } else {
      return res.status(404).send("User not found");
    }
  } catch (err) {
    return res.status(400).send(err);
  }
};

export const updateUser = async (req, res) => {
  // console.log("req: ", req.body)
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
    skillCert
  } = req.body;
  const uid = req.user;
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
        skillCert: skillCert
      };

      for (let i = 0; i < skillCert.length; i++) {
        const temp = await SkillCert.findOne({ cert: skillCert[i]})

        if (!temp) {
          const newCert = new SkillCert({cert: skillCert[i], user: user.uid});
          newCert.save();
        }
      }

      console.log("updated user: ", updatedUser)
      const result = await User.updateOne(
        {
          uid: uid,
        },
        updatedUser
      );
      console.log("result: ", result)
      res.json({ message: "User updated successfully", user: updatedUser });
    }
  } catch (err) {
    return res.status(400).send(err);
  }
};
