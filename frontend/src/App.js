import React from 'react';
import $ from 'jquery';

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

class F7 extends React.Component {
  render() {
    if (this.props.currentStep !== 7) {
      return null;
    }
    return (
      <p>Thank you! </p>
    )
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this._next = this._next.bind(this);
    this._prev = this._prev.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.timer = 0;
    this.initialTime = 180;
    this.state = {
      currentStep: 1,
      email: '',
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
      answer5: '',
      time: {},
      seconds: this.initialTime
    };
  }

  secondsToTime(secs) {
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  };


  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
    this.startTimer();
  }

  startTimer() {
    if (this.timer === 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.secondsToTime(seconds),
      seconds: seconds,
    });

    if (seconds === 0) {
      clearInterval(this.timer);
      this.timer = 0;
      this._next();
    }
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
        this._next();
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
        <div>
          Time Left: {this.state.time.m}: {this.state.time.s}
        </div>
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
          <F7
            currentStep={this.state.currentStep}
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
    currentStep = currentStep >= 6 ? 7 : currentStep + 1;
    if (currentStep !== 7) {
      this.setState({
        currentStep: currentStep,
        time: this.secondsToTime(this.initialTime),
        seconds: this.initialTime,
      });
      this.startTimer();
    } else {
      this.setState({
        currentStep: currentStep,
        time: this.secondsToTime(0),
        seconds: 0,
      });
      clearInterval(this.timer);
      this.timer = 0;
    }
  }

  _prev() {
    let currentStep = this.state.currentStep;
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    this.setState({
      currentStep: currentStep,
      time:this.secondsToTime(this.initialTime),
      seconds: this.initialTime,
    });
    this.startTimer();
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

    return null;
  }
}

export default App;