// для запуска нужно ввести  node index.js result.js play 
const readline = require('readline');
const path = require('path');
const fs = require('fs');

const x = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

function moneyThrow() {
	return Math.random() < 0.5 ? 1 : 2;
}

function logResult(file, result) {
	const filePath = path.join(process.cwd(), 'result.log');
	const logEntry = new Date().toLocaleString() + ' ' + result + '\n';

	fs.appendFile(filePath, logEntry, (err) => {
		if (err) throw Error(err);
		console.log('смотреть в файле:', file);
	});
}

function start(file) {
	x.question('Угадайте, что выпадет: 1 (орёл) или 2 (решка)?', (answer) => {

		const guess = parseInt(answer);

		if (guess !== 1 && guess !== 2) {
			console.log('Вы ввели некорректный вариант');
			return start(file);
		}

		const result = moneyThrow();

		if (result === 1) console.log('Монетка показала: орёл');
		else console.log('Монетка показала: решка');

		if (guess === result) {
			console.log('Вы выиграли');
			logResult(file, 'орёл');
		} else {
			console.log('Вы проиграли');
			logResult(file, 'решка');
		}
		x.close();
	});
}

const file2 = process.argv[2];

if (!file2) {
	console.error('нужно указать имя файла для логирования');
	process.exit(1);
}

start('result.log');

const file = process.argv[2];

if (!file) {
	console.error('нужно указать имя файла для логирования');
	process.exit(1);
}

const command = process.argv[3];

if (command === 'play') {
	start(file);
} else {
	console.error('для запуска игры введите "play"');
	process.exit(1);
}