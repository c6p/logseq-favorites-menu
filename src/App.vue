<template>
  <div id="wrapper" @click="onClickOutside">
    <div id="favorites-menu" v-if="visible">
      <Settings id="settings" v-show="settings" @hideSettings="settings=false"/>
      <div v-show="!settings">
        <button id="gear" @click="settings=true">⚙️</button>
        <Block v-for="b in blocks" :key="b.id" :data="b" @hideMenu="hideMainUI"/>       
      </div>
    </div>
  </div>  
</template>

<script>
import Block from "./Block.vue"
import Settings from "./Settings.vue"

export default {
  name: 'App',
  components: {Block, Settings},
  data () {
    return {
      visible: false,
      settings: false,
      blocks: []
    }
  },
  mounted () {
    this.updateFavorites()
    logseq.on('settings:changed', (s) => {
      this.updateFavorites()
    })
    logseq.once('ui:visible:changed', ({ visible }) => {
      visible && (this.visible = true)
    })
  },
  methods: {
    hideMainUI() {
      this.settings = false;
      logseq.hideMainUI()
    },
    onClickOutside ({ target }) {
      const inner = target.closest('#favorites-menu')
      !inner && this.hideMainUI()
    },
    async updateFavorites () {
      const s = logseq.settings;
      this.blocks = await logseq.Editor.getPageBlocksTree(s.page);
    }
  },
}
</script>
