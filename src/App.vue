<!-- Created by shi.pengyan on 2016-10-30. -->
<template>
  <!--<div id="app" v-loading.fullscreen.lock="fullscreenLoading">-->
  <div id="app">
    <template v-if="userHasLogin">
      <nprogress-container></nprogress-container>
      <navbar :show="true"></navbar>
      <sidebar :show="config.sidebar"></sidebar>
      <app-main :open-all="!config.sidebar"></app-main>
      <login-dialog></login-dialog>
      <!--<footer-bar></footer-bar>-->
    </template>

    <template v-else>
      <nprogress-container></nprogress-container>
      <login></login>
    </template>
  </div>
</template>

<script type="text/babel">
  import Vue from 'vue';
  import { mapState, mapActions } from 'vuex'
  import NprogressContainer from 'vue-nprogress/src/NprogressContainer'
  import { Navbar, Sidebar, AppMain, FooterBar, Login, LoginDialog } from './module/app'


  export default {
    name: 'APP',
    data () {
      return {
        eventBus: new Vue()
      }
    },

    computed: {
      config () {
        return this.$store.state.config
      },
      pkg() {
        return this.$store.state.pkg;
      },
      userHasLogin () {
        return this.$store.state.loginUser != null;
      },

      ...mapState({'fullscreenLoading': 'globalLoading'})
    },

    components: {
      Navbar,
      Sidebar,
      AppMain,
      FooterBar,
      NprogressContainer,
      Login,
      LoginDialog
    },

    mounted () {
      this.checkLogin();
      this.initProductVersion();
    },

    methods: {
      ...mapActions(['checkLogin']),

      initProductVersion() {
        try {
          //请保留产品版权信息，不得修改！！！
          let dataset = document.querySelector('html').dataset;

          dataset.name = 'superman-console';
          dataset.author = this.pkg.author;
          dataset.version = this.pkg.version;
          dataset.description = this.pkg.description;
        } catch (e) {
        }
      }
    }
  }
</script>
