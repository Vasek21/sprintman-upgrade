//@@viewOn:imports
import { createComponent } from "uu5g05";
import { Block, SpacingProvider } from "uu5g05-elements";
import Config from "../bricks/config/config.js";
import TicketStepper from "./ticket-stepper";
import StepRenderer from "./step-renderer";
import SprintManProvider from "../sprintman/sprintman-provider";
import DataObjectStateResolver from "../common/data-object-state-resolver";
import BacklogRequestListProvider from "../sprintman/backlog-request-list-provider";
import DataListStateResolver from "../common/data-list-state-resolver";
import TicketListProvider from "../sprintman/ticket-list-provider";
import TopicListProvider from "../sprintman/topic-list-provider";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const TicketImporter = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "TicketImporter",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    console.log(props);
    const { baseUri } = props;
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <SprintManProvider baseUri={baseUri}>
        {(sprintManDataObject) => (
          <BacklogRequestListProvider baseUri={baseUri}>
            {(backlogRequestDataList) => (
              <TicketListProvider baseUri={baseUri}>
                {(ticketDataList) => (
                  <TopicListProvider baseUri={baseUri}>
                    {(topicDataList) => (
                      <DataObjectStateResolver dataObject={sprintManDataObject}>
                        <DataListStateResolver dataList={backlogRequestDataList}>
                          <DataListStateResolver dataList={ticketDataList}>
                            <DataListStateResolver dataList={topicDataList}>
                              <SpacingProvider type="tight">
                                <Block card="full">
                                  <TicketStepper>
                                    {({ stepIndex, handleNext, handlePrevious }) => (
                                      <StepRenderer
                                        stepIndex={stepIndex}
                                        onNext={handleNext}
                                        onPrevious={handlePrevious}
                                      />
                                    )}
                                  </TicketStepper>
                                </Block>
                              </SpacingProvider>
                            </DataListStateResolver>
                          </DataListStateResolver>
                        </DataListStateResolver>
                      </DataObjectStateResolver>
                    )}
                  </TopicListProvider>
                )}
              </TicketListProvider>
            )}
          </BacklogRequestListProvider>
        )}
      </SprintManProvider>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { TicketImporter };
export default TicketImporter;
//@@viewOff:exports
