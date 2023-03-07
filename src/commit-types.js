export const COMMIT_TYPES = {
  feat: {
    description: 'A new feature',
    emoji: '✨',
    release: true
  },
  fix: {
    description: 'A bug fix',
    emoji: '🐛',
    release: true
  },
  docs: {
    description: 'Documentation only changes',
    emoji: '📚',
    release: false
  },
  style: {
    description:
      'Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)',
    emoji: '💎',
    release: true
  },
  refactor: {
    description: 'A code change that neither fixes a bug nor adds a feature',
    emoji: '📦',
    release: true
  },
  perf: {
    description: 'A code change that improves performance',
    emoji: '🚀',
    release: true
  },
  test: {
    description: 'Adding missing tests',
    emoji: '🚨',
    release: false
  },
  build: {
    description:
      'Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)',
    emoji: '🏗 ',
    release: false
  },
  chore: {
    description:
      'Changes to the build process or auxiliary tools and libraries such as documentation generation',
    emoji: '🔧',
    release: true
  },
  revert: {
    description: 'Reverts a previous commit',
    emoji: '⏪',
    release: false
  }
}
