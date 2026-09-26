/**
 * @file src/data/content.js
 * Structure of the portfolio content: dates, links, logos, tech names. Translatable
 * texts (bio, roles, descriptions, degrees, category labels…) live in
 * `src/locales/<lang>/content.json`, under the `key` of each entry.
 * `experiences` and `education` share the `start` / `end` fields (YYYY-MM): `start`
 * sorts them together on the timeline, and both give the displayed period and duration.
 * @module content
 */

/**
 * Identity and contact: name, links, years of experience. Title, roles and Hero
 * paragraphs are under `bio` in content.json.
 */
export const Bio = {
  expYears: 7,
  name: 'Sébastien RITTER',
  surname: 'seb-rtr.jpeg',
  email: 'sebastienritter67580@gmail.com',
  github: 'https://github.com/rittersport67',
  linkedin: 'https://www.linkedin.com/in/sebastien-r-3b2160154/',
  location: 'Strasbourg, France'
};

/** Skill categories: `{ key, skills: [{ name, image? }] }`; the label is `skillCategories.<key>`. */
export const skills = [
  {
    key: 'frontend',
    skills: [
      {
        name: 'WPF',
        image:
          'https://www.ambient-it.net/wp-content/uploads/2016/04/wpf-logo-175.png.webp'
      },
      {
        name: 'React Js',
        image:
          'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K'
      },
      {
        name: 'Next.js',
        image: 'https://cdn.simpleicons.org/nextdotjs/FFFFFF'
      },
      {
        name: 'Tailwind CSS',
        image: 'https://cdn.simpleicons.org/tailwindcss/06B6D4'
      },
      {
        name: 'HTML',
        image: 'https://www.w3.org/html/logo/badge/html5-badge-h-solo.png'
      },
      {
        name: 'CSS',
        image:
          'https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg'
      },
      {
        name: 'JavaScript',
        image:
          'https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg'
      }
    ]
  },
  {
    key: 'backend',
    skills: [
      {
        name: 'C#',
        image: 'https://cdn.worldvectorlogo.com/logos/c--4.svg'
      },
      {
        name: '.NET',
        image:
          'https://raw.githubusercontent.com/devicons/devicon/master/icons/dotnetcore/dotnetcore-original.svg'
      },
      {
        name: 'MySQL',
        image:
          'https://raw.githubusercontent.com/devicons/devicon/master/icons/mysql/mysql-original-wordmark.svg'
      },
      {
        name: 'Java',
        image:
          'https://raw.githubusercontent.com/devicons/devicon/master/icons/java/java-original.svg'
      }
    ]
  },
  {
    key: 'embedded',
    skills: [
      {
        name: 'C',
        image: 'https://icon.icepanel.io/Technology/svg/C.svg'
      },
      {
        name: 'NI LabVIEW',
        image: 'https://icon.icepanel.io/Technology/svg/LabVIEW.svg'
      },
      {
        name: 'NI TestStand',
        image: 'https://ni.scene7.com/is/image/ni/TestStand_BG?$ni-icon-pm$'
      },
      {
        name: 'IAR Workbench Toolchain',
        image:
          'https://i.pinimg.com/originals/c8/7e/cb/c87ecb606692fb7c2b8d5f5f5fbb60ab.png'
      },
      {
        name: 'Python',
        image:
          'https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg'
      },
      {
        name: 'GCC',
        image: 'https://icon.icepanel.io/Technology/svg/GCC.svg'
      },
      {
        name: 'Modbus / CANopen',
        image: 'https://api.iconify.design/mdi/connection.svg?color=%237B4EA8'
      },
      {
        name: 'AUTOSAR BSW',
        image: 'https://api.iconify.design/mdi/car-cog.svg?color=%237B4EA8'
      },
      {
        name: 'HIL / SIL',
        image:
          'https://api.iconify.design/mdi/flask-outline.svg?color=%237B4EA8'
      }
    ]
  },
  {
    key: 'ai',
    skills: [
      {
        name: 'MCP',
        image: 'https://cdn.simpleicons.org/anthropic/CC785C'
      },
      {
        name: 'LangGraph',
        image: 'https://cdn.simpleicons.org/langchain/1C3C3C'
      },
      {
        name: 'TypeScript',
        image:
          'https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg'
      },
      {
        name: 'Electron',
        image:
          'https://raw.githubusercontent.com/devicons/devicon/master/icons/electron/electron-original.svg'
      },
      {
        name: 'GitHub Actions',
        image: 'https://cdn.simpleicons.org/githubactions/2088FF'
      },
      {
        name: 'REST APIs',
        image:
          'https://raw.githubusercontent.com/devicons/devicon/master/icons/postman/postman-original.svg'
      },
      {
        name: 'RAG / NLP',
        image:
          'https://api.iconify.design/mdi/text-box-search-outline.svg?color=%2300D4FF'
      }
    ]
  },
  {
    key: 'cloud',
    skills: [
      {
        name: 'Kubernetes',
        image: 'https://cdn.simpleicons.org/kubernetes/326CE5'
      },
      {
        name: 'OpenShift',
        image: 'https://cdn.simpleicons.org/redhatopenshift/EE0000'
      }
    ]
  },
  {
    key: 'ide',
    skills: [
      {
        name: 'VS Code',
        image:
          'https://raw.githubusercontent.com/devicons/devicon/master/icons/vscode/vscode-original.svg'
      },
      {
        name: 'Visual Studio',
        image: 'https://icon.icepanel.io/Technology/svg/Visual-Studio.svg'
      },
      {
        name: 'Eclipse',
        image:
          'https://icon.icepanel.io/Technology/png-shadow-512/Eclipse-IDE.png'
      },
      {
        name: 'MPLAB',
        image:
          'data:image/jpeg;base64,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'
      }
    ]
  },
  {
    key: 'others',
    skills: [
      {
        name: 'Git',
        image: 'https://cdn.simpleicons.org/git/F05032'
      },
      {
        name: 'GitLab',
        image: 'https://cdn.simpleicons.org/gitlab/FC6D26'
      },
      {
        name: 'Tortoise SVN',
        image: 'https://tortoisesvn.net/assets/img/logo-256x256.png'
      },
      {
        name: 'Jira',
        image: 'https://icon.icepanel.io/Technology/svg/Jira.svg'
      },
      {
        name: 'Vitest',
        image: 'https://cdn.simpleicons.org/vitest/6E9F18'
      },
      {
        name: 'DOORS',
        image:
          'https://www.opshub.com/wp-content/uploads/2018/02/IBM-RATIONAL-DOORS.png'
      },
      {
        name: 'Agile / Scrum',
        image: 'https://api.iconify.design/mdi/autorenew.svg?color=%2300A3E0'
      },
      {
        name: 'UX Design',
        image: 'https://cdn.simpleicons.org/figma/F24E1E'
      },
      {
        name: 'Photoshop',
        image: 'https://icon.icepanel.io/Technology/svg/Adobe-Photoshop.svg'
      },
      {
        name: 'Serato DJ',
        image:
          'data:image/png;base64,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'
      }
    ]
  }
];


/**
 * Jobs: `{ id, key, img?, company, via?, start, end }`. Role, description and
 * abilities are under `experiences.<key>` in content.json.
 * `via` names the consulting firm for contracted work; `end: null` means ongoing.
 */
export const experiences = [
  {
    id: 0,
    key: 'ibm',
    img: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg',
    company: 'IBM',
    start: '2025-07',
    end: null
  },
  {
    id: 1,
    key: 'bdr',
    img: 'https://img.batiweb.com/repo-images/article/37452/BDR.jpg',
    company: 'BDR Thermea Group',
    via: 'Capgemini',
    start: '2023-08',
    end: '2025-06'
  },
  {
    id: 2,
    key: 'bosch',
    img: 'https://images.seeklogo.com/logo-png/2/1/bosch-logo-png_seeklogo-21517.png?v=1958567578828505240',
    company: 'Bosch',
    via: 'Capgemini Engineering',
    start: '2022-03',
    end: '2023-07'
  },
  {
    id: 3,
    key: 'liebherr',
    img: 'https://media.licdn.com/dms/image/v2/C560BAQG3lyTi3B8qQQ/company-logo_200_200/company-logo_200_200/0/1630647286440/liebherr_logo?e=2147483647&v=beta&t=9G8_gWxS09bZ9fihd5M2k_6feTkmLafmKSwUbRwK7j0',
    company: 'Liebherr Mining Equipment',
    start: '2018-09',
    end: '2022-02'
  },
  {
    id: 4,
    key: 'fsg',
    img: require('../img/logo-company/fsg.jpeg'),
    company: 'FSG Fernsteuergeraete',
    start: '2021-08',
    end: '2021-08'
  },
  {
    id: 5,
    key: 'bruker',
    img: require('../img/logo-company/bruker.png'),
    company: 'Bruker BioSpin',
    start: '2018-04',
    end: '2018-06'
  }
];

/**
 * Photos: `{ id, title, category }` plus either `before` + `after` (before/after card)
 * or `image` (plain card). The category label is `photoCategories.<category>`.
 */
export const photography = [
  {
    id: 1,
    title: 'Tokyo — Ueno',
    before: require('../img/photography/tokyo_before.jpg'),
    after: require('../img/photography/tokyo_after.png'),
    category: 'street'
  },
  {
    id: 2,
    title: 'Kyoto — Yasaka',
    before: require('../img/photography/kyoto_before.jpg'),
    after: require('../img/photography/kyoto_after.png'),
    category: 'street'
  }
];

/**
 * Degrees: `{ id, key, img?, school, start, end }` — displayed as years only.
 * Degree and description are under `education.<key>` in content.json.
 */
export const education = [
  {
    id: 0,
    key: 'tps',
    img: 'https://www.telecom-physique.fr/fileadmin/templates/projects/telecom-physique/images/logo.png',
    school: 'Télécom Physique Strasbourg',
    start: '2018-09',
    end: '2021-08'
  },
  {
    id: 1,
    key: 'iut',
    school: 'IUT de Haguenau',
    start: '2016-09',
    end: '2018-06'
  }
];

/**
 * Personal projects: `{ id, key, title, start, end, image, tags, category, github?, webapp? }`.
 * `start` / `end` are months (YYYY-MM, `end: null` = ongoing), as for `experiences`.
 * The description is `projects.<key>.description` in content.json, injected as raw
 * HTML (dangerouslySetInnerHTML); the category label is `projectCategories.<category>`.
 */
export const projects = [
  {
    id: 0,
    key: 'spotifySorter',
    title: 'Spotify Playlist Sorter',
    start: '2026-03',
    end: '2026-08',
    image:
      'https://opengraph.githubassets.com/1/rittersport67/Spotify-playlist-sorter',
    tags: [
      'Python',
      'Groq LLM',
      'Spotify API',
      'Last.fm API',
      'GitHub Actions'
    ],
    category: 'automation',
    github: 'https://github.com/rittersport67/Spotify-playlist-sorter'
  },
  {
    id: 1,
    key: 'riotDashboard',
    title: 'Riot Dashboard',
    start: '2026-02',
    end: '2026-06',
    image: 'https://opengraph.githubassets.com/1/rittersport67/riot-dashboard',
    tags: [
      'TypeScript',
      'Next.js',
      'React',
      'LangGraph',
      'MCP',
      'Riot Games API',
      'Tailwind CSS'
    ],
    category: 'webApp',
    github: 'https://github.com/rittersport67/riot-dashboard'
  },
  {
    id: 2,
    key: 'mcpInspector',
    title: 'MCP Inspector',
    start: '2026-05',
    end: '2026-05',
    image: 'https://opengraph.githubassets.com/1/rittersport67/mcp-inspector',
    tags: ['TypeScript', 'React', 'Electron', 'MCP SDK', 'Tailwind CSS'],
    category: 'devTooling',
    github: 'https://github.com/rittersport67/mcp-inspector'
  },
  {
    id: 3,
    key: 'mcpLolEsports',
    title: 'MCP LoL Esports',
    start: '2026-03',
    end: '2026-05',
    image: 'https://opengraph.githubassets.com/1/rittersport67/mcp-lolesport',
    tags: ['Python', 'MCP', 'Riot Games API', 'LLM tooling'],
    category: 'devTooling',
    github: 'https://github.com/rittersport67/mcp-lolesport'
  }
];
