<template>
   <ul>
    <li v-for="application in applications">
      {{application}}
      <keep-alive>
        <component :is="currentView">
          ccoccococ
        </component>
      </keep-alive>
    </li>
  </ul>
</template>

<script>
export default {
  data(){
    let self = this;
    return {
      applications: ['1','2'],
      // currentView: {
      //   template: '<p>Welcome home!</p>'
      // },
      currentView(){
        return System.import('../application/index.vue').then(
  				module => {console.log(self);return module;}
  				,error => console.error(error)
  			)/*.catch(
  				error => console.error('catch: ' + error)
  			)*/;
      },

    }
  }
}
</script>
