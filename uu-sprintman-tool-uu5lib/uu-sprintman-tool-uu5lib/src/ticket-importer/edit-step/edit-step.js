//@@viewOn:imports
import { createComponent, PropTypes } from "uu5g05";
import { Button } from "uu5g05-elements";
import Config from "../config/config.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const EditStep = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "EditStep",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {
    onNext: PropTypes.func,
    onPrevious: PropTypes.func,
  },
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {
    onNext: () => {},
    onPrevious: () => {},
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { onNext, onPrevious } = props;
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <div>
        EditStep
        <div className={Config.Css.css({ display: "flex", width: "100%", justifyContent: "end", gap: "4px" })}>
          <Button onClick={onPrevious}>Previous</Button>
          <Button onClick={onNext}>Next</Button>
        </div>
      </div>
    );

    //@@viewOff:render
  },
});

//@@viewOn:exports
export { EditStep };
export default EditStep;
//@@viewOff:exports
