import "./Home.css";
import HomeViewer from "../../components/HomePageSection/HomeViewer/HomeViewer";
import HeaderSwitch from "../../components/HeaderSwitch/HeaderSwitch";
import ChatBot from "../../components/ChatBot/ChatBot";
import { useEffect } from "react";

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <HeaderSwitch />
      <HomeViewer />
      <ChatBot />
    </>
  );
}

export default Home;
