const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').DocusaurusConfig} */
module.exports = {
  title: 'Ying-Chiao Chen',
  tagline: '',
  url: 'https://woodcutter-eric.github.io/',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/planet.svg',
  organizationName: 'woodcutter-eric', // Usually your GitHub org/user name.
  projectName: 'woodcutter-eric.github.io', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Home',
      items: [
        {
          type: 'doc',
          docId: 'intro',
          position: 'left',
          label: 'Note',
        },
        {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/woodcutter-eric',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Note',
              to: '/docs/intro',
            },
          ],
        },
        {
          title: 'Social Account',
          items: [
            {
              label: 'Facebook',
              href: 'https://www.facebook.com/chenyingchiao/',
            },
            {
              label: 'LinkedIn',
              href: 'https://www.linkedin.com/in/woodcutter-eric/',
            },
            {
              label: 'Github',
              href: 'https://github.com/woodcutter-eric',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: '/blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/woodcutter-eric',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Eric Chen, Inc. Built with Docusaurus.`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
      additionalLanguages: ['docker', 'elixir', 'go', 'java'],
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: undefined,
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl: undefined,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
