import { useState, useEffect } from 'react';
import * as React from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Navbar from './components/Navbar';
import Typography from '@mui/material/Typography';
import DeviceThermostatIcon from '@mui/icons-material/DeviceThermostat';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import OpacityIcon from '@mui/icons-material/Opacity';
import Charts from './components/Charts';

function App() {
  const [count, setCount] = useState(0)
  const [selectedDevice, setSelectedDevice] = useState(3);
  const [data, setData] = useState<{temperature?: number; pressure?: number; humidity?: number} | null>(null);
  const [ hasData, setHasData ] = useState(false);
  const [modalDevice, setModalDevice] = useState<null | typeof devices[0]>(null);

  const margin = { right: 24 };
  const xLabels = [
    'Page A',
    'Page B',
    'Page C',
    'Page D',
    'Page E',
    'Page F',
    'Page G',
  ];

  const devices = [
    {
      id: 0,
      temperature: null,
      pressure: null,
      humidity: null,
      chartData: {
        pData: [1000, 1100, 1200, 1300, 1200, 1100, 1000],
        uData: [40, 42, 41, 43, 44, 42, 41],
        tData: [20, 21, 20, 22, 21, 20, 19],
      },
    },
    {
      id: 1,
      temperature: null,
      pressure: null,
      humidity: null,
      chartData: {
        pData: [900, 950, 1000, 1050, 1000, 950, 900],
        uData: [35, 36, 37, 38, 37, 36, 35],
        tData: [18, 19, 18, 20, 19, 18, 17],
      },
    },
    {
      id: 2,
      temperature: null,
      pressure: null,
      humidity: null,
      chartData: {
        pData: [800, 850, 900, 950, 900, 850, 800],
        uData: [30, 32, 31, 33, 34, 32, 31],
        tData: [16, 17, 16, 18, 17, 16, 15],
      },
    },
    {
      id: 3,
      temperature: 23.5,
      pressure: 1013.25,
      humidity: 45,
      chartData: {
        pData: [2400, 1398, 9800, 3908, 4800, 3800, 4300],
        uData: [4000, 3000, 2000, 2780, 1890, 2390, 3490],
        tData: [23.5, 23.5, 23.5, 23.5, 23.5, 23.5, 23.5],
      },
    },
    {
      id: 4,
      temperature: 24.5,
      pressure: 990.4,
      humidity: 40.3,
      chartData: {
        pData: [2200, 2398, 2800, 1908, 2800, 1800, 2300],
        uData: [3000, 2000, 1000, 1780, 1290, 1900, 2490],
        tData: [24.5, 24.5, 24.5, 24.5, 24.5, 24.5, 24.5],
      },
    },
  ];

    useEffect(() => {
      setTimeout(() => {
        const fetchedData = {
          temperature: 22.5,
          pressure: 1013,
          humidity: 60,
        };
        setData(fetchedData);
        setHasData(true);
      }, 100);
    }, []);
  

    return (
      <>
        <Navbar className="navbar" />

        <div className="center-section">
          <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', width: '100%' }}>
            <div>
              <div className="device-card selected" style={{ minWidth: 220, maxWidth: 240 }}>
                <div className="device-title">Device No. {selectedDevice}</div>
                {devices[selectedDevice]?.chartData ? (
                  <div className="device-details">
                    <DeviceThermostatIcon /> <span className="value">
                      {devices[selectedDevice].chartData.tData[devices[selectedDevice].chartData.tData.length - 1]} &deg;C
                    </span><br />
                    <CloudUploadIcon /> <span className="value">
                      {devices[selectedDevice].chartData.pData[devices[selectedDevice].chartData.pData.length - 1]} hPa
                    </span><br />
                    <OpacityIcon /> <span className="value">
                      {devices[selectedDevice].chartData.uData[devices[selectedDevice].chartData.uData.length - 1]}%
                    </span>
                  </div>
                ) : (
                  <div className="device-details">No data</div>
                )}
                <div className="details-link">DETAILS</div>
              </div>
            </div>

            <div className='chartStyle' style={{ flex: 1, minWidth: 600 }}>
              <Charts
                chartData={devices[selectedDevice]?.chartData}
                xLabels={xLabels}
                margin={margin}
              />
            </div>
          </div>
        </div>


        <div className="whiteLine"></div>

        <div className="devices-row">
          {devices.map((device) => (
            <div
              key={device.id}
              className={`device-card${selectedDevice === device.id ? ' selected' : ''}`}
              onClick={() => setSelectedDevice(device.id)}
              style={{ cursor: 'pointer'}}
            >
              <div className="device-title">Device No. {device.id}</div>
              {device.chartData ? (
                <div className="device-details">
                  <DeviceThermostatIcon /> <span className="value">
                    {device.chartData.tData[device.chartData.tData.length - 1]} &deg;C
                  </span><br />
                  <CloudUploadIcon /> <span className="value">
                    {device.chartData.pData[device.chartData.pData.length - 1]} hPa
                  </span><br />
                  <OpacityIcon /> <span className="value">
                    {device.chartData.uData[device.chartData.uData.length - 1]}%
                  </span>
                </div>
              ) : (
                <div className="device-details">No data</div>
              )}
              <div
                className="details-link"
                onClick={(e) => {
                  e.stopPropagation();
                  setModalDevice(device);
                }}
              >
                DETAILS
              </div>
            </div>
          ))}
        </div>

        {modalDevice && (
        <div className="modal-overlay" onClick={() => setModalDevice(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <h2>Device No. {modalDevice.id} – Szczegóły</h2>
            <div>
              <b>Temperature:</b> {modalDevice.chartData.tData.join(', ')}<br />
              <b>Pressure:</b> {modalDevice.chartData.pData.join(', ')}<br />
              <b>Humidity:</b> {modalDevice.chartData.uData.join(', ')}
            </div>
            <button onClick={() => setModalDevice(null)} style={{marginTop: 16}}>Zamknij</button>
          </div>
        </div>
      )}
      </>
    );
  }
  
export default App;
