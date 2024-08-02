import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useTranslation } from 'react-i18next';

function ShipmentsTaple({ transitEvents, shipmentState }) {
  const { t } = useTranslation();
  const dir = localStorage.getItem('i18nextLng') === 'ar' ? 'right' : 'left';

  const rowStyle = { borderBottom: '1px solid #eeeeeec0', fontFamily: 'Cairo' };

  function getFormattedDate(date) {
    const convertedDate = new Date(date);
    const day = convertedDate.getDate();
    const month = convertedDate.getMonth();
    const year = convertedDate.getFullYear();
    return `${day >= 10 ? day : `0${day}`}/${
      month >= 10 ? month : `0${month}`
    }/${year}`;
  }

  function getFormattedTime(date) {
    const convertedDate = new Date(date);
    const hours = convertedDate.getHours();
    const minutes = convertedDate.getMinutes();
    return `${hours >= 10 ? hours : `0${hours}`}:${
      minutes >= 10 ? minutes : `0${minutes}`
    }${hours >= 12 ? 'pm' : 'am'}`;
  }

  return (
    <TableContainer
      component={Paper}
      sx={{ boxShadow: '0 0 0 0', border: '1px solid #eeeeeec0' }}
    >
      <Table sx={{ minWidth: 550 }}>
        <TableHead>
          <TableRow>
            <TableCell
              sx={{
                color: '#9aa5b9',
                fontFamily: 'Cairo',
                fontWeight: 700,
                borderBottom: '1px solid #eeeeeec0',
                bgcolor: '#f8f8f8',
                py: 2,
                px: 3,
              }}
              align={dir}
            >
              {t('branch')}
            </TableCell>

            <TableCell
              sx={{
                color: '#9aa5b9',
                fontFamily: 'Cairo',
                fontWeight: 700,
                borderBottom: '1px solid #eeeeeec0',
                bgcolor: '#f8f8f8',
                py: 2,
                px: 3,
              }}
              align={dir}
            >
              {t('date')}
            </TableCell>
            <TableCell
              sx={{
                color: '#9aa5b9',
                fontFamily: 'Cairo',
                fontWeight: 700,
                borderBottom: '1px solid #eeeeeec0',
                bgcolor: '#f8f8f8',
                py: 2,
                px: 3,
              }}
              align={dir}
            >
              {t('time')}
            </TableCell>
            <TableCell
              sx={{
                color: '#9aa5b9',
                fontFamily: 'Cairo',
                fontWeight: 700,
                borderBottom: '1px solid #eeeeeec0',
                bgcolor: '#f8f8f8',
                py: 2,
                px: 3,
              }}
              align={dir}
            >
              {t('details')}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transitEvents.map((event, index) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell sx={rowStyle} align={dir}>
                {event?.hub ? event?.hub : t('nothing')}
              </TableCell>
              <TableCell sx={rowStyle} align={dir}>
                {getFormattedDate(event?.timestamp)}
              </TableCell>
              <TableCell sx={rowStyle} align={dir}>
                {getFormattedTime(event?.timestamp)}
              </TableCell>
              <TableCell
                sx={rowStyle}
                align={dir}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  borderBottom: '1px solid #eeeeeec0',
                  fontFamily: 'Cairo',
                }}
              >
                <p
                  style={{
                    margin: 0,
                  }}
                >
                  {t(event?.state)}
                </p>
                {event?.reason && (
                  <p
                    style={{
                      margin: 0,
                    }}
                    className={
                      shipmentState === 'CANCELLED'
                        ? 'setColorRed'
                        : shipmentState === 'DELIVERED_TO_SENDER'
                        ? 'setColorOrange'
                        : ''
                    }
                  >
                    {t(event?.reason)}
                  </p>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ShipmentsTaple;
