import { MdDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";

function ToggleMode({ toggleMode, handleToggleMode }) {
  return (
    <div className="toggle-mode">
      {toggleMode ? (
        <MdDarkMode
          title="Dark Mode"
          onClick={handleToggleMode}
        />
      ) : (
        <CiLight
          title="Light Mode"
          onClick={handleToggleMode}
        />
      )}
    </div>
  );
}

export default ToggleMode;
