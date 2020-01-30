import m from 'mithril';

import PlayerDetailsComponent from '../playerDetails';
import TimerComponent from '../timer';

import { row, column, graphic } from '../common.css';
import {
  background, game, camera, sponsors, sponsorsInset, timer,
  timerEstimate, runDetails, runGame, runMoreDetails,
} from './styles.css';

const timerRep = window.NodeCG.Replicant('timer', 'nodecg-speedcontrol');
const runRep = window.NodeCG.Replicant('runDataActiveRun', 'nodecg-speedcontrol');

const blankRun = {
  game: 'Some Cool Game',
  system: 'Arch Linux',
  release: '1996',
  category: 'Nipple%',
  estimate: '00:00:00',
  teams: [
    {
      players: [
        { name: 'jai_' },
      ],
    },
  ],
};

const safeRun = () => (runRep.value || blankRun);

class FourThreeComponent {
  view() {
    return m('div', { class: `${graphic} ${background}` },
      m('div', { class: game }),
      m('div', { class: camera },
        m(PlayerDetailsComponent, { players: safeRun().teams[0].players })),
      m('div', { class: `${column} ${sponsors}` },
        m('div', { class: sponsorsInset })),
      m('div', { class: `${column} ${timer}` },
        m(TimerComponent, { small: true, timerRep }),
        m('div', { class: timerEstimate }, `Estimate: ${safeRun().estimate}`)),
      m('div', { class: `${column} ${runDetails}` },
        m('div', { class: runGame }, safeRun().game),
        m('div', { class: `${row} ${runMoreDetails}` },
          m('div', safeRun().system),
          m('span', '·'),
          m('div', safeRun().release),
          m('span', '·'),
          m('div', safeRun().category))));
  }
}

window.NodeCG.waitForReplicants(timerRep, runRep).then(() => {
  m.mount(document.body, FourThreeComponent);
});


timerRep.on('change', () => { m.redraw(); });
runRep.on('change', () => { m.redraw(); });
