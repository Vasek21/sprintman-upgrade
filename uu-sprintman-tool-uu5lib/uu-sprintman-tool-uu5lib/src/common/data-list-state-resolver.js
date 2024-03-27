//@@viewOn:imports
import { createComponent, PropTypes } from "uu5g05";

import Config from "../config/config";
import DataListPending from "./data-list-pending";
import Constants from "../config/constants";
//@@viewOff:imports

export const DataListStateResolver = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "DataListStateResolver",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    dataList: PropTypes.object.isRequired,
    customErrorLsi: PropTypes.object,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    dataList: {},
    customErrorLsi: {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const { dataList, customErrorLsi, children, ...viewProps } = props;

    switch (dataList.state) {
      case Constants.PROVIDER_STATES.ready:
      case Constants.PROVIDER_STATES.error:
      case Constants.PROVIDER_STATES.pending:
      case Constants.PROVIDER_STATES.itemPending:
        return typeof children === "function" ? children() : children;
      case Constants.PROVIDER_STATES.readyNoData:
      case Constants.PROVIDER_STATES.pendingNoData:
        return <DataListPending {...viewProps} />;
      case Constants.PROVIDER_STATES.errorNoData:
      default:
        return <div>Error</div>;
    }
    //@@viewOff:render
  },
});

export default DataListStateResolver;
