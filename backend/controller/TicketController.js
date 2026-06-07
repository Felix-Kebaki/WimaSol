const Ticket=require("../model/TicketModel")

const createTicket = async (req, res) => {
  const { issue, location, preferredVisitHours, preferredVisitDay } = req.body;
  try {
    if (!issue || !location || !preferredVisitDay || !preferredVisitHours) {
      return res.status(400).json({ error: "Input all fields" });
    }

    if (new Date(preferredVisitDay) < new Date()) {
      return res
        .status(422)
        .json({ error: "Preferred visit date must be in the future" });
    }

    const ticketNumber = "TK-" + Date.now().toString().slice(-6);

    const photo = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        photo.push({
          photoUrl: file.path,
          photoPublicId: file.filename,
        });
      }
    }
    const ticket = await Ticket.create({
      user: req.user._id,
      issue,
      location,
      preferredVisitDay,
      preferredVisitHours,
      ticketNumber,
      photo,
      status:"New"
    });
    return res.status(201).json({message:"Issue received successfully"})
  } catch (error) {
    console.error(error.message || error);
    return res.status(500).json({ error: "Server side issues" });
  }
};

module.exports = { createTicket };
