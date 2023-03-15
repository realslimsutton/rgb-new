export default ({ id, value, placeholder, onInput, className, big }) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="mb-2">
        Input Text
      </label>
      {big ?
        <RawTextAreaInput id={id} value={value} placeholder={placeholder} onInput={onInput} className={`mb-3 ${className}`} /> :
        <RawTextInput id={id} value={value} placeholder={placeholder} onInput={onInput} className={`mb-3 ${className}`} />
      }
    </div>
  );
}

export const RawTextInput = ({ id, value, placeholder, onInput, className }) => {
  return (
    <input className={`transition ease-in-out text-lg bg-gray-800 text-gray-50 hover:bg-gray-700 focus:bg-gray-700 rounded-md px-3 py-2 ${className}`} id={id} value={value} placeholder={placeholder} onInput={onInput}/>
  );
}

export const RawTextAreaInput = ({ id, value, placeholder, onInput, className }) => {
  return (
    <textarea className={`transition ease-in-out text-lg bg-gray-800 text-gray-50 hover:bg-gray-700 focus:bg-gray-700 rounded-md px-3 py-2 resize-y w-full h-32 ${className}`} id={id} value={value} placeholder={placeholder} onInput={onInput}/>
  );
}
