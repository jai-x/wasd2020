import m from 'mithril';
import '../common.css';
import { container } from './styles.css';

const pathString = 'M0,50 '
                 + 'C640,-25 '
                 + '500,90 '
                 + '1920,30 '
                 + 'L1920,50 '
                 + 'L0,50 Z';

class TestComponent {
  view() {
    return m('div', { class: container },
      m('svg', { viewBox: '0 0 1920 50' },
        m('path', { d: pathString, style: 'stroke: none; fill: var(--wasd-purple);' })));
  }
}

m.mount(document.body, TestComponent);
