// All methods should be async when implemented

export async function fetchErrorSpeed(margin) {
	// constructs the object to send in json format to backend api
	let data = {
		'margin': margin,
	}
	// constructs a Reuest object that holds configurations for the Request to be made.
	let newRequest = new Request('http://localhost:5000/errorSpeed', {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(data),
		mode: 'cors',
		cache: 'default',
	})
	// executes the request, reads the response, returns the value received from the backend api, or logs the error.
	await fetch(newRequest).then(response => {
		response.json().then(result => {
			console.log("fetchErrorSpeed(): result: ", result);
		}).catch(err => {
			console.log("fetchErrorSpeed(): response.json(): error: ", err);
		})
	}).catch((err) => {
		console.log("fetchErrorSpeed(): error: ", err)
	})
}

export async function fetchErrorMargin(speed) {
	let data = {
		'speed': speed,
	}
	let newRequest = new Request('http://localhost:5000/errorMargin', {
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
		response.json().then(result => {
			console.log("fetchErrorMargin(): result: ", result);
		}).catch(err => {
			console.log("fetchErrorMargin(): response.json(): error: ", err);
		})
	}).catch((err) => {
		console.log("fetchErrorMargin(): error: ", err)
	})
}

export async function fetchErrorAmount(batch, margin) {
	let data = {
		'batch': batch,
		'margin': margin
	}
	let newRequest = new Request('http://localhost:5000/errorAmount', {
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
		response.json().then(result => {
			console.log("fetchErrorAmount(): result: ", result);
		}).catch(err => {
			console.log("fetchErrorAmount(): response.json(): error: ", err);
		})
	}).catch((err) => {
		console.log("fetchErrorAmount(): error: ", err)
	})
}

export async function fetchEstimatedTime(batch, speed) {
	let data = {
		'batch': batch,
		'speed': speed
	}
	let newRequest = new Request('http://localhost:5000/estimatedTime', {
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
		response.json().then(result => {
			console.log("fetchEstimatedTime(): result: ", result);
		}).catch(err => {
			console.log("fetchEstimatedTime(): response.json(): error: ", err);
		})
	}).catch((err) => {
		console.log("fetchEstimatedTime(): error: ", err)
	})
}

export async function fetchOptimalSpeed(batch, time, margin) {
	let data = {
		'batch': batch,
		'time': time,
		'margin': margin
	}
	let newRequest = new Request('http://localhost:5000/brewster/calculateOptimalSpeedUsingValids', {
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
		response.json().then(result => {
			console.log("fetchOptimalSpeed(): result: ", result);
		}).catch(err => {
			console.log("fetchOptimalSpeed(): response.json(): error: ", err);
		})
	}).catch((err) => {
		console.log("fetchOptimalSpeed(): error: ", err)
	})
}