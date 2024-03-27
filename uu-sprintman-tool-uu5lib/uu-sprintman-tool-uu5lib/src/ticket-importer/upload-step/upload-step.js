//@@viewOn:imports
import { createComponent } from "uu5g05";
import Config from "../config/config.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const UploadStep = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "UploadStep",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { children } = props;
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return <div>Upload step</div>;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { UploadStep };
export default UploadStep;
//@@viewOff:exports
