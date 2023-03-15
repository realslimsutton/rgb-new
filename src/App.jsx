import {useEffect, useState} from "react";
import OutputField from "./components/OutputField";
import {convertToHex, convertToRGB, getRandomColor} from "./RGBUtils";
import {Gradient} from "./HexUtils";
import NumberInput from "./components/NumberInput";
import ColorInput from "./components/ColorInput";
import TextInput from "./components/TextInput";
import Toggle from "./components/Toggle";

export default function App() {
  const [store, setStore] = useState({
    colors: ['#00FFE0', '#EB00FF'],
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

  useEffect(() => {
    jscolor.install();
  }, [store.colors.length])

  return (
    <div className="flex mx-auto max-w-7xl px-6 items-center justify-center min-h-[calc(100lvh-80px)]">
      <div className="mt-10 min-h-[60px] w-full">
        <h1 className="font-bold text-gray-50 text-4xl mb-2 hidden">Hex Gradients</h1>
        <h2 className="text-gray-50 text-xl mb-12 hidden">Hex color gradient
          creator</h2>

        <div className="flex items-center justify-center mb-6">
          <img src="/assets/images/superior-network-logo.png" className="h-72 w-auto"/>
        </div>

        <OutputField id="Output" addAlerts={addAlerts} removeAlert={removeAlert} charlimit={256} alerts={store.alerts} value={
          (() => {
            let colors = store.colors.map((color) => convertToRGB(color));
            if (colors.length < 2) colors = [convertToRGB('#00FFE0'), convertToRGB('#EB00FF')];

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
            return <p key={`alert-${i}`} className={alert.class}>{alert.text}</p>;
          })
        }

        <h1 className={`text-6xl my-6 break-all max-w-7xl -space-x-[1px] font${store.bold ? '-bold' : ''}${store.italic ? '-italic' : ''}`}>
          {(() => {
            const text = store.text ? store.text : 'superiornetwork.org';

            let colors = store.colors.map((color) => convertToRGB(color));
            if (colors.length < 2) colors = [convertToRGB('#00FFE0'), convertToRGB('#EB00FF')];

            const gradient = new Gradient(colors, text.replace(/ /g, '').length);

            let hex = '';
            return text.split('').map((char, i) => {
              if (char != ' ') hex = convertToHex(gradient.next());
              return <span key={`letter-${i++}`} style={{color: `#${hex}`}}
                           className={`font${store.underline ? '-underline' : ''}${store.strikethrough ? '-strikethrough' : ''}`}>{char}</span>;
            });
          })()}
        </h1>

        <div className="grid sm:grid-cols-4 gap-2">
          <div className="sm:pr-4">
            <NumberInput id="colors"
                         colors={store.colors}
                         onIncrement={increment}
                         onDecrement={decrement}>
              {store.colors.length} Colors
            </NumberInput>
            <div className="overflow-auto max-h-32 sm:max-h-[500px] mt-3">
              {store.colors.map((color, i) => {
                return <ColorInput
                  id={`color${i + 1}`}
                  index={i}
                  key={`color-picker-${i}`}
                  value={color}
                  jscolorData={{palette: store.colors}}
                  onInput={(event) => {
                    onColorChange(event, i)
                  }}
                />;
              })}
            </div>
          </div>

          <div className="sm:col-span-3">
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
