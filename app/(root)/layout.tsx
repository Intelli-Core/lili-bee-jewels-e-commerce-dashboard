import Header from "@/components/shared/Header";
import SideBar from "@/components/shared/SideBar";

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col w-full bg-muted/40">
      <SideBar />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <Header />
        {props.children}
      </div>
    </div>
  );
}
