import Frame from "./components/Frame";
import SideNav from "./components/SideNav";
import TopWidgets from "./components/TopWidgets";
import Content from "./components/Content";

export default function App() {

  return (
    <div className="w-full h-screen bg-blue-300 flex overflow-hidden">
      <div className="relative w-full h-full">
        <Frame />
        <SideNav />
        <TopWidgets />
        <Content />
      </div>
    </div>
  );
}