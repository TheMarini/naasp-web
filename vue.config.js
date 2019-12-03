// vue.config.js
module.exports = {
	devServer: {
		// API server
    proxy: 'http://localhost:3000/',
    // proxy: 'http://192.168.43.135:3000/',
  }
}
