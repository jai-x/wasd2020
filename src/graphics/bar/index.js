import m from 'mithril';
import gsap from 'gsap';

import { verticalSpacer } from '../common.css';
import {
  container, wasdIso, specialEffect, time, total, cta, ctaItem,
} from './styles.css';

const totalRep = window.NodeCG.Replicant('total', 'nodecg-tiltify');

class TimeComponent {
  view() {
    const now = new Date();

    return m('div', { class: time }, `${now.getHours()}:${now.getMinutes()}`);
  }
}

class CTAComponent {
  view() {
    return m('div', { class: cta },
      m('div', { class: ctaItem }, 'Warwick\'s Awesome Speedruns & Demos 2020'),
      m('div', { class: ctaItem }, 'Fundrasing for SpecialEffect'),
      m('div', { class: ctaItem }, 'wasd.warwick.gg/donate'));
  }

  oncreate(vnode) {
    const tl = gsap.timeline({ repeat: -1 });

    const hold = 13;

    Array.from(vnode.dom.children).forEach((childElement) => {
      tl.from(childElement, { opacity: 0 });
      tl.to({}, hold, {});
      tl.to(childElement, { opacity: 0 });
    });

    this.timeline = tl;
  }

  onremove() {
    this.timeline.kill();
  }
}

class BarComponent {
  view() {
    return m('div', { class: container },
      m('div', { class: wasdIso }),
      m('div', { class: verticalSpacer }),
      m('div', { class: specialEffect }),
      m('div', { class: total }, `£${totalRep.value}`),
      m('div', { class: verticalSpacer }),
      m(CTAComponent),
      m('div', { class: verticalSpacer }),
      m(TimeComponent));
  }
}

// Empty update for time component
function refresh() {
  m.redraw();
  window.setTimeout(refresh, 5000);
}

window.NodeCG.waitForReplicants(totalRep).then(() => {
  m.mount(document.body, BarComponent);
  refresh();
});

totalRep.on('change', () => { m.redraw(); });
