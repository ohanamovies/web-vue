const fs = require('fs')
const path = require('path')
const prompt = require('prompt-sync')({ sigint: true })

const getAllFiles = function (dirPath, arrayOfFiles = []) {
	let files = fs.readdirSync(dirPath)
	files.forEach(function (file) {
		if (fs.statSync(dirPath + '/' + file).isDirectory()) {
			arrayOfFiles = getAllFiles(dirPath + '/' + file, arrayOfFiles)
		} else if (file.includes('.vue')) {
			arrayOfFiles.push(path.join(__dirname, dirPath, '/', file))
		}
	})
	return arrayOfFiles
}

let list = getAllFiles('./src/')
let translation = fs.readFileSync('tr.json', { encoding: 'utf8', flag: 'r' })

translation = JSON.parse(translation)

for (var i = 0; i < list.length; i++) {
	const action = prompt(`Read file [n] ${list[i]}:  `)
	if (action == 'n') continue

	console.log('reading file ', list[i])
	let data = fs.readFileSync(list[i], { encoding: 'utf8', flag: 'r' })

	let result = externalize(data, translation)

	console.log(translation)

	fs.writeFileSync('tr.json', JSON.stringify(translation), { encoding: 'utf8' })

	fs.writeFileSync(list[i], result, { encoding: 'utf8' })
}

function externalize(data, translation) {
	let ext_data = data
	let regex = />([^<>{=-]+)</gm
	const matches = data.matchAll(regex)

	for (const match of matches) {
		let text = match[0].replaceAll(/>|</g, '').trim()
		if (!text) continue
		let suggest = text
			.toLowerCase()
			.replaceAll(/[^a-z ]/g, '')
			.replaceAll(/ +/g, '_')
		suggest = suggest.split('_').slice(0, 4).join('_')
		console.log('\n', text, '\n')
		if (translation[suggest]) console.log('already got: ', translation[suggest])
		let action = prompt(`Replace with "${suggest}" ?    `)
		if (action == 'n') {
			console.log('ignoring... ', text)
			continue
		} else if (!action || action == 'y') {
			action = suggest
		}
		let tr = `{{ $t('${action}') }}`
		console.log('replacing ', text, ' with... ', tr)
		translation[action] = text
		ext_data = ext_data.replace(text, tr)
	}
	return ext_data
}
