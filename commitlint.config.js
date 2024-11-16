import { RuleConfigSeverity } from '@commitlint/types';
import { types } from './changelog.preset.js';

export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [RuleConfigSeverity.Error, 'always', types.map((it) => it.type)],
  },
};
