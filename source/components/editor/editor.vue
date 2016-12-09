<template>
  <div class="vue-html5-editor" :style="{'z-index':zIndex}" :class="{'full-screen':fullScreen}">
    <!-- toolbar -->
    <div class="toolbar" :style="{'z-index':zIndex+1}" ref="toolbar">
        <ul>
            <!-- <template v-for="module in modules"> -->
            <li v-for="module in modules" v-if="module.show" :title="locale[module.i18n]"
            @click="activeModule(module)">
              <span class="icon" :class="module.icon"></span>
            </li>
            <!-- </template> -->
        </ul>

        <div class="dashboard" v-show="dashboard" :style="dashboardStyle">
          <keep-alive>
            <div v-if="dashboard" :is="dashboard"></div>
          </keep-alive>
        </div>
    </div>

    <!-- content :content="content" ref="content" -->
    <div class="content" ref="content" contenteditable="true" @click="toggleDashboard(dashboard)"
    :style="contentStyle">
      <!-- {{content}} -->
    </div>

    <div class="result">
      <h1>RESULT:</h1>
      <div ref="result">
      </div>
    </div>

  </div>
</template>

<style lang="less" src="./style.less"></style>

<script>
export default {
    // replace: false,
    props: {
      // content: {
      //   //no longer be required
      //   type: String,
      //   required: true,
      //   default: ''
      // },
      height: {
        type: Number,
        default: 300,
        validator (val) {
          return val >= 100
        }
      },
      zIndex: {
          type: Number,
          default: 1000
      },
      autoHeight: {
          type: Boolean,
          default: true
      }
    },
    data () {
      console.info('data');
        return {
            // locale: {},
            /* because i am content */
            content: '<el-button>Hello, i\'m button from element-ui, and i have not mounted</el-button><br><br><br><div id="dynamicloaded"></div>',
            fullScreen: false,
            dashboard: null,
            dashboardStyle: {},
        }
    },

    watch: {
      content(val) {
        console.info('watch -> content');

        if (val != this.$refs.content.innerHTML) {
            this.$refs.content.innerHTML = val
        }
      },

      dashboard(val){
        console.info('watch -> dashboard');
        val && this.computeDashboardStyle()
      },

      fullScreen(val){
        console.info('watch -> fullScreen');

        this.$nextTick(() => {
          this.computeDashboardStyle()
        });

        if (val) {
          Object.assign(this, {
            parentEl: this.$el.parentNode,
            nextEl: this.$el.nextSibling,
          });
          document.body.appendChild(this.$el)
          return;
        }

        if (this.nextEl) {
          this.nextEl.parentNode.insertBefore(this.$el, this.nextEl)
          return;
        }

        this.parentEl.appendChild(this.$el)
      }
    },

    computed: {
      contentStyle(){
        console.info('Вычесляемое свойство: computed -> contentStyle');
          let
            style = {}
          ;

          if (this.fullScreen) {
            style.height = window.innerHeight - (this.$refs.toolbar.clientHeight + 1) + 'px';
          }

          else if (!this.autoHeight) {
            style.height = this.height + 'px';
          }

          else {
            style['min-height'] = this.height + 'px';
          }

          return style;
      }
    },


    methods: {
        computeDashboardStyle(){
          console.info('methods -> computeDashboardStyle');
            this.dashboardStyle = {'max-height': this.$refs.content.clientHeight + 'px'}
        },
        getContentElement(){
          console.info('methods -> getContentElement');
            return this.$refs.content
        },
        toggleFullScreen(){
          console.info('methods -> toggleFullScreen');
            this.fullScreen = !this.fullScreen
        },
        toggleDashboard(dashboard){
          console.info('methods -> toggleDashboard');
            this.dashboard == dashboard ? this.dashboard = null : this.dashboard = dashboard
        },
        execCommand(command, arg){
          console.info('methods -> execCommand');
            this.restoreSelection()
            document.execCommand(command, false, arg)
            this.content = this.$refs.content.innerHTML
            this.dashboard = null
        },
        getCurrentRange(){
          console.info('methods -> getCurrentRange');
            return this.range;
        },
        saveCurrentRange(){
          console.info('methods -> saveCurrentRange');

          let
            selection = window.getSelection ? window.getSelection() : document.getSelection()
            ,range = selection.rangeCount ? selection.getRangeAt(0) : null
          ;

          if(!range) return;

          if (this.$refs.content.contains(range.startContainer) &&
              this.$refs.content.contains(range.endContainer)) {
              this.range = range;
          }

        },
        restoreSelection(){
          console.info('methods -> restoreSelection');

            let
              selection = window.getSelection ? window.getSelection() : document.getSelection()
            ;

            selection.removeAllRanges()

            if (this.range) {
                selection.addRange(this.range)

            } else {
                let
                  content = this.$refs.content
                  ,div = document.createElement("div")
                  ,range = document.createRange()
                ;

                content.appendChild(div)
                range.setStart(div, 0)
                range.setEnd(div, 0)
                selection.addRange(range)
            }
        },

        activeModule(module){

          console.info('methods -> activeModule');

            if (typeof module.handler == "function") {
                module.handler(this)
                return;
            }

            if (module.hasDashboard) {
                this.toggleDashboard('dashboard-' + module.name)
            }

        }
    },


    mounted(){
      console.info('compiled');

      let
        content = this.$refs.content
      ;
      /*Replace ready with mounted, then use Vue.nextTick if you need an in-document guarantee*/
      content.innerHTML = this.content;

      this.modules.forEach(module => {
        if (typeof module.init == "function") {
          module.init(this);
        }
      });


      // content.addEventListener('mouseup', this.saveCurrentRange, false);
      // content.addEventListener('keyup', this.saveCurrentRange, false);
      // content.addEventListener('mouseout', this.saveCurrentRange, false);

      content.addEventListener('keyup', () => {
        console.log('keyup');
        // this.content = this.$refs.content.innerHTML
        // console.log(this.content);
        // console.log(this.$refs.content.innerHTML);
        this.$refs.result.innerHTML = this.$refs.content.innerHTML;

      }, false)




      this.touchHandler = (e) => {
        console.log('this.touchHandler');
        if (content.contains(e.target)) {
          this.saveCurrentRange();
        }
      }

      window.addEventListener('touchend', this.touchHandler, false)



      window.vmtemp =
      (new (Vue.extend({
        parent:this,
        template: '<div><button @click.stop.prevent="mount">How mounted upper component (\'el-button\') for click?</button><br><br><button @click.stop.prevent="addAndMount">How add/mounted new component in this content for click?</button></div>',
        computed: {
          // contentStyle(){
          //   console.log('contentStyle button');
          // }
        },
        methods: {
          mount() {
            alert('How mounted upper component (\'el-button\') for click?');
            // this.$dispatch('child-msg','this comes from ajax loaded component');
          },
          addAndMount(){
            alert('How add/mounted new component in this content for click?');
          },
        }
      }))).$mount(/*document.getElementById('dynamicloaded')*/ /*this.$el*/document.querySelector('#dynamicloaded'));


      console.log(window.vmtemp);
      console.log(document.querySelector('el-button'));


    },

    beforeDestroy(){
      console.info('beforeDestroy');
      window.removeEventListener('touchend', this.touchHandler);
      this.modules.forEach(module => {
        if (typeof module.destroyed == 'function') {
          module.destroyed(this)
        }
      });
    },

    destroyed(){
      console.log('destroyed');
    },
}
</script>
