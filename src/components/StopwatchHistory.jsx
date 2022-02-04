/* eslint-disable */
import React from 'react';

class StopwatchHistory extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      history: [],
      currentTimeMs: 0,
      currentTimeSec: 0,
      currentTimeMin: 0,
    };
  }

  componentDidMount() {
    this.setHistoryState();
  }

  setHistoryState = () => {
    if (localStorage.times) {
      this.setState({ history: localStorage.times.split('|') });
    } else {
      this.setState({ history: [] });
    }
  };

  saveToLocalStorage = () => {
    if (localStorage.times) {
      localStorage.times =
        `${Date().toString()} :: ${this.props.formatTime(
          this.props.currentTimeMin
        )}:${this.props.formatTime(
          this.props.currentTimeSec
        )}:${this.props.formatTime(this.props.currentTimeMs, 'ms')}|` +
        localStorage.times;
    } else {
      localStorage.times = `${Date().toString()} :: ${this.props.formatTime(
        this.props.currentTimeMin
      )}:${this.props.formatTime(
        this.props.currentTimeSec
      )}:${this.props.formatTime(this.props.currentTimeMs, 'ms')}|`;
    }
  };

  saveTime = () => {
    if (typeof Storage !== 'undefined') {
      this.saveToLocalStorage();
    } else {
      console.error('local storage not supported');
    }
    this.setHistoryState();
  };

  resetHistory = () => {
    if (localStorage.times) {
      localStorage.removeItem('times');
    }
    this.setHistoryState();
  };
  render() {
    let h = 0;
    let min = 0;
    let s = 0;
    let ms = 0;
    return (
      <div className={'stopwatch__history'}>
        <button onClick={this.saveTime}>SAVE TIME</button>
        <button onClick={this.resetHistory}>RESET HISTORY</button>
        {this.state.history.length !== 0 &&
          <>
            <h3>History</h3>
            <ul>
              {this.state.history.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
            {this.state.history.map((item) => {
              h = item.split('::')[1],
                h !== undefined &&
                (min = min + Number(h.split(':')[0]),
                  s = s + Number(h.split(':')[1]),
                  s > 60 && (min = min + 1, s = s - 60),
                  ms = ms + Number(h.split(':')[2]),
                  ms > 999 && (s = s + 1, ms = ms - 1000)
                )
            }
            )}
            <h3>всего времени: {min}:{s}:{ms}</h3><h3>среднее время: {Math.round(min / (this.state.history.length - 1))}:{Math.round(s / (this.state.history.length - 1))}:{Math.round(ms / (this.state.history.length - 1))}</h3>
          </>}
      </div>
    );
  }
}

export default StopwatchHistory;
/* eslint-enable */
