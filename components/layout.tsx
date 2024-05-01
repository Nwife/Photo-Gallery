import { Fragment, ReactNode } from "react";
import { Header } from "./header";
import { Toolbar } from "./toolbar";

export function Layout(props: LayoutProps): JSX.Element {
  const { children } = props;

  return (
    <Fragment>
      <Toolbar />
      <Header />
      {children}
    </Fragment>
  );
}

export type LayoutProps = {
  children: ReactNode;
};
