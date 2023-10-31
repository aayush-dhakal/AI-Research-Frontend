import CustomToastContainer from "@/utils/toastcontainer";

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
