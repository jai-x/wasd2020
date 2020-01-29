import m from 'mithril';
import '../common.css';
import {
  container, left, right, center,
} from './styles.css';

class TestComponent {
  view() {
    return m('div', { class: container },
      m('div', { class: left }, 'Left'),
      m('div', { class: center }, 'Center'),
      m('div', { class: right }, 'Right'));
  }
}

m.mount(document.body, TestComponent);
