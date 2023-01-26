'use strict';

const prayers = [
  {
    paragraphs: [
      'Glory to Thee, O my God! One of Thy handmaidens, who hath believed in Thee and in Thy signs, hath entered beneath the shadow of the tree of Thy oneness. Give her to quaff, O my God, by Thy Name, the Manifest and the Hidden, of Thy choice sealed Wine that it may take her away from her own self, and make her to be entirely devoted to Thy remembrance, and wholly detached from any one beside Thee.',
      'Now that Thou hast revealed unto her the knowledge of Thee, O my Lord, deny her not, by Thy bounty, Thy grace; and now that Thou hast called her unto Thyself, drive her not away from Thee, through Thy favor. Supply her, then, with that which excelleth all that can be found on Thine earth. Thou art, verily, the Most Bountiful, Whose grace is immense.',
      'Wert Thou to bestow on one of Thy creatures what would equal the kingdoms of earth and heaven, it would still not diminish by even as much as an atom the immensity of Thy dominion. Far greater art Thou than the Great One men are wont to call Thee, for such a title is but one of Thy names all of which were created by a mere indication of Thy will.',
      'There is no God but Thee, the God of power, the God of glory, the God of knowledge and wisdom.',
    ],
    attribution: 'Bahá’u’lláh',
  },
];

export async function getPrayerFromSeedArrayBuffer(seed) {
  const hash = await crypto.subtle.digest('SHA-256', seed);
  const index = (new Uint32Array(hash))[0] % prayers.length;
  return prayers[index];
}