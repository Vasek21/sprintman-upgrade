//@@viewOn:imports
import { createComponent, PropTypes, useState } from "uu5g05";
import Config from "./config/config.js";
import EditStep from "./edit-step/edit-step";
import UploadStep from "./upload-step/upload-step";
import ImportStep from "./import-step/import-step";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const StepRenderer = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "StepRenderer",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: { stepIndex: PropTypes.bool },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { stepIndex, onNext, onPrevious } = props;
    const [data, setData] = useState([]);
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    const renderStepIndex = (stepIndex) => {
      switch (stepIndex) {
        case 0:
          return <UploadStep onNext={onNext} onPrevious={onPrevious} setData={setData} />;
        case 1:
          return <EditStep onNext={onNext} onPrevious={onPrevious} data={data} setData={setData} />;
        case 2:
          return <ImportStep onNext={onNext} onPrevious={onPrevious} data={data} />;
      }
    };

    return <div>{renderStepIndex(stepIndex)}</div>;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { StepRenderer };
export default StepRenderer;
//@@viewOff:exports
