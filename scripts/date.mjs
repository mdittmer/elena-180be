'use strict';

export const minDate = Date.UTC(1844, 2, 21);
export const oneDay = 1000 * 60 * 60 * 24;
export const ayyamihaMonth = 17.5;

const beMonths = [
  'Bahá',
  'Jalál',
  'Jamál',
  'ʻAẓamat',
  'Núr',
  'Raḥmat',
  'Kalimát',
  'Kamál',
  'Asmáʼ',
  'ʻIzzat',
  'Mas͟híyyat',
  'ʻIlm',
  'Qudrat',
  'Qawl',
  'Masáʼil',
  'S͟haraf',
  'Sulṭán',
  'Mulk',
  'Aláʼ',
];

function getBeMonthString(beMonthNumber) {
  console.assert(typeof beMonthNumber === 'number' && !Number.isNaN(beMonthNumber));
  console.assert(beMonthNumber >= 0);
  console.assert(beMonthNumber < beMonths.length);
  if (beMonthNumber === ayyamihaMonth) {
    return 'Ayyám-i-Há';
  }
  console.assert(Number.isInteger(beMonthNumber));
  return beMonths[beMonthNumber];
}

function getBeDayString(beDayNumber) {
  console.assert(typeof beDayNumber === 'number' && !Number.isNaN(beDayNumber));
  console.assert(Number.isInteger(beDayNumber));
  console.assert(beDayNumber >= 0);
  console.assert(beDayNumber < 19);
  return '' + (beDayNumber + 1);
}

function getBeYearString(beYearNumber) {
  console.assert(typeof beYearNumber === 'number' && !Number.isNaN(beYearNumber));
  console.assert(Number.isInteger(beYearNumber));
  console.assert(beYearNumber >= 0);
  return '' + beYearNumber;
}

export function getBeDateString(beDate) {
  return `${getBeDayString(beDate.day)} ${getBeMonthString(beDate.month)} ${getBeYearString(beDate.year)}`;
}

export function getCurrentTime() {
  return getCanonicalTime(new Date());
}

export function getCanonicalTime(localDate) {
  return Date.UTC(
    localDate.getFullYear(),
    localDate.getMonth(),
    localDate.getDate(),
    localDate.getHours(),
    localDate.getMinutes(),
    localDate.getSeconds(),
    localDate.getMilliseconds(),
  );
}

export function getBeNewYearAndYear(time) {
  console.assert(time >= minDate, 'Cannot process times before March 21, 1844');
  let beYear = 0;
  let gregorianYear = 1844;
  let newYear = Date.UTC(gregorianYear, 2, 21);
  while (newYear <= time) {
    ++beYear;
    ++gregorianYear;
    newYear = Date.UTC(gregorianYear, 2, 21);
  }
  return {newYear: Date.UTC(gregorianYear - 1, 2, 21), year: beYear};
}

export function getBeDate(time) {
  console.assert(time >= minDate, 'Cannot process times before March 21, 1844');
  const {newYear, year} = getBeNewYearAndYear(time);
  console.assert(time >= newYear, 'Failed to calculate correct BE new year');
  const dayOfYear = Math.floor((time - newYear) / oneDay);
  const month = Math.floor(dayOfYear / 19);
  const dayOfMonth = dayOfYear % 19;
  if (month > 17) {
    const nextNewYear = getBeNewYearAndYear(time + (170 * oneDay)).newYear;
    const firstDayOfAla = nextNewYear - (19 * oneDay);
    const actualMonth = (time < firstDayOfAla) ?
      ayyamihaMonth :
      18;
    const actualDayOfMonth = (time < firstDayOfAla) ?
      dayOfMonth :
      Math.floor((time - firstDayOfAla) / oneDay);
    return {year, month: actualMonth, day: actualDayOfMonth};
  } else {
    return {year, month, day: dayOfMonth};
  }
}
