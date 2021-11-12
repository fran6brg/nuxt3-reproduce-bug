// in case of issues in vscode/output/tasks/eslint:
// see https://github.com/eslint/eslint/issues/15149
// see https://github.com/facebook/create-react-app/issues/8936

module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
		es2021: true,
	},
	extends: ["@nuxtjs/eslint-config-typescript", "plugin:nuxt/recommended", "prettier"],
	plugins: ["prettier"],
	// https://github.com/prettier/eslint-plugin-prettier
	rules: {
		"prettier/prettier": "error",
		"vue/multi-word-component-names": "off",
	},
};
