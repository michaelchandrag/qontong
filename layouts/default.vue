<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
      color="primary"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="white--text"/>
      <v-spacer></v-spacer>
      <v-toolbar-title v-text="title" flex text-xs-center class="white--text"/>
      <v-spacer></v-spacer>
      <v-app-bar-nav-icon style="visibility: hidden;"/>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
        <DialogCreate :show="showDialogCreate" @updateShow="updateShowDialogCreate"/>
        <v-btn
          color="#4CAF50"
          dark
          fixed
          bottom
          right
          fab
          v-show="showFloatButton"
          @click="showDialogCreate=true"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-container>
    </v-main>
    <!-- <v-footer
      :absolute="!fixed"  
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer> -->
  </v-app>
</template>

<script>
import DialogCreate from '~/components/DialogCreate.vue'

export default {
  components: {
    DialogCreate
  },
  data () {
    return {
      showDialogCreate: false,
      clipped: false,
      drawer: false,
      fixed: false,
      showFloatButton: false,
      invalidUrl: ['/login', '/signup'],
      items: [
        {
          icon: 'mdi-apps',
          title: 'Dashboard',
          to: '/'
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Login',
          to: '/login'
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Qontong'
    }
  },
  methods: {
    updateShowDialogCreate (value) {
      this.showDialogCreate = value
    }
  },
  watch:{
    '$route' (to, from){
      if (this.invalidUrl.indexOf(to.path) >= 0) {
        this.showFloatButton = false
      } else {
        this.showFloatButton = true
      }
    }
  },
  created: function () {
    if (this.invalidUrl.indexOf(this.$route.path) >= 0) {
      this.showFloatButton = false
    } else {
      this.showFloatButton = true
    }
  }
}
</script>

<style scoped>
  .v-application {
    background-color: #F0F4FD;
  }
</style>

<style>
  .cash-in-text-color {
    color: #03BEB4;
  }

  .cash-out-text-color {
    color: #F0265A;
  }
</style>
