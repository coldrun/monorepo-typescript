import createPreset, { DEFAULT_COMMIT_TYPES } from 'conventional-changelog-conventionalcommits';

const types = DEFAULT_COMMIT_TYPES.map((it) => {
  if (['docs', 'refactor'].includes(it.type)) {
    return { ...it, hidden: false };
  }
  return { ...it };
});

export { types };
export default createPreset({ types });
