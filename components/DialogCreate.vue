<template>
  <v-dialog
    v-model="show"
    persistent
    scrollable
  >
    <v-card>
        <v-card-text class="pb-0">
          <v-container>
            <v-row>
              <v-tabs
                  v-model="tab"
                  centered
                  icons-and-text
                  color="basil"
                  background-color="transparent"
                  active-class="blue--text"
                  next-icon="$next"
                  prev-icon="$prev"
              >
                  <v-tabs-slider></v-tabs-slider>

                  <v-tab href="#transaction" class="caption">
                      Transaksi
                      <v-icon>mdi-cash-multiple</v-icon>
                  </v-tab>

                  <v-tab href="#wallet" class="caption">
                      Dompet
                      <v-icon>mdi-wallet</v-icon>
                  </v-tab>

                  <v-tab href="#category" class="caption">
                      Kategori
                      <v-icon>mdi-grid</v-icon>
                  </v-tab>
              </v-tabs>

              <v-tabs-items v-model="tab" style="width: 100%">
                  <v-tab-item :key="1" value="transaction">
                    <v-row>
                      <v-col cols="12">
                        <v-card flat>
                          <v-card-text>Transaksi</v-card-text>

                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              text
                              @click="updateShow"
                            >
                              Close
                            </v-btn>
                            <v-btn
                              class="success"
                              @click="updateShow"
                            >
                              <b>Save</b>
                            </v-btn>
                          </v-card-actions>
                        </v-card>
                      </v-col>
                    </v-row>
                  </v-tab-item>
                  <v-tab-item :key="2" value="wallet">
                      <v-card flat>
                          <v-card-text>
                            <v-row>
                              <v-col cols="12">
                                <v-text-field
                                  v-model="wallet.name"
                                  label="Nama Dompet"
                                  required
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12">
                                <v-text-field
                                  v-model="wallet.description"
                                  label="Deskripsi"
                                  required
                                ></v-text-field>
                              </v-col>
                              <v-col cols="12" class="red--text">
                                <p v-if="walletErrors !== null">
                                  {{walletErrors}}
                                </p>
                              </v-col>
                            </v-row>

                          </v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              text
                              @click="updateShow"
                            >
                              Close
                            </v-btn>
                            <v-btn
                              class="success"
                              @click="createWallet()"
                            >
                              <b>Save</b>
                            </v-btn>
                          </v-card-actions>
                      </v-card>
                  </v-tab-item>
                  <v-tab-item :key="3" value="category">
                      <v-card flat>
                          <v-card-text>Kategori</v-card-text>
                          <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn
                              text
                              @click="updateShow"
                            >
                              Close
                            </v-btn>
                            <v-btn
                              class="success"
                              @click="updateShow"
                            >
                              <b>Save</b>
                            </v-btn>
                          </v-card-actions>
                      </v-card>
                  </v-tab-item>
              </v-tabs-items>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
  </v-dialog>
</template>

<script>
import Robot from '@/engine/robot'

export default {
  data () {
    return {
      tab: 'transaction',
      wallet: {
        name: "",
        description: ""
      },
      walletErrors: ""
    }
  },
  props: [
    'show'
  ],
  methods: {
    updateShow (value = null) {
      var showValue = false
      if (value === true) {
        showValue = true
      }
      this.$emit("updateShow", showValue)
    },
    isAuthenticated () {
      robot.getLocalStorage()
    },
    createWallet () {
      this.resetError()
      if (!Robot.isAuthenticated()) {
        this.updateShow()
        this.$router.push('/login')
        return false
      }
      var headers = {
        'Authorization': 'Bearer ' + Robot.getAuthentication()
      }
      var payload = {
        name: this.wallet.name,
        description: this.wallet.description
      }
      Robot.callPost('/api/v1/me/wallet', headers, payload)
        .then(response => {
          if (!response.success) {
            this.walletErrors = response.errors[0].detail
            return false
          }
          this.updateShow(false)

        })
      return false
    },
    resetError () {
      this.walletErrors = null
    }
  }
}
</script>

<style scoped>
</style>