//@@viewOn:imports
import { createComponent, PropTypes, Utils } from "uu5g05";
import { Button, Line, Panel } from "uu5g05-elements";
import Uu5TilesElements from "uu5tilesg02-elements";
import Config from "../config/config.js";
import TextCell from "../cells/text-cell";
import SelectCell from "../cells/select-cell";
import { Constants } from "../cells/constants";
import SolverStatistics from "./solver-statistics";
import { useBacklogRequest } from "../../sprintman/use-backlog-request";
import { useTopic } from "../../sprintman/use-topic";
import Calls from "calls";
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
    dockitBaseUri: "https://uuapp-dev.plus4u.net/uu-dockit-maing02/d600cc5f059e4b6c924eaab35ae2da7e",
    documentId: "6605238c2a1b4c002913057f",
  },
  //@@viewOff:defaultProps

  render(props) {
    //@@viewOn:private
    const { onNext, onPrevious, sprintId, setAlertOpen } = props;
    const backlogList = useBacklogRequest();
    const topicList = useTopic();

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

    const _prepareItemList = (props, dataList) => {
      props.itemList = dataList.data.map(({ data }) => ({ value: data.code, children: data.name }));
      return props;
    };

    const handleSaveButton = async () => {
      const attachmentCode = `sprint_${sprintId}`;
      let dtoIn = {
        documentId: props.documentId,
        name: "Sprint Tickets  - " + sprintId,
        filename: "sprintTickets.json",
        code: attachmentCode,
        contentType: "application/json",
        data: new Blob([JSON.stringify(props.data)], { type: "application/json" }),
      };
      try {
        await Calls.Document.attachmentGet({ ...dtoIn }, props.dockitBaseUri);
      } catch (e) {
        await Calls.Document.attachmentCreate({ ...dtoIn }, props.dockitBaseUri);
        setAlertOpen(true);
        onNext();
        return;
      }
      await Calls.Document.attachmentUpdate({ ...dtoIn }, props.dockitBaseUri);
      setAlertOpen(true);
      onNext();
    };

    //@@viewOff:private

    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render

    return (
      <div className={Config.Css.css({ display: "flex", flexDirection: "column", gap: "4px" })}>
        <SolverStatistics data={props.data} />
        <Panel header={"Ticket list"} open>
          <Uu5TilesElements.Table
            data={props.data}
            getActionList={(opt) => [
              {
                icon: "mdi-trash-can",
                colorScheme: "negative",
                onClick: () => {
                  console.log(opt);

                  props.setData((oldData) => [
                    ...oldData.filter((item) => {
                      return !Utils.Object.deepEqual(item, opt.data);
                    }),
                  ]);
                },
              },
            ]}
            columnList={[
              {
                value: "backlogRequestCode",
                header: "Backlog code",
                cellComponent: (rowData, indexes) =>
                  _renderSelectCell(
                    "backlogRequestCode",
                    rowData,
                    indexes,
                    _prepareItemList(Constants.BacklogRequestSelectProps, backlogList),
                  ),
              },
              {
                value: "name",
                header: "Name",
                cellComponent: (rowData, indexes) => _renderCell("name", rowData, indexes),
              },
              {
                value: "description",
                header: "Description",
                cellComponent: (rowData, indexes) => _renderCell("description", rowData, indexes),
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
                  _renderSelectCell("tagCodes", rowData, indexes, _prepareItemList(Constants.TagCodesProps, topicList)),
              },
              {
                value: "complexity",
                header: "Complexity",
                cellComponent: (rowData, indexes) => _renderCell("complexity", rowData, indexes),
              },
              {
                value: "responsibleSolver",
                header: "Responsible Solver",
                cellComponent: (rowData, indexes) => _renderCell("responsibleSolver", rowData, indexes),
              },
              {
                type: "actionList",
                sticky: "right",
              },
            ]}
          />
          <div className={Config.Css.css({ display: "flex", width: "100%", justifyContent: "center" })}>
            <Button
              value={"add new"}
              colorScheme={"primary"}
              icon="mdi-plus"
              onClick={() => props.setData((oldData) => [...oldData, {}])}
            >
              Create new ticket
            </Button>
          </div>
        </Panel>
        <Line significance="subdued" />
        <div className={Config.Css.css({ display: "flex", width: "100%", justifyContent: "end", gap: "4px" })}>
          <Button onClick={onPrevious}>Previous</Button>
          <Button onClick={handleSaveButton}>Save</Button>
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
