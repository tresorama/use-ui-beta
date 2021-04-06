import React from "react";
import { Box, useUI } from "../../index.js";

const sheet = {
  customAPI: props => ({
    typo: props.typo || "body", // any theme.TYPO sub properties name
    color: props.color || undefined,
    // "rgb(0,5,70)" | any other CSS color | ...
    // "primary" | ...
    // "rgb(0,5,70)=>lighten()+spin(180)+setAlpha(0.5)" | any other CSS color=>func1()+func2()+... | ...
    // "primary=>lighten()+spin(180)+setAlpha(0.5)" | any theme.COLOR=>func1()+func2()+...
  }),
  runner: _ => ({
    text: {
      // special
      typoVariant: _.typo,
      // common
      color: _.color,
    },
  }),
};
const Text = props => {
  const [UI] = useUI(sheet, props);
  return <Box {...props} {...UI.text} />;
};
Text.defaultProps = {
  as: "span",
};
export default Text;
