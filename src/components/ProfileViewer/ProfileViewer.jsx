import "./ProfileViewer.css";
import ProfileInfo from "../profileInfo/ProfileInfo";
import ConfigurationsList from "../../components/configurationsList/ConfigurationsList";

const ProfileViewer = () => {
  return (
    <>
      <div className="profileViewerContainer">
        <div className="configurationsList">
          <ConfigurationsList />
        </div>
        <div className="profileInfo">
          <ProfileInfo />
        </div>
      </div>
    </>
  );
};

export default ProfileViewer;
