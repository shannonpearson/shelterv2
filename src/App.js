import React from "react";
import ReactDOM from "react-dom";
import Header from './components/Header'
import '../scss/app.scss'

class HelloMessage extends React.Component {
    render() {
        return <div>
            <Header/>
            <div className="container">
                <h1>Hello</h1>
            </div>
        </div>
    }
}

let App = document.getElementById("app");

ReactDOM.render(<HelloMessage  />, App);
