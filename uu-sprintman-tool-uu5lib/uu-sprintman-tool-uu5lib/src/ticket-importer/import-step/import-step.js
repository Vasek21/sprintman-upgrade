//@@viewOn:imports
import { createComponent, useMemo } from "uu5g05";
import { Alert, InfoGroup } from "uu5g05-elements";
import UuScriptConsole from "uu_consoleg02";
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

        <div className={Config.Css.css({ display: "flex", justifyContent: "center" })}>
          <UuScriptConsole.Bricks.RunScriptButton
            label="Import tickets"
            scriptEngineUri="http://localhost:9090/uu-script-engineg02/11111111111111111111111111111112"
            scriptUri="http://localhost:9090/uu-script-repositoryg02/44444444444444444444444444444442/script/getBody?code=import-tickets"
            consoleBaseUri="http://localhost:9090/uu-console-maing02/33333333333333333333333333333332/"
            consoleCode="1de49958407aa4c5"
            scriptDtoIn={{
              attachmentUri:
                "https://uuapp-dev.plus4u.net/uu-dockit-maing02/d600cc5f059e4b6c924eaab35ae2da7e/document/attachment/getData?code=sprint_636a2e31156ed20038b8aa6d&documentId=6605238c2a1b4c002913057f",
              sprintmanBaseUri: "http://localhost:9090/uu-sprintman-maing01/00000503defc438abdf47d1ecd301c67/",
              consoleBaseUri: "http://localhost:9090/uu-console-maing02/33333333333333333333333333333332/",
              sprintId: "636a2e31156ed20038b8aa6d",
            }}
            icon="uugds-file-move-outline"
            callbackHttpMethod="POST"
          />
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
