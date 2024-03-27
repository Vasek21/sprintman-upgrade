//@@viewOn:imports
import { createComponent } from "uu5g05";
import Uu5Forms from "uu5g05-forms";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
//@@viewOff:helpers

const SelectCell = createComponent({
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
    const updateData = (oldData, indexes, columnKey, newData) => {
      oldData[indexes.rowIndex][columnKey] = newData.value;
      return [...oldData];
    };
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <div>
        <Uu5Forms.Select
          value={props.rowData.children}
          {...props.selectProps}
          onChange={(opt) => {
            props.setData((oldData) => updateData(oldData, props.indexes, props.columnKey, opt.data));
          }}
        />
      </div>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { SelectCell };
export default SelectCell;
//@@viewOff:exports
