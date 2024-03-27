const SolverStatisticsHelper = {
  calculateSolverStatistics(data = []) {
    let sprintComplexity = 0;
    let solverMap = {
      other: 0,
    };
    for (const ticket of data) {
      if (ticket.responsibleSolver) {
        if (typeof solverMap[ticket.responsibleSolver] === "undefined") {
          solverMap[ticket.responsibleSolver] = ticket.complexity ? parseFloat(ticket.complexity) : 0;
          sprintComplexity += ticket.complexity ? parseFloat(ticket.complexity) : 0;
        } else {
          solverMap[ticket.responsibleSolver] += ticket.complexity ? parseFloat(ticket.complexity) : 0;
          sprintComplexity += ticket.complexity ? parseFloat(ticket.complexity) : 0;
        }
      } else {
        solverMap.other = ticket.complexity ? parseFloat(ticket.complexity) : 0;
        sprintComplexity += ticket.complexity ? parseFloat(ticket.complexity) : 0;
      }
    }

    console.log(solverMap, sprintComplexity);
    return { solverMap, sprintComplexity };
  },
};

export default SolverStatisticsHelper;
