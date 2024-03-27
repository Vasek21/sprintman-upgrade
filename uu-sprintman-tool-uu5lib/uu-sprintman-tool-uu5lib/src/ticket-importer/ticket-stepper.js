//@@viewOn:imports
import { createComponent, useState } from "uu5g05";
import { Stepper, Line } from "uu5g05-elements";
import Config from "./config/config.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const TicketStepper = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "TicketStepper",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const [stepIndex, setStepIndex] = useState(0);
    const [progressIndex, setProgressIndex] = useState(stepIndex);

    const STEP_LIST = [
      { code: "upload", title: "Upload File" },
      { code: "edit", title: "Edit" },
      { code: "import", title: "Import" },
    ];

    const handleNext = () => {
      if (stepIndex < STEP_LIST.length - 1) {
        setStepIndex(stepIndex + 1);
        if (progressIndex < stepIndex + 1) setProgressIndex(stepIndex + 1);
      }
    };
    const handlePrevious = () => {
      if (stepIndex > 0) {
        setStepIndex(stepIndex - 1);
      }
    };
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <div
        className={Config.Css.css({
          display: "flex",
          flexDirection: "column",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        })}
      >
        <Stepper
          itemList={STEP_LIST}
          stepIndex={stepIndex}
          progressIndex={progressIndex}
          onChange={(event) => {
            setStepIndex(event.data.stepIndex);
          }}
        />
        <div className={Config.Css.css({ width: "100%" })}>
          <Line margin="8px 0" significance="subdued" />
          {typeof props.children === "function"
            ? props.children({ stepIndex, handleNext, handlePrevious })
            : props.children}
        </div>
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { TicketStepper };
export default TicketStepper;
//@@viewOff:exports
