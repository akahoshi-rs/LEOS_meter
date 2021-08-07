

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
	let animation_img = document.createElement('img');//GIfの再生速度を変える？
	animation_box.appendChild(animation_img);
	meter.appendChild(animation_box);
	let int_box = document.createElement('div');
	int_box.style.display = 'flex';
	int_box.style.alignItems = 'center';
	let int = document.createElement('p');
	int.style.color = '#454545';
	int.style.fontSize = '16px';
	let unit = document.createElement('p');
	unit.style.color = '#454545';
	unit.textContent = 'dB';
	unit.style.fontSize = '16px';
	int_box.appendChild(int); int_box.appendChild(unit);
	meter.appendChild(int_box);
	wrapper.insertBefore(meter, wrapper.firstChild);
}

function audio() {
	const audioElement = document.getElementsByClassName('html5-main-video')[0];
	console.log(audioElement);
	const audioContext = new AudioContext();


	// const track = audioContext.createMediaElementSource(audioElement);
	let analyser = audioContext.createAnalyser();
	// source = audioContext.createMediaStreamSource(track);
	let source = audioContext.createMediaElementSource(audioElement);
	source.connect(analyser);
	analyser.fftSize = 2048;
	var bufferLength = analyser.frequencyBinCount;
	var dataArray = new Uint8Array(bufferLength);

	analyser.getByteTimeDomainData(dataArray);
	console.log(dataArray);
	console.log(analyser);
}

window.addEventListener('load', () => {
	console.log('LEOS_meter is running.');
	setTimeout(() => {
		add_container(), audio()
	}, 500);
})