const Input = ({
  name,
  placeholder,
  value,
  onChange,
  inputError,
  inputType,
}) => {
  return (
    <div className="input-b">
      <div className="input-section">
        <input
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          type={inputType ?? "text"}
          className="text-input"
          autoComplete={"off"}
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

export default Input;
