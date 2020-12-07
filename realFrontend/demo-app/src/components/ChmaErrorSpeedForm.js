const { Component } = require("react");

class ErrorSpeedForm extends Component{
    constructor(props){
        this.setState({
            
        })

        this.fetchErrorSpeed = this.fetchErrorSpeed.bind(this)
    }

    async fetchErrorSpeed(errorMargin) {
		let newRequest = new Request('http://localhost:5000/calculateErrorSpeed', {
			method: 'GET',
			body: {
				margin: errorMargin
			},
			mode: 'cors',
			cache: 'default'
		})

		await fetch(newRequest).then(response => {
			this.setState({
                speed: response.speed
            })
		})
	  }

    render(){
        
        return(
            <div>
                
            </div>
        )
    }
}