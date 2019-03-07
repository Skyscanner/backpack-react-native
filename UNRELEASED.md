# Unreleased

**Added:**

- react-native-bpk-component-text:
  - Added support for changing the font using a theme prop.
- react-native-bpk-theming:
  - Added a new Render Prop component `BpkThemeAttributes` to support arbitrary usage of a theme's `primaryColor` attribute. If rendered outside of a `BpkThemeProvider` with a defined theme `colorBlue500` is used instead.
    ```javascript
    const Color = () => (
      <BpkThemeAttributes>
        {({ primaryColor }) => <View style={{ backgroundColor: primaryColor }} />}
      </BpkThemeAttributes>
    );
    ```
