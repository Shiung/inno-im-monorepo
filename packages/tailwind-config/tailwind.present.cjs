module.exports = {
  theme: {
    screens: {
      'md': '375px',
      'lg': '600px',
      'xl': '1024px'
    },
    extend: {
      colors: {
        imprimary: {
          DEFAULT: 'rgb(var(--im-monorepo-primary))'
        },
        imsecondary: {
          DEFAULT: 'rgba(var(--im-monorepo-secondary))'
        }
      },
    }
  }
}
