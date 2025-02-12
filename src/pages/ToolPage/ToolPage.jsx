import BottomDrawer from "../../components/BottomDrawer/BottomDrawer";
import HeaderMobile from "../../components/HeaderMobile/HeaderMobile";
import ToolLayout from "../../components/ToolGrid/ToolLayout";
import ChatBot from "../../components/ChatBot/ChatBot";

const ToolPage = () => {
  return (
    <>
      <HeaderMobile />
      <BottomDrawer />
      <ToolLayout />
      <ChatBot />
    </>
  );
};

export default ToolPage;
