import { useMediaQuery } from "react-responsive";
import AltHeader from "./AlternativeHeader/AltHeader";
import HeaderMobile from "./HeaderMobile/HeaderMobile";

const HeaderSwitch = () => {
  const isMobile = useMediaQuery({ maxWidth: 500 });

  return isMobile ? <HeaderMobile /> : <AltHeader />;
};

export default HeaderSwitch;
