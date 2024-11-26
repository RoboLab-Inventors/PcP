import './HeaderLogo.css';
import logo from '../../../assets/logo.png';

const HeaderLogo = () => {
    return (
        <div className="header-logo">
            <img src={logo} alt="Logo" />
        </div>
    );
};

export default HeaderLogo;