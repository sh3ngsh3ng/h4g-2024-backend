import Event from "../models/Event";
import slugify from "slugify";

//to create and add events
export const createEvent = async (req, res) => {
  console.log("req:", req.body);
  try {
    const { name, startDate, endDate, description, maxHoursGiven, interest, skills } = req.body;
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

      const newEvent = {
        name,
        slug,
        startDate,
        endDate,
        description,
        maxHoursGiven,
        interest,
        skills,
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
  const { name, startDate, endDate, description, maxHoursGiven, interest, skills } = req.body;
  const { slug } = req.params;
  //try {
  // check if event exists
  const originalEvent = await Event.findOne({ slug });
  if (!originalEvent) {
    return res.status(400).send("Event not found");
  } else {
    // check if name is already taken
    const repeatedEvent = await Event.findOne({ name });
    if (repeatedEvent && repeatedEvent.name !== originalEvent.name) {
      return res.status(400).send("Event name is already used");
    } else if (!name || !startDate || !maxHoursGiven) {
      return res.status(400).send("Name, Start Date and Maximum Hours Given are required Fields");
    } else if (startDate && endDate && startDate > endDate) {
      return res.status(400).send("Start date should be before End date");
    } else {
      const newSlug =
        name != null
          ? slugify(name, {
              replacement: "-",
              lower: true,
            })
          : originalEvent.slug;
      const updatedEvent = {
        name: name,
        slug: newSlug,
        startDate: startDate,
        endDate: endDate,
        description: description,
        maxHoursGiven: maxHoursGiven,
        interest: interest,
        skills: skills,
      };
      console.log(updatedEvent);
      await Event.updateOne(
        {
          slug: originalEvent.slug,
        },
        updatedEvent
      ).then(() => {
        res.send({ message: "Event updated successfully" });
      });
    }
  }
  /*} catch (err) {
    console.log("Error updating event");
    return res.status(400).send(err);
  }*/
};
