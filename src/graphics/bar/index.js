import m from 'mithril';
import { gsap } from 'gsap';
import { testText } from './styles.css';

class TestComponent {
  oncreate(vnode) {
    gsap.to(vnode.dom, { y: 100, repeat: -1 });
  }

  view() {
    return m('h1', { class: testText }, 'Test Component');
  }
}

m.mount(document.body, TestComponent);
