const Constants = {
  PrioritySelectProps: {
    required: true,
    multiple: false,
    itemList: [{ value: "Must have!" }, { value: "Should have." }, { value: "Could have." }],
  },
  ActivitySelectProps: {
    required: true,
    multiple: false,
    itemList: [{ value: "Implementation" }, { value: "Test" }, { value: "Design" }],
  },
  TagCodesProps: {
    required: false,
    multiple: false,
    itemList: [{ value: "imp" }, { value: "tst" }, { value: "dsg" }],
  },
};

//@@viewOn:exports
export { Constants };
export default Constants;
//@@viewOff:exports
