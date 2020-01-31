import m from 'mithril';

import PlayerDetailsComponent from '../playerDetails';
import TimerComponent from '../timer';

import { verticalSpacer, graphic } from '../common.css';
import {
  background, game, camera, sponsorsArea,
  timerEstimate, runDetails, runGame, bottomRow, runDetailRow,
  timerArea,
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

class SixteenNineComponent {
  view() {
    return m('div', { class: `${graphic} ${background}` },
      m('div', { class: bottomRow },
        m('div', { class: runDetails },
          m('div', { class: runGame }, safeRun().game),
          m('div', { class: runDetailRow },
            m('div', safeRun().system),
            m('div', '·'),
            m('div', safeRun().release),
            m('div', '·'),
            m('div', safeRun().category))),
        m('div', { class: verticalSpacer }),
        m('div', { class: timerArea },
          m(TimerComponent, { timerRep }),
          m('div', { class: timerEstimate }, `Estimate: ${safeRun().estimate}`))),
      m('div', { class: game }),
      m('div', { class: camera },
        m(PlayerDetailsComponent, { players: safeRun().teams[0].players })),
      m('div', { class: sponsorsArea },
        m('div', { class: verticalSpacer }),
        m('div', { class: verticalSpacer })));
  }
}

window.NodeCG.waitForReplicants(timerRep, runRep).then(() => {
  m.mount(document.body, SixteenNineComponent);
});

timerRep.on('change', () => { m.redraw(); });
runRep.on('change', () => { m.redraw(); });
