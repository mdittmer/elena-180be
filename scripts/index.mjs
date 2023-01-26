'use strict';

import {
  getCanonicalTime,
  getBeDate,
  getBeDateString,
} from './date.mjs';
import { insertPrayer } from './format-prayer.mjs';
import { getPrayerFromSeedArrayBuffer } from './prayers.mjs';

const gregorianDate = new Date();
const gregorianDateString = gregorianDate.toLocaleDateString('en-CA', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
});
const canonicalTime = getCanonicalTime(gregorianDate);
const beDate = getBeDate(canonicalTime);
const beDateString = getBeDateString(beDate);

document.querySelector('#gregorian-date').textContent = gregorianDateString;
document.querySelector('#be-date').textContent = beDateString;

(async () => {
  const beDateUint8Array = (new TextEncoder()).encode(beDateString);
  const prayer = await getPrayerFromSeedArrayBuffer(beDateUint8Array);
  const container = document.querySelector('#prayer-container');
  insertPrayer(prayer, container);
})();
