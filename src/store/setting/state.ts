import { SettingState, SettingDefaultState } from './interface'

// Initial Setting State
//edit this to change to change the primary and secondary color of the theme
export const initialState: SettingState = {
  "saveLocal": "sessionStorage",
  "storeKey": "socialvsetting-react",
  "setting": {
    "app_name": {
      "value": "Impactshaala"
    },
    "theme_scheme_direction": {
      "value": "ltr"
    },
    "theme_scheme": {
      "value": "light"
    },
    "theme_style_appearance": {
      "value": [
        "theme-default"
      ]
    },
    //edit this to change to change the primary and secondary color of the theme
    "theme_color": {
      "colors": {
        "--{{prefix}}primary": "#003049",
        "--{{prefix}}prussianblue": "#003049",
        "--{{prefix}}sunrays": "#FCBF49",
        "--{{prefix}}tangerine": "#F77F00",
        "--{{prefix}}punchred": "#D62828",
        "--{{prefix}}coolblack": "#021621",
        "--{{prefix}}info": "#d592ff"
      },
      "value": "theme-color-default"
    },
    "theme_transition": {
      "value": null
    },
    "theme_font_size": {
      "value": "theme-fs-md"
    },
    "page_layout": {
      "value": "container-fluid"
    },
    "header_navbar": {
      "value": "default"
    },
    "header_banner": {
      "value": "default"
    },
    "sidebar_color": {
      "value": "sidebar-white"
    },
    "sidebar_type": {
      "value": ['sidebar-soft']
    },
    "sidebar_menu_style": {
      "value": "navs-rounded-all"
    },
    "footer": {
      "value": "default"
    },
    "body_font_family": {
      "value": "Work Sans"
    },
    "heading_font_family": {
      "value": "Poppins"
    }
  }
};

// Default Setting State
export const defaultState: SettingDefaultState = {
  "saveLocal": "sessionStorage",
  "storeKey": "socialvsetting-react",
  "setting": {
    app_name: {
      target: '[data-setting="app_name"]',
      choices: [],
      type: "text",
      value: "SocialV"
    },
    theme_scheme_direction: {
      target: "html",
      choices: ["ltr", "rtl"],
      type: "layout_design",
      value: "ltr",
    },
    theme_scheme: {
      target: "body",
      choices: ["light", "dark", "auto"],
      type: "layout_design",
      value: "light",
    },
    theme_style_appearance: {
      target: "body",
      choices: [
        "theme-default",
        "theme-flat",
        "theme-bordered",
        "theme-sharp",
      ],
      type: "layout_design",
      value: ["theme-default"],
    },
    theme_color: {
      target: "body",
      choices: [
        "theme-color-blue",
        "theme-color-red",
        "theme-color-cyan",
        "theme-color-purple",
        "theme-color-green",
        "theme-color-default",
      ],
      type: "default",
      colors: {
        "--{{prefix}}primary": "#50b5ff",
        "--{{prefix}}info": "#d592ff",
      },
      value: "theme-color-default",
    },
    theme_transition: {
      target: "body",
      choices: ["theme-without-animation", "theme-with-animation"],
      type: "layout_design",
      value: null,
    },
    theme_font_size: {
      target: "html",
      choices: ["theme-fs-sm", "theme-fs-md", "theme-fs-lg"],
      type: "layout_design",
      value: "theme-fs-md",
    },
    page_layout: {
      target: "#page_layout",
      choices: ["container", "container-fluid"],
      type: "layout_design",
      value: "container-fluid",
    },
    header_navbar: {
      target: ".iq-navbar",
      choices: [
        "default",
        "fixed",
        "navs-sticky",
        "nav-glass",
        "navs-transparent",
        "boxed",
        "hidden",
      ],
      type: "layout_design",
      value: "default",
    },
    // card_style: {
    //   target: "body",
    //   choices: ["card-default", "card-glass", "card-transparent"],
    //   type: "layout_design",
    //   value: "card-default",
    // },
    header_banner: {
      target: ".iq-banner",
      choices: ["default", "navs-bg-color", "hide"],
      type: "layout_design",
      value: "default",
    },
    sidebar_color: {
      target: '[data-toggle="main-sidebar"]',
      choices: [
        "sidebar-white",
        "sidebar-dark",
        "sidebar-color",
        "sidebar-transparent",
      ],
      type: "layout_design",
      value: "sidebar-white",
    },
    sidebar_type: {
      target: '[data-toggle="main-sidebar"]',
      choices: ["sidebar-hover", "sidebar-mini", "sidebar-soft"],
      type: "layout_design",
      value: ['sidebar-soft'],
    },
    // sidebar_show: {
    //   target: '[data-toggle="main-sidebar"]',
    //   choices: ["sidebar-none"],
    //   type: "defaultChecked",
    //   value: [],
    // },
    // navbar_show: {
    //   target: '[data-toggle="main-navbar"]',
    //   choices: ["iq-navbar-none"],
    //   type: "defaultChecked",
    //   value: [],
    // },
    sidebar_menu_style: {
      target: '[data-toggle="main-sidebar"]',
      choices: [
        "navs-rounded",
        "navs-rounded-all",
        "navs-pill",
        "navs-pill-all"
      ],
      type: "layout_design",
      value: "navs-rounded-all",
    },
    footer: {
      target: ".footer",
      choices: ["sticky", "default"],
      type: "layout_design",
      value: "default",
    },
    body_font_family: {
      target: "body",
      choices: [],
      type: "variable",
      value: "Work Sans",
    },
    heading_font_family: {
      target: "heading",
      choices: [],
      type: "variable",
      value: "Poppins",
    },
  }
}