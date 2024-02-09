import { Event, EventAttendance } from "../models/Event";
import slugify from "slugify";
import User from "../models/User";
import { generateQrCode } from "../services/qr";

//to create and add events
export const createEvent = async (req, res) => {
  console.log("req:", req);
  try {
    const {
      name,
      startDate,
      endDate,
      description,
      maxHoursGiven,
      interest,
      skills,
      organization
    } = req.body.formToEdit;
    const eventFound = await Event.findOne({ name });
    console.log("eventFound =>", eventFound);
    if (eventFound !== null) {
      console.log("Event already exist");
      return res.status(400).send("Event already exist");
    } else if (startDate > endDate) {
      console.log("Start date should be before End date");
      return res.status(400).send("Start date should be before End date");
    } else {
      const slug = slugify(name, {
        replacement: "-",
        lower: true,
      });

      const token = Math.random().toString(36);

      const newEvent = {
        name,
        slug,
        startDate,
        endDate,
        description,
        maxHoursGiven,
        interest,
        skills,
        token,
        organization
      };

      const createdEvent = await Event.create(newEvent);
      console.log("created event ->", createdEvent);
      await createdEvent.save();
      return res.json({ event: newEvent });
    }
  } catch (err) {
    console.log("Error creating event");
    return res.status(400).send(err);
  }
};

//to get all events
export const getEvents = async (req, res) => {
  const events = await Event.find({});
  return res.json(events);
};

// to retrieve event by
export const getEventBySlug = async (req, res) => {
  const { slug } = req.params;
  const event = await Event.findOne({ slug });

  // if slug matches with event slug
  if (event) {
    return res.json(event);
  } else {
    return res.status(400).send("Event not found");
  }
};

// delete user by slug
export const deleteEventBySlug = async (req, res) => {
  const { slug } = req.params;
  const eventToBeDeleted = await Event.findOne({ slug });
  if (!eventToBeDeleted) {
    return res.status(400).send("Event not found");
  } else {
    await Event.deleteOne(eventToBeDeleted)
      .then((deleteResult) => {
        return res.json(deleteResult);
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).send(err);
      });
  }
};

//to update an event by slug
export const updateEvent = async (req, res) => {
  console.log("req: ", req.body)
  const updatedEvent = req.body.formToEdit
  const slug = updatedEvent.slug
  try {
    // check if event exists
    const originalEvent = await Event.findOne({ slug });
    if (!originalEvent) {
      return res.status(400).send("Event not found");
    } else {
      // check if name is already taken
      const repeatedEvent = await Event.findOne({ name: updatedEvent.name });
      if (repeatedEvent && repeatedEvent.name !== originalEvent.name) {
        return res.status(400).send("Event name is already used");
      } else if (!updatedEvent.name || !updatedEvent.startDate || !updatedEvent.maxHoursGiven) {
        return res.status(400).send("Name, Start Date and Maximum Hours Given are required Fields");
      } else if (updatedEvent.startDate && updatedEvent.endDate && updatedEvent.startDate > updatedEvent.endDate) {
        return res.status(400).send("Start date should be before End date");
      } else {
        const newSlug =
          updatedEvent.name != null
            ? slugify(updatedEvent.name, {
              replacement: "-",
              lower: true,
            })
            : originalEvent.slug;
        updatedEvent.slug = newSlug
        await Event.updateOne(
          {
            slug: originalEvent.slug,
          },
          updatedEvent
        )
        res.json({ message: "Event updated successfully", event: updatedEvent });
      }
    }
  } catch (err) {
    console.log("Error updating event");
    return res.status(400).send(err);
  }
};

//to join an event
export const joinEvent = async (req, res) => {
  try {
    const { slug } = req.params;

    const user = await User.findOne({ uid: req.user });
    const event = await Event.findOne({ slug });

    console.log(event);

    if (event.volunteers.includes(user.uid)) {
      return res.status(400).send("Already joined");
    }
    event.volunteers.push(user.uid);

    event.save();

    const userAttendance = await new EventAttendance({
      event: event,
      user: user.uid,
      name: user.firstName + " " + user.lastName,
      age: user.age,
      email: user.email,
      school: user.school,
    }).save();

    return res.json({ success: true });
  } catch (err) {
    res.status(400).send("Join event failed => " + err);
  }
};

export const markAttendance = async (req, res) => {
  try {
    const { slug, token } = req.params;

    const user = await User.findOne({ uid: req.user });
    const event = await Event.findOne({ slug });

    if (event.token !== token) {
      return res.status(400).send("Wrong verification token");
    }

    const eventAttendance = await EventAttendance.findOne({ uid: user.uid, event });

    if (!eventAttendance) {
      return res.status(400).send("Find no user record in this event");
    }

    eventAttendance.isAttend = true;

    eventAttendance.save();

    return res.json({ success: true });
  } catch (err) {
    res.status(400).send("Mark Attendance failed => " + err);
  }
}

export const adminMarkAttendance = async (req, res) => {
  try {
    const { slug } = req.params;
    const { uid } = req.body;

    const user = await User.findOne({ uid });
    const event = await Event.findOne({ slug });

    const eventAttendance = await EventAttendance.findOne({ uid: user.uid, event });

    if (!eventAttendance) {
      return res.status(400).send("Find no user record in this event");
    }

    eventAttendance.isAttend = true;

    eventAttendance.save();

    return res.json({ success: true });
  } catch (err) {
    res.status(400).send("Mark Attendance failed => " + err);
  }
}

export const adminUnmarkAttendance = async (req, res) => {
  try {
    const { slug } = req.params;
    const { uid } = req.body;

    const user = await User.findOne({ uid });
    const event = await Event.findOne({ slug });

    const eventAttendance = await EventAttendance.findOne({ uid: user.uid, event });

    if (!eventAttendance) {
      return res.status(400).send("Find no user record in this event");
    }

    eventAttendance.isAttend = false;

    eventAttendance.save();

    return res.json({ success: true });
  } catch (err) {
    res.status(400).send("Unmark Attendance failed => " + err);
  }
}

export const listAttendance = async (req, res) => {
  try {
    const { slug } = req.params;

    const event = await Event.findOne({ slug });

    const eventAttendance = await EventAttendance.find({ event });

    if (!eventAttendance) {
      return res.status(400).send("Find no record for this event attendance");
    }

    console.log(eventAttendance);

    return res.json({ attendance: eventAttendance, slug: event.slug, eventName: event.name });
  } catch (err) {
    return res.json("List Attendance failed => " + err);
  }
}

export const adminGenerateQr = async (req, res) => {
  try {
    console.log("Hereh")
    const { slug } = req.params;

    const event = await Event.findOne({ slug });

    const qr = await generateQrCode(slug, event.token);

    console.log(qr);

    return res.json({ qr: qr })
  } catch (err) {
    return res.json("Create QR failed => " + err);
  }
}