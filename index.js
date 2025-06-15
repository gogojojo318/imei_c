const checkAu = require('./checkers/au');
const checkMineo = require('./checkers/mineo');
const checkRakuten = require('./checkers/rakuten');

const carrier = process.argv[2];
const imei = process.argv[3];

(async () => {
  let result;
  switch (carrier) {
    case 'au':
      result = await checkAu(imei);
      break;
    case 'mineo':
      result = await checkMineo(imei);
      break;
    case 'rakuten':
      result = await checkRakuten(imei);
      break;
    default:
      console.error('対応していないキャリアです');
      process.exit(1);
  }

  console.log(`結果: ${result}`);
})();
