<template>
	<v-layout
		column
	>
		<v-row>
			<v-col cols="12" class="pa-8">
				<p>
					<span class="headline">Halo,</span> <br/>
					<span class="title">Selamat datang di <b>Qontong</b> </span><br/>
					Kami akan membantu pencatatan dan pelaporan keuangan pribadi kamu. <br/>
				</p>
			</v-col>
		</v-row>
		<v-divider/>
		<v-row>
			<v-col cols="12" class="pt-8 pl-8 pr-8">
				<v-text-field
		            v-model="email"
		            :rules="emailRules"
		            label="Email"
		            placeholder="Email"
		            required
		          ></v-text-field>
			</v-col>
			<v-col cols="12" class="pl-8 pr-8">
				<v-text-field
		            :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
		            :rules="passwordRules"
		            :type="showPass ? 'text' : 'password'"
		            v-model="password"
		            label="Password"
		            placeholder="Password"
		            class="input-group--focused"
		            @click:append="showPass = !showPass"
		         ></v-text-field>
			</v-col>
			<v-col cols="12" class="pl-8 pr-8 red--text">
				<p v-if="errors">
					Email atau password salah
				</p>
			</v-col>
			<v-col cols="12" class="pl-8 pr-8">
				<v-btn
			      color="#006BFF"
			      width="100%"
			      @click="doLogin()"
			    >
			      Masuk
			    </v-btn>
			</v-col>
		</v-row>
		<v-divider class="ma-4"/>
		<v-row>
			<v-col cols="12" class="pl-8 pr-8">
				<nuxt-link to="/signup">
					<v-btn
				      width="100%"
				      color="#FFFFFF"
				      class="black--text"
				    >
				      Daftar
				    </v-btn>
				</nuxt-link>
			</v-col>
		</v-row>
	</v-layout>
</template>

<script>
import Robot from '@/engine/robot'

export default {
	data: function () {
		return {
			showPass: false,
			email: "",
			password: "",
			errors: false,
			emailRules: [
		        v => !!v || 'E-mail harus diisi',
	        	v => /.+@.+/.test(v) || 'Tidak sesuai dengan format e-mail',
		    ],
		    passwordRules: [
		    	v=> !!v || 'Password harus diisi',
		    	v => v.length >= 6 || 'Password minimal 6 karakter'
		    ]
		}
	},
	methods: {
		doLogin () {
			var payload = {
				username: this.email,
				password: this.password
			}
			Robot.call('POST', '/api/v1/login', null, payload)
				.then(response => {
					if (response.success) {
						this.$router.push('/')
						Robot.setAuthentication(response.data.token)
					} else {
						this.errors = true
					}
				})
		}
	}
}
</script>