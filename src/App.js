import React, { Component } from 'react';
import './App.css';

const BetButton = (props) => {
    const styleDiv = {
        display: 'inline',
        padding: '20px'
    }

    const styleBtn = {
        backgroundColor: props.color,
        color: 'white',
        width: '90px'
    }

    return (
        <div style={styleDiv}>
          <button className="btn"
            style={styleBtn}
            onClick={()=>props.placeBet(props.color)}
            disabled={props.amount === 0}>
            Bet {props.color}
          </button>
        </div>
    )
}

const ResultFrame = (props) => {
    const styleNum = {
      color: getColorOfNumber(props.number),
      fontWeight: 'bold'
    }

    return (
      <div>
        <p>
        The ball landed on <span style={styleNum}>{props.number}</span>
        <br />
        <h3>You won €{props.winnings}!</h3>
        </p>
      </div>
    )
}

const RestartButton = (props) => {
    return (
      <div>
        <button className="btn btn-warning"
        onClick={props.restart}>
          <i className="fa fa-refresh"></i> Restart
        </button>
      </div>
    )
}

class App extends Component {
  static randomNumber = () => Math.floor(Math.random()*37);
  static initalState = () => ({
    bet: null,
    amount: 100,
    winnings: 0
  })

  state = App.initalState();
  placeBet = (chosenColor) => {
    let number = App.randomNumber();
    let numberColor = getColorOfNumber(number);
    let winnings = chosenColor === numberColor ? 10 : -10;
    this.setState((prevState) => ({
        bet: chosenColor,
        number: number,
        winnings: winnings,
        amount: prevState.amount + winnings,
    }));
  }

  restart = () => {
    this.setState(() => App.initalState());
  }

  render() {
    const {
        amount,
        winnings,
        number,
    } = this.state;
    return (
      <div className="App">
        <div className="page-header">
         <h1>Monte Carlo</h1>
        </div>
        <p className="App-intro">
            You have €{amount}. Place a €10 bet on the roulette wheel...
        </p>
        <BetButton color="red" placeBet={this.placeBet} amount={amount} />
        <BetButton color="black" placeBet={this.placeBet} amount={amount} />
        <br />
        <br />
        {this.state.bet ?
            <ResultFrame winnings={winnings} number={number} /> :
            <br />
        }
        <br />
        <RestartButton restart={this.restart}/>
      </div>
    );
  }
}

const getColorOfNumber = (number) => {
    if (number === 0) {
        return 'green';
    }
    return number%2 === 0 ? 'red' : 'black';
}

export default App;
