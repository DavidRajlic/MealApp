const fetch = require('node-fetch'); 
const { JSDOM } = require('jsdom');
const fs = require('fs');

async function getLokali() {
  const url = 'https://www.studentska-prehrana.si/sl/restaurant';

  try {
    const res = await fetch(url);
    const html = await res.text();
    const dom = new JSDOM(html);
    const document = dom.window.document;

    const lokali = [...document.querySelectorAll('[data-lokal]')];

    const mariborLokali = lokali
      .filter(el => el.getAttribute('data-city') === 'MARIBOR')
      .map(el => ({
        ime: el.getAttribute('data-lokal'),
        cena: el.getAttribute('data-cena'),
        doplacilo: el.getAttribute('data-doplacilo')
      }));

    console.log('Lokali v Mariboru z doplačili in ceno:\n', mariborLokali);

    fs.writeFileSync('restaurants.json', JSON.stringify(mariborLokali, null, 2), 'utf8');
    console.log(`✅ Shranjenih ${mariborLokali.length} lokalov v restaurants.json`);
  } catch (err) {
    console.error('Napaka:', err);
  }
}

getLokali();
