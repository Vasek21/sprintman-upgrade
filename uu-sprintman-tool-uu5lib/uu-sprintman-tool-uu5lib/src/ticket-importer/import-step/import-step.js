//@@viewOn:imports
import { createComponent, useMemo } from "uu5g05";
import { Alert, InfoGroup } from "uu5g05-elements";
import Config from "../config/config.js";
import SolverStatistics from "../edit-step/solver-statistics";
import { useSprint } from "../../sprintman/use-sprint";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const ImportStep = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "ImportStep",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { sprintId, data } = props;
    const sprintList = useSprint();

    const selectedSprintInfoList = useMemo(
      () => {
        if (sprintId && sprintList?.data?.length) {
          const currentSprint = sprintList.data.find((item) => item.data.id === sprintId)?.data;
          return [
            { title: currentSprint.name, subtitle: "Sprint name", icon: currentSprint.icon },
            { title: currentSprint.code, subtitle: "Sprint code" },
            {
              title: currentSprint.state,
              subtitle: "State",
            },
            {
              title: new Date(currentSprint.planStartDate).toLocaleDateString(),
              subtitle: "Start date",
            },
            {
              title: currentSprint.ticketCount,
              subtitle: "Ticket count",
            },
            {
              title: data?.length,
              subtitle: "Tickets to be added",
            },
          ];
        }
      },
      { sprintId, sprintList },
    );
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <div>
        {props.alertOpen && (
          <Alert
            message={"Tickets imported successfully."}
            priority="success"
            durationMs={2000}
            onClose={() => {
              props.setAlertOpen(false);
            }}
          />
        )}
        <InfoGroup itemList={selectedSprintInfoList} direction="horizontal" />
        <div>
          <SolverStatistics data={data} open />
        </div>
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { ImportStep };
export default ImportStep;
//@@viewOff:exports
