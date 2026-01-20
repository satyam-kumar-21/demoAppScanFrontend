import { useEffect, useState } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import axios from 'axios';

const RiderScan = () => {
      const [scanResult, setScanResult] = useState(null);
      const [status, setStatus] = useState('idle'); // idle, scanning, success, error
      const [errorMsg, setErrorMsg] = useState('');

      // Mock Data for the rider
      const RIDER_ID = "Rider-X99";
      const ORDER_ID = "ORD-" + Math.floor(Math.random() * 10000);

      useEffect(() => {
            const scanner = new Html5QrcodeScanner(
                  "reader",
                  { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
            );

            scanner.render(onScanSuccess, onScanFailure);

            function onScanSuccess(decodedText, decodedResult) {
                  console.log(`Scan result: ${decodedText}`, decodedResult);
                  scanner.clear();
                  handleScan(decodedText);
            }

            function onScanFailure(error) {
                  // console.warn(`Code scan error = ${error}`);
            }

            return () => {
                  scanner.clear().catch(error => {
                        console.error("Failed to clear html5-qrcode scanner. ", error);
                  });
            };
      }, []);

      const handleScan = async (restaurantId) => {
            setStatus('processing');
            setScanResult(restaurantId);

            // Get Location
            if (!navigator.geolocation) {
                  setStatus('error');
                  setErrorMsg('Geolocation is not supported by your browser');
                  return;
            }

            navigator.geolocation.getCurrentPosition(async (position) => {
                  const location = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                  };

                  try {
                        const payload = {
                              rider_id: RIDER_ID,
                              order_id: ORDER_ID,
                              restaurant_id: restaurantId,
                              location
                        };

                        // Assuming backend runs on localhost:5000
                        const response = await axios.post('http://localhost:5000/api/scan', payload);

                        if (response.data.success) {
                              setStatus('success');
                        } else {
                              setStatus('error');
                              setErrorMsg(response.data.message || 'Scan failed');
                        }
                  } catch (err) {
                        setStatus('error');
                        setErrorMsg('Network error or server unavailable');
                        console.error(err);
                  }
            }, (err) => {
                  setStatus('error');
                  setErrorMsg('Unable to retrieve location');
            });
      };

      const resetScan = () => {
            window.location.reload(); // Simple reload to restart scanner
      };

      return (
            <div className="page-container">
                  <div className="rider-header">
                        <h2>Rider Pickup</h2>
                        <div className="rider-info">
                              <span>Rider: {RIDER_ID}</span>
                              <span>Order: {ORDER_ID}</span>
                        </div>
                  </div>

                  {status === 'idle' && (
                        <div id="reader" className="scanner-box"></div>
                  )}

                  {status === 'processing' && (
                        <div className="status-box processing">
                              <div className="spinner"></div>
                              <p>Verifying Pickup...</p>
                        </div>
                  )}

                  {status === 'success' && (
                        <div className="status-box success">
                              <div className="icon">✅</div>
                              <h3>Pickup Confirmed!</h3>
                              <p>Restaurant: {scanResult}</p>
                              <button onClick={resetScan} className="btn-primary">Scan Next Order</button>
                        </div>
                  )}

                  {status === 'error' && (
                        <div className="status-box error">
                              <div className="icon">❌</div>
                              <h3>Failed</h3>
                              <p>{errorMsg}</p>
                              <button onClick={resetScan} className="btn-secondary">Try Again</button>
                        </div>
                  )}
            </div>
      );
};

export default RiderScan;
