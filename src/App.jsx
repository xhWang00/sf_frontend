import axios from 'axios';
import { useState, useEffect } from 'react'
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';

const BASEURL = 'http://127.0.0.1:5000/frame/2011_09_26_drive_0052_extract.json/0000000000';

function App() {
  const [states, setStates] = useState({});

  useEffect(() => {
    axios.get(BASEURL)
      .then(res => setStates(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h1>2011_09_26_drive_0052_extract</h1>
      <ReactCompareSlider
        itemOne={<ReactCompareSliderImage src="http://127.0.0.1:5000/raw/2011_09_26_drive_0052_extract/image_03/data/0000000000.png" alt="Image one" />}
        itemTwo={<ReactCompareSliderImage src="http://127.0.0.1:5000/raw/2011_09_26_drive_0052_extract/image_03/data/edges/0000000000.png" alt="Image two" />}
      />
      <p>Computer vision: <b>Not safe</b></p>
      <p>Lidar: <b>Safe</b></p>
    </div>
  )
}

export default App
