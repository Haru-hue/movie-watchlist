import Head from "next/head";
import Link from "next/link";
import { ReactNode } from "react";

export const PageHeader = ({
  pageTitle,
  children,
}: {
  pageTitle: string;
  children: ReactNode;
}) => {
  return (
    <div>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content="" />
        <meta name="theme-color" content="#4545FE" />
        <Link prefetch={false} rel="icon" href="/favicon.ico" />
      </Head>
      {children}
    </div>
  );
};

export default PageHeader;
