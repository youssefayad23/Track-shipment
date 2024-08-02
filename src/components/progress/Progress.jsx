import React from 'react';
import './progress.css';
import { useTranslation } from 'react-i18next';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DeliveredPng from '../../assets/delivered.png';
import FastDeliveredPng from '../../assets/fast-delivery.png';
import i18next from 'i18next';

function Progress({ shipmentData }) {
  const { t } = useTranslation();
  const shipmentState = shipmentData?.CurrentStatus?.state;

  const classNameState =
    (shipmentState === 'DELIVERED' ? 'delivered' : '') +
    (shipmentState === 'CANCELLED' ? 'cancelled' : '') +
    (shipmentState === 'DELIVERED_TO_SENDER' ? 'deliveredToSender' : '');

  const classNameCircleIcon =
    (shipmentState === 'DELIVERED' ? 'setColorGreen' : '') +
    (shipmentState === 'CANCELLED' ? 'setColorRed' : '') +
    (shipmentState === 'DELIVERED_TO_SENDER' ? 'setColorOrange' : '');

  const classNameProgressDivs =
    (shipmentState === 'DELIVERED' ? 'setBackgroundGreen' : '') +
    (shipmentState === 'CANCELLED' ? 'setBackgroundRed' : '') +
    (shipmentState === 'DELIVERED_TO_SENDER' ? 'setBackgroundOrange' : '');

  const classNameFastDeliveryContainer =
    (shipmentState === 'CANCELLED' ? 'setBackgroundRed' : '') +
    (shipmentState === 'DELIVERED_TO_SENDER' ? 'setBackgroundOrange' : '');

  const classNameProgressBarData = `progressBarData ${
    shipmentState === 'CANCELLED' || shipmentState === 'DELIVERED_TO_SENDER'
      ? 'cancelledOrdeliveredToSenderForP'
      : ''
  }`;

  function formatLastUpdateDate(date) {
    const convertedDate = new Date(date);
    const dayNames = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const [month, day, dayNum, year, hour, minutes] = [
      convertedDate.getMonth(),
      dayNames[convertedDate.getDay()],
      convertedDate.getDate(),
      convertedDate.getFullYear(),
      convertedDate.getHours(),
      convertedDate.getMinutes(),
    ];
    return `${t(day)} ${dayNum}/${
      month >= 10 ? month : `0${month}`
    }/${year} ${t('at')} ${hour}:${minutes}${hour > 12 ? 'pm' : 'am'}`;
  }

  function formatDeliveryDate(date) {
    const convertedDate = new Date(date);
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    const [month, dayNum, year] = [
      monthNames[convertedDate.getMonth() - 1],
      convertedDate.getDate(),
      convertedDate.getFullYear(),
    ];
    return `${dayNum} ${t(month)} ${year}`;
  }

  return (
    <div className="progressContainer">
      <div className="progressData">
        <div>
          <h5>
            {t('deliveryNumber')} <span>{shipmentData?.TrackingNumber}</span>
          </h5>
          <p className={classNameState}>{t(shipmentState)}</p>
        </div>
        <div>
          <h5>{t('lastUpdate')}</h5>
          <p>{formatLastUpdateDate(shipmentData?.CurrentStatus?.timestamp)}</p>
        </div>
        <div>
          <h5>{t('MerchantName')}</h5>
          <p>{shipmentData?.provider}</p>
        </div>
        <div>
          <h5>{t('DeliveryDateWithin')}</h5>
          <p>{formatDeliveryDate(shipmentData?.PromisedDate)}</p>
        </div>
      </div>
      <div>
        <div className="progressBar">
          <div className="checkCircleIconContainer">
            <CheckCircleIcon className={classNameCircleIcon} />
          </div>
          <div className={'progressDiv ' + classNameProgressDivs}></div>
          <div className="checkCircleIconContainer">
            <CheckCircleIcon className={classNameCircleIcon} />
          </div>
          <div className={'progressDiv ' + classNameProgressDivs}></div>
          {shipmentState === 'DELIVERED' ? (
            <div className="checkCircleIconContainer">
              <CheckCircleIcon className={classNameCircleIcon} />
            </div>
          ) : (
            <div className={'imgContainer ' + classNameFastDeliveryContainer}>
              <img src={FastDeliveredPng} alt="delivered" />
            </div>
          )}
          <div
            className={
              'progressDiv ' +
              (shipmentState !== 'CANCELLED' &&
              shipmentState !== 'DELIVERED_TO_SENDER'
                ? classNameProgressDivs
                : '')
            }
          ></div>

          {shipmentState === 'DELIVERED' ? (
            <div className="checkCircleIconContainer">
              <CheckCircleIcon className={classNameCircleIcon} />
            </div>
          ) : (
            <div className="imgContainer">
              <img src={DeliveredPng} alt="delivered" />
            </div>
          )}
        </div>
        <div className={classNameProgressBarData}>
          <p>{t('shipmentCreated')}</p>
          <p>{t('shipmentReceivedFromMerchant')}</p>
          <p className="outForDeliveryP">
            {t('shipmentOutForDelivery')}
            <span className={classNameState}>
              {shipmentState === 'CANCELLED'
                ? t('shipmentCancelledByMerchant')
                : shipmentState === 'DELIVERED_TO_SENDER'
                ? t('customerNotPresentAtAddress')
                : ''}
            </span>
          </p>
          <p >{t('delivered')}</p>
        </div>
      </div>
    </div>
  );
}

export default Progress;
