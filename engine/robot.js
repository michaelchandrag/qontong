import axios from "axios"
const BASE_URL = process.env.BASE_URL
axios.defaults.baseURL = BASE_URL;

export default {
	health () {
		return axios.get('/api/v1/hello')
			.then(result => {
				return result
			})
			.catch(result => {
				return result
			})
	},
	call (method, url, headers = null, payload = null) {
		var result = ''
		switch (method) {
			case 'GET':
				result = this.callGet(url, headers, payload)
				break;
			case 'POST':
				result = this.callPost(url, headers, payload)
				break;
		}
		return result
	},
	callGet (url, headers = null, payload = null) {
		return axios.get(url, {
				headers: headers,
				params: payload
			}).then(result => {
				return result.data
			}).catch(function (error) {
				return error.response.data
			})
	},
	callPost (url, headers = null, payload = null) {
		return axios({
			method: 'POST',
			url: BASE_URL + url,
			headers: headers,
			data: payload
		}).then(result => {
			return result.data
		}).catch(function (error) {
			return error.response.data
		})
	},
	setLocalStorage (key, value) {
		localStorage.setItem(key, value)
	},
	getLocalStorage(key) {
		return localStorage.getItem(key)
	},
	getAuthenticationKey () {
		return 'YXV0aGVudGljYXRpb25fdG9rZW4='
	},
	setAuthentication (value) {
		localStorage.setItem(this.getAuthenticationKey(), value)
	},
	getAuthentication () {
		return localStorage.getItem(this.getAuthenticationKey())
	},
	isAuthenticated () {
		var authentication = this.getLocalStorage(this.getAuthenticationKey())
		if (authentication !== null) {
			return true
		}
		return false
	}


}