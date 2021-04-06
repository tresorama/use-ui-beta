import React from "react";
import { Box, useUI } from "../../index.js";

const sheet = {
  customAPI: props => ({
    direction: props.direction || "row",
    gutter: props.gutter || undefined,
    disableAutocenter: props.disableAutocenter || false,
  }),
  runner: _ => ({
    wrapper: {
      display: "flex",
      flexDirection: _.direction,
      "& > *": {
        margin: _.disableAutocenter ? undefined : "auto",
      },
      "& > * + *": {
        [`margin${_.direction === "row" ? "Left" : "Top"}`]: _.gutter,
      },
    },
  }),
};

const Flex = props => {
  const [UI, propsCleaned] = useUI(sheet, props, []);

  return (
    <Box {...UI.wrapper} {...propsCleaned}>
      {props.children}
    </Box>
  );
};

export default Flex;
