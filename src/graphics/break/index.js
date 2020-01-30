import m from 'mithril';
import { graphic } from '../common.css';
import {
  container, left, right, wasdIso, subtitle, cam, live, nowPlaying, spotify,
  songDetails,
} from './styles.css';

const songRep = window.NodeCG.Replicant('currentSong', 'ncg-spotify');

class BreakComponent {
  view() {
    return m('div', { class: `${graphic} ${container}` },
      m('div', { class: left },
        m('div', { class: wasdIso }),
        m('div', { class: subtitle }, 'Warwick\'s Awesome Speedruns & Demos 2020'),
        m('div', { class: cam }),
        m('div', { class: live }, 'Live from the University of Warwick'),
        m('div', { class: nowPlaying },
          m('div', { class: spotify }),
          m('div', { class: songDetails }, `${songRep.value.name} - ${songRep.value.artist}`))),
      m('div', { class: right }));
  }
}


window.NodeCG.waitForReplicants(songRep).then(() => {
  m.mount(document.body, BreakComponent);
});

songRep.on('change', () => { m.redraw(); });
