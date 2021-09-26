import { FaFeatherAlt } from 'react-icons/fa';

function Header() {
    return (
        <div className="header">
            <h3 className="header-text">
                <FaFeatherAlt className="header-message-icon" />
                AlphaSense Message Borad
            </h3>
        </div>
    );
}

export default Header