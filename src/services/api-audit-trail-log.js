
import axios from 'services/axios'

const getAuditTrailLogs = async (data) => {
  return await axios.get('/api/audit-trail-logs', { data });
};

export {
  getAuditTrailLogs
};
