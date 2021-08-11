<template>
  <div>
    <label>Page:</label><input type="text" v-model="page" />
    <!--<label>Page-ref Color:</label><input type="text" v-model="pageRefColor" />
    <label>External-link Color:</label><input type="text" v-model="externalLinkColor" />-->
    <button @click="hide">Cancel</button>
    <button @click="save">Apply</button>
  </div>
</template>

<script>
// modifed https://stackoverflow.com/a/48485007/657595
function color(strColor, defaultColor){
  var s = new Option().style;
  s.color = strColor;
  return s.color == strColor ? strColor : defaultColor;
}

const defaultSettings = {
  page: "contents",
  pageRefColor: "#6fc2ef",
  externalLinkColor: "#80ffea",
}
export default {
  name: 'Settings',
  data() {
    const [s, d] = [logseq.settings, defaultSettings];
    return {
      page: s.page || d.page,
      pageRefColor: s.pageRefColor || d.pageRefColor,
      externalLinkColor: s.externalLinkColor || d.externalLinkColor,
    }
  },
  methods: {
    hide() {
      this.$emit('hideSettings');
    },
    save() {
      const [s, d] = [logseq.settings, defaultSettings];
      logseq.updateSettings({
        page: this.page || s.page || d.page,
        pageRefColor: color(this.pageRefColor, s.pageRefColor || d.pageRefColor),
        externalLinkColor: color(this.externalLinkColor, s.externalLinkColor || d.externalLinkColor),
      });
      this.hide();
    }
  }
}
</script>
