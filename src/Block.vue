<template>
  <div>
    <a v-for="(l,i) in links" :key="i" v-bind="getLinkProps(l)" v-on="getLinkEvents(l)">
        {{ getLinkLabel(l) }}
    </a>  
    <Block v-for="b in data.children" :key="b.id" :data="b" @hideMenu="hideMenu"/>
  </div>
</template>

<script>
export default {
  name: 'Block',
  props: ['data'],
  computed: {
    links: function() {
      return this.data.title.filter((t)=> t[0] === "Link");
    }
  },
  methods: {
    hideMenu() {
      this.$emit('hideMenu');
    },
    getLinkProps(link) {
      const l = link[1];
      if (l.url[0] == "Page_ref") // is page ref?
        return {
          "data-ref": l.url[1],
          "class": "page-ref",
        }
      else
        return {
          "href": `${l.url[1].protocol}://${l.url[1].link}`,
          "target": "_blank",
          "class": "external-link"
        }
    },
    getLinkEvents(link) {
      const l = link[1];
      if (l.url[0] == "Page_ref") // is page ref?
        return {
          "click": () => this.pushPage(l.url[1])
        }
      return {}
    },
    getLinkLabel(link) {
      const l = link[1];
      return l.label[0][1] || l.url[1];
    },
    pushPage(page) {
      logseq.App.pushState("page", {name: page});
      this.hideMenu()
    }
  }
}
</script>
