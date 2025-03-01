// filepath: /c:/Users/Ema/Documents/0Personale/PcProject/PcProject/Front/src/pages/ToolPage/ToolPage.jsx
import HeaderMobile from "../../components/HeaderMobile/HeaderMobile";
import ToolGrid from "../../components/ToolGrid/ToolGrid";
import ChatBot from "../../components/ChatBot/ChatBot";
import BottomDrawer from "../../components/BottomDrawer/BottomDrawer";
import { ConfStringProvider } from "../../components/ToolGrid/EditComponent/ConfStringContext";

const ToolPage = () => {
  return (
    <ConfStringProvider>
      <HeaderMobile />
      <ToolGrid />
      <BottomDrawer />
      <ChatBot />
    </ConfStringProvider>
  );
};

export default ToolPage;