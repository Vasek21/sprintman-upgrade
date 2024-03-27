const Constants = {
  PrioritySelectProps: {
    required: true,
    multiple: false,
    itemList: [{ value: "Must have!" }, { value: "Should have." }, { value: "Could have." }],
  },
  BacklogRequestSelectProps: {
    required: true,
    multiple: false,
  },
  TagCodesProps: {
    required: false,
    multiple: false,
  },
};

//@@viewOn:exports
export { Constants };
export default Constants;
//@@viewOff:exports
