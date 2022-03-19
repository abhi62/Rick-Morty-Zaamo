import { DotLoader } from "react-spinner-overlay";

const Spinner = () => {
  return (
    <div className="spinner-section">
      <div className="spinner-icon">
        <DotLoader
          overlayColor="#000000"
          color="#3d71d1"
          size={15}
          borderWidth={3}
        />
      </div>
    </div>
  );
};

export default Spinner;
