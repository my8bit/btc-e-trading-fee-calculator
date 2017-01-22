'use strict';

import React, {Component} from 'react';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import {cyan500} from 'material-ui/styles/colors';

// import lightTheme from 'material-ui/styles/baseThemes/lightBaseTheme';

import TextField from 'material-ui/TextField';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import Header from './todo/components/Header.jsx';
import Footer from './todo/components/Footer.jsx';
import Panel from './todo/components/Panel.jsx';

import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
console.log(darkBaseTheme);
class Application extends Component {

  constructor(props) {
    super(props);
    this.spend = this.spend.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleTypeChange = this.handleTypeChange.bind(this);
    this.profit = this.profit.bind(this);
    this.threshold = this.threshold.bind(this);
    this.state = {
      fee: 0.2,
      threshold: 0,
      type: 'buy',
      profit: 0,
      todoList: [],
      filter: 'all'
    };
  }

  // getInitialState() {
  //   return {
  //     fee: 0.2,
  //     threshold: 0,
  //     type: 'buy',
  //     profit: 0,
  //     todoList: [],
  //     filter: 'all'
  //   };
  // }

  getChildContext() {
    return {muiTheme: getMuiTheme({
      palette: {
        primary1Color: "#ffc107",
        primary2Color: "#0097a7",
        primary3Color: "#757575"
      },
      appBar: {
        height: 56
      }
    })};
  }

  _onTodoAdded(todo) {
    this.setState({
      todoList: [
        todo,
        ...this.state.todoList
      ]
    });
  }

  _onTodoDeleted(id) {
    this.setState({
      todoList: this.state.todoList.filter(todo => todo.id !== id)
    });
  }

  _onTodoChanged(newTodo) {
    const newList = this.state.todoList.map(todo => {
      if (todo.id === newTodo.id) {
        return newTodo;
      }
      return todo;
    });
    this.setState({todoList: newList});
  }

  handleChange(e, val) {
    const conf = {};
    const targetId = e.target.id;
    conf[targetId] = parseFloat(val);
    this.setState(conf);
  }

  handleTypeChange(e, val) {
    this.setState({
      type: val
    });
  }

  profit() {
    const {
      fee,
      sellprice,
      sellamount,
      buyprice,
      buyamount,
      type
    } = this.state;
    const amount = type === "buy" ? buyamount : sellamount;
    const buyCommission = ((buyprice * fee / 100) * amount);
    const sellCommission = ((sellprice * fee / 100) * amount);
    const result = (((amount * sellprice) - sellCommission -
      (amount * buyprice) - buyCommission) / (type === "buy" ? 1 : buyprice)).toFixed(3);
    return result;
  }

  threshold() {
    const {
      type,
      fee,
      buyprice,
      buyamount,
      sellamount
    } = this.state;
    const amount = type === "buy" ? buyamount : sellamount;
    const buyCommission = ((buyprice * fee / 100) * amount);
    const commission = 2 * buyCommission + buyprice;
    return commission.toFixed(2);
  }

  commission() {
    const {
      buyprice,
      buyamount
    } = this.state;
    const commission = (buyprice * 0.002) * buyamount;
    return commission.toFixed(2);
  }

  spend() {
    const {
      type,
      buyprice,
      buyamount,
      sellamount
    } = this.state;
    const amount = type === "buy" ? buyamount : sellamount;
    return (amount * buyprice).toFixed(2);
  }

  render() {
    const {type} = this.state;
    const profit = this.profit();
    const commission = this.commission();
    const threshold = this.threshold();
    const spend = this.spend();
    return (
      <div id="container">
        <Header/>
        <Panel>
          <div>
            <div style={{padding: '16px'}}>
              <TextField
                id="buyamount"
                fullWidth
                onChange={this.handleChange}
                style={{boxSizing: 'border-box', marginRight: '5%', width: '45%'}}
                disabled={this.state.type === "sell"}
                type="number"
                hintText="Number of ..."
                floatingLabelText="Bitcoins to buy"
                />
              <TextField
                id="buyprice"
                fullWidth
                onChange={this.handleChange}
                style={{boxSizing: 'border-box', marginRight: '5%', width: '45%'}}
                type="number"
                hintText="At price of"
                floatingLabelText="Buying price"
                />
            </div>
            <div style={{padding: '16px'}}>
              <TextField
                id="sellamount"
                onChange={this.handleChange}
                disabled={this.state.type === "buy"}
                ref={this.ref}
                style={{boxSizing: 'border-box', marginRight: '5%', width: '45%'}}
                type="number"
                hintText="Number of ..."
                floatingLabelText="Bitcoins to sell"
                />
              <TextField
                id="sellprice"
                onChange={this.handleChange}
                style={{boxSizing: 'border-box', marginRight: '5%', width: '45%'}}
                type="number"
                hintText="At price of"
                floatingLabelText="Selling price"
                />
            </div>
            <div style={{padding: '16px'}}>
              <RadioButtonGroup
                onChange={this.handleTypeChange}
                name="shipSpeed"
                defaultSelected={this.state.type}
                >
                <RadioButton
                  style={{display: 'inline-block',
                    width: '40%',
                    marginRight: '10%'
                  }}
                  value="buy"
                  label="Buying"
                  />
                <RadioButton
                  style={{display: 'inline-block',
                    width: '40%',
                    marginRight: '10%'
                  }}
                  value="sell"
                  label="Selling"
                  />
              </RadioButtonGroup>
            </div>
          </div>
          <div style={{padding: '16px'}}>
            <span
              style={{display: 'inline-block', boxSizing: 'border-box', marginRight: '5%', width: '45%'}}
              >
            Btc-e fee is {this.state.fee}%: ${commission}
            </span>
            <span
              style={{display: 'inline-block', boxSizing: 'border-box', marginRight: '5%', width: '45%'}}
              >
            Profit threshold: ${threshold}
            </span>
          </div>
          <div style={{padding: '16px'}}>
            <span>Money spend: ${spend} </span>
          </div>
          <div style={{padding: '16px'}}>
            Profit/Loss:&nbsp;
            <span style={{color: profit < 0 ? '#F50057' : '#33691E'}}>
              <span>{type === "buy" ? "$" : "Ƀ"}</span>{profit}
            </span>
          </div>
        </Panel>
        <Footer/>
      </div>
    );
  }
}

Application.childContextTypes = {
  muiTheme: React.PropTypes.object
};

export default Application;
