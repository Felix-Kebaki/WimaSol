const Ticket = require("../model/TicketModel");
const {sendEmail,adminAlert}=require("../utils/sendEmail")

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
      status: "New",
    });

    await sendEmail(
      req.user.email,
      "Complaint Received",
      `
            <h2>Complaint Received</h2>
            <p>Your complaint has been received.</p>
            <p>Ticket Number: ${ticket.ticketNumber}</p>
        `,
    );

    await adminAlert(
      req.user.email,
      "Complaint Alert",
      `
            <h2>Complaint Registered</h2>
            <p>${req.user.firstname} ${req.user.lastname} has sent a complaint, login in to the site to assign technician and address the issue.</p>
            <p>Ticket Number: ${ticket.ticketNumber}</p>
      `
    )

    return res.status(201).json({ message: "Issue received successfully" });
  } catch (error) {
    console.error(error.message || error);
    return res.status(500).json({ error: "Server side issues" });
  }
};

module.exports = { createTicket };
