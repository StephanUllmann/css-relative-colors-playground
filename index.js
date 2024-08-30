const colorPickerEl = document.getElementById('color-picker');
const darkModeCheckbox = document.getElementById('dark-mode');

const styles = getComputedStyle(document.body);

const hueEl = document.getElementById('hue');
const satEl = document.getElementById('sat');
const lightnessEl = document.getElementById('lightness');

console.log('lightness', styles.getPropertyValue('--lightness').replace('%', ''));

hueEl.value = styles.getPropertyValue('--hue');
satEl.value = styles.getPropertyValue('--sat').replace('%', '');
lightnessEl.value = styles.getPropertyValue('--lightness').replace('%', '');

const handleChange = function (e) {
  const [h, s, l] = hexToHSL(e.target.value);
  console.log(h, s, l);
  document.documentElement.style.setProperty('--hue', h);
  document.documentElement.style.setProperty('--sat', s + '%');
  document.documentElement.style.setProperty('--lightness', l + '%');
  hueEl.value = h;
  satEl.value = s;
  lightnessEl.value = l;
};

const handleDarkMode = function (e) {
  document.documentElement.style.colorScheme = e.target.checked ? 'only dark' : 'only light';
};

const handleHueChange = function (e) {
  document.documentElement.style.setProperty('--hue', e.target.value);
};
const handleSatChange = function (e) {
  document.documentElement.style.setProperty('--sat', e.target.value + '%');
};
const handleLightnessChange = function (e) {
  document.documentElement.style.setProperty('--lightness', e.target.value + '%');
};

colorPickerEl.addEventListener('change', handleChange);
darkModeCheckbox.addEventListener('change', handleDarkMode);
hueEl.addEventListener('input', handleHueChange);
satEl.addEventListener('input', handleSatChange);
lightnessEl.addEventListener('input', handleLightnessChange);

// https://css-tricks.com/converting-color-spaces-in-javascript/#aa-hex-to-hsl
function hexToHSL(H) {
  // Convert hex to RGB first
  let r = 0,
    g = 0,
    b = 0;
  if (H.length == 4) {
    r = '0x' + H[1] + H[1];
    g = '0x' + H[2] + H[2];
    b = '0x' + H[3] + H[3];
  } else if (H.length == 7) {
    r = '0x' + H[1] + H[2];
    g = '0x' + H[3] + H[4];
    b = '0x' + H[5] + H[6];
  }
  // Then to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  if (delta == 0) h = 0;
  else if (cmax == r) h = ((g - b) / delta) % 6;
  else if (cmax == g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0) h += 360;

  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return [h, s, l];
}
