//@@viewOn:imports
import { createComponent, PropTypes, useDataObject, useMemo } from "uu5g05";
import Config from "./config/config.js";
import Calls from "calls";
import SprintManContext from "./sprintman-context";
//@@viewOff:imports

//@@viewOn:helpers
//@@viewOff:helpers

export const SprintManProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "SprintManProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    baseUri: PropTypes.string.isRequired,
    skipInitialLoad: PropTypes.bool,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    skipInitialLoad: false,
  },
  //@@viewOff:defaultProps

  render(props) {
    const { baseUri } = props;
    //@@viewOn:private
    const sprintManDataObject = useDataObject({
      handlerMap: {
        load: handleLoad,
      },
    });

    async function handleLoad() {
      return await Calls.SprintMan.load(baseUri);
    }

    const value = useMemo(() => {
      return sprintManDataObject;
    }, [sprintManDataObject]);
    //@@viewOff:private

    //@@viewOn:render
    return (
      <SprintManContext.Provider value={value}>
        {typeof props.children === "function" ? props.children(value) : props.children}
      </SprintManContext.Provider>
    );

    //@@viewOff:render
  },
});

export default SprintManProvider;
