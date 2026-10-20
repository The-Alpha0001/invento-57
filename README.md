# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

## Deploying to a shared host

The GitHub Actions workflow in `.github/workflows/deploy_to_infinityfree_cpanel (1).yml` builds the app and deploys the generated `dist/` directory to cPanel over FTP when changes are pushed to `main`.

Add these repository secrets in **Settings → Secrets and variables → Actions**:

- `FTP_HOST`: FTP hostname provided by your hosting provider.
- `FTP_USERNAME`: FTP account username.
- `FTP_PASSWORD`: FTP account password.
- `CPANEL_REMOTE_DIR`: destination directory on the host, including a trailing slash (for example, `/htdocs/` or `/public_html/`, as specified by your provider).
