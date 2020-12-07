export async function startProduction(beerType, productionSpeed, batchSize) {
		let newRequest = new Request('http://localhost:5000/start-production', {
			method: 'POST',
			body: {
                beerType: beerType,
                speeed: productionSpeed,
                batch: batchSize
			},
			mode: 'cors',
			cache: 'default'
		})
		await fetch(newRequest).then(response => {
			return response;
		})
	  
}