export async function getBatch(batchId) {
	let newRequest = new Request('http://localhost:5000/batches/' + new URLSearchParams({
        batchId: batchId
    }), {
		method: 'GET',
		headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json',
        },
		mode: 'cors',
        cache: 'default',
	})
	await fetch(newRequest).then(response => {
		response.json().then(data => {
            let batch = {
                batchId: data.batchId,
                startTime: data.startTime,
                endTime: data.endTime,
                beerType: data.beerType,
                batchSize: data.batchSize,
                defects: data.defects,
                productionSpeed: data.productionSpeed,
                temp: data.productionSpeed,
                humidity: data.humidity,
                vibration: data.vibration
            }
            console.log(batch)
			return batch;
		}).catch(err => {
			console.log(err);
			return 10;
		})
	}).catch((err) => {
		console.log("heelooooo")
		return 10;
	})
}

export async function getBatches() {
	let newRequest = new Request('http://localhost:5000/batches/', {
		method: 'GET',
		headers: {
            'Accept': 'application/json',
        },
		mode: 'cors',
        cache: 'default',
	})
	await fetch(newRequest).then(response => {
		response.json().then(data => {
            let array = []
            for(let i = 0; i < data.length; i++){
                let batch = {
                    batchId: data[i].batchId,
                    startTime: data[i].startTime,
                    endTime: data[i].endTime,
                    beerType: data[i].beerType,
                    batchSize: data[i].batchSize,
                    defects: data[i].defects,
                    productionSpeed: data[i].productionSpeed,
                    temp: data[i].productionSpeed,
                    humidity: data[i].humidity,
                    vibration: data[i].vibration
                }
            }
            console.log(batch)
			return batch;
		}).catch(err => {
			console.log(err);
			return 10;
		})
	}).catch((err) => {
		console.log("heelooooo")
		return 10;
	})
}