import { c as create_ssr_component, b as compute_rest_props, d as spread, e as escape_attribute_value, f as escape_object, g as escape, h as add_attribute, j as add_classes, v as validate_component } from "../../../../../../chunks/index.js";
const ChevronDown = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let labelled;
  let attributes;
  let $$restProps = compute_rest_props($$props, ["size", "title"]);
  let { size = 16 } = $$props;
  let { title = void 0 } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0)
    $$bindings.title(title);
  labelled = $$props["aria-label"] || $$props["aria-labelledby"] || title;
  attributes = {
    "aria-hidden": labelled ? void 0 : true,
    role: labelled ? "img" : void 0,
    focusable: Number($$props["tabindex"]) === 0 ? true : void 0
  };
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { viewBox: "0 0 32 32" },
      { fill: "currentColor" },
      { preserveAspectRatio: "xMidYMid meet" },
      { width: escape_attribute_value(size) },
      { height: escape_attribute_value(size) },
      escape_object(attributes),
      escape_object($$restProps)
    ],
    {}
  )}>${title ? `<title>${escape(title)}</title>` : ``}<path d="${"M16 22L6 12 7.4 10.6 16 19.2 24.6 10.6 26 12z"}"></path></svg>`;
});
const ChevronDown$1 = ChevronDown;
const Grid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let props;
  let $$restProps = compute_rest_props($$props, [
    "as",
    "condensed",
    "narrow",
    "fullWidth",
    "noGutter",
    "noGutterLeft",
    "noGutterRight",
    "padding"
  ]);
  let { as = false } = $$props;
  let { condensed = false } = $$props;
  let { narrow = false } = $$props;
  let { fullWidth = false } = $$props;
  let { noGutter = false } = $$props;
  let { noGutterLeft = false } = $$props;
  let { noGutterRight = false } = $$props;
  let { padding = false } = $$props;
  if ($$props.as === void 0 && $$bindings.as && as !== void 0)
    $$bindings.as(as);
  if ($$props.condensed === void 0 && $$bindings.condensed && condensed !== void 0)
    $$bindings.condensed(condensed);
  if ($$props.narrow === void 0 && $$bindings.narrow && narrow !== void 0)
    $$bindings.narrow(narrow);
  if ($$props.fullWidth === void 0 && $$bindings.fullWidth && fullWidth !== void 0)
    $$bindings.fullWidth(fullWidth);
  if ($$props.noGutter === void 0 && $$bindings.noGutter && noGutter !== void 0)
    $$bindings.noGutter(noGutter);
  if ($$props.noGutterLeft === void 0 && $$bindings.noGutterLeft && noGutterLeft !== void 0)
    $$bindings.noGutterLeft(noGutterLeft);
  if ($$props.noGutterRight === void 0 && $$bindings.noGutterRight && noGutterRight !== void 0)
    $$bindings.noGutterRight(noGutterRight);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  props = {
    ...$$restProps,
    class: [
      $$restProps.class,
      "bx--grid",
      condensed && "bx--grid--condensed",
      narrow && "bx--grid--narrow",
      fullWidth && "bx--grid--full-width",
      noGutter && "bx--no-gutter",
      noGutterLeft && "bx--no-gutter--left",
      noGutterRight && "bx--no-gutter--right",
      padding && "bx--row-padding"
    ].filter(Boolean).join(" ")
  };
  return `${as ? `${slots.default ? slots.default({ props }) : ``}` : `<div${spread([escape_object(props)], {})}>${slots.default ? slots.default({}) : ``}</div>`}`;
});
const Grid$1 = Grid;
const Row = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let props;
  let $$restProps = compute_rest_props($$props, ["as", "condensed", "narrow", "noGutter", "noGutterLeft", "noGutterRight", "padding"]);
  let { as = false } = $$props;
  let { condensed = false } = $$props;
  let { narrow = false } = $$props;
  let { noGutter = false } = $$props;
  let { noGutterLeft = false } = $$props;
  let { noGutterRight = false } = $$props;
  let { padding = false } = $$props;
  if ($$props.as === void 0 && $$bindings.as && as !== void 0)
    $$bindings.as(as);
  if ($$props.condensed === void 0 && $$bindings.condensed && condensed !== void 0)
    $$bindings.condensed(condensed);
  if ($$props.narrow === void 0 && $$bindings.narrow && narrow !== void 0)
    $$bindings.narrow(narrow);
  if ($$props.noGutter === void 0 && $$bindings.noGutter && noGutter !== void 0)
    $$bindings.noGutter(noGutter);
  if ($$props.noGutterLeft === void 0 && $$bindings.noGutterLeft && noGutterLeft !== void 0)
    $$bindings.noGutterLeft(noGutterLeft);
  if ($$props.noGutterRight === void 0 && $$bindings.noGutterRight && noGutterRight !== void 0)
    $$bindings.noGutterRight(noGutterRight);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  props = {
    ...$$restProps,
    class: [
      $$restProps.class,
      "bx--row",
      condensed && "bx--row--condensed",
      narrow && "bx--row--narrow",
      noGutter && "bx--no-gutter",
      noGutterLeft && "bx--no-gutter--left",
      noGutterRight && "bx--no-gutter--right",
      padding && "bx--row-padding"
    ].filter(Boolean).join(" ")
  };
  return `${as ? `${slots.default ? slots.default({ props }) : ``}` : `<div${spread([escape_object(props)], {})}>${slots.default ? slots.default({}) : ``}</div>`}`;
});
const Row$1 = Row;
const Column = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let columnClass;
  let props;
  let $$restProps = compute_rest_props($$props, [
    "as",
    "noGutter",
    "noGutterLeft",
    "noGutterRight",
    "padding",
    "aspectRatio",
    "sm",
    "md",
    "lg",
    "xlg",
    "max"
  ]);
  let { as = false } = $$props;
  let { noGutter = false } = $$props;
  let { noGutterLeft = false } = $$props;
  let { noGutterRight = false } = $$props;
  let { padding = false } = $$props;
  let { aspectRatio = void 0 } = $$props;
  let { sm = void 0 } = $$props;
  let { md = void 0 } = $$props;
  let { lg = void 0 } = $$props;
  let { xlg = void 0 } = $$props;
  let { max = void 0 } = $$props;
  const breakpoints = ["sm", "md", "lg", "xlg", "max"];
  if ($$props.as === void 0 && $$bindings.as && as !== void 0)
    $$bindings.as(as);
  if ($$props.noGutter === void 0 && $$bindings.noGutter && noGutter !== void 0)
    $$bindings.noGutter(noGutter);
  if ($$props.noGutterLeft === void 0 && $$bindings.noGutterLeft && noGutterLeft !== void 0)
    $$bindings.noGutterLeft(noGutterLeft);
  if ($$props.noGutterRight === void 0 && $$bindings.noGutterRight && noGutterRight !== void 0)
    $$bindings.noGutterRight(noGutterRight);
  if ($$props.padding === void 0 && $$bindings.padding && padding !== void 0)
    $$bindings.padding(padding);
  if ($$props.aspectRatio === void 0 && $$bindings.aspectRatio && aspectRatio !== void 0)
    $$bindings.aspectRatio(aspectRatio);
  if ($$props.sm === void 0 && $$bindings.sm && sm !== void 0)
    $$bindings.sm(sm);
  if ($$props.md === void 0 && $$bindings.md && md !== void 0)
    $$bindings.md(md);
  if ($$props.lg === void 0 && $$bindings.lg && lg !== void 0)
    $$bindings.lg(lg);
  if ($$props.xlg === void 0 && $$bindings.xlg && xlg !== void 0)
    $$bindings.xlg(xlg);
  if ($$props.max === void 0 && $$bindings.max && max !== void 0)
    $$bindings.max(max);
  columnClass = [sm, md, lg, xlg, max].map((breakpoint, i) => {
    const name = breakpoints[i];
    if (breakpoint === true) {
      return `bx--col-${name}`;
    } else if (typeof breakpoint === "number") {
      return `bx--col-${name}-${breakpoint}`;
    } else if (typeof breakpoint === "object") {
      let bp = [];
      if (typeof breakpoint.span === "number") {
        bp = [...bp, `bx--col-${name}-${breakpoint.span}`];
      } else if (breakpoint.span === true) {
        bp = [...bp, `bx--col-${name}`];
      }
      if (typeof breakpoint.offset === "number") {
        bp = [...bp, `bx--offset-${name}-${breakpoint.offset}`];
      }
      return bp.join(" ");
    }
  }).filter(Boolean).join(" ");
  props = {
    ...$$restProps,
    class: [
      $$restProps.class,
      columnClass,
      !columnClass && "bx--col",
      noGutter && "bx--no-gutter",
      noGutterLeft && "bx--no-gutter--left",
      noGutterRight && "bx--no-gutter--right",
      aspectRatio && `bx--aspect-ratio bx--aspect-ratio--${aspectRatio}`,
      padding && "bx--col-padding"
    ].filter(Boolean).join(" ")
  };
  return `${as ? `${slots.default ? slots.default({ props }) : ``}` : `<div${spread([escape_object(props)], {})}>${slots.default ? slots.default({}) : ``}</div>`}`;
});
const Column$1 = Column;
const ExpandableTile = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "expanded",
    "light",
    "tileMaxHeight",
    "tilePadding",
    "tileCollapsedIconText",
    "tileExpandedIconText",
    "tileExpandedLabel",
    "tileCollapsedLabel",
    "tabindex",
    "id",
    "ref"
  ]);
  let { expanded = false } = $$props;
  let { light = false } = $$props;
  let { tileMaxHeight = 0 } = $$props;
  let { tilePadding = 0 } = $$props;
  let { tileCollapsedIconText = "Interact to expand Tile" } = $$props;
  let { tileExpandedIconText = "Interact to collapse Tile" } = $$props;
  let { tileExpandedLabel = "" } = $$props;
  let { tileCollapsedLabel = "" } = $$props;
  let { tabindex = "0" } = $$props;
  let { id = "ccs-" + Math.random().toString(36) } = $$props;
  let { ref = null } = $$props;
  let refAbove = null;
  if ($$props.expanded === void 0 && $$bindings.expanded && expanded !== void 0)
    $$bindings.expanded(expanded);
  if ($$props.light === void 0 && $$bindings.light && light !== void 0)
    $$bindings.light(light);
  if ($$props.tileMaxHeight === void 0 && $$bindings.tileMaxHeight && tileMaxHeight !== void 0)
    $$bindings.tileMaxHeight(tileMaxHeight);
  if ($$props.tilePadding === void 0 && $$bindings.tilePadding && tilePadding !== void 0)
    $$bindings.tilePadding(tilePadding);
  if ($$props.tileCollapsedIconText === void 0 && $$bindings.tileCollapsedIconText && tileCollapsedIconText !== void 0)
    $$bindings.tileCollapsedIconText(tileCollapsedIconText);
  if ($$props.tileExpandedIconText === void 0 && $$bindings.tileExpandedIconText && tileExpandedIconText !== void 0)
    $$bindings.tileExpandedIconText(tileExpandedIconText);
  if ($$props.tileExpandedLabel === void 0 && $$bindings.tileExpandedLabel && tileExpandedLabel !== void 0)
    $$bindings.tileExpandedLabel(tileExpandedLabel);
  if ($$props.tileCollapsedLabel === void 0 && $$bindings.tileCollapsedLabel && tileCollapsedLabel !== void 0)
    $$bindings.tileCollapsedLabel(tileCollapsedLabel);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  return `
<button${spread(
    [
      { type: "button" },
      { id: escape_attribute_value(id) },
      {
        "aria-expanded": escape_attribute_value(expanded)
      },
      {
        tabindex: escape_attribute_value(tabindex)
      },
      {
        title: escape_attribute_value(expanded ? tileExpandedIconText : tileCollapsedIconText)
      },
      escape_object($$restProps),
      {
        style: escape_attribute_value(expanded ? $$restProps.style : `${$$restProps.style}; max-height: ${tileMaxHeight + tilePadding}px`)
      }
    ],
    {
      classes: "bx--tile bx--tile--expandable " + (expanded ? "bx--tile--is-expanded" : "") + " " + (light ? "bx--tile--light" : "")
    }
  )}${add_attribute("this", ref, 0)}><div><div${add_classes("bx--tile-content".trim())}${add_attribute("this", refAbove, 0)}><span${add_classes("bx--tile-content__above-the-fold".trim())}>${slots.above ? slots.above({}) : ``}</span></div>
    <div${add_classes("bx--tile__chevron".trim())}><span>${escape(expanded ? tileExpandedLabel : tileCollapsedLabel)}</span>
      ${validate_component(ChevronDown$1, "ChevronDown").$$render($$result, {}, {}, {})}</div>
    <div${add_classes("bx--tile-content".trim())}><span${add_classes("bx--tile-content__below-the-fold".trim())}>${slots.below ? slots.below({}) : ``}</span></div></div></button>`;
});
const ExpandableTile$1 = ExpandableTile;
const SinglStat = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { label } = $$props;
  let { value } = $$props;
  if ($$props.label === void 0 && $$bindings.label && label !== void 0)
    $$bindings.label(label);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  return `${validate_component(Grid$1, "Grid").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(Row$1, "Row").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Column$1, "Column").$$render($$result, {}, {}, {
            default: () => {
              return `${escape(label)}`;
            }
          })}`;
        }
      })}
    ${validate_component(Row$1, "Row").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Column$1, "Column").$$render($$result, {}, {}, {
            default: () => {
              return `${escape(value)}`;
            }
          })}`;
        }
      })}`;
    }
  })}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<h2>Stats for ${escape(data.playerStats.name)}</h2>


${validate_component(ExpandableTile$1, "ExpandableTile").$$render($$result, {}, {}, {
    below: () => {
      return `<div slot="${"below"}">${validate_component(Grid$1, "Grid").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Row$1, "Row").$$render($$result, {}, {}, {
            default: () => {
              return `${validate_component(Column$1, "Column").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(SinglStat, "SingleStat").$$render(
                    $$result,
                    {
                      label: "HAT TRICKS",
                      value: data.playerStats.hatTricks
                    },
                    {},
                    {}
                  )}`;
                }
              })}
        ${validate_component(Column$1, "Column").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(SinglStat, "SingleStat").$$render(
                    $$result,
                    {
                      label: "PLUS MINUS",
                      value: data.playerStats.plusMinus
                    },
                    {},
                    {}
                  )}`;
                }
              })}
        ${validate_component(Column$1, "Column").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(SinglStat, "SingleStat").$$render(
                    $$result,
                    {
                      label: "GAME WINNERS",
                      value: data.playerStats.gameWinners
                    },
                    {},
                    {}
                  )}`;
                }
              })}`;
            }
          })}`;
        }
      })}</div>`;
    },
    above: () => {
      return `<div slot="${"above"}">${validate_component(Grid$1, "Grid").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Row$1, "Row").$$render($$result, {}, {}, {
            default: () => {
              return `${validate_component(Column$1, "Column").$$render($$result, { sm: 1, md: 1 }, {}, {
                default: () => {
                  return `${validate_component(SinglStat, "SingleStat").$$render(
                    $$result,
                    {
                      label: "GAMES",
                      value: data.playerStats.gamesPlayed
                    },
                    {},
                    {}
                  )}`;
                }
              })}
        ${validate_component(Column$1, "Column").$$render($$result, { sm: 3, md: 5 }, {}, {
                default: () => {
                  return `${validate_component(SinglStat, "SingleStat").$$render(
                    $$result,
                    {
                      label: "RECORD",
                      value: data.playerStats.wins + "-" + data.playerStats.losses + "-" + data.playerStats.otl
                    },
                    {},
                    {}
                  )}`;
                }
              })}`;
            }
          })}
      ${validate_component(Row$1, "Row").$$render($$result, {}, {}, {
            default: () => {
              return `${validate_component(Column$1, "Column").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(SinglStat, "SingleStat").$$render(
                    $$result,
                    {
                      label: "POINTS",
                      value: data.playerStats.points
                    },
                    {},
                    {}
                  )}`;
                }
              })}
        ${validate_component(Column$1, "Column").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(SinglStat, "SingleStat").$$render(
                    $$result,
                    {
                      label: "GOALS",
                      value: data.playerStats.goals
                    },
                    {},
                    {}
                  )}`;
                }
              })}
        ${validate_component(Column$1, "Column").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(SinglStat, "SingleStat").$$render(
                    $$result,
                    {
                      label: "ASSISTS",
                      value: data.playerStats.assists
                    },
                    {},
                    {}
                  )}`;
                }
              })}`;
            }
          })}`;
        }
      })}</div>`;
    }
  })}

${validate_component(ExpandableTile$1, "ExpandableTile").$$render($$result, {}, {}, {
    below: () => {
      return `<div slot="${"below"}">${validate_component(Grid$1, "Grid").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Row$1, "Row").$$render($$result, {}, {}, {
            default: () => {
              return `${validate_component(Column$1, "Column").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(SinglStat, "SingleStat").$$render(
                    $$result,
                    {
                      label: "Breakaways",
                      value: data.playerStats.breakaways
                    },
                    {},
                    {}
                  )}`;
                }
              })}
        ${validate_component(Column$1, "Column").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(SinglStat, "SingleStat").$$render(
                    $$result,
                    {
                      label: "Breakaway Goals",
                      value: data.playerStats.breakawayGoals
                    },
                    {},
                    {}
                  )}`;
                }
              })}
        ${validate_component(Column$1, "Column").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(SinglStat, "SingleStat").$$render(
                    $$result,
                    {
                      label: "Breakaway %",
                      value: data.playerStats.breakawayPct
                    },
                    {},
                    {}
                  )}`;
                }
              })}`;
            }
          })}`;
        }
      })}</div>`;
    },
    above: () => {
      return `<div slot="${"above"}"><p><b>Breakaways:</b> ${escape(data.playerStats.breakawayGoals)}-${escape(data.playerStats.breakaways)}</p></div>`;
    }
  })}

${validate_component(ExpandableTile$1, "ExpandableTile").$$render($$result, {}, {}, {
    below: () => {
      return `<div slot="${"below"}">${validate_component(Grid$1, "Grid").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Row$1, "Row").$$render($$result, {}, {}, {
            default: () => {
              return `${validate_component(Column$1, "Column").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(SinglStat, "SingleStat").$$render(
                    $$result,
                    {
                      label: "Drawn",
                      value: data.playerStats.penaltiesDrawn
                    },
                    {},
                    {}
                  )}`;
                }
              })}
        ${validate_component(Column$1, "Column").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(SinglStat, "SingleStat").$$render(
                    $$result,
                    {
                      label: "Attempted",
                      value: data.playerStats.penaltyAttempts
                    },
                    {},
                    {}
                  )}`;
                }
              })}
        ${validate_component(Column$1, "Column").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(SinglStat, "SingleStat").$$render(
                    $$result,
                    {
                      label: "Goals",
                      value: data.playerStats.penaltyGoals
                    },
                    {},
                    {}
                  )}`;
                }
              })}
        ${validate_component(Column$1, "Column").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(SinglStat, "SingleStat").$$render(
                    $$result,
                    {
                      label: "Penalty Shot %",
                      value: data.playerStats.peanltyPct
                    },
                    {},
                    {}
                  )}`;
                }
              })}`;
            }
          })}`;
        }
      })}</div>`;
    },
    above: () => {
      return `<div slot="${"above"}"><p><b>Penalty Shots:</b> ${escape(data.playerStats.penaltyGoals)}-${escape(data.playerStats.penaltyAttempts)}</p></div>`;
    }
  })}

${validate_component(ExpandableTile$1, "ExpandableTile").$$render($$result, {}, {}, {
    below: () => {
      return `<div slot="${"below"}">${validate_component(Grid$1, "Grid").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Row$1, "Row").$$render($$result, {}, {}, {
            default: () => {
              return `${validate_component(Column$1, "Column").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(SinglStat, "SingleStat").$$render(
                    $$result,
                    {
                      label: "Total",
                      value: data.playerStats.faceoffs
                    },
                    {},
                    {}
                  )}`;
                }
              })}
        ${validate_component(Column$1, "Column").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(SinglStat, "SingleStat").$$render(
                    $$result,
                    {
                      label: "Won",
                      value: data.playerStats.faceoffsWon
                    },
                    {},
                    {}
                  )}`;
                }
              })}
        ${validate_component(Column$1, "Column").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(SinglStat, "SingleStat").$$render(
                    $$result,
                    {
                      label: "Lost",
                      value: data.playerStats.faceoffsLost
                    },
                    {},
                    {}
                  )}`;
                }
              })}
        ${validate_component(Column$1, "Column").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(SinglStat, "SingleStat").$$render(
                    $$result,
                    {
                      label: "Faceoff %",
                      value: data.playerStats.faceoffPct
                    },
                    {},
                    {}
                  )}`;
                }
              })}`;
            }
          })}`;
        }
      })}</div>`;
    },
    above: () => {
      return `<div slot="${"above"}"><p><b>Faceoffs:</b> ${escape(data.playerStats.faceoffPct)}</p></div>`;
    }
  })}

${validate_component(ExpandableTile$1, "ExpandableTile").$$render($$result, {}, {}, {
    below: () => {
      return `<div slot="${"below"}">${validate_component(Grid$1, "Grid").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Row$1, "Row").$$render($$result, {}, {}, {
            default: () => {
              return `${validate_component(Column$1, "Column").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(SinglStat, "SingleStat").$$render(
                    $$result,
                    {
                      label: "TOTAL",
                      value: data.playerStats.shots
                    },
                    {},
                    {}
                  )}`;
                }
              })}
        ${validate_component(Column$1, "Column").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(SinglStat, "SingleStat").$$render(
                    $$result,
                    {
                      label: "ON NET",
                      value: data.playerStats.shotsOnNetPct
                    },
                    {},
                    {}
                  )}`;
                }
              })}
        ${validate_component(Column$1, "Column").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(SinglStat, "SingleStat").$$render(
                    $$result,
                    {
                      label: "PER GAME",
                      value: data.playerStats.shotsPerGame
                    },
                    {},
                    {}
                  )}`;
                }
              })}
        ${validate_component(Column$1, "Column").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(SinglStat, "SingleStat").$$render(
                    $$result,
                    {
                      label: "SHOOTING %",
                      value: data.playerStats.shotPct
                    },
                    {},
                    {}
                  )}`;
                }
              })}`;
            }
          })}`;
        }
      })}</div>`;
    },
    above: () => {
      return `<div slot="${"above"}"><p><b>Shooting:</b> ${escape(data.playerStats.shotPct)}%</p></div>`;
    }
  })}

${validate_component(ExpandableTile$1, "ExpandableTile").$$render($$result, {}, {}, {
    below: () => {
      return `<div slot="${"below"}">${validate_component(Grid$1, "Grid").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(Row$1, "Row").$$render($$result, {}, {}, {
            default: () => {
              return `${validate_component(Column$1, "Column").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(SinglStat, "SingleStat").$$render(
                    $$result,
                    {
                      label: "TOTAL",
                      value: data.playerStats.passAttempts
                    },
                    {},
                    {}
                  )}`;
                }
              })}
        ${validate_component(Column$1, "Column").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(SinglStat, "SingleStat").$$render(
                    $$result,
                    {
                      label: "PASSES",
                      value: data.playerStats.passes
                    },
                    {},
                    {}
                  )}`;
                }
              })}
        ${validate_component(Column$1, "Column").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(SinglStat, "SingleStat").$$render(
                    $$result,
                    {
                      label: "SAUCERS",
                      value: data.playerStats.saucers
                    },
                    {},
                    {}
                  )}`;
                }
              })}
        ${validate_component(Column$1, "Column").$$render($$result, {}, {}, {
                default: () => {
                  return `${validate_component(SinglStat, "SingleStat").$$render(
                    $$result,
                    {
                      label: "PASSING %",
                      value: data.playerStats.passPct
                    },
                    {},
                    {}
                  )}`;
                }
              })}`;
            }
          })}`;
        }
      })}</div>`;
    },
    above: () => {
      return `<div slot="${"above"}"><p><b>Passing:</b> ${escape(data.playerStats.passPct)}%</p></div>`;
    }
  })}`;
});
export {
  Page as default
};
