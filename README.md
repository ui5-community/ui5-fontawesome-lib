# 🎨 UI5 FontAwesome Icons Library

> **Enhance your SAP UI5/OpenUI5 applications with modern Font Awesome icons!** 🚀

This library seamlessly integrates [Font Awesome](https://fontawesome.com/icons) icons into the SAP UI5 icon system, providing access to thousands of beautiful, scalable icons for your Fiori applications.
Have a look at the [ui5-icon-explorer](https://github.com/ui5-community/ui5-icon-explorer) project or directly visit [ie.kernich.de](https://ie.kernich.de/) for an example integration and interactive showcase of all free Font Awesome icons together with the built-in icons. 

[![Build app](https://github.com/ui5-community/ui5-fontawesome-lib/workflows/Build%20app/badge.svg)](https://github.com/ui5-community/ui5-fontawesome-lib/actions?query=workflow%3A%22Build+app%22)
[![ESLint check](https://github.com/ui5-community/ui5-fontawesome-lib/workflows/ESLint%20check/badge.svg)](https://github.com/ui5-community/ui5-fontawesome-lib/actions?query=workflow%3A%22ESLint+check%22)
[![TypeScript check](https://github.com/ui5-community/ui5-fontawesome-lib/workflows/TypeScript%20check/badge.svg)](https://github.com/ui5-community/ui5-fontawesome-lib/actions?query=workflow%3A%22TypeScript+check%22)
[![UI5 Lint](https://github.com/ui5-community/ui5-fontawesome-lib/workflows/UI5%20Lint%20check/badge.svg)](https://github.com/ui5-community/ui5-fontawesome-lib/actions?query=workflow%3A%22UI5+Lint%22)
[![Font Awesome](https://img.shields.io/badge/FontAwesome-7.0.0-blue.svg)](https://fontawesome.com/)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![UI5](https://img.shields.io/badge/UI5-1.120.33+-green.svg)](https://sapui5.hana.ondemand.com/)

## 🎯 Features

- ✨ **Seamless Integration**: Use Font Awesome icons with standard UI5 Icon controls
- 🎨 **3 Icon Styles**: Regular, Solid, and Brand icons

## 📋 Icon Mapping

| Font Awesome Style | UI5 Namespace           | Example Usage                                           |
| ------------------ | ----------------------- | ------------------------------------------------------- |
| `fa-regular`       | `sap-icon://fa-regular` | `<Icon src="sap-icon://fa-regular/face-grin-hearts" />` |
| `fa-solid`         | `sap-icon://fa-solid`   | `<Icon src="sap-icon://fa-solid/face-grin-hearts" />`   |
| `fa-brands`        | `sap-icon://fa-brands`  | `<Icon src="sap-icon://fa-brands/github" />`            |

## 🛠️ Setup & Configuration

Add the `fontawesome.icons.lib` library dependency to your `manifest.json` and follow one of the next methods. 

```json
{
  "dependencies": {
    "minUI5Version": "1.120.33",
    "libs": {
      "sap.ui.core": {},
      "sap.m": {},
      "fontawesome.icons.lib": {}
    }
  }
}
```

### Method 1: Using NPM Package (Recommended)

Install Dependencies

```bash
npm i ui5-fontawesome-lib
```

That should be it. The UI5 tooling will recognize the UI5 dependency (verifiable via UI5 CLI command `UI5 tree`) and take care of loading it for you.

#### with UI5 middleware (alternative recommendation)

```bash
npm i ui5-fontawesome-lib && npm i -D ui5-middleware-servestatic
```

Add the following configuration to your `ui5.yaml`:

```yaml
server:
  customMiddleware:
    - name: ui5-middleware-servestatic
      afterMiddleware: compression
      mountPath: /resources/fontawesome/icons/lib/
      configuration:
        npmPackagePath: 'ui5-fontawesome-lib/dist/resources/fontawesome/icons/lib'
```

### Method 2: Using CDN

Add `https://cdn.kernich.de/ui5-fontawesome-lib/resources/fontawesome/icons/lib` to your resource roots for `fontawesome.icons.lib`

```HTML
<script
  id="sap-ui-bootstrap"
  src="https://sdk.openui5.org/resources/sap-ui-core.js"
  data-sap-ui-resource-roots='{
    "my.example.app": "./",
    "fontawesome.icons.lib": "https://cdn.kernich.de/ui5-fontawesome-lib/resources/fontawesome/icons/lib"
  }'
  data-sap-ui-on-init="module:sap/ui/core/ComponentSupport"
  data-sap-ui-compat-version="edge"
  data-sap-ui-frame-options="trusted"
  data-sap-ui-async="true"
></script>
```

### Method 3: Local setup (for development)

Clone this repository and add it as a dependency to your local UI5 project setup.

## 💻 Usage Examples

### Basic Icon Usage

```xml
<!-- Regular icons -->
<Icon src="sap-icon://fa-regular/heart" />

<!-- Solid icons -->
<Icon src="sap-icon://fa-solid/star" />

<!-- Brand icons -->
<Icon src="sap-icon://fa-brands/github" />
```

### With Icon Properties

```xml
<Icon 
    src="sap-icon://fa-solid/rocket" 
    size="2rem" 
    color="#0070f3" 
    tooltip="Launch application" />
```

### In JavaScript/TypeScript

```typescript
import Icon from "sap/ui/core/Icon";

const icon = new Icon({
    src: "sap-icon://fa-solid/check-circle",
    size: "1.5rem",
    color: "green"
});
```

## 🎨 Font Awesome Pro Support

Want to use Font Awesome Pro icons? Here's how to extend this library:

### Setup Font Awesome Pro Icons

1. **Follow the official Font Awesome tutorial**: [Font Awesome Pro Setup](https://docs.fontawesome.com/web/setup/packages#all-inclusive-packages)

2. **Create `.npmrc` file**:
   ```
   @fortawesome:registry=https://npm.fontawesome.com/
   //npm.fontawesome.com/:_authToken=XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
   ```

3. **Install Pro package**:
   ```bash
   npm install --save @fortawesome/fontawesome-pro
   ```

4. **Update build process**: Modify `generate.js` to include Pro font files by changing `const loadPro = false;` to `const loadPro = true;`

5. **Register new styles**: Update `library.ts` to register additional icon styles

## 🚀 Development

### Quick Start

```bash
# Clone the repository
git clone https://github.com/ui5-community/ui5-fontawesome-lib.git
cd ui5-fontawesome-lib

# Install dependencies
npm install

# Start development server
npm start
```

Visit [http://localhost:8080/](http://localhost:8080/) to see the icon browser with search functionality.

## 📸 Screenshot

![Icon Browser with Search](screenshot.png)

*Interactive icon browser with search functionality - run `npm start` to see it in action!*

### Available Scripts

| Command              | Description                                                    |
| -------------------- | -------------------------------------------------------------- |
| `npm start`          | Start development server and get interactive demo of all icons |
| `npm run build`      | Build the library for production                               |
| `npm run check:ts`   | TypeScript type checking                                       |
| `npm run check:lint` | ESLint code quality check                                      |
| `npm run check:ui5`  | ui5lint check                                                  |
| `npm run check:all`  | Run all code quality checks                                    |
| `npm run fix:lint`   | Automatically fix lint issues if possible                      |

### Debugging

Enable sourcemaps in your browser's developer console to debug the original TypeScript code. Use `Ctrl`/`Cmd` + `P` in Chrome to open specific `.ts` files.

## 📊 Project Structure

```
ui5-fontawesome-lib/
├── src/                    # Source files
│   ├── fonts/             # Font Awesome font files
│   ├── library.ts         # Main library file
│   └── themes/            # UI5 themes
├── test/                  # Test files
├── dist/                  # Build output
└── scripts/               # Build and deployment scripts
```

## 🤝 Contributing

We welcome contributions! Please feel free to submit issues and pull requests.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the Apache Software License, version 2.0 - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- 📦 [NPM Package](https://www.npmjs.com/package/ui5-fontawesome-lib)
- 🐙 [GitHub Repository](https://github.com/ui5-community/ui5-fontawesome-lib)
- 📚 [Font Awesome Documentation](https://fontawesome.com/docs)
- 🎯 [SAP UI5 Documentation](https://sapui5.hana.ondemand.com/)

## ⭐ Support

If you find this library helpful, please consider giving it a star on GitHub! ⭐

---

**Made with ❤️ for the SAP UI5 community**