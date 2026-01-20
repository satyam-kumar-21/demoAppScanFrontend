import { useState } from 'react';
import QRCode from 'react-qr-code';

const RestaurantQR = () => {
      const [restaurantId, setRestaurantId] = useState('Resto-001');

      return (
            <div className="page-container">
                  <h2>Restaurant Dashboard</h2>
                  <p>Show this code to the rider</p>

                  <div className="input-group">
                        <label>Restaurant ID:</label>
                        <input
                              type="text"
                              value={restaurantId}
                              onChange={(e) => setRestaurantId(e.target.value)}
                              className="input-field"
                        />
                  </div>

                  <div className="qr-container">
                        <div className="qr-box">
                              <QRCode
                                    value={restaurantId}
                                    size={256}
                                    style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                    viewBox={`0 0 256 256`}
                              />
                        </div>
                        <p className="qr-label">Scan to Pickup</p>
                  </div>
            </div>
      );
};

export default RestaurantQR;
