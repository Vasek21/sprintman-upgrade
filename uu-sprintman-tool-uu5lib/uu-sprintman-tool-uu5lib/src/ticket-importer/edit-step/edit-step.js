//@@viewOn:imports
import { createComponent, PropTypes } from "uu5g05";
import { Button } from "uu5g05-elements";
import Uu5TilesElements from "uu5tilesg02-elements";
import Config from "../config/config.js";
import TextCell from "../cells/text-cell";
import SelectCell from "../cells/select-cell";
import { Constants } from "../cells/constants";
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
    const _renderCell = (columnKey, rowData, indexes) => (
      <TextCell columnKey={columnKey} rowData={rowData} indexes={indexes} setData={props.setData} />
    );
    const _renderSelectCell = (columnKey, rowData, indexes, selectProps) => (
      <SelectCell
        columnKey={columnKey}
        rowData={rowData}
        indexes={indexes}
        setData={props.setData}
        selectProps={selectProps}
      />
    );
    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render

    return (
      <div>
        <div className={Config.Css.css({ display: "flex", width: "100%", justifyContent: "end", gap: "4px" })}>
          <Uu5TilesElements.Table
            data={props.data}
            columnList={[
              {
                value: "backlogRequestCode",
                header: "Backlog code",
                cellComponent: (rowData, indexes) => _renderCell("backlogRequestCode", rowData, indexes),
              },
              {
                value: "name",
                header: "Name",
                cellComponent: (rowData, indexes) => _renderCell("name", rowData, indexes),
              },
              {
                value: "type",
                header: "Type",
                cellComponent: (rowData, indexes) => _renderCell("type", rowData, indexes),
              },
              {
                value: "description",
                header: "Description",
                cellComponent: (rowData, indexes) => _renderCell("description", rowData, indexes),
              },
              {
                value: "activity",
                header: "Activity",
                cellComponent: (rowData, indexes) =>
                  _renderSelectCell("activity", rowData, indexes, Constants.ActivitySelectProps),
              },
              {
                value: "priority",
                header: "Priority",
                cellComponent: (rowData, indexes) =>
                  _renderSelectCell("priority", rowData, indexes, Constants.PrioritySelectProps),
              },
              {
                value: "tagCodes",
                header: "Tag Code",
                cellComponent: (rowData, indexes) =>
                  _renderSelectCell("tagCodes", rowData, indexes, Constants.TagCodesProps),
              },
              {
                value: "complexity",
                header: "Complexity",
                cellComponent: (rowData, indexes) => _renderCell("complexity", rowData, indexes),
              },
              {
                value: "correction",
                header: "Correction",
                cellComponent: (rowData, indexes) => _renderCell("correction", rowData, indexes),
              },
              {
                value: "responsibleSolver",
                header: "Responsible Solver",
                cellComponent: (rowData, indexes) => _renderCell("responsibleSolver", rowData, indexes),
              },
            ]}
          />
        </div>
        <Button onClick={onPrevious}>Previous</Button>
        <Button onClick={onNext}>Next</Button>
      </div>
    );

    //@@viewOff:render
  },
});

//@@viewOn:exports
export { EditStep };
export default EditStep;
//@@viewOff:exports
