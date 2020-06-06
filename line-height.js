function init() {
  var FontAttributor = Quill.import('formats/font');
  var fonts = ['impact', 'arial', 'arial-black', 'verdana', 'georgia', 'palatino', 'bookman', 'courier', 'comic'];
  FontAttributor.whitelist = fonts;
  Quill.register(FontAttributor, true);
  const Parchment = Quill.import("parchment");
  class lineHeightAttributor extends Parchment.Attributor.Class {}
  const lineHeightStyle = new lineHeightAttributor(
    "lineHeight",
    "ql-lineHeight", {
      scope: Parchment.Scope.INLINE,
      whitelist: this.lineHeightList
    }
  );
  Quill.register({
    "formats/lineHeight": lineHeightStyle
  }, true);
  var quill = new Quill('#container', {
    modules: {
      toolbar: '#toolbar'
    },
    placeholder: 'Type something here',
    theme: 'snow' // 'snow' or 'bubble'
  });
}

new Vue({
  el: '#app',
  data() {
    return {
      lineHeightList: ['0-5', '0-75', '1', '1-5', '1-75', '2'],
      sizeList: Array.from(Array(58), (item, index) => String(index + 12)),
    }
  },
  mounted() {
    init()
    this.size()
  },
  methods: {
    size() {
      const Parchment = Quill.import("parchment")
      class Font extends Parchment.Attributor.Class {}
      const FontStyle = new Font('size', 'ql-size', {
        scope: Parchment.Scope.INLINE,
        whitelist: this.sizeList
      })
      console.log('FontStyle', FontStyle);

      Quill.register({
        'formats/size': FontStyle
      }, true)
    },
  }
})