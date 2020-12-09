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
	await fetch(newRequest).then((response) => {
		response.json().then((result) => {
            console.log("getBatch(id): result: ", result)
		}).catch((err) => {
			console.log("getBatch(id): response.json(): error: ", err);
		})
	}).catch((err) => {
		console.log("getBatch(id): error: ", err)
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
	await fetch(newRequest).then((response) => {
		response.json().then((result) => {
            console.log("getBatches(): result: ", result)
		}).catch(err => {
			console.log("getBatches(): response.json(): error: ", err);
		})
	}).catch((err) => {
		console.log("getBatches(): error: ", err)
	})
}