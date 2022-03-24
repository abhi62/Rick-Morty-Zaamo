import Switch from "react-switch";

const SwitchButton = ({ checked, onCheckChange }) => {
  return (
    <div className="check-button-sec">
      <div className="check-btn-s">
        <div className="heading-cb-sec">
          <h1 className="heading-cb">
            <span>Characters</span>
          </h1>
        </div>

        <div className="switch-btn-sec">
          <Switch checked={checked} onChange={onCheckChange} />
        </div>

        <div className="heading-cb-sec">
          <h1 className="heading-cb">
            <span>Episodes</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default SwitchButton;
