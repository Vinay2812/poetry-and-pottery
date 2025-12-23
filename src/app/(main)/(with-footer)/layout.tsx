import { FooterContainer } from "@/features/layout";

export default function WithFooterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <FooterContainer />
    </>
  );
}
