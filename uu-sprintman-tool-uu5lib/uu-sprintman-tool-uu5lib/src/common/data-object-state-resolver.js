//@@viewOn:imports
import { createComponent, PropTypes } from "uu5g05";
import Config from "../config/config";
import DataObjectPending from "./data-object-pending";
import Constants from "../config/constants";
//@@viewOff:imports

export const DataObjectStateResolver = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "DataObjectStateResolver",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    dataObject: PropTypes.object.isRequired,
    customErrorLsi: PropTypes.object,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    dataObject: {},
    customErrorLsi: {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const { dataObject, customErrorLsi, children, ...viewProps } = props;

    switch (dataObject.state) {
      case Constants.PROVIDER_STATES.ready:
      case Constants.PROVIDER_STATES.error:
      case Constants.PROVIDER_STATES.pending:
        return typeof children === "function" ? children(dataObject) : children;
      case Constants.PROVIDER_STATES.readyNoData:
      case Constants.PROVIDER_STATES.pendingNoData:
        return <DataObjectPending {...viewProps} />;
      case Constants.PROVIDER_STATES.errorNoData:
      default:
        return <div>Error</div>;
    }
    //@@viewOff:render
  },
});

export default DataObjectStateResolver;
