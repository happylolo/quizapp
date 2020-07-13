import Countdown from 'react-countdown';
import React from 'react';
import $ from 'jquery';

const Completionist = () => <span>You are good to go!</span>;

class F1 extends React.Component {
  render() {
    if (this.props.currentStep !== 1) {
      return null;
    }

    return (
      <div className="form-group">
        <label htmlFor="email">Email address</label>
        <input
          className="form-control"
          id="email"
          name="email"
          type="text"
          placeholder="Enter email"
          value={this.props.email}
          onChange={this.props.handleChange}
        />
      </div>
    );
  }
}

class F2 extends React.Component {
  render() {
    if (this.props.currentStep !== 2) {
      return null;
    }

    return (
      <div className="form-group">
        <label htmlFor="email">What would you answer to this question (1)?</label>
        <input
          className="form-control"
          id="answer1"
          name="answer1"
          type="text"
          placeholder="Your answer"
          value={this.props.answer1}
          onChange={this.props.handleChange}
        />
        <br></br>
      </div>
    );
  }
}

class F3 extends React.Component {
  render() {
    if (this.props.currentStep !== 3) {
      return null;
    }

    return (
      <div className="form-group">
        <label htmlFor="email">What would you answer to this question (2)?</label>
        <input
          className="form-control"
          id="answer2"
          name="answer2"
          type="text"
          placeholder="Your answer"
          value={this.props.answer2}
          onChange={this.props.handleChange}
        />
        <br></br>
      </div>
    );
  }
}

class F4 extends React.Component {
  render() {
    if (this.props.currentStep !== 4) {
      return null;
    }

    return (
      <div className="form-group">
        <label htmlFor="email">What would you answer to this question (3)?</label>
        <input
          className="form-control"
          id="answer3"
          name="answer3"
          type="text"
          placeholder="Your answer"
          value={this.props.answer3}
          onChange={this.props.handleChange}
        />
        <br></br>
      </div>
    );
  }
}

class F5 extends React.Component {
  render() {
    if (this.props.currentStep !== 5) {
      return null;
    }

    return (
      <div className="form-group">
        <label htmlFor="email">What would you answer to this question (4)?</label>
        <input
          className="form-control"
          id="answer4"
          name="answer4"
          type="text"
          placeholder="Your answer"
          value={this.props.answer4}
          onChange={this.props.handleChange}
        />
        <br></br>
      </div>
    );
  }
}

class F6 extends React.Component {
  render() {
    if (this.props.currentStep !== 6) {
      return null;
    }

    return (
      <div className="form-group">
        <label htmlFor="email">What would you answer to this question (5)?</label>
        <input
          className="form-control"
          id="answer5"
          name="answer5"
          type="text"
          placeholder="Your answer"
          value={this.props.answer5}
          onChange={this.props.handleChange}
        />
        <br></br>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this._next = this._next.bind(this);
    this._prev = this._prev.bind(this);
    this.state = {
      currentStep: 1,
      email: '',
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
      answer5: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.renderer = ({ hours, minutes, seconds, completed }) => {
      if (completed) {
        return <Completionist />;
      } else {
        return <span>{hours}:{minutes}:{seconds}</span>;
      }
    };
  }

  handleChange(event) {
    const {name, value} = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmit(event) {
    event.preventDefault();
    const {email, answer1, answer2, answer3, answer4, answer5} = this.state;
    $.ajax({
      type: 'POST',
      url: '/api/submit',
      dataType: 'json',
      contentType: 'application/json; charset=utf-8',
      data: JSON.stringify({
        email: email,
        answers: [answer1, answer2, answer3, answer4, answer5]
      }),
      success: (data) => {
        alert('Submission succeeded');
      },
      error: (err) => {
        console.log(err);
      }
    });
  };

  render() {
    return (
      <div id="MasterForm">
        <h1>Check Out Form</h1>
        <p> Step {this.state.currentStep} </p>
        <Countdown date={Date.now() + 5000} renderer={this.renderer}></Countdown>
        <br></br>
        <form onSubmit={this.handleSubmit}>
          <F1
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            email={this.state.email}
          />
          <F2
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            answer1={this.state.answer1}
          />
          <F3
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            answer2={this.state.answer2}
          />
          <F4
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            answer3={this.state.answer3}
          />
          <F5
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            answer4={this.state.answer4}
          />
          <F6
            currentStep={this.state.currentStep}
            handleChange={this.handleChange}
            answer5={this.state.answer5}
          />
          {this.previousButton}
          {this.nextButton}
          {this.submitButton}
        </form>
      </div>
    );
  }

  _next() {
    let currentStep = this.state.currentStep;
    currentStep = currentStep >= 5 ? 6 : currentStep + 1;
    this.setState({
      currentStep: currentStep
    });
  }

  _prev() {
    let currentStep = this.state.currentStep;
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    this.setState({
      currentStep: currentStep
    });
  }

  get previousButton() {
    let currentStep = this.state.currentStep;
    if (currentStep !== 1) {
      return (
        <button
          className="btn btn-secondary"
          type="button" onClick={this._prev}>
        Previous
        </button>
      );
    }

    return null;
  }

  get nextButton() {
    let currentStep = this.state.currentStep;
    if (currentStep < 6) {
      return (
        <button
          className="btn btn-primary float-right"
          type="button" onClick={this._next}>
        Next
        </button>
      );
    }

    return null;
  }

  get submitButton() {
    let currentStep = this.state.currentStep;
    if (currentStep === 6) {
      return (
        <input type="submit" value="Submit" />
      );
    }
  }
}

export default App;