//@@viewOn:imports
import { createComponent, PropTypes, useMemo } from "uu5g05";
import { Panel } from "uu5g05-elements";
import Config from "../config/config.js";
import SolverStatisticsHelper from "../../helpers/solver-statistics-helper";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const SolverStatistics = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "SolverStatistics",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    const { data } = props;

    const statistics = useMemo(() => {
      return SolverStatisticsHelper.calculateSolverStatistics(data);
    }, [data]);
    console.log(statistics);
    //@@viewOn:private

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render

    return <Panel header="Solver statistics">Stat</Panel>;

    //@@viewOff:render
  },
});

//@@viewOn:exports
export { SolverStatistics };
export default SolverStatistics;
//@@viewOff:exports
