export default function OutputField({ id, addAlerts, removeAlert, value, charlimit, className }) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="mb-2">
        <h1 className="font-bold text-3xl mb-2">
          Output
        </h1>
        This is what you put in the chat. Click on it to copy.
      </label>
      <RawOutputField id={id} addAlerts={addAlerts} removeAlert={removeAlert} value={value} charlimit={charlimit} className={`mb-3 ${className}`} />
    </div>
  );
}

export const RawOutputField = ({ id, addAlerts, removeAlert, value, charlimit, className }) => {
  return (
    <>
      <textarea readOnly={true} className={`transition ease-in-out cursor-pointer bg-gray-800 text-gray-50 hover:bg-gray-700 focus:bg-gray-700 rounded-md px-3 py-2 break-words ${className}`} id={id} value={value} onClick={(event) => {
        if(!event.target.value) {
          return;
        }

        navigator.clipboard.writeText(event.target.value);
        const alert = {
          class: 'text-green-500',
          text: 'Copied to clipboard!',
        };

        let alerts = [alert];

        if (event.target.value.length > charlimit && charlimit > 0) {
          const alert2 = {
            class: 'text-red-500',
            text: `This text is over ${charlimit} characters and may not fit in the chat box!`,
          };
          alerts = [alert2, ...alerts];
          setTimeout(() => {
            removeAlert(alert2)
          }, 5000)
        }
        addAlerts(alerts)
      }}/>
    </>
  );
}
