//@@viewOn:imports
import { createVisualComponent, PropTypes, Utils } from "uu5g05";
import { Pending } from "uu5g05-elements";
import Config from "../config/config";
import Constants from "../config/constants";
//@@viewOff:imports

//@@viewOn:css
const Css = {
  placeholder: (height) =>
    Config.Css.css({
      height: typeof height === "number" ? `${height}px` : height,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }),
  pending: () => Config.Css.css`display: block`,
};
//@@viewOff:css

const STATICS = {
  //@@viewOn:statics
  uu5Tag: Config.TAG + "DataObjectPending",
  nestingLevel: ["box", "inline"],
  //@@viewOff:statics
};

const DataObjectPending = createVisualComponent({
  ...STATICS,

  //@@viewOn:propTypes
  propTypes: {
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    height: "100%",
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:render
    const currentNestingLevel = Utils.NestingLevel.getNestingLevel(props, STATICS);
    const { height, ...otherProps } = props;
    const className = Css.placeholder(height);
    const [elementProps, pendingProps] = Utils.VisualComponent.splitProps(otherProps, className);

    const attrs = Utils.VisualComponent.getAttrs(elementProps, className);

    switch (currentNestingLevel) {
      case Constants.NESTING_LEVELS.box:
        return (
          <div {...attrs}>
            <Pending {...pendingProps} size="xl" className={Css.pending()} />
          </div>
        );
      case Constants.NESTING_LEVELS.inline:
      default:
        return <Pending {...pendingProps} nestingLevel={Constants.NESTING_LEVELS.inline} />;
    }
    //@@viewOff:render
  },
});

export default DataObjectPending;
