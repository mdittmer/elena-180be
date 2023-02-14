'use strict';

import {
  getCanonicalTime,
  getBeDate,
  oneDay,
  ayyamihaMonth,
  getBeDateString,
} from './date.mjs';
import { getPrayerFromSeedArrayBuffer, prayers } from './prayers.mjs';

const firstDayOfTestYear = getCanonicalTime(new Date(2023, 2, 21));
let dayNumber = 0;
let expectedDate = {year: 180, month: 0, day: 0};
const prayerCounts = new Map();

function prayerToString(prayer) {
  return prayer.paragraphs.join('\n\n') + '\n\n  --' + prayer.attribution;
}

(async function() {
  while(true) {
    const actualCanonicalTime = firstDayOfTestYear + (dayNumber * oneDay);
    const actualDate = getBeDate(actualCanonicalTime);
    const actualDateString = getBeDateString(actualDate);

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

    const beDateUint8Array = (new TextEncoder()).encode(actualDateString);
    const prayer = await getPrayerFromSeedArrayBuffer(beDateUint8Array);
    const prayerText = prayerToString(prayer);
    if (!prayerCounts.has(prayerText)) {
      prayerCounts.set(prayerText, 0);
    }
    prayerCounts.set(prayerText, prayerCounts.get(prayerText) + 1);

    dayNumber = dayNumber + 1;
  }

  for (const prayer of prayers) {
    const prayerText = prayerToString(prayer);
    const count = prayerCounts.get(prayerText);
    console.assert(count >= ((365 / (prayers.length)) - 15));
    console.assert(count <= ((365 / (prayers.length)) + 15));
  }

  console.log('Tests complete');
})();

