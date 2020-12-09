export async function startProduction(beerType, productionSpeed, batchSize) {
	let data = {
		'beerType': beerType,
		'productionSpeed': productionSpeed,
		'batchSize': batchSize
	}
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
		response.json().then((data) => {
			console.log("startProduction(): response.json(): data: ", data);
		}).catch((err) => {
			console.log("startProduction(): response.json(): error: ", err);
		})
	}).catch((err) => {
		console.log("startProduction(): response.json(): fetch: ", err)
	})
}

export async function stopProduction(){
	let newRequest = new Request('http://localhost:5000/brewster/stopProduction', {
		method: 'GET',
		mode: 'cors',
		cache: 'default',
	});
	await fetch(newRequest).then(result => {
		console.log("stopProduction(): result: ", result);
	}).catch((err) => {
		console.log("stopProduction(): error: ", err);
	})
}

export async function resetProduction(){
	let newRequest = new Request('http://localhost:5000/brewster/resetProduction', {
		method: 'GET',
		mode: 'cors',
		cache: 'default',
	})
	await fetch(newRequest).then(result => {
		console.log("resetProduction(): result: ", result);
	}).catch((err) => {
		console.log("resetProduction(): error: ", err);
	})
}

export async function detectMaintenanceStatus(){
	let newRequest = new Request('http://localhost:5000/brewster/detectMaintenanceStatus', {
		method: 'GET',
		mode: 'cors',
		cache: 'default',
	})
	await fetch(newRequest).then(result => {
		console.log("detectMaintenanceStatus(): result: ", result);
	}).catch((err) => {
		console.log("detectMaintenanceStatus(): error: ", err);
	})
}

export async function getProductionCount(){
	let newRequest = new Request('http://localhost:5000/brewster/getProductionCount', {
		method: 'GET',
		mode: 'cors',
		cache: 'default',
	})
	await fetch(newRequest).then(result => {
		console.log("getProductionCount(): result: ", result);
	}).catch((err) => {
		console.log("getProductionCount(): error: ", err);
	})
}
