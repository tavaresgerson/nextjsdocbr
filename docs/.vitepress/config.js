import sidebar from "./sidebar";

export default {
    title: 'NextJS 14.2',
    description: 'The React Framework for the Web',
    lang: 'pt-BR',
    head: [
        [
            'link',
            { rel: 'preconnect', href: 'https://fonts.googleapis.com' }
          ],
          [
            'link',
            { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }
          ],
          [
            'link',
            { href: 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap', rel: 'stylesheet' }
          ],
          ['link', { rel: 'icon', href: '/favicon.ico' }]
    ],
    ignoreDeadLinks: true,
    themeConfig: {
        returnToTopLabel: 'Retornar ao Topo',
        lightModeSwitchTitle: 'Trocar para tema claro',
        darkModeSwitchTitle: 'Trocar para tema escuro',
        darkModeSwitchLabel: 'Aparência',
        outline: {
            label: 'Nesta página',
            deep: 3
        },
        // theme-level options
        logo:  { light: '/header_logo.svg', dark: '/header_logo.svg' },
        socialLinks: [
            { icon: 'github', link: 'https://github.com/vercel/next.js' },
        ],
        search: {
            provider: 'local',
            options: {
                placeholder: 'Pesquisar',
                locales: {
                    translations: {
                        button: {
                            buttonText: '搜索文档',
                            buttonAriaLabel: '搜索文档'
                        },
                        modal: {
                            noResultsText: '无法找到相关结果',
                            resetButtonTitle: '清除查询条件',
                            footer: {
                                selectText: '选择',
                                navigateText: '切换'
                            }
                        }
                    }
                }
            }
        },
        docFooter: {
            prev: 'Página anterior',
            next: 'Próxima página'
        },
        sidebar: sidebar
    },
}