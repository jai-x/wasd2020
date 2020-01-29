import m from 'mithril';
import { row } from '../common.css';
import { playerDetails, playerTile, playerIcon } from './styles.css';

class PlayerTile {
  view(vnode) {
    const { name } = vnode.attrs;

    return m('div', { class: `${row} ${playerTile}` },
      m('div', { class: playerIcon }),
      m('span', name));
  }
}

export default class PlayerDetailsComponent {
  view(vnode) {
    const { players } = vnode.attrs;

    return m('div', { class: playerDetails }, ...players.map((p) => m(PlayerTile, p)));
  }
}
