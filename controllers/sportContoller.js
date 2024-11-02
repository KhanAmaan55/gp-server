import Sport from "../models/sportsModel";

export const createSport = async (req, res) => {
  try {
    const { name } = req.body;

    const newSport = new Sport({ name });
    const savedSport = await newSport.save();

    res.status(201).json(savedSport);
  } catch (error) {
    res.status(500).json({ error: "Failed to create sport" });
  }
};

export const getAllSports = async (req, res) => {
  try {
    const sports = await Sport.find();
    res.status(200).json(sports);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch sports" });
  }
};

export const getSportById = async (req, res) => {
  try {
    const sport = await Sport.findById(req.params.id);
    if (!sport) {
      return res.status(404).json({ error: "Sport not found" });
    }
    res.status(200).json(sport);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch sport" });
  }
};
