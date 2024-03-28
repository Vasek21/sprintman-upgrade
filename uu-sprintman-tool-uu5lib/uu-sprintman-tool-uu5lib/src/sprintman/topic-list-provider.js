//@@viewOn:imports
import { createComponent, PropTypes, useDataList, useMemo, useState } from "uu5g05";
import TopicListContext from "./topic-list-context";
import Config from "./config/config.js";
import Calls from "calls";
//@@viewOff:imports

//@@viewOn:helpers
//@@viewOff:helpers

export const TopicListProvider = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "TopicListProvider",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    baseUri: PropTypes.string.isRequired,
    skipInitialLoad: PropTypes.bool,
    pageSize: PropTypes.number,
    pageIndex: PropTypes.number,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    skipInitialLoad: false,
    state: "active",
    pageSize: 1000,
    pageIndex: 0,
  },
  //@@viewOff:defaultProps

  render(props) {
    const { baseUri } = props;
    const initialDtoIn = getInitLoadDtoIn(props);
    const [total, setTotal] = useState(0);
    //@@viewOn:private
    const topicDataList = useDataList({
      handlerMap: {
        load: handleLoad,
      },
      initialDtoIn,
    });

    async function handleLoad(dtoIn = initialDtoIn) {
      let res = await Calls.Topic.list({ ...dtoIn }, baseUri);
      setTotal(res.pageInfo.total);
      return res;
    }

    const value = useMemo(() => {
      return { ...topicDataList, total };
    }, [topicDataList]);
    //@@viewOff:private

    //@@viewOn:render
    return (
      <TopicListContext.Provider value={value}>
        {typeof props.children === "function" ? props.children(value) : props.children}
      </TopicListContext.Provider>
    );
    //@@viewOff:render
  },
});

function getInitLoadDtoIn(props) {
  const { pageSize, pageIndex } = props;
  return {
    pageInfo: { pageSize, pageIndex },
  };
}

export default TopicListProvider;
