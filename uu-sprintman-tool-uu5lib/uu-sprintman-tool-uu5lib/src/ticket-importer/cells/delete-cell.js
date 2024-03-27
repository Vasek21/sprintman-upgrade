//@@viewOn:imports
import { createComponent } from "uu5g05";
import { Icon } from "uu5g05-elements";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const DeleteCell = createComponent({
  //@@viewOn:statics
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const deleteItem = (oldData, indexes) => {
      oldData.splice(indexes.rowIndex, 1);
      console.log(oldData);
      return [...oldData];
    };
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <div>
        <Icon icon="mdi-trash-can" onClick={() => props.setData((oldData) => deleteItem(oldData, props.indexes))} />
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { DeleteCell };
export default DeleteCell;
//@@viewOff:exports
