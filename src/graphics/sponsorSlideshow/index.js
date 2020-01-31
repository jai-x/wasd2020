import m from 'mithril';
import gsap from 'gsap';

import '../common.css';
import {
  container, sponsor, nse, endgameGear, belong, kolink, noblechairs, monster,
  overclockers,
} from './styles.css';

export default class SponsorSlideshowComponent {
  view() {
    return m('div', { class: container },
      m('div', { class: `${sponsor} ${nse}` }),
      m('div', { class: `${sponsor} ${endgameGear}` }),
      m('div', { class: `${sponsor} ${belong}` }),
      m('div', { class: `${sponsor} ${kolink}` }),
      m('div', { class: `${sponsor} ${noblechairs}` }),
      m('div', { class: `${sponsor} ${monster}` }),
      m('div', { class: `${sponsor} ${overclockers}` }));
  }

  oncreate(vnode) {
    const tl = gsap.timeline({ repeat: -1 });

    const hold = 10;

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
