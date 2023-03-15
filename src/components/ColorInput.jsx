export default ({ id, index, value, placeholder, onInput, jscolorData, className }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="mb-2">
        Hex Color {index + 1}
      </label>
      <RawColorInput jscolorData={jscolorData} id={id} value={value} placeholder={placeholder} onInput={onInput} className={`mb-3 ${className}`} />
    </div>
  );
}

export const RawColorInput = ({ id, value, placeholder, onInput, jscolorData, className }) => {
  return (
    <>
      <input className={`transition ease-in-out text-lg bg-gray-800 text-gray-50 hover:bg-gray-700 focus:bg-gray-700 rounded-md py-2 ${className}`} data-jscolor={JSON.stringify({ preset: 'small dark', position: 'bottom', ...jscolorData })} id={id} value={value} placeholder={placeholder} onInput={onInput}/>
    </>
  );
}
