import './App.css';
import ColorPicker from 'react-color-wheel-picker';
import { useState } from 'react';
function App() {
  const [colors, setColors] = useState({ hex: '#222222' });
  return (
    <div className='App'>
      <ColorPicker initialColor={colors.hex} onChange={(color) => setColors(color)} size={300} />

      <div>{colors.hex}</div>
      <br />
      {JSON.stringify(colors.rgb)}
    </div>
  );
}

export default App;
