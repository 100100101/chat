/*CSS*/
  // import './libs/font-awesome-4.7.0/css/font-awesome.min.css';
  /*TinyMCE*/
  import 'tinymce/skins/lightgray/skin.min.css';
  import 'tinymce/skins/lightgray/content.min.css';
  import 'tinymce/skins/lightgray/content.inline.min.css';
  // import 'tinymce/plugins/visualblocks/css/visualblocks.css';

  /*jQuery UI*/
  import 'jquery-ui/themes/base/core.css';
  import 'jquery-ui/themes/base/theme.css';
  import 'jquery-ui/themes/base/resizable.css';
  // import 'jquery-ui/themes/base/selectable.css';
  import 'jquery-ui/themes/base/button.css';
  /*dialog*/
  import 'jquery-ui/themes/base/dialog.css';
  /**/
  import './css/index.css';

/*JS*/

  /*jQuery*/
  import jQuery from 'jquery';


  /*jQuery UI*/
  import 'jquery-ui/ui/core.js';
  import 'jquery-ui/ui/widget.js';
    import 'jquery-ui/ui/effect.js';
    import 'jquery-ui/ui/effects/effect-blind.js';
    import 'jquery-ui/ui/effects/effect-explode.js';
  // import 'jquery-ui/ui/widgets/selectable.js';
  import 'jquery-ui/ui/widgets/button.js';
  /*dialog*/
  import 'jquery-ui/ui/widgets/dialog.js';

  /*TinyMCE*/
  // import * as tinymce from 'tinymce';
  import 'tinymce/plugins/emoticons/index.js';

  /*Vue*/
  import Vue from 'vue';

window.jQuery = window.$ = jQuery;

window.vm = new Vue({
  // el: '.main-content',
  data(){
    return {
      chat: $.extend(true, require('./data.js'), JSON.parse(localStorage.getItem('chat')) || {}),
    };
  },
  components: {
    // ['dialog-list'](){
    //   return System.import('./components/dialog-list/index.vue').then(
    //     module => {return module;}
    //     ,error => console.error(error)
    //   )/*.catch(
    //     error => console.error('catch: ' + error)
    //   )*/;
    // },
    'dialog-list': require('./components/dialog-list/index.vue'),
  },

  beforeCreate() {

	},
	created() {

	},
	beforeMount(){

	},
	mounted(){

	},
	beforeUpdate(){

	},
	updated(){

	},
	activated(){

	},
	deactivated(){

	},
	beforeDestroy(){

	},
	destroyed(){

	},
})
  .$mount('.main-content');




;(($, window, document, undefined) => {

  let
    wndw = $(window)
    ,docmnt = $(document)
    ,body = $(document.body)
    ,buttonsUI = $('.ui-button')
  ;


  $.widget('view.chat', {
    options: {
      someValue: null
    },

    _create() {
      let self = this;
      this.sendButtons = buttonsUI.filter('.chat-window__send-message');
      this.openChatButton = $('.button-open-chat');
      this.clearLocalStorageButton = $('.clear-local-storage');
      this.chatWindows = $('[class*=chat-window]:not([class*=chat-window_])');
      this.chatWindow1 = this.chatWindows.filter('.chat-window1');
      this.chatWindow2 = this.chatWindows.filter('.chat-window2');
      this.tinyTextareas = $('.chat-window__textarea');

      // $.extend(tinymce)


      this.openChatButton.on('click', event => {
        this.chatWindow1.dialog('open');
        this.chatWindow2.dialog('open');
      });

      this.clearLocalStorageButton.on('click', event => {
        localStorage.removeItem('chat');
      });


      this.chatWindow1.dialog({
        title: 'Admin',

        closeText: '',

        position: {
          my: 'left top',
          at: 'left top',
          of: body
        },
        maxHeight: wndw.outerHeight() / 3,
        minHeight: 600,
        // autoOpen: false,
        show: {
          effect: 'blind',
          duration: 1000
        },
        hide: {
          effect: 'explode',
          duration: 1000
        },

        buttons: {
          ['Отправить']() {
            let _this = $(this);
            self.send(_this, self.editor2);
          }
        },

        create(){
          tinymce.init({
            // language: 'ru',
            target: self.chatWindow1.find(self.tinyTextareas)[0],
            // selector: '.chat-window1 .chat-window__textarea',
            // inline: true,
            fixed_toolbar_container: '.chat-window1__toolbar',
            setup(editor) {
              editor.on('init', event => {
                self.editor2 = editor;

                // editor.on('focus', event => {
                //   editor.setContent('');
                //   editor.off('focus');
                // });

              });
            },
          });
        },

      });




      this.chatWindow2.dialog({
        title: 'Здравствуйте Client',
        closeText: '',
        position: {
          my: 'right top',
          at: 'right top',
          of: body
        },
        maxHeight: wndw.outerHeight() / 3,
        minHeight: 400,
        autoOpen: false,
        show: {
          effect: 'explode',
          duration: 1000
        },
        hide: {
          effect: 'blind',
          duration: 1000
        },

        buttons: {
          ['Отправить']() {
            let _this = $(this);
            self.send(_this, self.editor1);
          }
        },

        create(){
          tinymce.init({
            target: self.chatWindow2.find(self.tinyTextareas)[0],
            // selector: '.chat-window2 .chat-window__textarea',
            // theme: 'inlite',
            // max_width: 500,
            // max_height: 500,
            // min_height: 400,
            inline: true,
            // autofocus: true,
            // event_root: '.chat',

            plugins: 'emoticons',
            fixed_toolbar_container: '.chat-window2 .ui-dialog-buttonset',
            // toolbar: 'emoticons | insert',
            toolbar: 'emoticons',
            // insert_button_items: 'image link | inserttable',
            // insert_toolbar: 'quickimage quicktable',

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

            init_instance_callback(editor) {
              editor.focus();
            },

            setup(editor) {

              editor.on('init', event => {
                self.editor1 = editor;

                editor.on('keydown', event => {
                  event.which === 13 && self.send(self.chatWindow2, editor);
                });

              });



            },

          });

        }

      });

      // this.options && this.element.addStuff();
    },

    send(form, editor){
      let
        message = editor.getContent()
        ,messageLower = message.toLowerCase()
        ,messageText = $(message).text()
        ,messageTextLower = messageText.toLowerCase()
        ,searchMatchArray = [
          {
            match: 'привет',
            answer: 'Здравствуйте, рады Вас снова видеть в нашем сервисе.',
          },{
            match: 'здравствуйте',
            answer: 'Здравствуйте, рады Вас видеть в нашем сервисе.',
          },{
            match: 'добрый день',
            answer: 'Добрый день, чем можем вам помочь?',
          },{
            match: 'добрый вечер',
            answer: 'Добрый вечер, чем можем вам помочь?',
          },{
            match: 'не приходят данные',
            answer: 'Мы уточним причину ошибки "не приходят данные" и вскоре ответим вам.',
          },{
            match: 'не приходят таблицы',
            answer: 'Мы уточним причину ошибки "не приходят таблицы" и вскоре ответим вам.',
          },{
            match: 'Пока',
            answer: 'До-свидания, рады были Вам помочь.',
          },{
            match: 'До-свидания',
            answer: 'До-свидания, будем ждать вас снова.',
          },
        ]
        // ,searchMatchArrayLower =
      ;
      var answer = [];
      searchMatchArray.forEach((item, i, arr) => {
        let
          itemLength = item.match.length
          ,itemLower = item.match.toLowerCase()
          ,match = message.toLowerCase().indexOf(itemLower)
        ;

        if(match > -1){
          answer.push(item.answer);
          message = message.slice(0, match) + '<span style="display:inline;border-bottom:1px solid #01b6b6;">' + message.slice(match, match + itemLength) + '</span>' + message.slice(match + itemLength, -1);
        }

      });


      let createMessage = (userId, message) => {
        let
          localData = JSON.parse(localStorage.getItem('chat')) || {}
          ,number = Object.keys(vm.chat.posts).length + Object.keys(localData.posts || {}).length + 1

          ,newPost = {[number]: {
            userId,
            date: (date => {
              return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
            })(new Date),

            message,
          }},
          updatedLocalData = $.extend(true, localData, {posts: newPost})
        ;

        vm.chat.posts = {...vm.chat.posts, ...updatedLocalData.posts};
      };


      try {
        // localStorage.setItem('chat', JSON.stringify(updatedLocalData));
      } catch (error) {
        console.error('localStorage error' + error);
      } finally {
        // Object.assign({}, vm.chat.posts, updatedLocalData.posts);
        createMessage(form.attr('data-user-id'), message);

        setTimeout(() => {
          if (answer.length > 0) {
            createMessage('0', answer.join(' '));
          } else {
            createMessage('0', 'Пожалуйста ожидайте ответ ...');
          }
        }, 1000);

        editor.setContent('');
      }

    },

    destroy() {
      // this.element.removeStuff();
      $.Widget.prototype.destroy.call(this);
    },

    _setOption(key, value) {
      switch (key) {
      case 'someValue':
         //this.options.someValue = doSomethingWith(value);
         break;
      default:
         //this.options[ key ] = value;
         break;
      }

      $.Widget.prototype._setOption.apply(this, arguments);
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


  /*INITIAL*/
  /*body*/$('.bg-gradient').bgGradient();

  buttonsUI.button();

  $('.chat').chat();

  /*/INITIAL/*/



})(jQuery, window, document);
