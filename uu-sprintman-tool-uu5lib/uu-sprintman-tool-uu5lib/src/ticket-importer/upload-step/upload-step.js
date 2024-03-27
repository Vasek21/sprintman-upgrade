//@@viewOn:imports
import { createComponent } from "uu5g05";
import Uu5Forms from "uu5g05-forms";
import { useState } from "uu5g05";
import { Button } from "uu5g05-elements";
import Config from "../config/config.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
const FILE_PROPS = { display: "grid", rowGap: 8, gridTemplateRows: "auto", marginBottom: 8 };

const EXCEL_COLUMN_INDEXES = {
  backlogCode: 0,
  name: 1,
  type: 2,
  description: 3,
  activity: 4,
  priority: 5,
  tagCodes: 6,
  complexity: 7,
  correction: 8,
  responsibleSolver: 11,
};

//@@viewOff:helpers

const UploadStep = createComponent({
  //@@viewOn:statics
  uu5Tag: Config.TAG + "UploadStep",
  //@@viewOff:statics

  //@@viewOn:propTypes
  propTypes: {},
  //@@viewOff:propTypes

  //@@viewOn:defaultProps
  defaultProps: {},
  //@@viewOff:defaultProps

  render(props) {
    const { onPrevious, onNext } = props;
    //@@viewOn:private
    const [csvData, setCsvData] = useState([]);
    //@@viewOff:private
    function onSubmit(event) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setCsvData(parseCsv(e.target.result));
      };

      reader.readAsText(event.data.value.ticketList);
      //@@viewOff:render
    }

    function parseCsv(content) {
      let result = [];
      const rows = content.trim().split("\n");
      for (let row of rows) {
        const values = row.split(";");
        let parsedItem = {};
        for (let key of Object.keys(EXCEL_COLUMN_INDEXES)) {
          parsedItem[key] = values[EXCEL_COLUMN_INDEXES[key]];
        }
        result.push(parsedItem);
      }
      // remove of header
      result.shift();
      return result;
    }
    //@@viewOn:interface
    //@@viewOff:interface

    //@@viewOn:render
    return (
      <>
        <Uu5Forms.Form onSubmit={onSubmit}>
          <div className={Config.Css.css(FILE_PROPS)}>
            <Uu5Forms.FormFile name="ticketList" label="Upload tickets" required />
            <Uu5Forms.SubmitButton />
          </div>
          <div className={Config.Css.css({ display: "flex", width: "100%", justifyContent: "end", gap: "4px" })}>
            <Button onClick={onPrevious}>Previous</Button>
            <Button onClick={onNext}>Next</Button>
          </div>
        </Uu5Forms.Form>
        {JSON.stringify(csvData, null, 2)}
      </>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { UploadStep };
export default UploadStep;
//@@viewOff:exports
