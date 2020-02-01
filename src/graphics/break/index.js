import m from 'mithril';
import gsap from 'gsap';
import { graphic, horizontalSpacer, verticalSpacer } from '../common.css';
import {
  container, breakContent, wasdIso, subtitle, cam, live, nowPlaying, spotify,
  songDetails, challenge, challengeName, challengeBar, challengeAmount,
  challengeProgress, nextRunContainer, nextRunTop, nextRunBottom, label,
} from './styles.css';

const songRep = window.NodeCG.Replicant('currentSong', 'ncg-spotify');
const challengeRep = window.NodeCG.Replicant('challenges', 'nodecg-tiltify');
const runActiveRep = window.NodeCG.Replicant('runDataActiveRun', 'nodecg-speedcontrol');
const runArrayRep = window.NodeCG.Replicant('runDataArray', 'nodecg-speedcontrol');

class NextRunsComponent {
  view() {
    const maxRunIndex = runArrayRep.value.length - 1;
    const activeRunIndex = runArrayRep.value.findIndex((r) => r.id === runActiveRep.value.id);

    const nextRun = (activeRunIndex === maxRunIndex)
      ? { game: 'End of Stream', category: 'Thanks for watching', estimate: 'See you next time!' }
      : runArrayRep.value[activeRunIndex + 1];

    return m('div', { class: nextRunContainer },
      m('div', { class: nextRunTop }, nextRun.game),
      m('div', { class: nextRunBottom }, `${nextRun.category} - EST: ${nextRun.estimate}`));
  }
}

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
      width: `${Math.min((totalAmountRaised / amount) * 100, 100)}%`,
      ease: 'expo.out',
      duration: 3,
    });
  }
}

class ChallengesComponent {
  view() {
    const now = Date.now();

    const available = challengeRep.value
      .filter((c) => (c.active && now < c.endsAt))
      .sort((c1, c2) => c1.endsAt - c2.endsAt)
      .slice(0, 3);

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
        m('div', { class: label }, 'Up Next:'),
        m(NextRunsComponent),
        m('div', { class: horizontalSpacer }),
        m('div', { class: label }, 'Donation challenges:'),
        m(ChallengesComponent)));
  }
}

window.NodeCG.waitForReplicants(songRep, challengeRep, runArrayRep, runActiveRep).then(() => {
  m.mount(document.body, BreakComponent);
});

songRep.on('change', () => { m.redraw(); });
runActiveRep.on('change', () => { m.redraw(); });
challengeRep.on('change', () => { m.redraw(); });
