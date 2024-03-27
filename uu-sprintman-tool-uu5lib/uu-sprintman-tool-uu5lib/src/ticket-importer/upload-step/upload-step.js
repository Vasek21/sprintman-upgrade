//@@viewOn:imports
import { createComponent } from "uu5g05";
import Uu5Forms from "uu5g05-forms";
import Config from "../config/config.js";
//@@viewOff:imports

//@@viewOn:constants
//@@viewOff:constants

//@@viewOn:helpers
const FILE_PROPS = { display: "grid", rowGap: 8, marginBottom: 8, width: "400px" };

const EXCEL_COLUMN_INDEXES = {
  backlogRequestCode: 0,
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
    const { onNext, setData } = props;
    //@@viewOn:private
    //@@viewOff:private
    function onSubmit(event) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setData(parseCsv(e.target.result));
        onNext();
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
          <div className={Config.Css.css({ display: "flex", width: "100%", justifyContent: "center", gap: "4px" })}>
            <div className={Config.Css.css(FILE_PROPS)}>
              <Uu5Forms.FormFile name="ticketList" label="Upload tickets" required />
            </div>
          </div>
          <div className={Config.Css.css({ display: "flex", width: "100%", justifyContent: "end", gap: "4px" })}>
            <Uu5Forms.SubmitButton>Next</Uu5Forms.SubmitButton>
          </div>
        </Uu5Forms.Form>
      </>
    );
    //@@viewOff:render
  },
});

//@@viewOn:exports
export { UploadStep };
export default UploadStep;
//@@viewOff:exports
