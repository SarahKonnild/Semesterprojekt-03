export async function startProduction(beerType, productionSpeed, batchSize) {
	let data = {
		'beerType': beerType,
		'productionSpeed': productionSpeed,
		'batchSize': batchSize
	}
	let fetchedData = {};
	// 'http://localhost:5000/brewster/startProduction'
	let newRequest = new Request('http://localhost:5000/brewster/startProduction', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data),
		mode: 'cors',
		cache: 'default',
	})
	await fetch(newRequest).then(response => {
		response.json().then(data => {
			console.log(data);
			return data;
		}).catch(err => {
			console.log(err);
			return 10;
		})
	}).catch((err) => {
		console.log("heelooooo")
		return 10;
	})
}

export async function stopProduction(){
	let newRequest = new Request('http://localhost:5000/brewster/stopProduction', {
		method: 'GET',
		mode: 'cors',
		cache: 'default',
	});
	await fetch(newRequest).then(result => {
		console.log(result);
	})
}

export async function resetProduction(){
	let newRequest = new Request('http://localhost:5000/brewster/resetProduction', {
		method: 'GET',
		mode: 'cors',
		cache: 'default',
	})
	await fetch(newRequest).then(result => {
		return result;
	})
}

export async function detectMaintenanceStatus(){
	return 10;
	let newRequest = new Request('http://localhost:5000/brewster/detectMaintenanceStatus', {
		method: 'GET',
		mode: 'cors',
		cache: 'default',
	})
	await fetch(newRequest).then(result => {
		return result.maintenanceStatus;
	})
}

export async function getProductionCount(){
	return 1;
	let newRequest = new Request('http://localhost:5000/brewster/getProductionCount', {
		method: 'GET',
		mode: 'cors',
		cache: 'default',
	})
	await fetch(newRequest).then(result => {
		console.log(result);
	})
}
