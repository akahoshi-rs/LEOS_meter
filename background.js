console.log('LEOS_meter is running.');

// let head_container = document.querySelector('#container.ytd-masthead');
// head_container.style.justifyContent = 'start';

// let head_searchForm = document.querySelector('#center.ytd-masthead');
// head_searchForm.style.flex = 'unset';

// let meter = document.createElement('div');


const audioContext = new OfflineAudioContext(2, 44100 * 40, 44100);

const audioElement = document.querySelector('video');
// console.log(document.querySelector('iframe').contentWindow.document);
console.log(audioElement);
const track = audioContext.createMediaElementSource(audioElement);

console.log(track);