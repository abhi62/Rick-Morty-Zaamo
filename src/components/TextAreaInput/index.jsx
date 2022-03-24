const TextAreaInput = ({ name, placeholder, value, onChange, inputError }) => {
  return (
    <div className="ta-input-b">
      <div className="ta-input-section">
        <textarea
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          className="ta-text-input"
          rows={5}
        />
      </div>

      {inputError && (
        <div className="message-section">
          <h3 className="message">
            <span>{inputError}</span>
          </h3>
        </div>
      )}
    </div>
  );
};

export default TextAreaInput;
