import { validationResult } from "express-validator";
import Bidder from "../models/biddersModel.js";

const bidderCntrl = {};

// Create Bidder
bidderCntrl.create = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { bid, auction } = req.body;

  try {
    const bidder = new Bidder({
      user: req.userId, // assuming req.userId comes from the authentication middleware
      auction,
      bid,
    });

    await bidder.save();
    res.status(201).json(bidder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Edit Bidder
bidderCntrl.edit = async (req, res) => {
  const { id } = req.params;

  let bidder;
  if (req.role === 'admin' || req.role === 'moderator') {
    // Admins and moderators can edit any bidder
    bidder = await Bidder.findById(id);
  } else {
    // Regular users can only edit their own bids
    bidder = await Bidder.findOne({ _id: id, user: req.userId });
  }

  if (!bidder) {
    return res.status(404).json({ error: "Bidder not found or you're not authorized to edit" });
  }

  const { bid } = req.body;
  bidder.bid = bid || bidder.bid;

  try {
    await bidder.save();
    res.status(200).json("Edited successfully");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete Bidder
bidderCntrl.delete = async (req, res) => {
  const { id } = req.params;

  let bidder;
  if (req.role === 'admin' || req.role === 'moderator') {
    // Admins and moderators can delete any bidder
    bidder = await Bidder.findById(id);
  } else {
    // Regular users can only delete their own bids
    bidder = await Bidder.findOne({ _id: id, user: req.userId });
  }

  if (!bidder) {
    return res.status(404).json({ error: "Bidder not found or you're not authorized" });
  }

  try {
    await bidder.remove(); // Using remove to delete the bidder
    res.status(200).json("Deleted successfully");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get All Bidders of one auction
bidderCntrl.getAllOfAuction = async (req, res) => {
  const { id } = req.params;

  try {
    const bidders = await Bidder.find({ auction: id });
    if (bidders.length > 0) {
      res.status(200).json(bidders);
    } else {
      res.status(404).json({ message: "No bidders found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get One Bidder
bidderCntrl.getOne = async (req, res) => {
  const { id } = req.params;

  try {
    const bidder = await Bidder.findOne({ _id: id }).populate('auction').populate('user');
    if (!bidder) {
      return res.status(404).json({ message: "Bidder not found" });
    }

    res.status(200).json(bidder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Check if a user has bidded in an auction
bidderCntrl.bidded = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Auction ID is required" });
  }

  try {
    const bidder = await Bidder.findOne({ auction: id, user: req.userId });
    
    if (!bidder) {
      return res.status(404).json({ message: "Bidder not found" });
    }
    
    res.status(200).json(bidder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export default bidderCntrl;
