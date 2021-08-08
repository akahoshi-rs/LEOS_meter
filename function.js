'use strict';

function add_container() {
	const wrapper = document.getElementById('primary-inner');
	let meter = document.createElement('div');
	meter.id = 'LEOS_meter';
	meter.style.boxSizing = 'border-box';
	meter.style.width = '100%';
	meter.style.height = '48px';
	meter.style.padding = '0 20px';
	meter.style.backgroundColor = '#000';
	meter.style.border = '1px solid #454545';
	meter.style.display = 'flex';
	meter.style.justifyContent = 'space-between';
	meter.style.alignItems = 'center';
	let animation_box = document.createElement('div');
	let animation_gif = document.createElement('img');//GIfの再生速度を変える？
	animation_gif.id = 'LEOS_gif';
	animation_gif.style.maxHeight = '46px';
	animation_gif.style.objectFit = 'contain';
	animation_gif.setAttribute('sec', chrome.runtime.getURL('images/mameneko.GIF'));
	animation_box.appendChild(animation_gif);
	meter.appendChild(animation_box);
	let int_box = document.createElement('p');
	int_box.style.height = '48px';
	int_box.style.display = 'flex';
	int_box.style.alignItems = 'flex-end';
	let int = document.createElement('span');
	int.id = 'LEOS_int';
	int.style.color = '#454545';
	int.style.fontSize = '36px';
	let unit = document.createElement('span');
	unit.style.color = '#454545';
	// unit.textContent = 'dB';
	unit.textContent = 'Gain';
	unit.style.fontSize = '20px';
	unit.style.paddingBottom = '4px';
	int_box.appendChild(int); int_box.appendChild(unit);
	meter.appendChild(int_box);
	wrapper.insertBefore(meter, wrapper.firstChild);
}

function audio() {
	let gif_ctrl = document.getElementById('LEOS_gif');
	let int = document.getElementById('LEOS_int')
	const audioElement = document.getElementsByClassName('html5-main-video')[0];
	var audioCtx = new AudioContext();
	let source = audioCtx.createMediaElementSource(audioElement);
	var analyser = audioCtx.createAnalyser();

	analyser.fftSize = 32; //音域の数
	var bufferLength = analyser.frequencyBinCount;
	var dataArray = new Uint8Array(bufferLength);
	analyser.getByteTimeDomainData(dataArray);

	var bufferLength = analyser.frequencyBinCount;

	//↓の配列に音域ごとの大きさが入る
	var dataArray = new Uint8Array(bufferLength);

	source.connect(analyser).connect(audioCtx.destination);
	getAudio();


	function getAudio() {
		requestAnimationFrame(getAudio);
		analyser.getByteFrequencyData(dataArray);
		//音域の総和を得る
		var dNum = 0;
		for (var i = 0; i < dataArray.length; i++) {
			dNum += dataArray[i];
		}

		// let inputY = (dNum / 100);
		// let xMax = 0;
		// let xMin = -30;

		// let yMax = 20;
		// let yMin = 0;

		// let percent = (inputY - yMin) / (yMax - yMin);
		// let outputX = percent * (xMax - xMin) + xMin;

		// int.textContent = Number.parseFloat(outputX).toFixed(2);
		int.textContent = ((Math.floor(dNum / 10).toFixed(1)) * 10);

		if (dNum == 0) {
			if (!gif_ctrl.classList.contains('play')) {
				return;
			} else {
				gif_ctrl.setAttribute('class', '');
				gif_ctrl.setAttribute('src', chrome.runtime.getURL('images/mameneko.GIF'));
			}
		} else if (dNum <= 1000) {
			if (gif_ctrl.classList.contains('play')) {
				return;
			} else {
				gif_ctrl.setAttribute('class', '');
				gif_ctrl.classList.add('play');
				gif_ctrl.setAttribute('src', chrome.runtime.getURL('images/mameneko_play.GIF'));
			}
		} else {
			if (gif_ctrl.classList.contains('fast')) {
				return;
			} else {
				gif_ctrl.setAttribute('class', '');
				gif_ctrl.classList.add('fast');
				gif_ctrl.setAttribute('src', chrome.runtime.getURL('images/mameneko_fast.GIF'));
			}
		}
	}
}

window.addEventListener('load', () => {
	console.log('LEOS_meter is running.');
	setTimeout(() => {
		add_container(), audio()
	}, 500);
})