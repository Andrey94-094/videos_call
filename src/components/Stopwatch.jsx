/* eslint-disable */
import React from 'react';
import StopwatchDisplay from './StopwatchDisplay';
import StopwatchHistory from './StopwatchHistory';

class Stopwatch extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      running: false,
      currentTimeMs: 0,
      currentTimeSec: 0,
      currentTimeMin: 0,
    };
  }


  formatTime = (val, ...rest) => {
    let value = val.toString();
    if (value.length < 2) {
      value = '0' + value;
    }
    if (rest[0] === 'ms' && value.length < 3) {
      value = '0' + value;
    }
    return value;
  };

  start = () => {
    if (!this.state.running) {
      this.setState({ running: true });
      this.watch = setInterval(() => this.pace(), 10);
    }
  };

  stop = () => {
    this.setState({ running: false });
    clearInterval(this.watch);
  };

  pace = () => {
    this.setState({ currentTimeMs: this.state.currentTimeMs + 10 });
    if (this.state.currentTimeMs >= 1000) {
      this.setState({ currentTimeSec: this.state.currentTimeSec + 1 });
      this.setState({ currentTimeMs: 0 });
    }
    if (this.state.currentTimeSec >= 60) {
      this.setState({ currentTimeMin: this.state.currentTimeMin + 1 });
      this.setState({ currentTimeSec: 0 });
    }
  };

  reset = () => {
    this.setState({
      currentTimeMs: 0,
      currentTimeSec: 0,
      currentTimeMin: 0,
    });
  };

  render() {
    return (
      <div className={'stopwatch'}>
        {(this.state.currentTimeSec !== 0 || this.state.currentTimeMs !== 0) && this.state.running === false ?
          <div>
            <button onClick={this.reset}>RESET</button>
          </div> :
          this.state.running === false ? (
            <button onClick={this.start}>
              Start
            </button>
          ) :
            (
              <button onClick={this.stop}>STOP</button>
            )
        }
        <StopwatchDisplay
          ref="display"
          {...this.state}
          formatTime={this.formatTime}
        />
        <StopwatchHistory {...this.state} formatTime={this.formatTime} />
      </div>
    );
  }
}

export default Stopwatch;
/* eslint-enable */
