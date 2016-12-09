/*CSS*/
  // import './libs/font-awesome-4.7.0/css/font-awesome.min.css';
  /*TinyMCE*/
  import 'tinymce/skins/lightgray/skin.min.css';
  import 'tinymce/skins/lightgray/content.min.css';
  // import 'tinymce/plugins/visualblocks/css/visualblocks.css';

  /*jQuery UI*/
  import 'jquery-ui/themes/base/core.css';
  import 'jquery-ui/themes/base/theme.css';
  // import 'jquery-ui/themes/base/selectable.css';
  import 'jquery-ui/themes/base/button.css';
  /*dialog*/
  import 'jquery-ui/themes/base/dialog.css';
  /**/
  import './css/index.css';
/*/CSS/*/

/*JS*/
  import 'jquery-ui/ui/core.js';
  import 'jquery-ui/ui/widget.js';
    import 'jquery-ui/ui/effect.js';
    import 'jquery-ui/ui/effects/effect-blind.js';
    import 'jquery-ui/ui/effects/effect-explode.js';
  // import 'jquery-ui/ui/widgets/selectable.js';
  import 'jquery-ui/ui/widgets/button.js';
  /*dialog*/
  import 'jquery-ui/ui/widgets/dialog.js';

  /**/
  // window.jQuery = window.$ = System.import('jquery').then(
  //   module => {console.log(module);return module;}
  //   ,error => console.error(error)
  //);
  window.jQuery = window.$ = require('jquery');
  /*TinyMCE*/
  // window.tinymce = require('./libs/tinymce.min.js');
  /*tinymce.jquery.min.js*/
  // import tinymce from './libs/tinymce.jquery.js';
/*/JS/*/
console.log(tinymce);
let
  wndw = $(window)
  ,docmnt = $(document)
  ,body = $(document.body)
;

;(($, window, document, undefined) => {

  $.widget('namespace.widgetname', {
    // Дифолтные значения
    options: {
      someValue: null
    },

    // Создание виджета
    // (создание элементов, назначение стилей, навешивание событий)
    _create() {
      console.log(this);
      // метод _create будет вызван автоматически
      // при первом вызове виджета.
      // здесь можно обращаться к элементу,
      // на котором создается виджет, через this.element.
      // Свойства и методы доступны через
      // this.options и this.element.addStuff();
    },

    // деструктор плагина и
    // очистка изменений в DOM, сделанных плагином
    destroy() {
      // this.element.removeStuff();
      // для версий jQuery UI 1.8, нужно вызывать
      // метод destroy базового виджета
      $.Widget.prototype.destroy.call(this);
      // для версий UI 1.9 достаточно определить
      // метод _destroy, и можно не вызывать базовый деструктор
    },

    methodB(event) {
      // метод _trigger вызывает события
      // на которые можно подписываться
      // сигнатура: _trigger('callbackName' , [eventObject],
      // [uiObject])
      // например this._trigger('hover', e /*where e.type ==
      // 'mouseenter'*/, { hovered: $(e.target)});
      this._trigger('methodA', event, {
         key: value
      });
    },

    methodA(event) {
      this._trigger('dataChanged', event, {
         key: value
      });
    },

    // Метод переопределения свойств плагина
    _setOption(key, value) {
      switch (key) {
      case 'someValue':
         //this.options.someValue = doSomethingWith(value);
         break;
      default:
         //this.options[ key ] = value;
         break;
      }

      // для версий UI 1.8 приходится
      // вызывать метод базового виджета
      $.Widget.prototype._setOption.apply(this, arguments);
      // для UI 1.9 достаточно вызвать метод _super
      // this._super('_setOption', key, value);
    }
  });











  $.widget('namespace.bgGradient', {
    _create() {
    	let
    		hue = 360
      ;
    	setInterval(() => {
    		this.element.css('background', `linear-gradient(to right, hsl(${Math.abs((hue % 720) - 360)},70%, 75%) 0%,hsl(${Math.abs(((hue + 90) % 720) - 360)},90%,75%) 100%)`);
        hue++;
    	}, 64);
    }
  });





  let
    openChatButton = $('.button-open-chat')
    ,chatWindow1 = $('.window1')
    ,chatWindow2 = $('.window2')
  ;

  /*INITIAL*/
  body.bgGradient();
  openChatButton.button().on('click', event => {
    chatWindow1.dialog('open');
    chatWindow2.dialog('open');
  });
  // $('#selectable').selectable();
  // $('#selectable').widgetname();
  chatWindow1.dialog({
    closeText: '',
    position: {
      my: 'left top',
      at: 'left top',
      of: wndw
    },

    autoOpen: false,
    show: {
      effect: 'blind',
      duration: 1000
    },
    hide: {
      effect: 'explode',
      duration: 1000
    },

  });
  chatWindow2.dialog({
    closeText: '',
    position: {
      my: 'right top',
      at: 'right top',
      of: wndw
    },

    autoOpen: false,
    show: {
      effect: 'explode',
      duration: 1000
    },
    hide: {
      effect: 'blind',
      duration: 1000
    },

  });
  /*/INITIAL/*/



})(jQuery, window, document);

tinymce.init({
  selector: '.chat-window2',
  // theme: 'inlite',
  // max_width: 500,
  // max_height: 500,
  inline: true,
  plugins: 'emoticons',
  // event_root: '#root'
  fixed_toolbar_container: '.window2__toolbar',
  toolbar: 'emoticons | insert',
  insert_button_items: 'image link | inserttable',
  insert_toolbar: 'quickimage quicktable',
  // menubar: 'file edit insert view format table tools'
  // removed_menuitems: 'undo, redo',
  menubar: false,
  menu: {
    // file: {title: 'File', items: 'newdocument'},
    // edit: {title: 'Edit', items: 'undo redo | cut copy paste pastetext | selectall'},
    // insert: {title: 'Insert', items: 'link media | template hr'},
    // view: {title: 'View', items: 'visualaid'},
    // format: {title: 'Format', items: 'bold italic underline strikethrough superscript subscript | formats | removeformat'},
    // table: {title: 'Table', items: 'inserttable tableprops deletetable | cell row column'},
    // tools: {title: 'Tools', items: 'spellchecker code'}
  },


});

tinymce.init({
  selector: '.chat-window1',
  // inline: true,
  fixed_toolbar_container: '.window1__toolbar',
});
