//@@viewOn:imports
import { createComponent, PropTypes, useMemo } from "uu5g05";
import { Panel, Progress, Grid } from "uu5g05-elements";
import { PersonItem } from "uu_plus4u5g02-elements";
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
  defaultProps: { open: false },
  //@@viewOff:defaultProps

  render(props) {
    const { data, open } = props;

    const statistics = useMemo(() => {
      return SolverStatisticsHelper.calculateSolverStatistics(data);
    }, [data]);
    console.log(statistics);
    //@@viewOn:private

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render

    const renderSolverItem = (uuIdentity, complexity = 0, sprintComplexity = 0) => {
      return (
        <Grid templateColumns={{ xs: "1fr", m: "1fr 2fr" }} columnGap={"8px"}>
          <PersonItem title={uuIdentity} />
          <Progress
            type="horizontal"
            value={(parseFloat(complexity) / parseFloat(sprintComplexity)) * 100}
            text={`[${complexity}h/${sprintComplexity}h]`}
            width="100%"
            size={null}
          />
        </Grid>
      );
    };

    return (
      <Panel header="Solver statistics" open={open}>
        {statistics.solverList.map((item, index) => (
          <div className={Config.Css.css({ marginBottom: "2px" })} key={index}>
            {renderSolverItem(item.name, item.complexity, statistics.sprintComplexity)}
          </div>
        ))}
      </Panel>
    );

    //@@viewOff:render
  },
});

//@@viewOn:exports
export { SolverStatistics };
export default SolverStatistics;
//@@viewOff:exports
