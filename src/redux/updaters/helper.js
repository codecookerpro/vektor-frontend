import _ from 'lodash';

export const updatePool = (oldSet, newSet) =>
  newSet.reduce((acc, updated) => {
    const old = acc.find((old) => old._id === updated._id);
    if (old) {
      return acc.map((old) => (old._id === updated._id ? updated : old));
    } else {
      return [...acc, updated];
    }
  }, oldSet);

export const roundMainSystem = (s) => ({
  ...s,
  status: _.round(s.status, 2),
  deliverables: s.deliverables.map((d) => ({
    ...d,
    calculated: {
      ...d.calculated,
      weight: _.round(d.calculated.weight, 2),
      EV: _.round(d.calculated.EV, 2),
      PV: _.round(d.calculated.PV, 2),
      systemEV: _.round(d.calculated.systemEV, 2),
      systemPV: _.round(d.calculated.systemPV, 2),
      systemStatus: _.round(d.calculated.systemStatus, 2),
    },
  })),
  calculated: {
    ...s.calculated,
    EV: _.round(s.calculated.EV, 2),
    PV: _.round(s.calculated.PV, 2),
    effort: _.round(s.calculated.effort, 2),
  },
});
