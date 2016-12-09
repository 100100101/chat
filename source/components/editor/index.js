import editor from "./editor.vue";
// import moduleTextVue from "./modules/text/dashboard.vue";
import moduleText from "./modules/text/index";
import moduleFont from "./modules/font/index";
import moduleColor from "./modules/color/index";
import moduleAlign from "./modules/align/index";
import moduleList from "./modules/list/index";
import moduleLink from "./modules/link/index";
import moduleUnlink from "./modules/unlink/index";
import moduleTable from "./modules/table/index";
import moduleImage from "./modules/image/index";
import moduleHr from "./modules/hr";
import moduleEraser from "./modules/eraser/index";
import moduleUndo from "./modules/undo/index";
import moduleFullScreen from "./modules/full-screen/index";
import moduleInfo from "./modules/info/index";
import i18nZhCn from "./i18n/zh-cn";
import i18nEnUs from "./i18n/en-us";
import arrayFill from "./array-polyfill";

/**
 * install
 * @param Vue   {Vue}
 * @param options {Object}
 */

export default {
  install(Vue, options = {}) {
    arrayFill()
    //modules
    let
      modules = [
        // Vue.component('text', require('./modules/text/dashboard.vue')),
        moduleText,
        moduleColor,
        moduleFont,
        moduleAlign,
        moduleList,
        moduleLink,
        moduleUnlink,
        moduleTable,
        moduleImage,
        moduleHr,
        moduleEraser,
        moduleUndo,
        moduleFullScreen,
        moduleInfo,
      ]
      ,components = {}
    ;
    // console.log(require('./modules/text/dashboard.vue'));
    // console.log(moduleTextVue.data());
    console.log(modules);

    //extended modules
    // if (Array.isArray(options.modules)) {
    //   // let arr = []
    //   options.modules.forEach(module => {
    //     if (module.name) {
    //       modules.concat(module)
    //       // arr.push(module)
    //     }
    //   });
    //   // modules = modules.concat(arr)
    // }

    //hidden modules
    // if (Array.isArray(options.hiddenModules)) {
    //   modules = (()=> {
    //     let arr = []
    //     modules.forEach(module => {
    //       if (!options.hiddenModules.includes(module.name)) {
    //         arr.push(module)
    //       }
    //     })
    //     return arr;
    //   })()
    // }

    //visible modules
    // if (Array.isArray(options.visibleModules)) {
    //   modules = (()=> {
    //     let arr = []
    //     options.visibleModules.forEach(name => {
    //       modules.forEach(module => {
    //         if (module.name == name) {
    //           arr.push(module)
    //         }
    //       })
    //     })
    //     return arr;
    //   })()
    // }



      modules.forEach(module => {
        //specify the config for each module in options by name
        let
          config = options[module.name]
        ;

        module.config = Vue.util.extend(module.config || {}, config || {})

        if (module.dashboard) {
            //$options.module
            module.dashboard.module = module;

            components['dashboard-' + module.name] = module.dashboard;

        }
        if (options.icons && options.icons[module.name]) {
            module.icon = options.icons[module.name]
        }

        module.hasDashboard = !!module.dashboard
        //prevent vue sync
        module.dashboard = null
      });



      //i18n
      let
        i18n = {
          'zh-cn': i18nZhCn,
          'en-us': i18nEnUs
        }
        ,customI18n = options.i18n || {}
      ;

      Object.keys(customI18n).forEach(key => {
          i18n[key] = i18n[key] ? Vue.util.extend(i18n[key], customI18n[key]) : customI18n[key]
      })


      let
        language = options.language || 'en-us'

        ,locale = i18n[language] || i18n['en-us']

        ,component = Vue.extend(editor).extend({
          data () {
              return {
                modules,
                locale
              };
          },
          components
        })
      ;



      Vue.component(options.name || 'editor', component)

  }
}
