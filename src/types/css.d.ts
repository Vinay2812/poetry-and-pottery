// Next ships ambient declarations for `*.module.css` only (see
// node_modules/next/types/global.d.ts). Plain global stylesheets imported for
// their side effects need their own declaration, otherwise TypeScript reports
// ts(2882) / ts(2307) on `import "./styles/global.css"`.
declare module "*.css";
