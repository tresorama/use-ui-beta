import React from "react";
import { Box, Flex, useUI } from "../../index.js";

// const sheet = {
//   customAPI: props => ({
//     shape: props.shape || "text", // 'text' | 'outline' | 'contained'
//     colorScheme: props.colorScheme || "root", // 'root' | 'primary' | 'secondary'
//     color: props.color || undefined,
//   }),
//   runner: _ => {
//     const style = {
//       buttonWrapper: {
//         baseStyle: {
//           border: "1px solid transparent",
//           backgroundColor: "transparent",
//           borderRadius: "5px",
//           overflow: "hidden",
//           position: "relative",
//           paddingY: 1,
//           paddingX: 2,
//           display: "inline-block",
//           //
//           transitionDuration: "SHORT",
//           transitionDelay: 0,
//           transitionTimingFunction: "ONE",
//           transitionProperty: "background-color, color, borderColor",
//         },
//         text: {
//           root: {
//             backgroundColor: "transparent",
//             color: _.color ? _.color : "black",
//             "&:hover": {
//               backgroundColor: `${_.color ? _.color : "black"}=>setAlpha(0.08)`,
//             },
//           },
//           primary: {
//             backgroundColor: "transparent",
//             color: _.color ? _.color : "primary",
//             "&:hover": {
//               backgroundColor: `${_.color ? _.color : "primary"}=>setAlpha(0.08)`,
//             },
//           },
//           secondary: {
//             backgroundColor: "transparent",
//             color: _.color ? _.color : "secondary",
//             "&:hover": {
//               backgroundColor: `${_.color ? _.color : "secondary"}=>setAlpha(0.08)`,
//             },
//           },
//         },
//         outline: {
//           root: {
//             backgroundColor: "transparent",
//             color: _.color ? _.color : "black",
//             borderColor: `${_.color ? _.color : "black"}=>setAlpha(0.5)`,
//             "&:hover": {
//               backgroundColor: `${_.color ? _.color : "black"}=>setAlpha(0.08)`,
//               borderColor: _.color ? _.color : "black",
//             },
//           },
//           primary: {
//             backgroundColor: "transparent",
//             color: _.color ? _.color : "primary",
//             borderColor: `${_.color ? _.color : "primary"}=>setAlpha(0.5)`,
//             "&:hover": {
//               backgroundColor: `${_.color ? _.color : "primary"}=>setAlpha(0.08)`,
//               borderColor: _.color ? _.color : "primary",
//             },
//           },
//           secondary: {
//             backgroundColor: "transparent",
//             color: _.color ? _.color : "secondary",
//             borderColor: `${_.color ? _.color : "secondary"}=>setAlpha(0.5)`,
//             "&:hover": {
//               backgroundColor: `${_.color ? _.color : "secondary"}=>setAlpha(0.08)`,
//               borderColor: _.color ? _.color : "secondary",
//             },
//           },
//         },
//         contained: {
//           root: _.color
//             ? {
//                 borderColor: "transparent",
//                 backgroundColor: _.color,
//                 color: `${_.color}=>contrastTextColor()`,
//                 "&:hover": {
//                   backgroundColor: `${_.color}=>darken()`,
//                 },
//               }
//             : {
//                 borderColor: "transparent",
//                 backgroundColor: "black=>setAlpha(0.08)",
//                 color: "black",
//                 "&:hover": {
//                   backgroundColor: "black=>setAlpha(0.2)",
//                 },
//               },
//           primary: {
//             borderColor: "transparent",
//             backgroundColor: _.color ? _.color : "primary",
//             color: `${_.color ? _.color : "primary"}=>contrastTextColor()`,
//             "&:hover": {
//               backgroundColor: `${_.color ? _.color : "primary"}=>darken()`,
//             },
//           },
//           secondary: {
//             borderColor: "transparent",
//             backgroundColor: _.color ? _.color : "secondary",
//             color: `${_.color ? _.color : "secondary"}=>contrastTextColor()`,
//             "&:hover": {
//               backgroundColor: `${_.color ? _.color : "secondary"}=>darken()`,
//             },
//           },
//         },
//       },
//       buttonContent: {
//         // Flex API
//         direction: "row",
//         gutter: 1,
//         // common
//         pointerEvents: "none",
//       },
//     };
//     return {
//       buttonWrapper: {
//         typoVariant: "button",
//         ...style.buttonWrapper.baseStyle,
//         ...style.buttonWrapper[_.shape].root,
//         ...style.buttonWrapper[_.shape][_.colorScheme],
//       },
//       buttonContent: {
//         ...style.buttonContent,
//       },
//     };
//   },
// };

const sheet = {
  customAPI: props => ({
    shape: props.shape || "text",
    color: props.color || "black",
  }),
  runner: _ => {
    return {
      buttonWrapper: {
        //special
        typoVariant: "button",
        PRESETS: "transition_Buttons",
        // common
        border: "1px solid transparent",
        backgroundColor: "transparent",
        borderRadius: "5px",
        overflow: "hidden",
        position: "relative",
        paddingY: 1.5,
        paddingX: 2,
        display: "inline-block",
        transitionProperty: "background-color, color, borderColor",
        ...("text" === _.shape && {
          backgroundColor: "transparent",
          color: _.color,
          "&:hover": {
            backgroundColor: `${_.color}=>setAlpha(0.08)`,
          },
        }),
        ...("outline" === _.shape && {
          backgroundColor: "transparent",
          color: _.color,
          borderColor: `${_.color}=>setAlpha(0.5)`,
          "&:hover": {
            backgroundColor: `${_.color}=>setAlpha(0.08)`,
            borderColor: _.color,
          },
        }),
        ...("contained" === _.shape && {
          borderColor: "transparent",
          backgroundColor: _.color,
          color: `${_.color}=>contrastTextColor()`,
          "&:hover": {
            backgroundColor: `${_.color}=>darken()`,
          },
        }),
      },
      buttonContent: {
        // Flex API
        direction: "row",
        gutter: 1,
        // common
        pointerEvents: "none",
      },
    };
  },
};

const Button = ({ as, onClick, children, ...props }) => {
  const [UI, propsCleaned] = useUI(sheet, props, []);

  return (
    <Box as={as} onClick={onClick} {...UI.buttonWrapper} {...propsCleaned}>
      <Flex {...UI.buttonContent}>{children}</Flex>
    </Box>
  );
};

Button.defaultProps = {
  as: "button",
  onClick: () => {},
};
export default Button;
