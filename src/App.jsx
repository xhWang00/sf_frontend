import axios from 'axios';
import { useState, useEffect } from 'react';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { Route, Routes} from "react-router";
import './styles.css';


const BASEURL = 'http://127.0.0.1:5000/frame/2011_09_26_drive_0048_extract.json/0000000000';

function App() {
  const [states, setStates] = useState({});
  const [startTime, setStartTime] = useState(null);

  useEffect(() => {
    setStartTime(Date.now());
  }, []);

  useEffect(() => {
    if (startTime) {
      axios
        .get(BASEURL)
        .then((res) => setStates(res.data))
        .catch((err) => console.log(err));
    }
  }, [startTime]);

  if (!startTime) {
    return <div>Loading...</div>;
  }
    return (
      <div>
        <h1>2011_09_26_drive_0052_extract</h1>
        <div className="image-container">
          <div className="react-compare-slider">
            <ReactCompareSlider
              itemOne={
                <ReactCompareSliderImage
                  src={`http://127.0.0.1:5000/video_feed/edgless`}
                  alt="Image one"
                />
              }
              itemTwo={
                <ReactCompareSliderImage
                  src={`http://127.0.0.1:5000/video_feed/edges`}
                  alt="Image two"
                />
              }
            />
          </div>
          <img
            className="third-image"
            src={`http://127.0.0.1:5000/video_feed/plot`}
            alt="Image three"
          />
        </div>
        <p>
          Computer vision: <b>Not safe</b>
        </p>
        <p>
          Lidar: <b>Safe</b>
        </p>
      </div>
    );
}

export default App;
