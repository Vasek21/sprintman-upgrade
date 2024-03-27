//@@viewOn:imports
import { createComponent } from "uu5g05";
import { Block, SpacingProvider } from "uu5g05-elements";
import Config from "../bricks/config/config.js";
import TicketStepper from "./ticket-stepper";
import StepRenderer from "./step-renderer";
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
    //@@viewOn:private
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <SpacingProvider type="tight">
        <Block card="full">
          <TicketStepper>
            {({ stepIndex, handleNext, handlePrevious }) => (
              <StepRenderer stepIndex={stepIndex} onNext={handleNext} onPrevious={handlePrevious} />
            )}
          </TicketStepper>
        </Block>
      </SpacingProvider>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { TicketImporter };
export default TicketImporter;
//@@viewOff:exports
