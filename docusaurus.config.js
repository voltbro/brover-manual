// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'VBCores',
  favicon: 'img/logo-square.svg',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://docs.vbcores.ru',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/brover-manual/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'Voltbro', // Usually your GitHub org/user name.
  projectName: 'brover-manual', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
      docs: {
        routeBasePath: '/',
        sidebarPath: require.resolve('./sidebars.js'),
        path: 'docs',
      },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/vbcores-social-card.png',
      colorMode: {
        respectPrefersColorScheme: true,
      },
      navbar: {
        title: '',
        logo: {
          alt: 'VBCores',
          src: 'img/logo.svg',
        },
        items: [
          //{
          //  type: 'docSidebar',
          //  sidebarId: 'tutorialSidebar',
          //  position: 'left',
          //  label: 'Tutorial',
          //},
          {
            href: 'https://github.com/voltbro/brover',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Сообщества',
            items: [
              {
                label: 'Официальный сайт',
                href: 'https://voltbro.ru/',
              },
              {
                label: 'Telegram',
                href: 'https://t.me/+aj3N9SvJ_qw3Y2Vi',
              },
              {
                label: 'Вконтакте',
                href: 'https://vk.com/voltbro',
              },
            ],
          },
          {
            title: 'Больше',
            items: [
              {
                label: 'GitHub VBCores',
                href: 'https://github.com/VBCores/',
              },
              {
                label: 'GitHub brover ROS2-package',
                href: 'https://github.com/voltbro/brover/',
              },
                            {
                label: 'GitHub brover-web ROS2-package',
                href: 'https://github.com/voltbro/brover_web/',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Проект "Братья Вольт" - Voltbro. Built with Docusaurus.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
