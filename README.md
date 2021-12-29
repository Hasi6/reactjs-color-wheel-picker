# React Color Wheel Picker

### inspired by react-color-picker-wheel

```
npm i react-color-whell-picker
or
yarn add react-color-wheel-picker
```

[Demo]

```
import ColorPicker from 'react-color-wheel-picker';


const CustomColorPicker = () => {

    const [colors, setColors] = useState({ hex: '#222222' });


    retrun (
        <ColorPicker
          initialColor={colors.hex}
          onChange={(color) => setColors(color)}
          size={300}
        />
    }
)

export default CustomColorPicker;
```

[demo]: https://condescending-shockley-4d3ec0.netlify.app/
