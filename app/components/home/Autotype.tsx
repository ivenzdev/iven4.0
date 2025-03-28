import React, { Component } from 'react';
import { t } from '../../utils/translations';

class Autotype extends Component {
  updateInterval: NodeJS.Timeout | null = null;

  state = {
    display: '',
  };

  componentDidMount() {
    const p = [t('roles.founder'), t('roles.fullstackDev'), t('roles.softwareEng'), t('roles.webDesigner')];
    let forward = true;
    let currentloop = 0;
    let time = 0;
    let loop_index = 0;
    const f = () =>
      setInterval(() => {
        currentloop = p[loop_index].length;
        if (forward) {
          this.setState({
            display: this.state.display + p[loop_index][time],
          });
          time = time + 1;

          if (time === currentloop) {
            forward = false;
            clearInterval(this.updateInterval!);
            setTimeout(() => {
              this.updateInterval = f();
            }, 2000);
          }
        } else {
          this.setState({
            display: this.state.display.slice(0, -1),
          });

          if (this.state.display.length === 0) {
            loop_index = (loop_index + 1) % 3;
            forward = true;
            time = 0;

            currentloop = p[loop_index].length;
          }
        }
      }, 70);

    this.updateInterval = f();
  }

  componentWillUnmount() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }

  render() {
    return (
      <p className='autotext'>
        {t('codeWrapper.start')}
        {this.state.display}
        <span>|</span>
        {t('codeWrapper.end')}
      </p>
    );
  }
}

export default Autotype;
