import "./styles.css";
// import { FaPlus } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";

type HeaderProps = {
  size?: number;
  title?: string;
  leftIcon?: any;
  rightIcon?: any;
  onLeftIconClick?: Function;
  onRightIconClick?: Function;
};

const Header = ({
  size = 24,
  title = "",
  leftIcon,
  rightIcon,
  onLeftIconClick,
  onRightIconClick,
}: HeaderProps) => {
  return (
    <div className="header">
      {leftIcon !== null && (
        <div className="header__menu__left">
          <div
            className="header__icon"
            onClick={() => onLeftIconClick && onLeftIconClick()}
          >
            <div
              className="header__icon"
              onClick={() => onLeftIconClick && onLeftIconClick()}
            >
              {leftIcon || <BsThreeDotsVertical size={30} />}
            </div>
          </div>
        </div>
      )}
      {leftIcon !== null && <div className="header__spacer"></div>}
      {/* <div className="header__title">{title}</div> */}
      <div className="header__spacer"></div>
      {rightIcon !== null && (
        <div className="header__menu__right">
          <div
            className="header__icon"
            onClick={() => onRightIconClick && onRightIconClick()}
          >
            {rightIcon}
          </div>
        </div>
      )}
      {rightIcon === null && <div style={{ width: 64 }}></div>}
    </div>
  );
};

export default Header;
