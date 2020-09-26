const getRandomNumber = max => {
	return Math.floor(Math.random() * max)
};
const getRandomColor = () => {
	return `rgb(
		${getRandomNumber(255)},
		${getRandomNumber(255)},
		${getRandomNumber(255)}
	)`
}

const normalizeTime = time => {
	return (time < 10) ? `0${time}` : time;
}

const normalizeDay = day => {
	const days = ['Sun', 'Mon', 'Tue', 'Wedn', 'Thu', 'Fri', 'Sut'];
	return days[day];
}



class Clock {
	constructor(mountPoint = document.body) {
		this.mountPoint = mountPoint;
		this.activeMode = 0;
	}

	init() {
		this.render();
		this.attachEvents();
		this.setColors();
		this.renderTime();
		this.startTime();
		this.startStageInterval();
	}

	render() {
		this.container = document.createElement('div');
		this.content = document.createElement('h1');
		this.container.classList.add('clock');
		this.content.classList.add('clock__content');
		this.container.style.background = getRandomColor();
		this.container.append(this.content)
		this.mountPoint.append(this.container)
	}
	setColors() {
		const color = getRandomColor();
		this.container.style.background = color;
		this.content.style.color = color;
	}
	renderTime() {
		let content;
		switch (this.activeMode) {
			case 0:
				content = this.getFull()
				break;
			case 1:
				content = this.getShort();
				break;
			case 2:
				content = this.getDate();
				break;
			default:
				content = this.getFull();
		};
		this.content.textContent = content;
	}
	getDate() {
		const currentDate = new Date();
		const date = normalizeTime(currentDate.getDate());
		const day = normalizeDay(currentDate.getDay());
		const year = normalizeTime(currentDate.getFullYear());
		return `${date}/${day}/${year}`

	}
	getShort() {
		const currentDate = new Date();
		const h = normalizeTime(currentDate.getHours());
		const m = normalizeTime(currentDate.getMinutes());
		return `${h}:${m}`
	}
	getFull() {
		const currentDate = new Date();
		const h = normalizeTime(currentDate.getHours());
		const m = normalizeTime(currentDate.getMinutes());
		const s = normalizeTime(currentDate.getSeconds());

		return `${h}:${m}:${s}`
	}
	startTime() {
		clearInterval(this.timeIntervalId)
		this.timeIntervalId = setInterval(() => { this.renderTime() }, 500)
	}
	startStageInterval() {
		setInterval(() => this.setColors(), 3000)
	}
	attachEvents() {
		this.container.addEventListener('click', () => {
			this.switchMode();
		});
	}
	increaseMode() {
		if ((this.activeMode + 1) < 3) {
			this.activeMode++;
		} else {
			this.activeMode = 0;
		}
		console.log(this.activeMode)
	}
	switchMode() {
		this.increaseMode();
		this.renderTime();
		this.setColors();
	}
}