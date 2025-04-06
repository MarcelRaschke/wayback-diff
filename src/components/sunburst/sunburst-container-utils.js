export function getSize () {
  const w = window.innerWidth || document.documentElement.clientWidth ||
    document.body.clientWidth;
  const h = window.innerHeight || document.documentElement.clientHeight ||
    document.body.clientHeight;
  let size;
  if (h < w) {
    size = h * 0.45;
  } else {
    size = w * 0.45;
  }
  _showRootInfo(size);
  return size;
}

function _showRootInfo (size) {
  const rootInfoDiv = document.getElementById('root-cell-tooltip');
  if (rootInfoDiv) {
    rootInfoDiv.setAttribute('style', `top:${size * 0.4}px; width:${size * 0.4}px; height:${size * 0.22}px; font-size: ${size * 0.004}em;`);
  }
}

/*
The _decodeCompressedJson function assumes the task of decoding the simhash
value received from wayback-discover-diff in base64 into a number.
This function handles both a JSON array and a single JSON value.
 */

export function decodeCompressedJson (json) {
  const newJson = [];
  const year = json.captures[0][0];
  for (let i = 1; i < json.captures[0].length; i++) {
    const month = json.captures[0][i][0];
    for (let j = 1; j < json.captures[0][i].length; j++) {
      const day = json.captures[0][i][j][0];
      for (let y = 1; y < json.captures[0][i][j].length; y++) {
        const [time, simhashIndex] = json.captures[0][i][j][y];
        const simhash = json.hashes[simhashIndex];
        const timestamp = `${year}${String(month).padStart(2, '0')}${String(day).padStart(2, '0')}${time}`;
        newJson.push([timestamp, simhash]);
      }
    }
  }
  return newJson;
}

export function decodeUncompressedJson (json, initTimestamp = null) {
  if (json.captures) {
    return json.captures;
  }
  return [initTimestamp, json.simhash];
}
