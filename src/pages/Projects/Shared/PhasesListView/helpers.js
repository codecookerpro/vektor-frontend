export const getCondition = (currentProjectPhase, newProjectPhase) =>
  Boolean(newProjectPhase) ? currentProjectPhase === newProjectPhase : !currentProjectPhase;
