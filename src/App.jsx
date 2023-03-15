import {useEffect, useState} from "react";
import OutputField from "./components/OutputField";
import {convertToHex, convertToRGB, getRandomColor} from "./RGBUtils";
import {Gradient} from "./HexUtils";
import NumberInput from "./components/NumberInput";
import ColorInput from "./components/ColorInput";
import TextInput from "./components/TextInput";
import Toggle from "./components/Toggle";

export default function App() {
  const defaultColors = [getRandomColor(), getRandomColor()];

  const [store, setStore] = useState({
    colors: [...defaultColors],
    text: 'superiornetwork.org',
    format: '<#$1$2$3$4$5$6>$f$c',
    formatchar: '&',
    customFormat: false,
    prefix: '',
    bold: false,
    italic: false,
    underline: false,
    strikethrough: false,
    alerts: [],
  })

  const increment = () => {
    if (store.colors.length >= 5) {
      return;
    }

    setStore({
      ...store,
      colors: [...store.colors, getRandomColor()]
    })
  }

  const decrement = () => {
    if (store.colors.length <= 2) {
      return;
    }

    const lastColor = store.colors[store.colors.length - 1];

    setStore({
      ...store,
      colors: store.colors.filter(c => c !== lastColor)
    })
  }

  const onInputChange = (event) => {
    setStore({
      ...store,
      text: event.target.value ?? null
    })
  }

  const onColorChange = (event, i) => {
    const colors = store.colors;
    colors[i] = event.target.value ?? null;

    setStore({
      ...store,
      colors: colors
    })
  }

  const addAlerts = (alerts) => {
    console.log(alerts);
    setStore({
      ...store,
      alerts: alerts
    })
  }

  const removeAlert = (alert) => {
    setStore({
      ...store,
      alerts: store.alerts.filter(a => a.text !== alert.text)
    })
  }

  const randomColours = () => {
    const colors = store.colors.map(getRandomColor);

    setStore({
      ...store,
      colors: colors
    })

    for (let i in store.colors) {
      document.getElementById(`color${parseInt(i) + 1}`).jscolor.fromString(colors[i])
    }
  }

  const randomColour = (i) => {
    const colors = store.colors;
    colors[i] = getRandomColor();

    setStore({
      ...store,
      colors: colors
    })

    document.getElementById(`color${i + 1}`).jscolor.fromString(colors[i])
  }

  useEffect(() => {
    jscolor.install()
  }, [store.colors.length])

  return (
    <div className="flex mx-auto max-w-7xl px-6 items-center justify-center min-h-[calc(100lvh-80px)]">
      <div className="mt-10 min-h-[60px] w-full">
        <h1 className="font-bold text-gray-50 text-4xl mb-2 hidden">Hex
          Gradients</h1>
        <h2 className="text-gray-50 text-xl mb-12 hidden">Hex color gradient
          creator</h2>

        <div className="flex items-center justify-center mb-6">
          <img src="/assets/images/superior-network-logo.png"
               className="h-72 w-auto animate-float"/>
        </div>

        <OutputField
          id="Output"
          addAlerts={addAlerts}
          removeAlert={removeAlert}
          charlimit={256}
          alerts={store.alerts}
          value={
            (() => {
              let colors = store.colors.map((color) => convertToRGB(color));
              if (colors.length < 2) colors = defaultColors;

              let output = store.prefix;
              const text = store.text ? store.text : 'superiornetwork.org';

              const gradient = new Gradient(colors, text.replace(/ /g, '').length);

              for (let i = 0; i < text.length; i++) {
                const char = text.charAt(i);
                if (char == ' ') {
                  output += char;
                  continue;
                }

                const hex = convertToHex(gradient.next());
                let hexOutput = store.format;
                for (let n = 1; n <= 6; n++) hexOutput = hexOutput.replace(`$${n}`, hex.charAt(n - 1));
                let formatCodes = '';
                if (store.format.includes('$f')) {
                  if (store.bold) formatCodes += store.formatchar + 'l';
                  if (store.italic) formatCodes += store.formatchar + 'o';
                  if (store.underline) formatCodes += store.formatchar + 'n';
                  if (store.strikethrough) formatCodes += store.formatchar + 'm';
                }

                hexOutput = hexOutput.replace('$f', formatCodes);
                hexOutput = hexOutput.replace('$c', char);
                output += hexOutput;
              }

              return output;
            })()
          }/>

        {
          store.alerts.map((alert, i) => {
            return <p key={`alert-${i}`}
                      className={alert.class}>{alert.text}</p>;
          })
        }

        <h1 className={`text-6xl my-6 break-all max-w-7xl -space-x-[1px] font${store.bold ? '-bold' : ''}${store.italic ? '-italic' : ''}`}>
          {(() => {
            const text = store.text ? store.text : 'superiornetwork.org';

            let colors = store.colors.map((color) => convertToRGB(color));
            if (colors.length < 2) colors = defaultColors;

            const gradient = new Gradient(colors, text.replace(/ /g, '').length);

            let hex = '';
            return text.split('').map((char, i) => {
              if (char != ' ') hex = convertToHex(gradient.next());
              return <span key={`letter-${i++}`} style={{color: `#${hex}`}}
                           className={`font${store.underline ? '-underline' : ''}${store.strikethrough ? '-strikethrough' : ''}`}>{char}</span>;
            });
          })()}
        </h1>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-2">
          <div className="sm:pr-4">
            <div className="mb-2">
              <label htmlFor="colors">
                {store.colors.length} Colors
              </label>
            </div>

            <div className="grid grid-cols-3">
              <NumberInput
                id="colors"
                colors={store.colors}
                onIncrement={increment}
                onDecrement={decrement}>
                {store.colors.length} Colors
              </NumberInput>

              <div>
                <button
                  className="group w-full flex items-center justify-center transition ease-in-out bg-gray-800 text-white text-2xl hover:bg-gray-700 py-3 rounded-r-md cursor-pointer"
                  onClick={randomColours}
                >
                  <svg xmlns="http://www.w3.org/2000/svg"
                       viewBox="0 0 20 20"
                       fill="currentColor"
                       className="w-5 h-5 transition group-hover:rotate-90">
                    <path fillRule="evenodd"
                          d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z"
                          clipRule="evenodd"/>
                  </svg>
                </button>
              </div>
            </div>
            <div className="overflow-y-auto overflow-x-hidden max-h-32 sm:max-h-[500px] mt-3">
              {store.colors.map((color, i) => {
                return <ColorInput
                  id={`color${i + 1}`}
                  index={i}
                  key={`color-picker-${i}`}
                  value={color}
                  jscolorData={{palette: store.colors}}
                  randomColor={randomColour}
                  onInput={(event) => {
                    onColorChange(event, i)
                  }}
                />;
              })}
            </div>
          </div>

          <div className="md:col-span-3">
            <TextInput
              id="input"
              value={store.text}
              placeholder="superiornetwork.org"
              onInput={onInputChange}
            />

            <div className="mt-6 mb-4 space-y-4">
              <Toggle
                id="bold"
                checked={store.bold}
                onChange={(event) => {
                  setStore({
                    ...store,
                    bold: event.target.checked
                  })
                }}
                label={`Bold - ${store.formatchar + 'l'}`}
              />
              <Toggle
                id="strikethrough"
                checked={store.strikethrough}
                onChange={(event) => {
                  setStore({
                    ...store,
                    strikethrough: event.target.checked
                  })
                }}
                label={`Strikethrough - ${store.formatchar + 'm'}`}
              />
              <Toggle
                id="underline"
                checked={store.underline}
                onChange={(event) => {
                  setStore({
                    ...store,
                    underline: event.target.checked
                  })
                }}
                label={`Underline - ${store.formatchar + 'n'}`}
              />
              <Toggle
                id="italic"
                checked={store.italic}
                onChange={(event) => {
                  setStore({
                    ...store,
                    italic: event.target.checked
                  })
                }}
                label={`Italic - ${store.formatchar + 'o'}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
