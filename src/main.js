import '@logseq/libs';
import { createApp } from 'vue';
import App from './App.vue';
import './index.css'

function createModel() {
  return {
    showFavoritesMenu() {
      logseq.showMainUI()
    },
  }
}

function main() {
  logseq.setMainUIInlineStyle({
    zIndex: 11,
  })

  logseq.provideUI({
    key: 'show-favorites',
    path: '#head',
    template: `<a data-on-click="showFavoritesMenu" oncontextmenu="alert('test')" class="opacity-60 hover:opacity-100">⭐</a>`,
  })

  createApp(App).mount('#app');
}

// bootstrap
logseq.ready(createModel()).then(main);
