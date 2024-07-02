import "./globals.css";
import { AppProvider } from "./providers";
import { RouteChangeListener } from "@/utils/routeChanger";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <RouteChangeListener />
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}