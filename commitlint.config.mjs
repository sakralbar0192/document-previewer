export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [0, 'never'],
    'body-max-line-length': [0, 'never'],
    'body-min-length': [2, 'always'],
    'body-case': [0, 'never']
  },
  plugins: [
    {
      rules: {
        'body-requires-time': (parsed) => {
          const { body } = parsed
          if (!body || !body.includes('Time:')) {
            return [false, 'Commit message must include "Time: X min" in body']
          }
          return [true]
        }
      }
    }
  ],
  rules: {
    'body-requires-time': [2, 'always']
  }
}
