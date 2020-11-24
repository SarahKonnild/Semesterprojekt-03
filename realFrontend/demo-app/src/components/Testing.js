import React, { Component } from 'react';
 
class Testing extends Component {
    constructor(props) {
        super(props);
     
        this.state = {
          list: [[1, 2],[3,4]]
        };
      }
     
      render() {
        return (
          <div>
            <ul>
              {(this.state.list || []).map(item => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        );
      }
    }
 
export default Testing;