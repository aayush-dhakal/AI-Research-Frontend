import CustomToastContainer from "@/utils/toastcontainer";
import "bootstrap/dist/css/bootstrap.css";

export const metadata = {
  title: "AI Research For Good",
  description: "AI Research For Good is AI Research For Good Bloogs",
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
