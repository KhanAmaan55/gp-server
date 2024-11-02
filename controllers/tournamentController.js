import Tournament from "../models/tournamentModel";

export const createTournament = async (req, res) => {
  try {
    const { name, startDate, teams, sportId } = req.body;

    const newTournament = new Tournament({
      name,
      startDate,
      createdBy: req.user._id, // Assuming user is authenticated
      teams,
      sport: sportId,
    });

    const savedTournament = await newTournament.save();
    res.status(201).json(savedTournament);
  } catch (error) {
    res.status(500).json({ error: "Failed to create tournament" });
  }
};

export const getAllTournaments = async (req, res) => {
    try {
      const tournaments = await Tournament.find().populate('teams sport');
      res.status(200).json(tournaments);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch tournaments' });
    }
  };

  export const getTournamentById = async (req, res) => {
    try {
      const tournament = await Tournament.findById(req.params.id)
        .populate('teams matches pointsTable sport');
      if (!tournament) {
        return res.status(404).json({ error: 'Tournament not found' });
      }
      res.status(200).json(tournament);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch tournament' });
    }
  };

  
  
  