import { c as create_ssr_component, d as compute_rest_props, e as spread, f as escape_attribute_value, g as escape_object, h as escape, j as add_attribute, v as validate_component, m as missing_component, b as subscribe, k as add_classes, l as createEventDispatcher, o as set_store_value, p as compute_slots } from "../../chunks/index.js";
import "firebase/auth";
import "../../chunks/firebase.js";
import { C as Close } from "../../chunks/Close.js";
import { w as writable } from "../../chunks/index2.js";
import { C as ChevronDown } from "../../chunks/ChevronDown.js";
const Menu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  )}>${title ? `<title>${escape(title)}</title>` : ``}<path d="${"M4 6H28V8H4zM4 24H28V26H4zM4 12H28V14H4zM4 18H28V20H4z"}"></path></svg>`;
});
const Menu$1 = Menu;
const shouldRenderHamburgerMenu = writable(false);
const isSideNavCollapsed = writable(false);
const isSideNavRail = writable(false);
const HamburgerMenu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["ariaLabel", "isOpen", "iconMenu", "iconClose", "ref"]);
  let { ariaLabel = void 0 } = $$props;
  let { isOpen = false } = $$props;
  let { iconMenu = Menu$1 } = $$props;
  let { iconClose = Close } = $$props;
  let { ref = null } = $$props;
  if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0)
    $$bindings.ariaLabel(ariaLabel);
  if ($$props.isOpen === void 0 && $$bindings.isOpen && isOpen !== void 0)
    $$bindings.isOpen(isOpen);
  if ($$props.iconMenu === void 0 && $$bindings.iconMenu && iconMenu !== void 0)
    $$bindings.iconMenu(iconMenu);
  if ($$props.iconClose === void 0 && $$bindings.iconClose && iconClose !== void 0)
    $$bindings.iconClose(iconClose);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  return `<button${spread(
    [
      { type: "button" },
      { title: escape_attribute_value(ariaLabel) },
      {
        "aria-label": escape_attribute_value(ariaLabel)
      },
      escape_object($$restProps)
    ],
    {
      classes: "bx--header__action bx--header__menu-trigger bx--header__menu-toggle"
    }
  )}${add_attribute("this", ref, 0)}>${validate_component((isOpen ? iconClose : iconMenu) || missing_component, "svelte:component").$$render($$result, { size: 20 }, {}, {})}</button>`;
});
const HamburgerMenu$1 = HamburgerMenu;
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let ariaLabel;
  let $$restProps = compute_rest_props($$props, [
    "expandedByDefault",
    "isSideNavOpen",
    "uiShellAriaLabel",
    "href",
    "company",
    "platformName",
    "persistentHamburgerMenu",
    "expansionBreakpoint",
    "ref",
    "iconMenu",
    "iconClose"
  ]);
  let $shouldRenderHamburgerMenu, $$unsubscribe_shouldRenderHamburgerMenu;
  $$unsubscribe_shouldRenderHamburgerMenu = subscribe(shouldRenderHamburgerMenu, (value) => $shouldRenderHamburgerMenu = value);
  let { expandedByDefault = true } = $$props;
  let { isSideNavOpen = false } = $$props;
  let { uiShellAriaLabel = void 0 } = $$props;
  let { href = void 0 } = $$props;
  let { company = void 0 } = $$props;
  let { platformName = "" } = $$props;
  let { persistentHamburgerMenu = false } = $$props;
  let { expansionBreakpoint = 1056 } = $$props;
  let { ref = null } = $$props;
  let { iconMenu = Menu$1 } = $$props;
  let { iconClose = Close } = $$props;
  let winWidth = void 0;
  if ($$props.expandedByDefault === void 0 && $$bindings.expandedByDefault && expandedByDefault !== void 0)
    $$bindings.expandedByDefault(expandedByDefault);
  if ($$props.isSideNavOpen === void 0 && $$bindings.isSideNavOpen && isSideNavOpen !== void 0)
    $$bindings.isSideNavOpen(isSideNavOpen);
  if ($$props.uiShellAriaLabel === void 0 && $$bindings.uiShellAriaLabel && uiShellAriaLabel !== void 0)
    $$bindings.uiShellAriaLabel(uiShellAriaLabel);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.company === void 0 && $$bindings.company && company !== void 0)
    $$bindings.company(company);
  if ($$props.platformName === void 0 && $$bindings.platformName && platformName !== void 0)
    $$bindings.platformName(platformName);
  if ($$props.persistentHamburgerMenu === void 0 && $$bindings.persistentHamburgerMenu && persistentHamburgerMenu !== void 0)
    $$bindings.persistentHamburgerMenu(persistentHamburgerMenu);
  if ($$props.expansionBreakpoint === void 0 && $$bindings.expansionBreakpoint && expansionBreakpoint !== void 0)
    $$bindings.expansionBreakpoint(expansionBreakpoint);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  if ($$props.iconMenu === void 0 && $$bindings.iconMenu && iconMenu !== void 0)
    $$bindings.iconMenu(iconMenu);
  if ($$props.iconClose === void 0 && $$bindings.iconClose && iconClose !== void 0)
    $$bindings.iconClose(iconClose);
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    isSideNavOpen = expandedByDefault && winWidth >= expansionBreakpoint && !persistentHamburgerMenu;
    ariaLabel = company ? `${company} ` : "" + (uiShellAriaLabel || $$props["aria-label"] || platformName);
    $$rendered = `

<header${add_attribute("aria-label", ariaLabel, 0)}${add_classes("bx--header".trim())}>${slots["skip-to-content"] ? slots["skip-to-content"]({}) : ``}
  ${$shouldRenderHamburgerMenu && winWidth < expansionBreakpoint || persistentHamburgerMenu ? `${validate_component(HamburgerMenu$1, "HamburgerMenu").$$render(
      $$result,
      {
        iconClose,
        iconMenu,
        isOpen: isSideNavOpen
      },
      {
        isOpen: ($$value) => {
          isSideNavOpen = $$value;
          $$settled = false;
        }
      },
      {}
    )}` : ``}
  <a${spread([{ href: escape_attribute_value(href) }, escape_object($$restProps)], { classes: "bx--header__name" })}${add_attribute("this", ref, 0)}>${company ? `<span${add_classes("bx--header__name--prefix".trim())}>${escape(company)}\xA0</span>` : ``}
    ${slots.platform ? slots.platform({}) : `${escape(platformName)}`}</a>
  ${slots.default ? slots.default({}) : ``}</header>`;
  } while (!$$settled);
  $$unsubscribe_shouldRenderHamburgerMenu();
  return $$rendered;
});
const Header$1 = Header;
const SideNav = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["fixed", "rail", "ariaLabel", "isOpen", "expansionBreakpoint"]);
  let $isSideNavRail, $$unsubscribe_isSideNavRail;
  let $isSideNavCollapsed, $$unsubscribe_isSideNavCollapsed;
  $$unsubscribe_isSideNavRail = subscribe(isSideNavRail, (value) => $isSideNavRail = value);
  $$unsubscribe_isSideNavCollapsed = subscribe(isSideNavCollapsed, (value) => $isSideNavCollapsed = value);
  let { fixed = false } = $$props;
  let { rail = false } = $$props;
  let { ariaLabel = void 0 } = $$props;
  let { isOpen = false } = $$props;
  let { expansionBreakpoint = 1056 } = $$props;
  const dispatch = createEventDispatcher();
  let winWidth = void 0;
  if ($$props.fixed === void 0 && $$bindings.fixed && fixed !== void 0)
    $$bindings.fixed(fixed);
  if ($$props.rail === void 0 && $$bindings.rail && rail !== void 0)
    $$bindings.rail(rail);
  if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0)
    $$bindings.ariaLabel(ariaLabel);
  if ($$props.isOpen === void 0 && $$bindings.isOpen && isOpen !== void 0)
    $$bindings.isOpen(isOpen);
  if ($$props.expansionBreakpoint === void 0 && $$bindings.expansionBreakpoint && expansionBreakpoint !== void 0)
    $$bindings.expansionBreakpoint(expansionBreakpoint);
  {
    dispatch(isOpen ? "open" : "close");
  }
  set_store_value(isSideNavCollapsed, $isSideNavCollapsed = !isOpen, $isSideNavCollapsed);
  set_store_value(isSideNavRail, $isSideNavRail = rail, $isSideNavRail);
  $$unsubscribe_isSideNavRail();
  $$unsubscribe_isSideNavCollapsed();
  return `

${!fixed ? `
  <div${add_attribute("style", isOpen && "z-index: 6000", 0)}${add_classes(("bx--side-nav__overlay " + (isOpen ? "bx--side-nav__overlay-active" : "")).trim())}></div>` : ``}
<nav${spread(
    [
      {
        "aria-hidden": escape_attribute_value(!isOpen)
      },
      {
        "aria-label": escape_attribute_value(ariaLabel)
      },
      escape_object($$restProps)
    ],
    {
      classes: "bx--side-nav__navigation bx--side-nav bx--side-nav--ux " + ((rail && winWidth >= expansionBreakpoint ? false : isOpen) ? "bx--side-nav--expanded" : "") + " " + (!isOpen && !rail ? "bx--side-nav--collapsed" : "") + " " + (rail ? "bx--side-nav--rail" : "")
    }
  )}>${slots.default ? slots.default({}) : ``}</nav>`;
});
const SideNav$1 = SideNav;
const SideNavItems = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `<ul${add_classes("bx--side-nav__items".trim())}>${slots.default ? slots.default({}) : ``}</ul>`;
});
const SideNavItems$1 = SideNavItems;
const SideNavMenu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["expanded", "text", "icon", "ref"]);
  let $$slots = compute_slots(slots);
  let { expanded = false } = $$props;
  let { text = void 0 } = $$props;
  let { icon = void 0 } = $$props;
  let { ref = null } = $$props;
  if ($$props.expanded === void 0 && $$bindings.expanded && expanded !== void 0)
    $$bindings.expanded(expanded);
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0)
    $$bindings.icon(icon);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  return `<li${add_classes(("bx--side-nav__item " + (icon ? "bx--side-nav__item--icon" : "")).trim())}><button${spread(
    [
      { type: "button" },
      {
        "aria-expanded": escape_attribute_value(expanded)
      },
      escape_object($$restProps)
    ],
    {
      classes: "bx--side-nav__submenu"
    }
  )}${add_attribute("this", ref, 0)}>${$$slots.icon || icon ? `<div${add_classes("bx--side-nav__icon".trim())}>${slots.icon ? slots.icon({}) : `
          ${validate_component(icon || missing_component, "svelte:component").$$render($$result, {}, {}, {})}
        `}</div>` : ``}
    <span${add_classes("bx--side-nav__submenu-title".trim())}>${escape(text)}</span>
    <div${add_classes("bx--side-nav__icon bx--side-nav__icon--small bx--side-nav__submenu-chevron".trim())}>${validate_component(ChevronDown, "ChevronDown").$$render($$result, {}, {}, {})}</div></button>
  <ul role="${"menu"}"${add_attribute("style", expanded && "max-height: none", 0)}${add_classes("bx--side-nav__menu".trim())}>${slots.default ? slots.default({}) : ``}</ul></li>`;
});
const SideNavMenu$1 = SideNavMenu;
const SideNavMenuItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["isSelected", "href", "text", "ref"]);
  let { isSelected = false } = $$props;
  let { href = void 0 } = $$props;
  let { text = void 0 } = $$props;
  let { ref = null } = $$props;
  if ($$props.isSelected === void 0 && $$bindings.isSelected && isSelected !== void 0)
    $$bindings.isSelected(isSelected);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.text === void 0 && $$bindings.text && text !== void 0)
    $$bindings.text(text);
  if ($$props.ref === void 0 && $$bindings.ref && ref !== void 0)
    $$bindings.ref(ref);
  return `<li${add_classes("bx--side-nav__menu-item".trim())}><a${spread(
    [
      {
        "aria-current": escape_attribute_value(isSelected ? "page" : void 0)
      },
      { href: escape_attribute_value(href) },
      escape_object($$restProps)
    ],
    {
      classes: "bx--side-nav__link"
    }
  )}${add_attribute("this", ref, 0)}><span${add_classes("bx--side-nav__link-text".trim())}>${slots.default ? slots.default({}) : `${escape(text)}`}</span></a></li>`;
});
const SideNavMenuItem$1 = SideNavMenuItem;
const Content = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let unsetLeftMargin;
  let $$restProps = compute_rest_props($$props, ["id"]);
  let $isSideNavRail, $$unsubscribe_isSideNavRail;
  let $isSideNavCollapsed, $$unsubscribe_isSideNavCollapsed;
  $$unsubscribe_isSideNavRail = subscribe(isSideNavRail, (value) => $isSideNavRail = value);
  $$unsubscribe_isSideNavCollapsed = subscribe(isSideNavCollapsed, (value) => $isSideNavCollapsed = value);
  let { id = "main-content" } = $$props;
  if ($$props.id === void 0 && $$bindings.id && id !== void 0)
    $$bindings.id(id);
  unsetLeftMargin = $isSideNavCollapsed && !$isSideNavRail;
  $$unsubscribe_isSideNavRail();
  $$unsubscribe_isSideNavCollapsed();
  return `<main${spread(
    [
      { id: escape_attribute_value(id) },
      escape_object($$restProps),
      {
        style: escape(unsetLeftMargin ? "margin-left: 0;" : "", true) + " " + escape($$restProps.style, true)
      }
    ],
    { classes: "bx--content" }
  )}>${slots.default ? slots.default({}) : ``}</main>`;
});
const Content$1 = Content;
const SkipToContent = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["href", "tabindex"]);
  let { href = "#main-content" } = $$props;
  let { tabindex = "0" } = $$props;
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.tabindex === void 0 && $$bindings.tabindex && tabindex !== void 0)
    $$bindings.tabindex(tabindex);
  return `<a${spread(
    [
      { href: escape_attribute_value(href) },
      {
        tabindex: escape_attribute_value(tabindex)
      },
      escape_object($$restProps)
    ],
    {
      classes: "bx--skip-to-content"
    }
  )}>${slots.default ? slots.default({}) : `Skip to main content`}</a>`;
});
const SkipToContent$1 = SkipToContent;
const white = "";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let isSideNavOpen = false;
  let $$settled;
  let $$rendered;
  do {
    $$settled = true;
    $$rendered = `

${validate_component(Header$1, "Header").$$render(
      $$result,
      {
        company: "KJs",
        persistentHamburgerMenu: true,
        platformName: "Sports+Gaming",
        isSideNavOpen
      },
      {
        isSideNavOpen: ($$value) => {
          isSideNavOpen = $$value;
          $$settled = false;
        }
      },
      {
        "skip-to-content": () => {
          return `${validate_component(SkipToContent$1, "SkipToContent").$$render($$result, {}, {}, {})}`;
        }
      }
    )}
${validate_component(SideNav$1, "SideNav").$$render(
      $$result,
      { isOpen: isSideNavOpen },
      {
        isOpen: ($$value) => {
          isSideNavOpen = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${validate_component(SideNavItems$1, "SideNavItems").$$render($$result, {}, {}, {
            default: () => {
              return `${validate_component(SideNavMenu$1, "SideNavMenu").$$render($$result, { text: "NHL24" }, {}, {
                default: () => {
                  return `${validate_component(SideNavMenuItem$1, "SideNavMenuItem").$$render(
                    $$result,
                    {
                      href: "/nhl24/search",
                      text: "Search For Clubs"
                    },
                    {},
                    {}
                  )}
      ${validate_component(SideNavMenu$1, "SideNavMenu").$$render($$result, { text: "CLUBS" }, {}, {
                    default: () => {
                      return `${validate_component(SideNavMenuItem$1, "SideNavMenuItem").$$render(
                        $$result,
                        {
                          href: "/nhl24/clubs/ps5/1620",
                          text: "Respect the Indian"
                        },
                        {},
                        {}
                      )}`;
                    }
                  })}
      ${validate_component(SideNavMenu$1, "SideNavMenu").$$render($$result, { text: "PLAYERS" }, {}, {
                    default: () => {
                      return `${validate_component(SideNavMenuItem$1, "SideNavMenuItem").$$render(
                        $$result,
                        {
                          href: "/nhl24/player-stats/ps5/kjdadada",
                          text: "kjdadada"
                        },
                        {},
                        {}
                      )}
        ${validate_component(SideNavMenuItem$1, "SideNavMenuItem").$$render(
                        $$result,
                        {
                          href: "/nhl24/player-stats/ps5/ritti34",
                          text: "ritti34"
                        },
                        {},
                        {}
                      )}
        ${validate_component(SideNavMenuItem$1, "SideNavMenuItem").$$render(
                        $$result,
                        {
                          href: "/nhl24/player-stats/ps5/pj26pj",
                          text: "pj26pj"
                        },
                        {},
                        {}
                      )}`;
                    }
                  })}`;
                }
              })}`;
            }
          })}`;
        }
      }
    )}


${validate_component(Content$1, "Content").$$render($$result, {}, {}, {
      default: () => {
        return `${slots.default ? slots.default({}) : ``}`;
      }
    })}
`;
  } while (!$$settled);
  return $$rendered;
});
export {
  Layout as default
};
