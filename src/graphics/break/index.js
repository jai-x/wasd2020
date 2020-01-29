import m from 'mithril';
import '../common.css';
import { container } from './styles.css';

class BreakComponent {
  view() {
    return m('div', { class: container });
  }
}

m.mount(document.body, BreakComponent);
