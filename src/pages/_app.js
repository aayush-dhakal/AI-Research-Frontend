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
  const router = useRouter();
  const excludedPages = ["/index-2"]; // Add the paths of excluded pages here

  useEffect(() => {
    import("../../public//assets/js/bootstrap.bundle.min.js");
    import("../../public//assets/js/audio.js");
  }, []);

  if (excludedPages.includes(router.asPath)) {
    // Render the component without the layout for the excluded pages
    return (
      <>
        <Head>
          <title>AI Research For Good</title>
          <meta
            name="description"
            content="AI Research For Good is AI Research For Good Bloogs"
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/assets/favicon-ai.ico" />
        </Head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-X3HG5FNSXP"
        ></script>
        <script>
          window.dataLayer = window.dataLayer || []; function gtag()
          {dataLayer.push(arguments)}
          gtag('js', new Date()); gtag('config', 'G-X3HG5FNSXP');
        </script>
        <Component {...pageProps} />;
        <SmoothPageScroll />
      </>
    );
  }

  // Render the component with the layout for other pages
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
