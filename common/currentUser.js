const cloudApi = require('./cloudApi')

let userInfo = null;
let locate = null;

const login = () => {
	return new Promise((resolve, reject) => {
		if (isLogin()) {
			resolve(userInfo);
		} else {
			uni.login({
				provider: "weixin",
				success: (res) => {
					cloudApi.call({
						name: "user",
						data: {
							action: "login",
							code: res.code
						},
						success: (res) => {
							userInfo = res.result;
							resolve(res.result);
						},
						fail: (err) => {
							reject();
						}
					})
				}
			})
		}
	})
}

const getLocation = (location) => {
	return new Promise((resolve, reject) => {
		if (locate !== null) {
			resolve(locate);
		}
		cloudApi.call({
			name: "user",
			data: {
				action: "getLocation",
				params: {
					location: location
				}
			},
			success: (res) => {
				locate = res.result;
				resolve(res.result);
			},
			fail: (err) => {
				reject();
			}
		})
	});
}

const logout = () => {
	userInfo = null;
}

const isLogin = () => {
	return userInfo != null;
}

const getUserInfo = () => {
	return userInfo;
}

const updateUserInfo = (userInfo) => {
	cloudApi.call({
		name:"user",
		data:{
			action:"updateUserProfile",
			userInfo:userInfo
		}
	})
}


module.exports = {
	login,
	isLogin,
	getUserInfo,
	updateUserInfo,
	logout,
	getLocation
}