import m from 'mithril';
import gsap from 'gsap';
import { graphic, verticalSpacer } from '../common.css';
import {
  container, breakContent, wasdIso, subtitle, cam, live, nowPlaying, spotify,
  songDetails, challenge, challengeName, challengeBar, challengeAmount,
  challengeProgress, // nextRunsnext, RunItem,
} from './styles.css';

const songRep = window.NodeCG.Replicant('currentSong', 'ncg-spotify');
const challengeRep = window.NodeCG.Replicant('challenges', 'nodecg-tiltify');

/*
class NextRunsComponent {
  view() {
    return m('div', { class: nextRuns },
      m('div', { class: nextRunItem }, 'Furi'));
  }
}
*/

class DonationChallengeComponent {
  view(vnode) {
    const { name, totalAmountRaised, amount } = vnode.attrs;

    return m('div', { class: challenge },
      m('div', { class: challengeName }, name),
      m('div', { class: challengeBar },
        m('div', { class: challengeAmount }, `£${totalAmountRaised} / £${amount}`),
        m('div', { class: challengeProgress })));
  }

  oncreate(vnode) {
    const { totalAmountRaised, amount } = vnode.attrs;
    const bar = vnode.dom.children[1].children[1];

    gsap.to(bar, {
      width: `${(totalAmountRaised / amount) * 100}%`,
      ease: 'expo.out',
      duration: 3,
    });
  }
}

class ChallengesComponent {
  view() {
    const now = Date.now();

    const available = challengeRep.value.filter((c) => (c.active && now < c.endsAt)).slice(0, 3);

    if (available.count < 1) {
      return null;
    }

    return available.map((c) => m(DonationChallengeComponent, c));
  }
}

class BreakComponent {
  view() {
    return m('div', { class: `${graphic} ${container}` },
      m('div', { class: breakContent },
        m('div', { class: wasdIso }),
        m('div', { class: subtitle }, 'Warwick\'s Awesome Speedruns & Demos 2020'),
        m('div', { class: cam },
          m('div', { class: live }, '🔴  University of Warwick, UK')),
        m('div', { class: nowPlaying },
          m('div', { class: spotify }),
          m('div', { class: songDetails }, `${songRep.value.name} - ${songRep.value.artist}`))),
      m('div', { class: verticalSpacer }),
      m('div', { class: breakContent },
        m(ChallengesComponent)));
  }
}

window.NodeCG.waitForReplicants(songRep, challengeRep).then(() => {
  m.mount(document.body, BreakComponent);
});

songRep.on('change', () => { m.redraw(); });
