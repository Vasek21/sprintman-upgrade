//@@viewOn:imports
import { createComponent } from "uu5g05";
import Config from "./config/config.js";
import EditStep from "./edit-step/edit-step";
import UploadStep from "./upload-step/upload-step";
import ImportStep from "./import-step/import-step";
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
    const { children } = props;
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return <div>
      <UploadStep/>
      <EditStep/>
      <ImportStep/>
    </div>;
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { TicketImporter };
export default TicketImporter;
//@@viewOff:exports
