import React from "react";
import "../../public//assets/css/bootstrap-icons.css";
import "../../public//assets/css/bootstrap.min.css";
import "../../public//assets/css/boxicons.min.css";
import "../../public//assets/css/swiper-bundle.css";
import "../../public//assets/css/slick-theme.css";
import "../../public//assets/css/slick.css";
import "../../public//assets/css/style.css";
import "node_modules/react-modal-video/css/modal-video.css";
import { useEffect } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { useRouter } from "next/router";
import Head from "next/head";
import SmoothPageScroll from "@/components/common/SmoothPageScroll";
import CustomToastContainer from "@/utils/toastcontainer";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    import("../../public//assets/js/bootstrap.bundle.min.js");
    import("../../public//assets/js/audio.js");
  }, []);

  return (
    <>
      <MainLayout>
        <CustomToastContainer />
        <Component {...pageProps} />
      </MainLayout>
      <SmoothPageScroll />
    </>
  );
}
