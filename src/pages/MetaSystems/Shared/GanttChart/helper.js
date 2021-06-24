export const deliverablesToGanttData = (deliverables) =>
  deliverables.map((i) => {
    const dependencies = i.predecessors.length ? i.predecessors.join(',') : null;
    return [i._id, i.name, new Date(i.start), new Date(i.end), null, i.status, dependencies];
  });
