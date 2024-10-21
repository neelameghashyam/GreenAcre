import { validationResult } from "express-validator";
import Auction from "../models/auctionModel.js";
import nodemailer from 'nodemailer';


const auctionCntrl = {};

// Create an auction
auctionCntrl.create = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const body = req.body;
    const file = req.file ? `/uploads/${req.file.filename}` : undefined; // Handle file upload
    if (file) body.file = file; // Attach file to body if exists

    try {
        const auction = new Auction({ ...body, user: req.userId });
        await auction.save();
        res.status(201).json(auction);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Edit an auction
auctionCntrl.edit = async (req, res) => {
    const { id } = req.params;

    let auction;
    if (req.role === 'admin' || req.role === 'moderator') {
        auction = await Auction.findById(id); // Admins and moderators can edit any auction
    } else {
        auction = await Auction.findOne({ _id: id, user: req.userId }); // Users can only edit their auctions
    }

    if (!auction) {
        return res.status(404).json({ error: "Auction not found or you're not authorized to edit" });
    }

    const body = req.body;
    const file = req.file ? `/uploads/${req.file.filename}` : undefined; // Handle file upload in edit
    if (file) auction.file = file; // Update the file if a new one is uploaded

    // Update other fields conditionally
    auction.title = body.title || auction.title;
    auction.description = body.description || auction.description;
    auction.category = body.category || auction.category;
    auction.startDate = body.startDate || auction.startDate;
    auction.endDate = body.endDate || auction.endDate;
    auction.startBid = body.startBid || auction.startBid;

    try {
        await auction.save();
        res.status(200).json("Auction edited successfully");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Delete an auction
auctionCntrl.delete = async (req, res) => {
    const { id } = req.params;

    try {
        let auction;
        if (req.role === 'admin' || req.role === 'moderator') {
            auction = await Auction.findByIdAndDelete(id); // Admins and moderators can delete any auction
        } else {
            auction = await Auction.findOneAndDelete({ _id: id, user: req.userId }); // Users can only delete their own auctions
        }

        if (!auction) {
            return res.status(404).json({ message: "Auction not found or you're not authorized" });
        }

        res.status(200).json({ message: "Auction deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Get all auctions
auctionCntrl.getAll = async (req, res) => {
    try {
        const auctions = await Auction.find(); // Retrieve all auctions
        res.status(200).json(auctions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get auctions created by the logged-in user
auctionCntrl.getMyAuctions = async (req, res) => {
    try {
        const auctions = await Auction.find({ user: req.userId }); // Get auctions created by the logged-in user
        res.status(200).json(auctions);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a specific auction by ID
auctionCntrl.get = async (req, res) => {
    const { id } = req.params;

    try {
        const auction = await Auction.findById(id); // Retrieve auction by ID

        if (!auction) {
            return res.status(404).json({ message: "Auction not found" });
        }

        res.status(200).json(auction);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Finalize the auction results
auctionCntrl.finalResults = async (req, res) => {
    const { id } = req.params;

    // Check if the user is an admin or moderator
    if (req.role !== 'admin' && req.role !== 'moderator') {
        return res.status(403).json({ message: "You are not authorized to finalize auction results" });
    }

    try {
        const auction = await Auction.findById(id); // Retrieve auction by ID

        if (!auction) {
            return res.status(404).json({ message: "Auction not found" });
        }

        const currentDate = new Date();
        if (currentDate < auction.endDate) {
            return res.status(400).json({ message: "Auction has not ended yet" });
        }

        const { highestBid, bidderName,email } = req.body;

        if (highestBid > auction.startBid) {
            auction.finalBid = highestBid;
            auction.bidderName = bidderName;
            await auction.save();

            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_APP_PASS
                }
            });

            const dateObject = new Date(auction.endDate);
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const formattedDate = dateObject.toLocaleDateString('en-US', options);

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Congratulations! You’ve Won the Auction!',
                html: `
                    <div>
                        <img 
                         src="cid:green_acre_image" 
                         alt="Green Acre" 
                         style="max-width: 100%; height: auto; display: block; margin: 0 auto;" 
                        />
                        <p>Dear ${bidderName},</p>
                        <p>We are thrilled to inform you that you have won the auction for Congratulations!</p>
                        <p>Auction Details:</p>
                        <p>Item/Property Name: ${auction.title}</p>
                        <p>Winning Bid: ₹${highestBid}</p>
                        <p>Auction Date: ${formattedDate}</p>
                        <p>To proceed with the payment and finalize the transaction, please visit your account on our platform or contact our customer service team at [Customer Service Email/Phone Number].</p>
                        <p>We would like to thank you for participating in our auction and hope you enjoy your new [item/property]. If you have any questions or need further assistance, please don’t hesitate to reach out.</p>
                        <p>Once again, congratulations on your win!</p>
                        <p>Best regards,<br />Green Acre</p>
                    </div>
                `,
                attachments: [
                    {
                        filename: 'Green_Acre.png',
                        path: 'C:/Portifolio-Project/FrontEnd/my-app/src/bgImgs/Green_Acre.png',
                        cid: 'green_acre_image' 
                    }
                ]
            };
            
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: "Auction result finalized", auction });
        } else {
            res.status(400).json({ message: "No valid bids above the starting bid" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

auctionCntrl.approveAuctions = async (req, res) => {
    const { id } = req.params;
    try {
        const auction = await Auction.findByIdAndUpdate(id, { approved: true }, { new: true })
        if (!auction) {
            return res.status(404).json({ error: "Auction not found" });
        }
        res.status(200).json("Auction approved successfully");
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export default auctionCntrl;
