const Button = ({ label }) => {
  return (
    <button className="btn">
      <h1 className="button-label">
        <span>{label}</span>
      </h1>
    </button>
  );
};

export default Button;
