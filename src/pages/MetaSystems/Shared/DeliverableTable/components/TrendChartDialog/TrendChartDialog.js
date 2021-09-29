import Chart from 'react-google-charts';
import { Dialog, DialogTitle, DialogContent, DialogActions } from 'components/UI/VektorDialog';
import { ColorButton } from 'components/UI/Buttons';
import { CHART_OPTIONS } from '../../constants';

const TrendChartDialog = ({ open, chartData, onClose }) => (
  <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
    <DialogTitle>Deliverable Trend Chart</DialogTitle>
    <DialogContent>
      <Chart width="100%" height="600px" chartType="LineChart" loader={<div>Loading Chart</div>} data={chartData} options={CHART_OPTIONS} />
    </DialogContent>
    <DialogActions>
      <ColorButton colour="lightGreen" onClick={onClose}>
        Close
      </ColorButton>
    </DialogActions>
  </Dialog>
);

export default TrendChartDialog;
