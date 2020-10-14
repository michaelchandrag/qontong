<template>
	<v-layout
		column
	>
		<v-row>
			<v-col cols="12" class="pa-8">
				<p>
					<span class="headline">Halo,</span> <br/>
					<span class="title">Selamat datang di <b>Qontong</b> </span><br/>
					Daftarkan akunmu segera!<br/>
				</p>
			</v-col>
		</v-row>
		<v-divider/>
		<v-row>
			<v-col cols="12" class="pt-5 pl-8">
				<v-text-field
		            v-model="name"
		            :rules="nameRules"
		            label="Nama Lengkap"
		            placeholder="Nama Lengkap"
		            required
		          ></v-text-field>
			</v-col>
			<v-col cols="12" class="pl-8 pr-8">
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
		            placeholder="Password"
		            label="Password"
		            class="input-group--focused"
		            @click:append="showPass = !showPass"
		         ></v-text-field>
			</v-col>
			<v-col cols="12" class="pl-8 pr-8">
				<v-text-field
		            :append-icon="showPassConfirm ? 'mdi-eye' : 'mdi-eye-off'"
		            :rules="passwordConfirmRules"
		            :type="showPassConfirm ? 'text' : 'password'"
		            v-model="passwordConfirm"
		            label="Konfirmasi Password"
		            placeholder="Konfirmasi Password"
		            class="input-group--focused"
		            @click:append="showPassConfirm = !showPassConfirm"
		         ></v-text-field>
			</v-col>
			<v-col cols="12" class="pl-8 pr-8 red--text">
				<p v-if="errors">
					{{ errorMessage }}
				</p>
			</v-col>
			<v-col cols="12" class="pl-8 pr-8">
				<v-btn
			      color="#006BFF"
			      width="100%"
			      @click="doSignup()"
			    >
			      Daftar
			    </v-btn>
			</v-col>
		</v-row>
		<v-divider class="ma-4"/>
		<v-row>
			<v-col cols="12" class="pl-8 pr-8">
				<nuxt-link to="/login">
					<v-btn
				      width="100%"
				      color="#FFFFFF"
				      class="black--text"
				    >
				      Masuk
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
			showPassConfirm: false,
			name: "",
			email: "",
			password: "",
			passwordConfirm: "",
			errors: false,
			errorMessage: "",
			nameRules: [
				v => !!v || 'Harus diisi',
			],
			emailRules: [
		        v => !!v || 'E-mail harus diisi',
	        	v => /.+@.+/.test(v) || 'Tidak sesuai dengan format e-mail',
		    ],
		    passwordRules: [
		    	v=> !!v || 'Password harus diisi',
		    	v => v.length >= 6 || 'Password minimal 6 karakter'
		    ],
		    passwordConfirmRules: [
		    	v => !!v || 'Konfirmasi password harus diisi',
		    	v => v === this.password || 'Konfirmasi password tidak sama dengan password',
		    	v => v.length >= 6 || 'Konfirmasi Password minimal 6 karakter'
		    ]
		}
	},
	methods: {
		doSignup () {
			var payload = {
				email: this.email,
				password: this.password,
				confirm_password: this.passwordConfirm,
				name: this.name
			}
			Robot.call('POST', '/api/v1/register', null, payload)
				.then(response => {
					if (response.success) {
						this.$router.push('/login')
					} else {
						this.errors = true
						this.errorMessage = response.errors[0].detail
					}
				})
		}
	},
	created: function () {

	}
}
</script>