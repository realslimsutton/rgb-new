export default ({ id, colors, value, input, onInput, onDecrement, onIncrement, min, max, step }) => {
  return (
    <div className="flex flex-col mb-3">
      <label htmlFor={id} className="mb-2">
        {colors.length} Colors
      </label>
      <RawNumberInput id={id} value={value} input={input} onInput={onInput} onDecrement={onDecrement} onIncrement={onIncrement} min={min} max={max} step={step} />
    </div>
  );
}

export const RawNumberInput = ({ id, value, input, onInput, onDecrement, onIncrement, min, max, step }) => {
  return (
    <div className="flex">
      <button data-action="decrement" disabled={value <= min} onClick={onDecrement} className={`transition ease-in-out bg-gray-${input ? 700 : 800} text-white text-2xl hover:bg-gray-${input ? 500 : 700} h-full py-1.5 w-20 rounded-l-md cursor-pointer`}>
        -
      </button>
      {
        input && <input type="number" id={id} value={value} onInput={onInput} min={min} max={max} step={step} className="transition ease-in-out text-lg text-center bg-gray-800 text-gray-50 hover:bg-gray-600 focus:bg-gray-700 px-3 py-2" />
      }
      <button data-action="increment" disabled={value >= max} onClick={onIncrement} className={`transition ease-in-out bg-gray-${input ? 700 : 800} text-white text-2xl hover:bg-gray-${input ? 500 : 700} h-full py-1.5 w-20 rounded-r-md cursor-pointer`}>
        +
      </button>
    </div>
  );
}
