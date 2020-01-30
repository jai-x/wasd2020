import m from 'mithril';
import gsap from 'gsap';

import {
  timerContainer, timerFlash, timerText, timerTextSmall,
} from './styles.css';

class FlashComponent {
  view() {
    return m('div', { class: timerFlash });
  }

  oncreate(vnode) {
    const flashAnim = gsap.to(vnode.dom, {
      opacity: 1,
      duration: 0.5,
      easing: 'power4',
      repeat: 1,
      yoyo: true,
      paused: true,
    });

    const stopAnim = gsap.to(vnode.dom, {
      opacity: 1,
      duration: 0.5,
      paused: true,
    });

    window.nodecg.listenFor('timerStart', 'nodecg-speedcontrol', () => {
      flashAnim.restart();
    });

    window.nodecg.listenFor('timerStop', 'nodecg-speedcontrol', () => {
      stopAnim.restart();
    });

    window.nodecg.listenFor('timerReset', 'nodecg-speedcontrol', () => {
      gsap.set(vnode.dom, { opacity: 0 });
    });
  }
}

export default class TimerComponent {
  view(vnode) {
    const { small } = vnode.attrs;
    const { time } = vnode.attrs.timerRep.value;

    return m('div', { class: timerContainer },
      m(FlashComponent),
      m('div', { class: (small ? timerTextSmall : timerText) }, time));
  }
}
