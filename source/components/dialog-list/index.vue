<template>
   <ul :class="`window${instaceCount}__dialog dialog-list`">
    <li v-for="post in chatData.posts"
        :class="`dialog-list__post_${(post.userId === userId.toString()) ? 'my' : 'interlocutor'} post`">
        <figure class="post__container">
          <div class="post__header">
            <div class="post__img-wrapper post__header-col1">
              <img :src="chat.users[post.userId].avatarSrc" class="post__img" :alt="chat.users[userId].name">
            </div>

            <div class="post__header-col2">
              <span class="post__user-name">
                {{chat.users[userId].name}}
              </span>
              <time class="post__date">
                {{post.date}}
              </time>
            </div>
          </div>
          <figcaption class="post__message" v-html="post.message"></figcaption>
        </figure>
    </li>
  </ul>

</template>

<style>
  .dialog-list{
    width: 100%;
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    overflow-x: hidden;
    overflow-y: auto;
    min-height: 150px;
  }
    [class*='dialog-list__post']{
      /*border-width: 1px;
      border-style: solid;*/
        &:not(:first-child){
          margin-top:10px;
        }
    }
      .post__container{

      }
        .post__header{
          display: flex;
        }

        [class*='post__header-col']{

        }
        .post__header-col1{

        }
        .post__img-wrapper{
          border-radius: 50%;
          max-width: 50px;
          max-height: 50px;
          overflow: hidden;
          position: relative;
          flex-shrink: 0;
        }
          .post__img{
            width: 100%;
            height: 100%;
          }
        .post__header-col2{
          display: flex;
          flex-direction: column;
          width: 100%;
          padding-left: 5px;
        }
          .post__user-name{

          }
          .post__date{
            margin-top: 10px;
          }

        .post__message{
          padding: 5px;
          border-radius: 5px;
          margin-top: 5px;
        }

    .dialog-list__post_my{
      padding-left: 20px;
        .post__header{
          flex-direction: row-reverse;
        }
        .post__header-col1{
          margin-left: 10px;
        }
        .post__header-col2{
          align-items: flex-end;
        }
        .post__message{
          background: #00e0e0;
        }
    }
    .dialog-list__post_interlocutor{
      padding-right: 20px;
        .post__header-col1{
          margin-right: 10px;
        }
        .post__header-col2{

        }
        .post__message{
          background: #ddd;
        }
    }
</style>

<script>
export default {
  props: [
    'chat',
    'userId',
  ],

  data(){
    return {
      instaceCount:0,
      chatData: this.chat,
    };
  },

  methods: {
    scrollToButtom() {
      let
        el = this.$el;
      el.scrollTop = el.scrollHeight;
    }
  },

  beforeCreate() {

  },
  created() {

  },
  beforeMount(){
    
  },
  mounted(){
    this.instaceCount += 1;
    this.scrollToButtom();
  },
  beforeUpdate(){

  },
  updated(){
    this.scrollToButtom();
  },
  activated(){

  },
  deactivated(){

  },
  beforeDestroy(){

  },
  destroyed(){

  },

}
</script>
