import PointsTable from '../models/pointsTableModel';

export const getPointsTable = async (req, res) => {
  try {
    const pointsTable = await PointsTable.findOne({ tournamentId: req.params.tournamentId }).populate('standings.team');
    if (!pointsTable) {
      return res.status(404).json({ error: 'Points table not found' });
    }
    res.status(200).json(pointsTable);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch points table' });
  }
};
