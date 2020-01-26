import m from 'mithril';
// import { gsap } from 'gsap';
import {
  barContainer, barLeft, barRight, barCenter,
} from './styles.css';

class TestComponent {
  view() {
    return m('div', { class: barContainer },
      m('div', { class: barLeft }, 'Left'),
      m('div', { class: barCenter }, 'Center'),
      m('div', { class: barRight }, 'Right'));
  }
}

m.mount(document.body, TestComponent);
