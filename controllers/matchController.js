import Match from "../models/matchModel";
import PointsTable from "../models/pointsTableModel";

export const createMatch = async (req, res) => {
  try {
    const {
      tournamentId,
      teamA,
      teamB,
      teamAScore,
      teamBScore,
      result,
      teamAOversFaced,
      teamBOversFaced,
      teamAOversBowled,
      teamBOversBowled,
    } = req.body;

    const newMatch = new Match({
      tournamentId,
      teamA,
      teamB,
      teamAScore,
      teamBScore,
      teamAOversFaced,
      teamBOversFaced,
      teamAOversBowled,
      teamBOversBowled,
      result,
    });

    const savedMatch = await newMatch.save();

    // Update points table including NRR calculation
    await updatePointsTable(tournamentId, teamA, teamB, result);

    res.status(201).json(savedMatch);
  } catch (error) {
    res.status(500).json({ error: "Failed to create match" });
  }
};

// Helper function to update points table after a match
const updatePointsTable = async (tournamentId, teamA, teamB, result) => {
  const pointsTable = await PointsTable.findOne({ tournamentId });

  if (!pointsTable) {
    throw new Error("Points table not found for tournament");
  }

  // Get the standings for teamA and teamB
  const teamAStanding = pointsTable.standings.find(
    (s) => s.team.toString() === teamA
  );
  const teamBStanding = pointsTable.standings.find(
    (s) => s.team.toString() === teamB
  );

  // Update match counts and points
  teamAStanding.played += 1;
  teamBStanding.played += 1;

  if (result === "Team A wins") {
    teamAStanding.won += 1;
    teamBStanding.lost += 1;
    teamAStanding.points += 2;
  } else if (result === "Team B wins") {
    teamBStanding.won += 1;
    teamAStanding.lost += 1;
    teamBStanding.points += 2;
  }

  // Fetch all matches involving teamA and teamB
  const matchesTeamA = await Match.find({
    tournamentId,
    $or: [{ teamA }, { teamB: teamA }],
  });
  const matchesTeamB = await Match.find({
    tournamentId,
    $or: [{ teamA: teamB }, { teamB }],
  });

  // Calculate NRR for teamA
  const {
    totalRunsScored: teamARunsScored,
    totalOversFaced: teamAOversFaced,
    totalRunsConceded: teamARunsConceded,
    totalOversBowled: teamAOversBowled,
  } = calculateMatchStats(matchesTeamA, teamA);

  const teamANRR =
    teamARunsScored / teamAOversFaced - teamARunsConceded / teamAOversBowled;
  teamAStanding.nrr = teamANRR.toFixed(3); // Round to 3 decimal places

  // Calculate NRR for teamB
  const {
    totalRunsScored: teamBRunsScored,
    totalOversFaced: teamBOversFaced,
    totalRunsConceded: teamBRunsConceded,
    totalOversBowled: teamBOversBowled,
  } = calculateMatchStats(matchesTeamB, teamB);

  const teamBNRR =
    teamBRunsScored / teamBOversFaced - teamBRunsConceded / teamBOversBowled;
  teamBStanding.nrr = teamBNRR.toFixed(3); // Round to 3 decimal places

  await pointsTable.save(); // Save the updated points table to the database
};

// Helper function to calculate the match statistics for a team
const calculateMatchStats = (matches, teamId) => {
  let totalRunsScored = 0;
  let totalOversFaced = 0;
  let totalRunsConceded = 0;
  let totalOversBowled = 0;

  matches.forEach((match) => {
    if (match.teamA.toString() === teamId) {
      // Team A's match stats
      totalRunsScored += match.teamAScore;
      totalOversFaced += match.teamAOversFaced;
      totalRunsConceded += match.teamBScore;
      totalOversBowled += match.teamAOversBowled;
    } else if (match.teamB.toString() === teamId) {
      // Team B's match stats
      totalRunsScored += match.teamBScore;
      totalOversFaced += match.teamBOversFaced;
      totalRunsConceded += match.teamAScore;
      totalOversBowled += match.teamBOversBowled;
    }
  });

  return {
    totalRunsScored,
    totalOversFaced,
    totalRunsConceded,
    totalOversBowled,
  };
};
