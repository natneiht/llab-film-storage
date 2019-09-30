export const apiUrl = 'http://us-central1-llab-development.cloudfunctions.net/fetch_film_store';

export const imageSize = [
  '6x9',
  '10x15',
  '13x18',
  '15x21',
  '20x30',
  'Other Size'
];
export const imagePrint = {
  polaroid: {
    printName: 'Polaroid',
    printSize: [
      '6x9',
      '10x15',
      '13x18',
      '15x21',
      '20x30'
    ]
  },
  // postcard: {
  //   printName: 'Postcard',
  //   printSize: [
  //     '6x9',
  //     '10x15',
  //     '13x18',
  //     '15x21',
  //     '20x30'
  //   ]
  // },
  // calendar: {
  //   printName: 'Calendar',
  //   printSize: [
  //     '13x18',
  //     '15x21',
  //     'Other Size'
  //   ]
  // },

  standard: {
    printName: 'Standard',
    printSize: [
      '6x9',
      '10x15',
      '13x18',
      '15x21',
      '20x30',
      'Other Size'
    ]
  },
  custom: {
    printName: 'Custom',
    printSize: [
      'Other Size'
    ]
  }
};