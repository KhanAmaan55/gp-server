import Team from "../models/teamModel";

export const createTeam = async (req, res) => {
  try {
    const { name, players, sportId } = req.body;

    const newTeam = new Team({
      name,
      players,
      sport: sportId,
    });

    const savedTeam = await newTeam.save();
    res.status(201).json(savedTeam);
  } catch (error) {
    res.status(500).json({ error: "Failed to create team" });
  }
};

export const getAllTeams = async (req, res) => {
  try {
    const teams = await Team.find().populate("sport");
    res.status(200).json(teams);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch teams" });
  }
};

export const getTeamById = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate("sport");
    if (!team) {
      return res.status(404).json({ error: "Team not found" });
    }
    res.status(200).json(team);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch team" });
  }
};

export const updateTeam = async (req, res) => {
  try {
    const { name, players, sportId } = req.body;

    const updatedTeam = await Team.findByIdAndUpdate(
      req.params.id,
      { name, players, sport: sportId },
      { new: true }
    );

    if (!updatedTeam) {
      return res.status(404).json({ error: "Team not found" });
    }

    res.status(200).json(updatedTeam);
  } catch (error) {
    res.status(500).json({ error: "Failed to update team" });
  }
};

export const deleteTeam = async (req, res) => {
  try {
    const deletedTeam = await Team.findByIdAndDelete(req.params.id);
    if (!deletedTeam) {
      return res.status(404).json({ error: "Team not found" });
    }
    res.status(200).json({ message: "Team deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete team" });
  }
};
