// import React from "react";
import styled from "@emotion/styled";

import TYPE from "../jshelpers/getTypeOf.js";
import { removeFalsyPropsFromObject } from "../jshelpers/object";
import { inArray } from "../jshelpers/array";

// EXTRACT ALL CSS PROPS FROM PROPS OBJECT
const EXTRACTOR = props => {
  const { typoVariant, PRESETS, theme, ...rest } = props;

  // extract special TYPOGRAPHY "style-snippet", to inject ...
  // (i.e. heading1 | button  | badge ... )
  const typoVariantProps = theme.TYPO[typoVariant];

  // extract special PRESETS "style-snippet", to inject ...
  // (i.e. rounded (borderRadius) | ... )
  // FORSE VA SPOSTATO DA QUA IL BLOCCO SOTTO ..
  const cssPresetsProps = (() => {
    if (!PRESETS) return null;
    try {
      const allPresets = PRESETS;
      let cssProps = {};
      if (TYPE.isArray(allPresets)) {
        allPresets.forEach(
          preset => (cssProps = { ...cssProps, ...(theme.PRESETS[preset] || {}) })
        );
        return cssProps;
      }
      if (TYPE.isString(allPresets)) {
        return { ...(theme.PRESETS[allPresets] || {}) };
      }
      throw new Error("");
    } catch (error) {
      return null;
    }
  })();

  const allProps = {
    ...(typoVariantProps || {}),
    ...(cssPresetsProps || {}),
    ...rest,
  };

  const allParsedProps = (p => ({
    // general
    zIndex: p.zIndex,
    pointerEvents: p.pointerEvents,
    visibility: p.visibility,
    content: p.content,
    cursor: p.cursor,
    appearance: p.appearance,
    backfaceVisibility: p.backfaceVisibility,
    contentVisibilty: p.contentVisibilty,
    filter: p.filter,
    //
    background: p.background || p.bg,
    backgroundAttachment: p.backgroundAttachment,
    backgroundBlendMode: p.backgroundBlendMode,
    backgroundClip: p.backgroundClip,
    backgroundColor: p.backgroundColor,
    backgroundImage: p.backgroundImage,
    backgroundOrigin: p.backgroundOrigin,
    backgroundPosition: p.backgroundPosition,
    backgroundPositionX: p.backgroundPositionX,
    backgroundPositionY: p.backgroundPositionY,
    backgroundRepeat: p.backgroundRepeat,
    backgroundSize: p.backgroundSize,
    //
    border: p.border,
    borderWidth: p.borderWidth,
    borderColor: p.borderColor,
    borderRadius: p.borderRadius,
    borderImage: p.borderImage,
    borderImageOutset: p.borderImageOutset,
    borderImageRepeat: p.borderImageRepeat,
    borderImageSlice: p.borderImageSlice,
    borderImageSource: p.borderImageSource,
    borderImageWidth: p.borderImageWidth,
    borderCollapse: p.borderCollapse,
    borderSpacing: p.borderSpacing,
    //
    borderTop: p.borderTop,
    borderTopStyle: p.borderTopStyle,
    borderTopWidth: p.borderTopWidth,
    borderTopColor: p.borderTopColor,
    borderTopLeftRadius: p.borderTopLeftRadius,
    borderTopRightRadius: p.borderTopRightRadius,
    borderBottom: p.borderBottom,
    borderBottomStyle: p.borderBottomStyle,
    borderBottomWidth: p.borderBottomWidth,
    borderBottomColor: p.borderBottomColor,
    borderBottomLeftRadius: p.borderBottomLeftRadius,
    borderBottomRightRadius: p.borderBottomRightRadius,
    borderRight: p.borderRight,
    borderRightStyle: p.borderRightStyle,
    borderRightWidth: p.borderRightWidth,
    borderRightColor: p.borderRightColor,
    borderLeft: p.borderLeft,
    borderLeftStyle: p.borderLeftStyle,
    borderLeftWidth: p.borderLeftWidth,
    borderLeftColor: p.borderLeftColor,
    //
    boxShadow: p.boxShadow,
    boxDecorationBreak: p.boxDecorationBreak,
    boxSizing: p.boxSizing,
    //
    color: p.color,
    clip: p.clip,
    clipPath: p.clipPath,
    //
    position: p.position,
    top: p.top,
    right: p.right,
    bottom: p.bottom,
    left: p.left,
    //
    float: p.float,
    clear: p.clear,
    //
    display: p.display,
    flexDirection: p.flexDirection,
    flexWrap: p.flexWrap,
    flex: p.flex,
    flexBasis: p.flexBasis,
    flexGrow: p.flexGrow,
    flexShrink: p.flexShrink,
    justifyContent: p.justifyContent,
    alignItems: p.alignItems,
    alignContent: p.alignContent,
    alignSelf: p.alignSelf,
    gap: p.gap,
    order: p.order,
    //
    grid: p.grid,
    gridTemplateRows: p.gridTemplateRows,
    gridTemplateColumns: p.gridTemplateColumns,
    gridTemplateAreas: p.gridTemplateAreas,
    gridAutoRows: p.gridAutoRows,
    gridAutoColumns: p.gridAutoColumns,
    gridAutoFlow: p.gridAutoFlow,
    gridArea: p.gridArea,
    growRowGap: p.growRowGap,
    gridColumnGap: p.gridColumnGap,

    //
    listStyle: p.listStyle,
    listStyleImage: p.listStyleImage,
    listStylePosition: p.listStylePosition,
    listStyleType: p.listStyleType,
    //
    mixBlendMode: p.mixBlendMode,
    //
    objectFit: p.objectFit,
    objectPosition: p.objectPosition,
    //
    opacity: p.opacity,
    //
    outline: p.outline,
    outlineColor: p.outlineColor,
    outlineOffset: p.outlineOffset,
    outlineStyle: p.outlineStyle,
    outlineWidth: p.outlineWidth,
    //
    overflow: p.overflow,
    overflowX: p.overflowX,
    overflowY: p.overflowY,
    //
    perspective: p.perspective,
    perspectiveOrigin: p.perspectiveOrigin,
    //
    resize: p.resize,
    //
    transform: p.transform,
    transformOrigin: p.transformOrigin,
    transformStyle: p.transformStyle,
    transformBox: p.transformBox,

    // dimension
    width: p.width || p.w,
    minWidth: p.minWidth || p.minW,
    maxWidth: p.maxWidth || p.maxW,
    height: p.height || p.h,
    minHeight: p.minHeight || p.minH,
    maxHeight: p.maxHeight || p.maxH,
    aspectRatio: p.aspectRatio,
    // spacing
    padding: p.padding || p.p,
    paddingTop: p.paddingTop || p.pT || p.paddingY || p.pY,
    paddingBottom: p.paddingBottom || p.pB || p.paddingY || p.pY,
    paddingLeft: p.paddingLeft || p.pL || p.paddingX || p.pX,
    paddingRight: p.paddingRight || p.pR || p.paddingX || p.pX,
    margin: p.margin || p.m,
    marginTop: p.marginTop || p.mT || p.marginY || p.mY,
    marginBottom: p.marginBottom || p.mB || p.marginY || p.mY,
    marginRight: p.marginRight || p.mR || p.marginX || p.mX,
    marginLeft: p.marginLeft || p.mL || p.marginX || p.mX,
    // text
    fontFamily: p.fontFamily,
    fontFeatureSettings: p.fontFeatureSettings,
    fontKerning: p.fontKerning,
    fontLanguageOverride: p.fontLanguageOverride,
    fontOpticalSizing: p.fontOpticalSizing,
    fontSize: p.fontSize,
    fontSizeAdjust: p.fontSizeAdjust,
    fontStretch: p.fontStretch,
    fontStyle: p.fontStyle,
    fontSynthesis: p.fontSynthesis,
    fontVariant: p.fontVariant,
    fontVariantAlternate: p.fontVariantAlternate,
    fontVariantCaps: p.fontVariantCaps,
    fontVariantEastAsian: p.fontVariantEastAsian,
    fontVariantLigatures: p.fontVariantLigatures,
    fontVariantNumeric: p.fontVariantNumeric,
    fontVariantPosition: p.fontVariantPosition,
    fontVariationSettings: p.fontVariationSettings,
    fontWeight: p.fontWeight,
    //
    textAlign: p.textAlign,
    textAlignLast: p.textAlignLast,
    textCombineUpright: p.textCombineUpright,
    textDecoration: p.textDecoration,
    textDecorationColor: p.textDecorationColor,
    textDecorationLine: p.textDecorationLine,
    textDecorationSkip: p.textDecorationSkip,
    textDecorationSkipLink: p.textDecorationSkipLink,
    textDecorationStyle: p.textDecorationStyle,
    textDecorationThickness: p.textDecorationThickness,
    textEmphasis: p.textEmphasis,
    textEmphasisColor: p.textEmphasisColor,
    textEmphasisPosition: p.textEmphasisPosition,
    textEmphasisStyle: p.textEmphasisStyle,
    textIndent: p.textIndent,
    textJustify: p.textJustify,
    textOrientation: p.textOrientation,
    textOverflow: p.textOverflow,
    textRendering: p.textRendering,
    textShadow: p.textShadow,
    textSizeAdjust: p.textSizeAdjust,
    textTransform: p.textTransform,
    textUnderlineOffset: p.textUnderlineOffset,
    textUnderlinePosition: p.textUnderlinePosition,
    //
    hyphens: p.hyphens,
    letterSpacing: p.letterSpacing,
    lineBreak: p.lineBreak,
    lineHeight: p.lineHeight,
    lineHeightStep: p.lineHeightStep,
    //animation
    animation: p.animation,
    animationName: p.animationName,
    animationDuration: p.animationDuration,
    animationDelay: p.animationDelay,
    animationDirection: p.animationDirection,
    animationFillMode: p.animationFillMode,
    animationIterationCount: p.animationIterationCount,
    animationPlayState: p.animationPlayState,
    animationTimingFunction: p.animationTimingFunction,
    transition: p.transition,
    transitionDelay: p.transitionDelay,
    transitionDuration: p.transitionDuration,
    transitionProperty: p.transitionProperty,
    transitionTimingFunction: p.transitionTimingFunction,
  }))(allProps);

  return removeFalsyPropsFromObject(allParsedProps);
};
// CONVERT PROPS TO THEMED CSS VALUES..
const CONVERTERS = {
  getConverterFunction(cssPropKey) {
    let converter = null;
    const { MAP } = this;

    // get converter function for this CSS prop...
    for (const converterName in MAP) {
      if (Object.hasOwnProperty.call(MAP, converterName)) {
        // extract all prop name allowed with this converter ...
        const propsAllowed = MAP[converterName];
        // get convertert if this prop name is included ...
        if (inArray(propsAllowed, cssPropKey)) {
          converter = this[converterName];
          break;
        }
      }
    }
    if (!converter) converter = this.passDirectly;

    return converter;
  },
  MAP: {
    getSize: [
      "padding",
      "paddingX",
      "paddingY",
      "paddingTop",
      "paddingRight",
      "paddingBottom",
      "paddingLeft",
      "margin",
      "marginX",
      "marginY",
      "marginTop",
      "marginRight",
      "marginBottom",
      "marginLeft",
      "borderRadius",
    ],
    getTextSize: ["fontSize"],
    getColor: ["color", "backgroundColor", "borderColor"],
    getFontFamily: ["fontFamily"],
    getTransitionTime: ["transitionDuration", "transitionDelay"],
    getTransitionTimingFunction: ["transitionTimingFunction"],
  },
  passDirectly: a => String(a),
  getSize: (size, { SIZE: S }) => S.getSizeValue(size),
  getTextSize: (size, { TEXT: T }) => T.getFontSizeValue(size),
  getColor: (key, { COLOR: C }) => C.getColorValue(key),
  getFontFamily: (index, { FONT: F }) => F.getFontFamilyValue(index),
  getTransitionTime: (a, { TRANSITION: T }) => T.getTime(a),
  getTransitionTimingFunction: (a, { TRANSITION: T }) => T.getTiming(a),
};
const getPropsToWorkWith = allProps => {
  const { theme, UIProps, children, as, ...rest } = allProps;
  const propsToWorkWith = UIProps ? UIProps : rest;
  return propsToWorkWith;
};
const convertPropsObjectWithThemedValues = props => {
  const { theme } = props;
  const propsToWorkWith = getPropsToWorkWith(props);

  // extract CSS properties.
  const rawValues = EXTRACTOR({ ...propsToWorkWith, theme });

  // convert all raw values with calculated CSS values ...
  const valued = convertPropsRawValuesToThemedValues(rawValues, theme);

  return valued;
};
const convertPropsRawValuesToThemedValues = (props, theme) => {
  const _ = {};

  // foreach prop, convert raw value into CSS Themed value..
  for (const propKey in props) {
    if (Object.hasOwnProperty.call(props, propKey)) {
      // extract prop raw value and obtain converter function
      const rawValue = props[propKey];
      const converter = CONVERTERS.getConverterFunction(propKey);

      // if raw values is responsive values ...
      if (TYPE.isArray(rawValue)) continue;
      // if raw values is single values...
      _[propKey] = converter(rawValue, theme);
    }
  }

  return _;
};
const convertModifiersPropsToThemedValues = props => {
  const { theme } = props;
  const propsToWorkWith = getPropsToWorkWith(props);

  const modifiersRawValuesArray = (() => {
    const _ = [];
    for (const key in propsToWorkWith) {
      if (Object.hasOwnProperty.call(propsToWorkWith, key)) {
        const isModifier = String(key).indexOf("&") > -1;
        if (isModifier) {
          _.push({ name: key, props: propsToWorkWith[key] });
        }
      }
    }
    return _;
  })();

  if (modifiersRawValuesArray.length === 0) return null;

  const modifiersThemedValuesObject = (() => {
    const _ = {};
    modifiersRawValuesArray.forEach(mod => {
      const { name: modKey, props: modProps } = mod;
      _[modKey] = convertUIPropsToCSS({ ...modProps, theme });
    });
    return _;
  })();

  return modifiersThemedValuesObject;
};
const convertMediaQueriesPropsToThemedValues = props => {
  const { theme } = props;
  const propsToWorkWith = getPropsToWorkWith(props);

  let mediaQueriesHardcoded = {};
  let mediaQueriesArrayed = {};

  // media query hardcoded ...
  (() => {
    for (const key in propsToWorkWith) {
      if (Object.hasOwnProperty.call(propsToWorkWith, key)) {
        const isMediaQuery = key.indexOf("@media") > -1 && key.indexOf("@") === 0;
        if (isMediaQuery) {
          const mediaQueryKey = key;
          const mediaQueryProps = propsToWorkWith[key];
          mediaQueriesHardcoded[mediaQueryKey] = {
            ...mediaQueriesHardcoded[mediaQueryKey],
            ...mediaQueryProps,
          };
        }
      }
    }
  })();
  // media query from arrayed value on cssProp ...
  (() => {
    for (const key in propsToWorkWith) {
      if (Object.hasOwnProperty.call(propsToWorkWith, key)) {
        const isMediaQuery = TYPE.isArray(propsToWorkWith[key]);
        if (isMediaQuery) {
          const propValues = propsToWorkWith[key];
          propValues.forEach((v, themeBreakpointIndex) => {
            if (inArray([null, undefined, ""])) return;
            const mediaQueryKey = theme.BP.up(themeBreakpointIndex);
            const mediaQueryProps = {
              [key]: v,
            };
            mediaQueriesArrayed[mediaQueryKey] = {
              ...mediaQueriesArrayed[mediaQueryKey],
              ...mediaQueryProps,
            };
          });
        }
      }
    }
  })();

  const merged = (() => {
    const allMediaQueriesKeys = [
      ...Object.keys(mediaQueriesHardcoded),
      ...Object.keys(mediaQueriesArrayed),
    ];
    const _ = {};

    allMediaQueriesKeys.forEach(mqKey => {
      _[mqKey] = {
        ...mediaQueriesHardcoded[mqKey],
        ...mediaQueriesArrayed[mqKey],
      };
    });

    return _;
  })();

  const themed = (() => {
    const _ = {};
    for (const mediaQueryKey in merged) {
      if (Object.hasOwnProperty.call(merged, mediaQueryKey)) {
        const mediaQueryProps = merged[mediaQueryKey];
        _[mediaQueryKey] = convertUIPropsToCSS({ ...mediaQueryProps, theme });
      }
    }
    return _;
  })();

  return themed;
};

const convertUIPropsToCSS = props => {
  // CSS properties refered DIRECTLY to component DOM element
  const directCSS = convertPropsObjectWithThemedValues(props);
  // CSS "&" sub properties sets ( i.e. &.isOpen, &:hover, &:nth-child, ...)
  const modifiersCSS = convertModifiersPropsToThemedValues(props);
  // CSS responsive props , both "@media ..." and ARRAY CSS props value
  const mediaQueriesCSS = convertMediaQueriesPropsToThemedValues(props);

  const UIPropsThemed = removeFalsyPropsFromObject({
    ...directCSS,
    ...(modifiersCSS || {}),
    ...(mediaQueriesCSS || {}),
  });
  return UIPropsThemed;
};
const Box = styled.div(convertUIPropsToCSS);

export default Box;
