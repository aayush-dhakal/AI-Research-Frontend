import CustomToastContainer from "@/utils/toastcontainer";
import "bootstrap/dist/css/bootstrap.css";

export const metadata = {
  title: "AI Research",
  description: "AI Research Blog",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <CustomToastContainer />
      </body>
    </html>
  );
}
