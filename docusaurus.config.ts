import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import {themes as prismThemes} from 'prism-react-renderer';

const [githubOwner, githubRepository] = (process.env.GITHUB_REPOSITORY ?? '').split('/');
const isGithubUserSite =
  githubRepository?.toLowerCase() === `${githubOwner?.toLowerCase()}.github.io`;
const siteUrl =
  process.env.DOCUSAURUS_URL ??
  (githubOwner
    ? `https://${githubOwner.toLowerCase()}.github.io`
    : 'https://manual.invalid');
const siteBaseUrl =
  process.env.DOCUSAURUS_BASE_URL ??
  (githubRepository && !isGithubUserSite ? `/${githubRepository}/` : '/');

const config: Config = {
  title: 'AM TZ Diag YAML 매뉴얼',
  tagline: 'API 테스트 구성과 결과 검증을 위한 실무 레퍼런스',
  favicon: 'img/favicon.svg',
  url: siteUrl,
  baseUrl: siteBaseUrl,
  onBrokenLinks: 'throw',
  markdown: {hooks: {onBrokenMarkdownLinks: 'warn'}},
  i18n: {defaultLocale: 'ko', locales: ['ko']},
  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
          breadcrumbs: true,
          showLastUpdateTime: false,
        },
        blog: false,
        theme: {customCss: './src/css/custom.css'},
      } satisfies Preset.Options,
    ],
  ],
  plugins: ['./plugins/localSmartSearch/index.ts'],
  themeConfig: {
    colorMode: {defaultMode: 'light', respectPrefersColorScheme: true},
    navbar: {
      title: 'AM TZ / YAML Manual',
      logo: {alt: 'AM TZ', src: 'img/favicon.svg'},
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'manualSidebar',
          position: 'left',
          label: '사용 매뉴얼',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `© ${new Date().getFullYear()} AM Corporation · Internal Engineering Documentation`,
    },
    prism: {
      theme: prismThemes.duotoneLight,
      darkTheme: prismThemes.duotoneDark,
      additionalLanguages: ['bash'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
