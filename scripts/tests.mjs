'use strict';

import {
  getCurrentTime,
  getCanonicalTime,
  getBeNewYearAndYear,
  getBeDate,
  oneDay,
  ayyamihaMonth,
} from './date.mjs';

getCurrentTime;
getCanonicalTime;
getBeNewYearAndYear;
getBeDate;

const firstDayOfTestYear = getCanonicalTime(new Date(2023, 2, 21));
let dayNumber = 0;
let expectedDate = {year: 180, month: 0, day: 0};

while(true) {
  const actualCanonicalTime = firstDayOfTestYear + (dayNumber * oneDay);
  const actualDate = getBeDate(actualCanonicalTime);

  console.assert(actualDate.year === expectedDate.year, 'Year incorrect');
  console.assert(actualDate.month === expectedDate.month, 'Month incorrect');
  console.assert(actualDate.day === expectedDate.day, 'Day incorrect');

  // Done checking dates!
  if (expectedDate.month === 18 && expectedDate.day === 18) {
    // Check change of year.
    const nextDayNumber = dayNumber + 1;
    const nextActualCanonicalTime = firstDayOfTestYear + (nextDayNumber * oneDay);
    const nextActualDate = getBeDate(nextActualCanonicalTime);

    console.assert(nextActualDate.year === expectedDate.year + 1, 'New year incorrect');
    console.assert(nextActualDate.month === 0, 'New year month incorrect');
    console.assert(nextActualDate.day === 0, 'New year day incorrect');

    // Done!
    break;
  }

  if (expectedDate.month === ayyamihaMonth && expectedDate.day === 4) {
    // Ayyam-i-Ha just ended. Time for Ala.
    expectedDate.day = 0;
    expectedDate.month = 18;
  } else if (expectedDate.day === 18) {
    // A month just ended.
    expectedDate.day = 0;
    if (expectedDate.month === 17) {
      // Mulk just ended. Time for Ayyam-i-Ha.
      expectedDate.month = ayyamihaMonth;
    } else {
      // A month just ended. Go to next month.
      expectedDate.month = expectedDate.month + 1;
    }
  } else {
    // Nothing special happened. Go to next day.
    expectedDate.day = expectedDate.day + 1;
  }

  dayNumber = dayNumber + 1;
}

console.log('Tests complete');
