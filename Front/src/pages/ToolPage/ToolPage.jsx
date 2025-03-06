/**
 * Pagina principale degli strumenti.
 * 
 * Questa pagina include i seguenti componenti:
 * - HeaderMobile: l'intestazione per dispositivi mobili.
 * - ToolGrid: la griglia degli strumenti.
 * - BottomDrawer: il cassetto inferiore.
 * - ChatBot: il chatbot.
 * 
 * Tutti i componenti sono avvolti dal provider ConfStringProvider per fornire il contesto delle stringhe di configurazione.
 * 
 * @component
 */
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
