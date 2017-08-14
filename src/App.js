import React, { Component } from 'react';
import Slider from 'material-ui/Slider';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import './App.css';
import _ from 'lodash';

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
            disabled={props.amount <= 0}>
            Bet {props.color}
          </button>
        </div>
    )
}

const ResultFrame = (props) => {
    return (
      <div>
        <h3>You {props.winnings > 0 ? 'won' : 'lost'} €{
            props.winnings > 0 ? props.winnings : props.winnings * -1
        }!</h3>
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

class NumberOfBetsSetter extends Component {
    styleSlider = {
        width: '200px',
        margin: 'auto',
    }
    styleDiv = {
        textAlign: 'center',
        display: 'block',
        margin: 'auto',
    }
    state = {
        value: 5
    }

    updateNumberOfBets = (event, value) => {
        this.props.setNumberOfBets(value);
        this.setState({value: value});
    }

    render () {
    return (
      <div style={this.styleDiv}>
        <MuiThemeProvider>
          <Slider
            style={this.styleSlider}
            min={0}
            max={100}
            step={1}
            value={this.state.value}
            onChange={this.updateNumberOfBets}
          />
        </ MuiThemeProvider>
        <p className="App-intro">Place a €10 bet on the roulette wheel {this.state.value} times...</p>
      </div>
    )
    }
}

class App extends Component {
  static randomNumber = () => Math.floor(Math.random()*37);
  static initalState = () => ({
    bet: null,
    amount: 100,
    winnings: 0,
    numberOfBets: 10,
  })

  state = App.initalState();
  placeBet = (chosenColor) => {
    let winnings = 0;
    _.times(this.state.numberOfBets, ()=> {
        let number = App.randomNumber();
        let numberColor = getColorOfNumber(number);
        winnings = winnings + (chosenColor === numberColor ? 10 : -10);
        console.log(number);
    })
    this.setState((prevState) => ({
        bet: chosenColor,
        winnings: winnings,
        amount: prevState.amount + winnings,
    }));
  }

  setNumberOfBets = (number) => {
    this.setState(() => ({
      numberOfBets: number,
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
            You have €{amount}.
        </p>
        <br />
        <p className="App-intro"> How many times would you like to bet?</p>
        <NumberOfBetsSetter setNumberOfBets={this.setNumberOfBets}/>
        <br />
        <BetButton color="red" placeBet={this.placeBet} amount={amount} />
        <BetButton color="black" placeBet={this.placeBet} amount={amount} />
        <br />
        {this.state.bet ?
            <ResultFrame winnings={winnings} number={number} /> :
            <br />
        }
        <br />
        <RestartButton restart={this.restart} />
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
