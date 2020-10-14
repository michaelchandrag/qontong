<template>
  <v-layout
    column
  >
    <v-row class="pa-2">
      <v-col cols="12">
        <p class="subtitle-2 mb-2">Total Dana</p>
        <v-btn @click="showBalance=!showBalance" text style="text-transform: none; width: 100%;">
          <p class="subtitle-1" v-if="showBalance">{{ toCurrency(balance)}} <v-icon small>mdi-eye-off</v-icon></p>
          <p class="subtitle-2" v-else>Tap to show balance  <v-icon small>mdi-eye</v-icon></p>
        </v-btn>
         
      </v-col>
    </v-row>
    <v-divider/>
    <v-row class="pa-2">
      <v-col cols="6" class="pb-0">
        <p class="title">Laporan</p>
      </v-col>


      <v-col cols="6" class="pb-0">
        <p class="subtitle-2 menu-alternative grey--text">Semua | <span class="blue--text">Bulan ini</span></p>
      </v-col>

      <v-col cols="6">
        <v-card
          elevation="5"
          color="#FFFFFF"
          class="rounded-xl"
        >
          <v-card-text>
            <p class="cash-in-text-color subtitle-2">Dana Masuk</p>
            <p class="black--text subtitle-1 text-center"> 
              <span v-if="showBalance">{{ toCurrency(cash_in) }}</span>
              <span v-else><v-icon small>mdi-eye-off</v-icon></span>
            </p>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="6">
        <v-card
          class="rounded-xl"
          elevation="5"
          color="#FFFFFF"
        >
          <v-card-text>
            <p class="cash-out-text-color subtitle-2">Dana Keluar</p>
            <p class="black--text subtitle-1 text-center"> 
              <span v-if="showBalance">{{ toCurrency(cash_out) }}</span>
              <span v-else><v-icon small>mdi-eye-off</v-icon></span>
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

      <v-col cols="12">
        <v-row>

          <v-col cols="6" class="pb-0">
            <p class="title">Dompet</p>
          </v-col>

          <v-col cols="6" class="pb-0">
            <nuxt-link to="/"><p class="subtitle-2 grey--text menu-alternative">Lihat lebih</p></nuxt-link>
          </v-col>

        </v-row>
        <v-row>

          <!-- <v-col cols="1" class="d-flex flex-row mb-5">
            <v-btn text style="height: 100%;">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </v-col> -->

          <v-col v-for="wallet in wallets" v-bind:key="wallet.id" class="" cols="6" lg="3">
            <v-card
              class="rounded-l wallet-overview"
              color="#FFFFFF"
              height="100%"
            >
              <v-card-text style="height: 100%;">
                <p class="black--text subtitle-1">{{wallet.name}}</p>
                <p class="black--text subtitle-2">{{toCurrency(wallet.lifetime_total)}}</p>
                <p class="text-right cash-in-text-color">+ {{ toCurrency(wallet.lifetime_cash_in_total)}}</p>
                <p class="text-right cash-out-text-color">- {{ toCurrency(wallet.lifetime_cash_out_total)}}</p>
              </v-card-text>
            </v-card>
          </v-col>

        </v-row>

        <v-row>
          <v-col cols="6" class="pb-0">
            <p class="title">Transaksi</p>
          </v-col>
          <v-col cols="6" class="pb-0">
            <nuxt-link to="/"><p class="subtitle-2 grey--text menu-alternative">Lihat lebih</p></nuxt-link>
          </v-col>
          <v-col cols="12" v-for="transaction in transactions" :key="transaction.id">
            <v-card
              class="rounded-xl"
              elevation="7"
              color="#333746"
            >
              <v-card-text class="pl-4 pr-4 pt-1 pb-1">
                <v-row>
                  <v-col cols="6">
                    <p class="body-1 white--text"> {{ transaction.category_name}} </p>
                    <p class="body-2 white--text"> {{ transaction.wallet_name }} </p>
                    <p class="caption description-break"> {{ transaction.description }}</p>
                  </v-col>
                  <v-col cols="6" class="menu-alternative">
                    <p v-if="transaction.type === 'cash_in'" class="title cash-in-text-color"> + {{ toCurrency(transaction.price) }}</p>
                    <p v-else class="title cash-out-text-color"> - {{ toCurrency(transaction.price) }}</p>
                    <p>06 Oct 2020</p>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>


  </v-layout>
</template>

<script>
import Robot from '@/engine/robot'

export default {
  components: {
  },
  data: function () {
    return {
      showBalance: false,
      balance: 0,
      cash_in: 0,
      cash_out: 0,
      transactions: [
      ],
      wallets: [
      ]
    }
  },
  mounted () {
    var headers = {
      'Authorization': 'Bearer ' + Robot.getAuthentication()
    }
    Robot.callGet('/api/v1/me', headers)
      .then(response => {
        if (!response.success) {
          return false
        }
        var data = response.data
        this.balance = data.lifetime_total
        this.cash_in = data.lifetime_cash_in_total
        this.cash_out = data.lifetime_cash_out_total
        this.wallets = data.wallets
      })
  },
  methods: {
    toCurrency: function (amount) {
      var formatter = new Intl.NumberFormat('en-US', {
        currency: 'USD',

        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0,
        //maximumFractionDigits: 0,
      });

      return 'Rp ' + formatter.format(amount);
    },
    generateRandomHexColor: function () {
      var randomColor = Math.floor(Math.random()*16777215).toString(16);
      return randomColor
    },
    walletBg () {
      var pre =this.generateRandomHexColor()
      var post = 'b20a2c'
      var result = "background: linear-gradient(to right, #" + pre +", #D8B3AE" + "" +")"
      return result
    }
  },
  created: function () {
  }
}
</script>

<style scoped>
p {
  margin-bottom: 0px;
}

.menu-alternative {
  vertical-align: middle;
  text-align: right;
}

.wallet-overview {
  min-height: 144px;
}
.description-break {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

</style>