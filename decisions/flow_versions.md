# Flow versions

## Decision
The version of `flow-bin` that we use in Backpack React Native should align to the [same version that React Native is using](https://github.com/facebook/react-native/blob/master/.flowconfig).


## Thinking
The reason for this is newer versions of Flow use different concepts and features that when we make changes within Backpack could actually mean we misuse and violate types that React Native expects.

## Anything else
**Note:** Any pull requests that Dependabot or Snyk raise to upgrade flow should only be done if the version being updated aligns to the version in React Native. If the version bump is higher the PR should be closed.
