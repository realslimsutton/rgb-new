export default (
  {
    id,
    colors,
    value,
    input,
    onInput,
    onDecrement,
    onIncrement,
    min,
    max,
    step
  }
) => {
  return (
    <RawNumberInput
      id={id}
      value={value}
      input={input}
      onInput={onInput}
      onDecrement={onDecrement}
      onIncrement={onIncrement}
      min={min}
      max={max}
      step={step}
    />
  );
}

export const RawNumberInput = (
  {
    id,
    value,
    input,
    onInput,
    onDecrement,
    onIncrement,
    min,
    max,
    step
  }
) => {
  return (
    <>
      <div>
        <button
          data-action="decrement"
          disabled={value <= min}
          onClick={onDecrement}
          className="group w-full flex items-center justify-center transition ease-in-out bg-gray-800 text-white text-2xl hover:bg-gray-700 py-3 rounded-l-md cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 20 20"
               fill="currentColor"
               className="w-5 h-5">
            <path fillRule="evenodd"
                  d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z"
                  clipRule="evenodd"/>
          </svg>
        </button>
      </div>
      <div>
        <button
          data-action="increment"
          disabled={value >= max}
          onClick={onIncrement}
          className="w-full flex items-center justify-center transition ease-in-out bg-gray-800 text-white text-2xl hover:bg-gray-700 py-3 cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg"
               viewBox="0 0 20 20"
               fill="currentColor"
               className="w-5 h-5">
            <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"/>
          </svg>

        </button>
      </div>
    </>
  );
}
