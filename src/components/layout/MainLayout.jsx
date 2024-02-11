import React, { useReducer } from "react";
import CommonHeader from "./CommonHeader";
import CommonFooter from "./CommonFooter";
import Topbar from "./Topbar";
import Head from "next/head";
import TeamState from "@/context/team/TeamState";
import PostState from "@/context/post/PostState";
import Script from "next/script";

const initalState = {
  isRightSidebarOpen: false,
  isleftSidebarOpen: false,
  isModal: false,
  activeMenu: "",
  activeSubMenu: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "TOGGLE_RIGHT_SIDEBAR":
      return {
        ...state,
        isRightSidebarOpen: !state.isRightSidebarOpen,
      };
    case "TOGGLE_LEFT_SIDEBAR":
      return {
        ...state,
        isleftSidebarOpen: !state.isleftSidebarOpen,
      };
    case "TOGGLE_SEARCH_MODAL":
      return {
        ...state,
        isModal: !state.isModal,
      };
    case "SET_SCROllY":
      return { ...state, scrollY: action.payload };
    case "TOGGLE_MENU":
      return {
        ...state,

        activeMenu: state.activeMenu === action.menu ? "" : action.menu,
        activeSubMenu:
          state.activeMenu === action.menu ? state.activeSubMenu : "",
      };
    case "TOGGLE_SUB_MENU":
      return {
        ...state,
        activeSubMenu:
          state.activeSubMenu === action.subMenu ? "" : action.subMenu,
      };
    case "TOGGLE_SIDEBAR_MENU":
      return {
        ...state,
        isSidebarOpenMenu: !state.isSidebarOpenMenu,
      };
    default:
      return state;
  }
}

function MainLayout({ children }) {
  const [state, dispatch] = useReducer(reducer, initalState);
  return (
    <>
      <Head>
        <title>AI Research For Good</title>
        {/* <meta property="og:title" content="AI Research For Good" key="title" /> */}
        <meta
          name="description"
          content="AI Research For Good is AI Research For Good Bloogs"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/assets/favicon-ai.ico" /> */}
        <link rel="icon" href="/assets/images/company-logo/black-logo.png" />
      </Head>

      <Script src="https://www.googletagmanager.com/gtag/js?id=G-X3HG5FNSXP" />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-X3HG5FNSXP');
        `}
      </Script>

      <TeamState>
        <PostState>
          <Topbar />
          <CommonHeader state={state} dispatch={dispatch} />
          {children}
          <CommonFooter />
        </PostState>
      </TeamState>
    </>
  );
}

export default MainLayout;
