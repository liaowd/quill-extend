<template>
<div>

  <div id="toolbar">
    <select class="ql-lineHeight">
      <option v-for="(lineHeight,index) in lineHeightList" :key="lineHeight" :value="lineHeight"
        :selected="index === 3">{{ lineHeight }}</option>
    </select>
    <!-- <select class="ql-size">
      <option v-for="(size,index) in sizeList" :selected="index===30" :value="size" :key="size">{{ size + 'px'}}
      </option>
    </select> -->

        <span class="ql-formats">
            <button class="ql-bold"></button>
            <button class="ql-italic"></button>
            <button class="ql-underline"></button>
            
        </span>
        <span class="ql-formats">
            <select class="ql-align"></select>
            <select class="ql-color ql-picker ql-color-picker">
              <option value="#3255a4"></option>
            </select>
            <select class="ql-background ql-picker ql-color-picker">
              <option value="#3255a4"></option>
            </select>
        </span>
        <span class="ql-format-group">
          <select title="Size" class="ql-size">
            <option value="14px">14px</option>
            <option value="16px">16px</option>
            <option value="20px">20px</option>
            <option value="36px">24px</option>
          </select>
        </span>

        <span class="ql-list">
          <button class="ql-list" value="ordered" type="button"></button>
          <button class="ql-list" value="bullet" type="button"></button>
        </span>

        <span class="ql-formats">
            <button class="ql-image"></button>
            <button class="ql-link"></button>
            <button class="ql-clean"></button>
            <button class="ql-indent"></button>
        </span>

  </div>
  <div id="container"></div>

  
</div>
</template>

<script>
/* eslint-disable */
import Quill from 'quill'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
window.Quill = Quill 
import './quill_test.less'

let fontSizeStyle = Quill.import('attributors/style/size')
fontSizeStyle.whitelist = ['14px', '16px', '20px', '24px', '36px']
Quill.register(fontSizeStyle, true)


export default {
  data(){
    return{
      lineHeightList: ['0-5', '0-75', '1', '1-5', '1-75', '2'],
      sizeList: Array.from(Array(58), (item, index) => String(index + 12)),      
    }
  },
  methods:{
    quillInit(){
      window.quill = new Quill('#container', {
        modules: {
          toolbar: '#toolbar'
          // toolbar:[
          //   // 加粗、格式刷、首行缩进、撤销、行间距。视频。
          //   ['bold', 'italic', 'underline','lineHeight'],
          //   [{ list: 'ordered' }, { list: 'bullet' }],
          //   [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
          //   [{ size: ['14px', '16px', '20px', '24px', '36px'] }],
          //   [
          //     {
          //       color: [
          //         '#ffffff',
          //         '#3255a4',
          //         '#dd3b48',
          //         '#7784bf',
          //         '#333333',
          //         '#666666',
          //       ],
          //     },
          //     { background: ['#3255a4'] },
          //   ],
          //   [{ 'align': [] }],
          //   ['clean','image','link'],
          //   [{ 'font': [] }],
          // ]
        },
        placeholder: 'Type something here',
        theme: 'snow' // 'snow' or 'bubble'
      });      
    },
    size() {
      // const Parchment = Quill.import("parchment")
      // class Font extends Parchment.Attributor.Class {}
      // const FontStyle = new Font('size', 'ql-size', {
      //   scope: Parchment.Scope.INLINE,
      //   whitelist: this.sizeList
      // })
      // console.log('FontStyle', FontStyle);

      // Quill.register({
      //   'formats/size': FontStyle
      // }, true)
    },
    _fontInit() {
      var FontAttributor = Quill.import('formats/font');
      // var fonts = ['impact', 'arial', 'arial-black', 'verdana', 'georgia', 'palatino', 'bookman', 'courier', 'comic'];
      // FontAttributor.whitelist = fonts;
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

    }    
  },
  mounted(){
    this._fontInit()
    // this.size()
    this.quillInit()
  }
}
</script>

<style>

</style>