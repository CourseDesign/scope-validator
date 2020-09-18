# Scope Validator
Pattern matching based Oauth2.0 scope validation library

[![CodeFactor](https://www.codefactor.io/repository/github/CourseDesign/scope-validator/badge)](https://www.codefactor.io/repository/github/CourseDesign/scope-validator)

# Installation
```shell script
$ npm install scope-validator
```

# Documentation
[Documentation / scope-validator](https://github.com/CourseDesign/scope-validator/wiki/Documentation%3A-scope-validator)

# Example
```typescript
import { ScopeValidatorFactory, ScopeValidatorManager } from 'scope-vallidator'

const ParameterValidator = ScopeValidatorFactory.create(
  'create_test:${custom_param}',
  (name: string, { parameters }) => {
    const { custom_param } = parameters;
    if (custom_param === 'hello') {
      return true
    }

    return false
  }
)

const validatorManager = new ScopeValidatorManager();
validatorManager.use(ParameterValidator);

validatorManager.validate(['create_test:hello']);
```
