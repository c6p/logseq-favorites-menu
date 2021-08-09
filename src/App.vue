<template>
  <div id="wrapper" @click="onClickOutside">
    <div id="favorites-menu" v-if="ready">
      <Block v-for="b in blocks" :key="b.id" :data="b" />       
    </div>
  </div>  
</template>

<script>
import Block from "./Block.vue"

export default {
  name: 'App',
  components: {Block},
  data () {
    return {
      ready: false,
      page: "Contents",
      blocks: []
    }
  },
  mounted () {
    this.updateFavorites()
    logseq.once('ui:visible:changed', ({ visible }) => {
      visible && (this.ready = true)
    })
  },
  methods: {
    onClickOutside ({ target }) {
      const inner = target.closest('#favorites-menu')
      !inner && logseq.hideMainUI()
    },
    async updateFavorites () {
      this.blocks = await logseq.Editor.getPageBlocksTree(this.page);
      //this.blocks = await logseq.DB.datascriptQuery(`
      //  [:find (pull ?b [*])
      //  :where
      //  [?b :block/page ?p]
      //  [?p :block/original-name "${this.page}"]]
      //`);
      console.log(this.page, this.blocks)
    }
  },
}
</script>
