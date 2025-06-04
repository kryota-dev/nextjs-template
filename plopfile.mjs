// @ts-check

/**
 * Plop設定ファイル
 * @param {import('plop').NodePlopAPI} plop
 */
function setupPlop(plop) {
  // ヘルパー関数の設定
  plop.setHelper('pascalCase', (text) => {
    return text
      .replace(
        /(\w)(\w*)/g,
        (g0, g1, g2) => g1.toUpperCase() + g2.toLowerCase(),
      )
      .replace(/\W/g, '')
  })

  plop.setHelper('camelCase', (text) => {
    const pascalCase = text
      .replace(
        /(\w)(\w*)/g,
        (g0, g1, g2) => g1.toUpperCase() + g2.toLowerCase(),
      )
      .replace(/\W/g, '')
    return pascalCase.charAt(0).toLowerCase() + pascalCase.slice(1)
  })

  // バリデーション関数
  const validatePascalCase = (input, fieldName = 'コンポーネント名') => {
    if (!input) return `${fieldName}は必須です`
    if (!/^[A-Z][a-zA-Z0-9]*$/.test(input)) {
      return `${fieldName}はPascalCaseで入力してください（例: MyComponent）`
    }
    return true
  }

  const validatePath = (input, fieldName = 'パス') => {
    if (!input) return `${fieldName}は必須です`
    if (input.startsWith('/')) return `${fieldName}の先頭に / は不要です`
    return true
  }

  // パス生成関数
  const generateComponentPath = (location, type, routeName = '') => {
    if (location === 'src') {
      return `src/components/${type}`
    } else if (type === 'page_presentation_components') {
      return `src/app/${routeName}/_containers/page/presentation/_components`
    } else if (type === 'layout_presentation_components') {
      return `src/app/${routeName}/_containers/layout/presentation/_components`
    }
    return ''
  }

  const generateStoryTitle = (
    location,
    type,
    componentName,
    routeName = '',
  ) => {
    if (location === 'src') {
      return `components/${type}/${componentName}`
    } else if (type === 'page_presentation_components') {
      return `app/${routeName}/_containers/page/presentation/_components/${componentName}`
    } else if (type === 'layout_presentation_components') {
      return `app/${routeName}/_containers/layout/presentation/_components/${componentName}`
    }
    return ''
  }

  // コンポーネント名生成
  const generateComponentNameFromPath = (path) => {
    const segments = path.split('/').filter(Boolean)
    const lastSegment = segments[segments.length - 1]
    const cleanSegment = lastSegment.replace(/\[|\]/g, '').replace(/-/g, '')
    return cleanSegment.charAt(0).toUpperCase() + cleanSegment.slice(1)
  }

  // 確認メッセージ生成
  const generateConfirmMessage = (title, details, files) => {
    const detailsText = details
      .map(([emoji, label, value]) => `${emoji} ${label}: ${value}`)
      .join('\n')
    const filesText = files.map((f) => `  - ${f}`).join('\n')

    return `\n${title}:\n\n${detailsText}\n\n🔗 生成されるファイル:\n${filesText}\n\n上記の内容で生成しますか？`
  }

  // 基本的なファイル生成アクション
  const createComponentActions = (basePath, storyTitle) => [
    {
      type: 'add',
      path: `${basePath}/{{componentName}}/{{componentName}}.tsx`,
      templateFile: '.plop/component/component.tsx.hbs',
    },
    {
      type: 'add',
      path: `${basePath}/{{componentName}}/{{componentName}}.spec.tsx`,
      templateFile: '.plop/component/component.spec.tsx.hbs',
    },
    {
      type: 'add',
      path: `${basePath}/{{componentName}}/{{componentName}}.stories.tsx`,
      templateFile: '.plop/component/component.stories.tsx.hbs',
      data: { storyTitle },
    },
    {
      type: 'add',
      path: `${basePath}/{{componentName}}/index.ts`,
      templateFile: '.plop/component/index.ts.hbs',
    },
  ]

  // Container/Presentational pattern用のファイル生成アクション
  const createContainerPresentationalActions = (basePath, componentType) => {
    const actions = []

    // Container files
    actions.push({
      type: 'add',
      path: `${basePath}/_containers/${componentType}/container.tsx`,
      templateFile: `.plop/app_component/_containers/${componentType}/container.tsx.hbs`,
    })

    actions.push({
      type: 'add',
      path: `${basePath}/_containers/${componentType}/index.ts`,
      templateFile: `.plop/app_component/_containers/${componentType}/index.ts.hbs`,
    })

    // Presentation files
    actions.push({
      type: 'add',
      path: `${basePath}/_containers/${componentType}/presentation/presentation.tsx`,
      templateFile: `.plop/app_component/_containers/${componentType}/presentation/presentation.tsx.hbs`,
    })

    actions.push({
      type: 'add',
      path: `${basePath}/_containers/${componentType}/presentation/presentation.stories.tsx`,
      templateFile: `.plop/app_component/_containers/${componentType}/presentation/presentation.stories.tsx.hbs`,
    })

    actions.push({
      type: 'add',
      path: `${basePath}/_containers/${componentType}/presentation/index.ts`,
      templateFile: `.plop/app_component/_containers/${componentType}/presentation/index.ts.hbs`,
    })

    return actions
  }

  // Reactコンポーネント生成
  plop.setGenerator('component', {
    description: 'Reactコンポーネントを生成',
    prompts: [
      {
        type: 'input',
        name: 'componentName',
        message: 'コンポーネント名を入力してください (PascalCase):',
        validate: (input) => validatePascalCase(input),
      },
      {
        type: 'list',
        name: 'componentLocation',
        message: 'コンポーネントの配置場所を選択してください:',
        choices: [
          { name: 'src/components/ - 汎用コンポーネント', value: 'src' },
          { name: 'app/ - ページ固有コンポーネント', value: 'app' },
        ],
        default: 'src',
      },
      {
        type: 'list',
        name: 'componentType',
        message: 'コンポーネントの種類を選択してください:',
        choices: (answers) => {
          if (answers.componentLocation === 'src') {
            return [
              { name: '共通コンポーネント (common)', value: 'common' },
              { name: 'レイアウトコンポーネント (layouts)', value: 'layouts' },
            ]
          } else {
            return [
              {
                name: 'ページPresentation内用 ([route]/_containers/page/presentation/_components)',
                value: 'page_presentation_components',
              },
              {
                name: 'レイアウトPresentation内用 ([route]/_containers/layout/presentation/_components)',
                value: 'layout_presentation_components',
              },
            ]
          }
        },
        default: (answers) =>
          answers.componentLocation === 'src'
            ? 'common'
            : 'page_presentation_components',
      },
      {
        type: 'input',
        name: 'routeName',
        message: 'ルート名を入力してください (例: news, blog):',
        when: (answers) => answers.componentLocation === 'app',
        validate: (input) => validatePath(input, 'ルート名'),
      },
      {
        type: 'confirm',
        name: 'confirmGeneration',
        message: (answers) => {
          const basePath = generateComponentPath(
            answers.componentLocation,
            answers.componentType,
            answers.routeName,
          )
          const storyTitle = generateStoryTitle(
            answers.componentLocation,
            answers.componentType,
            answers.componentName,
            answers.routeName,
          )

          const files = [
            `${basePath}/${answers.componentName}/${answers.componentName}.tsx`,
            `${basePath}/${answers.componentName}/${answers.componentName}.spec.tsx`,
            `${basePath}/${answers.componentName}/${answers.componentName}.stories.tsx`,
            `${basePath}/${answers.componentName}/index.ts`,
          ]

          const details = [
            ['📦', 'コンポーネント名', answers.componentName],
            ['📁', '配置場所', `${basePath}/`],
            ['📚', 'Storybookタイトル', storyTitle],
          ]

          return generateConfirmMessage(
            '以下の内容でコンポーネントを生成します',
            details,
            files,
          )
        },
        default: true,
      },
    ],
    actions: (data) => {
      if (!data || !data.confirmGeneration) return []

      const basePath = generateComponentPath(
        data.componentLocation,
        data.componentType,
        data.routeName,
      )
        .replace(data.componentType, '{{componentType}}')
        .replace(data.routeName || '', '{{routeName}}')

      const storyTitle = generateStoryTitle(
        data.componentLocation,
        data.componentType,
        data.componentName,
        data.routeName,
      )

      return createComponentActions(basePath, storyTitle)
    },
  })

  // App Routerページ生成
  plop.setGenerator('page', {
    description: 'App Routerのページを生成',
    prompts: [
      {
        type: 'input',
        name: 'pagePath',
        message: 'ページのパスを入力してください (例: about, blog/[slug]):',
        validate: (input) => validatePath(input, 'ページパス'),
      },
      {
        type: 'input',
        name: 'componentName',
        message: 'ページコンポーネント名を入力してください (PascalCase):',
        default: (answers) => generateComponentNameFromPath(answers.pagePath),
        validate: (input) => validatePascalCase(input),
      },
      {
        type: 'confirm',
        name: 'includeLayout',
        message: 'レイアウトファイルも生成しますか？',
        default: false,
      },
      {
        type: 'confirm',
        name: 'confirmGeneration',
        message: (answers) => {
          const files = [
            `src/app/${answers.pagePath}/page.tsx`,
            `src/app/${answers.pagePath}/_containers/page/container.tsx`,
            `src/app/${answers.pagePath}/_containers/page/index.ts`,
            `src/app/${answers.pagePath}/_containers/page/presentation/presentation.tsx`,
            `src/app/${answers.pagePath}/_containers/page/presentation/presentation.stories.tsx`,
            `src/app/${answers.pagePath}/_containers/page/presentation/index.ts`,
          ]

          if (answers.includeLayout) {
            files.push(
              `src/app/${answers.pagePath}/layout.tsx`,
              `src/app/${answers.pagePath}/_containers/layout/container.tsx`,
              `src/app/${answers.pagePath}/_containers/layout/index.ts`,
              `src/app/${answers.pagePath}/_containers/layout/presentation/presentation.tsx`,
              `src/app/${answers.pagePath}/_containers/layout/presentation/presentation.stories.tsx`,
              `src/app/${answers.pagePath}/_containers/layout/presentation/index.ts`,
            )
          }

          const details = [
            ['📄', 'ページパス', `/${answers.pagePath}`],
            ['📦', 'コンポーネント名', `${answers.componentName}Page`],
            ['📐', 'レイアウト生成', answers.includeLayout ? 'あり' : 'なし'],
          ]

          if (answers.includeLayout) {
            details.push([
              '📐',
              'レイアウトコンポーネント名',
              `${answers.componentName}Layout`,
            ])
          }

          details.push(['📚', 'Storybook', 'presentation.stories.tsx を生成'])

          return generateConfirmMessage(
            '以下の内容でページを生成します',
            details,
            files,
          )
        },
        default: true,
      },
    ],
    actions: (data) => {
      if (!data || !data.confirmGeneration) return []

      const actions = [
        {
          type: 'add',
          path: 'src/app/{{pagePath}}/page.tsx',
          templateFile: '.plop/app_component/page.tsx.hbs',
        },
        // Container/Presentational pattern files for page
        ...createContainerPresentationalActions('src/app/{{pagePath}}', 'page'),
      ]

      if (data.includeLayout) {
        actions.push(
          {
            type: 'add',
            path: 'src/app/{{pagePath}}/layout.tsx',
            templateFile: '.plop/app_component/layout.tsx.hbs',
          },
          // Container/Presentational pattern files for layout
          ...createContainerPresentationalActions(
            'src/app/{{pagePath}}',
            'layout',
          ),
        )
      }

      return actions
    },
  })

  // レイアウトのみ生成
  plop.setGenerator('layout', {
    description: 'App Routerのレイアウトを生成',
    prompts: [
      {
        type: 'input',
        name: 'pagePath',
        message: 'レイアウトのパスを入力してください (例: dashboard, blog):',
        validate: (input) => validatePath(input, 'レイアウトパス'),
      },
      {
        type: 'input',
        name: 'componentName',
        message: 'レイアウトコンポーネント名を入力してください (PascalCase):',
        default: (answers) => generateComponentNameFromPath(answers.pagePath),
        validate: (input) => validatePascalCase(input),
      },
      {
        type: 'confirm',
        name: 'confirmGeneration',
        message: (answers) => {
          const files = [
            `src/app/${answers.pagePath}/layout.tsx`,
            `src/app/${answers.pagePath}/_containers/layout/container.tsx`,
            `src/app/${answers.pagePath}/_containers/layout/index.ts`,
            `src/app/${answers.pagePath}/_containers/layout/presentation/presentation.tsx`,
            `src/app/${answers.pagePath}/_containers/layout/presentation/presentation.stories.tsx`,
            `src/app/${answers.pagePath}/_containers/layout/presentation/index.ts`,
          ]

          const details = [
            ['📁', 'レイアウトパス', `/${answers.pagePath}`],
            ['📦', 'コンポーネント名', `${answers.componentName}Layout`],
            ['📚', 'Storybook', 'presentation.stories.tsx を生成'],
          ]

          return generateConfirmMessage(
            '以下の内容でレイアウトを生成します',
            details,
            files,
          )
        },
        default: true,
      },
    ],
    actions: (data) => {
      if (!data || !data.confirmGeneration) return []

      return [
        {
          type: 'add',
          path: 'src/app/{{pagePath}}/layout.tsx',
          templateFile: '.plop/app_component/layout.tsx.hbs',
        },
        // Container/Presentational pattern files for layout
        ...createContainerPresentationalActions(
          'src/app/{{pagePath}}',
          'layout',
        ),
      ]
    },
  })
}

export default setupPlop
