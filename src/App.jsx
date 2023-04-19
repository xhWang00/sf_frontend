import axios from 'axios';
import { useState, useEffect } from 'react';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { Route, Routes} from "react-router";
import './FrontPage.css';


const BASEURL = 'http://127.0.0.1:5000/frame/2011_09_26_drive_0048_extract.json/0000000000';

function FrontPage() {
  return (
    <div className="container">
      <h1 className="title">Select an Option</h1>
      <div className="buttons">
        <Link className="button" to="/upload">
          Upload a Dataset
        </Link>
        <Link className="button" to="/image-comparison">
          Select a Dataset
        </Link>
      </div>
    </div>
  );
}

function Upload() {
  // Handle file upload logic here
  return <div>Upload Page</div>;
}

function SelectDataset() {
  // Fetch available datasets and handle dataset selection logic here
  return <div>Select Dataset Page</div>;
}

function ImageComparison() {
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
        <ReactCompareSlider
          itemOne={
            <ReactCompareSliderImage
            src={`http://127.0.0.1:5000/video_feed/edgless?start=${startTime}`}
            alt="Image one"
          />
          }
          itemTwo={
            <ReactCompareSliderImage
            src={`http://127.0.0.1:5000/video_feed/edges?start=${startTime}`}
            alt="Image two"
            />
          }
        />
        <p>
          Computer vision: <b>Not safe</b>
        </p>
        <p>
          Lidar: <b>Safe</b>
        </p>
      </div>
    );
}

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<FrontPage />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/select" element={<SelectDataset />} />
          <Route path="/image-comparison" element={<ImageComparison />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
