import React, { useEffect, useState } from 'react';
import './styles/trackShipment.css';
import Progress from '../components/progress/Progress';
import ShipmentsTaple from '../components/shipmentsTaple/ShipmentsTaple';
import { useTranslation } from 'react-i18next';
import questions from '../assets/questions.png';
//import { useParams } from 'react-router-dom';
import axios from 'axios';

import Header from '../components/header/Header';

//  84043113,
// 3468570,
// 40106705
function TrackShipment() {
  const [shipmentData, setShipmentData] = useState(null);
  const [trackingNumber, setTrackingNumber] = useState('84043113');
  //const { trackingNumber } = useParams();
  const { t } = useTranslation();

  useEffect(() => {
    async function getProduct() {
      await axios
        .get(`https://tracking.bosta.co/shipments/track/${trackingNumber}`)
        .then((res) => {
          setShipmentData(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }

    getProduct();
  }, [trackingNumber]);

  //console.log(shipmentData)

  return (
    <>
      <Header setTrackingNumber={setTrackingNumber}/>
      {shipmentData && (
      <main className="TrackShipmentMain">
        <Progress shipmentData={shipmentData} />
        <div className="TrackShipmentContent">
          <div className="TrackShipmentTable">
            <h4>{t('shipmentDetails')}</h4>
            <ShipmentsTaple
              transitEvents={shipmentData?.TransitEvents}
              shipmentState={shipmentData?.CurrentStatus?.state}
            />
          </div>
          <div className="shipmentAddressAndHelp">
            <h4>{t('deliveryAddress')}</h4>
            <div className="shipmentAddress">
              {shipmentData?.DeliveryAddress
                ? shipmentData.DeliveryAddress
                : 'امبابة شارع طلعت حرب مدينة العمال بجوار البرنس منزل 17 بلوك 22,,,Cairo'}
            </div>
            <div className="shipmentHelp">
              <img src={questions} alt="Questions" />
              <div>
                <p style={{ textAlign: 'center' }}>
                  {t('problemWithShipment')}
                </p>
                <button>{t('reportProblem')}</button>
              </div>
            </div>
          </div>
        </div>
      </main>
      )}
    </>
  );
}

export default TrackShipment;
