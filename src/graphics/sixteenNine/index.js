import m from 'mithril'; import { row, column } from '../common.css';
import {
  container, game, camera, sponsors, sponsorsInset, timer, timerText,
  timerEstimate, runDetails, runGame, runMoreDetails, playerDetails, playerIcon,
  playerTile,
} from './sixteenNine.css';

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

const PlayerTileComponent = {
  view(vnode) {
    const { name } = vnode.attrs;
    return m('div', { class: `${row} ${playerTile}` },
      m('div', { class: playerIcon }),
      m('span', name));
  },
};

const SixteenNineComponent = {
  view() {
    return m('div', { class: container },
      m('div', { class: game }),
      m('div', { class: camera }),
      m('div', { class: `${column} ${sponsors}` },
        m('div', { class: sponsorsInset })),
      m('div', { class: `${column} ${timer}` },
        m('div', { class: timerText }, timerRep.value.time),
        m('div', { class: timerEstimate }, `Estimate: ${safeRun().estimate}`)),
      m('div', { class: `${column} ${runDetails}` },
        m('div', { class: runGame }, safeRun().game),
        m('div', { class: `${row} ${runMoreDetails}` },
          m('div', safeRun().system),
          m('span', '·'),
          m('div', safeRun().release),
          m('span', '·'),
          m('div', safeRun().category))),
      m('div', { class: `${row} ${playerDetails}` },
        ...safeRun().teams[0].players.map((player) => m(PlayerTileComponent, player))));
  },
};

window.NodeCG.waitForReplicants(timerRep, runRep).then(() => {
  m.mount(document.body, SixteenNineComponent);
});


timerRep.on('change', () => { m.redraw(); });
runRep.on('change', () => { m.redraw(); });
