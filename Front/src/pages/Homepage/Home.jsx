import "./Home.css";
import HomeViewer from "../../components/HomePageSection/HomeViewer/HomeViewer";
import HeaderSwitch from "../../components/HeaderSwitch/HeaderSwitch";
import ChatBot from "../../components/ChatBot/ChatBot";

function Home() {
  return (
    <>
      <HeaderSwitch />
      <HomeViewer />
      <ChatBot />
    </>
  );
}

export default Home;
