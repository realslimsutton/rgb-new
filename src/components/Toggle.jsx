export default ({ id, label, checked, onChange }) => {
  return (
    <div className="flex items-center">
      <label className="inline-flex relative items-center cursor-pointer mr-3">
        <input type="checkbox" onChange={onChange} checked={checked} id={id} className="sr-only peer" />
        <div className="transition ease-in-out w-12 h-7 rounded-md peer bg-gray-800 hover:bg-gray-700 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-gray-600 hover:after:bg-gray-500 peer-checked:after:bg-purple-600 after:rounded-md after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-900" />
      </label>
      <label htmlFor={id} className="text-white">
        {label}
      </label>
    </div>
  );
}
