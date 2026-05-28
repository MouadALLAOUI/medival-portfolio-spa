import { getAssetById } from './mediaManager';
export const crmefProfile = {
  name: 'Mouad Allaoui',
  avatar: getAssetById('mouad-pic-png').path,
  bio: 'CRMEF_LANDING.crmefProfile.bio',
  isAvatarEmoji: false,
};

export const crmefEducation = [
  {
    id: 'CRMEF',
    period: 'CRMEF_LANDING.crmefEducation.CRMEF.period',
    institution: 'CRMEF_LANDING.crmefEducation.CRMEF.institution',
    location: 'CRMEF_LANDING.crmefEducation.CRMEF.location',
    degree: 'CRMEF_LANDING.crmefEducation.CRMEF.degree',
    title: 'CRMEF_LANDING.crmefEducation.CRMEF.title',
    type: 'CRMEF_LANDING.crmefEducation.CRMEF.type',
  },
  {
    id: 'SIR',
    period: 'CRMEF_LANDING.crmefEducation.SIR.period',
    institution: 'CRMEF_LANDING.crmefEducation.SIR.institution',
    location: 'CRMEF_LANDING.crmefEducation.SIR.location',
    degree: 'CRMEF_LANDING.crmefEducation.SIR.degree',
    title: 'CRMEF_LANDING.crmefEducation.SIR.title',
    type: 'CRMEF_LANDING.crmefEducation.SIR.type',
  },
  {
    id: 'ISTA',
    period: 'CRMEF_LANDING.crmefEducation.ISTA.period',
    institution: 'CRMEF_LANDING.crmefEducation.ISTA.institution',
    location: 'CRMEF_LANDING.crmefEducation.ISTA.location',
    degree: 'CRMEF_LANDING.crmefEducation.ISTA.degree',
    title: 'CRMEF_LANDING.crmefEducation.ISTA.title',
    type: 'CRMEF_LANDING.crmefEducation.ISTA.type',
  },
  {
    id: 'BAC',
    period: 'CRMEF_LANDING.crmefEducation.BAC.period',
    institution: 'CRMEF_LANDING.crmefEducation.BAC.institution',
    location: 'CRMEF_LANDING.crmefEducation.BAC.location',
    degree: 'CRMEF_LANDING.crmefEducation.BAC.degree',
    title: 'CRMEF_LANDING.crmefEducation.BAC.title',
    type: 'CRMEF_LANDING.crmefEducation.BAC.type',
  },
];

export const crmefExperience = [
  {
    id: 'crmef_internship',
    period: 'CRMEF_LANDING.crmefExperience.crmef_internship.period',
    title: 'CRMEF_LANDING.crmefExperience.crmef_internship.title',
    institution: 'CRMEF_LANDING.crmefExperience.crmef_internship.institution',
    location: 'CRMEF_LANDING.crmefExperience.crmef_internship.location',
    description: 'CRMEF_LANDING.crmefExperience.crmef_internship.description',
  },
  {
    id: 'ennahda_english_cs_teacher',
    period: 'CRMEF_LANDING.crmefExperience.ennahda_english_cs_teacher.period',
    title: 'CRMEF_LANDING.crmefExperience.ennahda_english_cs_teacher.title',
    institution: 'CRMEF_LANDING.crmefExperience.ennahda_english_cs_teacher.institution',
    location: 'CRMEF_LANDING.crmefExperience.ennahda_english_cs_teacher.location',
    description: 'CRMEF_LANDING.crmefExperience.ennahda_english_cs_teacher.description',
  },
  {
    id: 'lp_pfe_nagios_core',
    period: 'CRMEF_LANDING.crmefExperience.lp_pfe_nagios_core.period',
    title: 'CRMEF_LANDING.crmefExperience.lp_pfe_nagios_core.title',
    institution: 'CRMEF_LANDING.crmefExperience.lp_pfe_nagios_core.institution',
    location: 'CRMEF_LANDING.crmefExperience.lp_pfe_nagios_core.location',
    description: 'CRMEF_LANDING.crmefExperience.lp_pfe_nagios_core.description',
  },
  {
    id: 'freelance_dev_internship',
    period: 'CRMEF_LANDING.crmefExperience.freelance_dev_internship.period',
    title: 'CRMEF_LANDING.crmefExperience.freelance_dev_internship.title',
    institution: 'CRMEF_LANDING.crmefExperience.freelance_dev_internship.institution',
    location: 'CRMEF_LANDING.crmefExperience.freelance_dev_internship.location',
    description: 'CRMEF_LANDING.crmefExperience.freelance_dev_internship.description',
  },
  {
    id: 'dts_pfe_pharma',
    period: 'CRMEF_LANDING.crmefExperience.dts_pfe_pharma.period',
    title: 'CRMEF_LANDING.crmefExperience.dts_pfe_pharma.title',
    institution: 'CRMEF_LANDING.crmefExperience.dts_pfe_pharma.institution',
    location: 'CRMEF_LANDING.crmefExperience.dts_pfe_pharma.location',
    description: 'CRMEF_LANDING.crmefExperience.dts_pfe_pharma.description',
  },
];

export const crmefSports = [
  { id: 'dev_apps_games', label: 'CRMEF_LANDING.crmefSports.dev_apps_games.label', icon: '🚀' },
  { id: 'running', label: 'CRMEF_LANDING.crmefSports.running.label', icon: '🏃‍♂️' },
  { id: 'football', label: 'CRMEF_LANDING.crmefSports.football.label', icon: '⚽' },
  { id: 'chess_boardgames', label: 'CRMEF_LANDING.crmefSports.chess_boardgames.label', icon: '♟️' },
  { id: 'gaming', label: 'CRMEF_LANDING.crmefSports.gaming.label', icon: '🎮' },
];


export const crmefSemesters = [
  {
    id: 'semester-1',
    title: 'CRMEF_SEMESTERS.semesters.semester-1.title',
    modules: [
      {
        id: 'lesson-planning',
        name: 'CRMEF_SEMESTERS.semesters.semester-1.modules.lesson-planning.name',
        professor: 'CRMEF_SEMESTERS.semesters.semester-1.modules.lesson-planning.professor',
        desc: 'CRMEF_SEMESTERS.semesters.semester-1.modules.lesson-planning.desc',
        files: {
          solo: [
            {
              path: getAssetById('crmef-informatique-college-1').path,
              name: getAssetById('crmef-informatique-college-1').label,
              pages: getAssetById('crmef-informatique-college-1').meta.pageCount,
              date: '2026-01-15',
            },
            {
              path: getAssetById('crmef-informatique-college').path,
              name: getAssetById('crmef-informatique-college').label,
              pages: getAssetById('crmef-informatique-college').meta.pageCount,
              date: '2026-02-10',
            },
            {
              path: getAssetById('crmef-lesson').path,
              name: getAssetById('crmef-lesson').label,
              pages: getAssetById('crmef-lesson').meta.pageCount,
            },
          ],
          group: [],
          official: [],
        },
      },
      {
        id: 'learning-management',
        name: 'CRMEF_SEMESTERS.semesters.semester-1.modules.learning-management.name',
        professor: 'CRMEF_SEMESTERS.semesters.semester-1.modules.lesson-planning.professor',
        desc: 'CRMEF_SEMESTERS.semesters.semester-1.modules.learning-management.desc',
        files: {
          solo: [],
          group: [
            {
              path: getAssetById('crmef-la-gestion').path,
              name: getAssetById('crmef-la-gestion').label,
              pages: getAssetById('crmef-la-gestion').meta.pageCount,
            },
          ],
          official: [],
        },
      },
      {
        id: 'cs-reinforcement-1',
        name: 'CRMEF_SEMESTERS.semesters.semester-1.modules.cs-reinforcement-1.name',
        professor: 'CRMEF_SEMESTERS.semesters.semester-1.modules.cs-reinforcement-1.professor',
        desc: 'CRMEF_SEMESTERS.semesters.semester-1.modules.cs-reinforcement-1.desc',
        files: {
          solo: [],
          group: [],
          official: [
            {
              path: getAssetById('crmef-td1').path,
              name: getAssetById('crmef-td1').label,
              pages: getAssetById('crmef-td1').meta.pageCount,
            },
            {
              path: getAssetById('crmef-td2').path,
              name: getAssetById('crmef-td2').label,
              pages: getAssetById('crmef-td2').meta.pageCount,
            },
            {
              path: getAssetById('crmef-tp1').path,
              name: getAssetById('crmef-tp1').label,
              pages: getAssetById('crmef-tp1').meta.pageCount,
            },
            {
              path: getAssetById('crmef-tp2-fonctions').path,
              name: getAssetById('crmef-tp2-fonctions').label,
              pages: getAssetById('crmef-tp2-fonctions').meta.pageCount,
            },
            {
              path: getAssetById('crmef-tp3-chaine').path,
              name: getAssetById('crmef-tp3-chaine').label,
              pages: getAssetById('crmef-tp3-chaine').meta.pageCount,
            },
            {
              path: getAssetById('crmef-tp4-except').path,
              name: getAssetById('crmef-tp4-except').label,
              pages: getAssetById('crmef-tp4-except').meta.pageCount,
            },
            {
              path: getAssetById('crmef-tp5-listes').path,
              name: getAssetById('crmef-tp5-listes').label,
              pages: getAssetById('crmef-tp5-listes').meta.pageCount,
            },
            {
              path: getAssetById('crmef-tp6-tuples').path,
              name: getAssetById('crmef-tp6-tuples').label,
              pages: getAssetById('crmef-tp6-tuples').meta.pageCount,
            },
            {
              path: getAssetById('crmef-tp7-dict').path,
              name: getAssetById('crmef-tp7-dict').label,
              pages: getAssetById('crmef-tp7-dict').meta.pageCount,
            },
            {
              path: getAssetById('crmef-tp8-sets').path,
              name: getAssetById('crmef-tp8-sets').label,
              pages: getAssetById('crmef-tp8-sets').meta.pageCount,
            },
          ],
        },
      },
      {
        id: 'cs-reinforcement-2',
        name: 'CRMEF_SEMESTERS.semesters.semester-1.modules.cs-reinforcement-2.name',
        professor: 'CRMEF_SEMESTERS.semesters.semester-1.modules.cs-reinforcement-2.professor',
        desc: 'CRMEF_SEMESTERS.semesters.semester-1.modules.cs-reinforcement-2.desc',
        files: {
          solo: [],
          group: [
            {
              path: getAssetById('crmef-portes-logiques-applications-et-synthese').path,
              name: getAssetById('crmef-portes-logiques-applications-et-synthese').label,
              pages: getAssetById('crmef-portes-logiques-applications-et-synthese').meta.pageCount,
            },
          ],
          official: [],
        },
      },
      {
        id: 'ict-education-didactics',
        name: 'CRMEF_SEMESTERS.semesters.semester-1.modules.ict-education-didactics.name',
        professor: 'CRMEF_SEMESTERS.semesters.semester-1.modules.ict-education-didactics.professor',
        desc: 'CRMEF_SEMESTERS.semesters.semester-1.modules.ict-education-didactics.desc',
        files: {
          solo: [],
          group: [
            {
              path: getAssetById('crmef-les-effets-didactiques').path,
              name: getAssetById('crmef-les-effets-didactiques').label,
              pages: getAssetById('crmef-les-effets-didactiques').meta.pageCount,
            },
          ],
          official: [],
        },
      },
      {
        id: 'education-sciences',
        name: 'CRMEF_SEMESTERS.semesters.semester-1.modules.education-sciences.name',
        professor: 'CRMEF_SEMESTERS.semesters.semester-1.modules.education-sciences.professor',
        desc: 'CRMEF_SEMESTERS.semesters.semester-1.modules.education-sciences.desc',
        files: {
          solo: [],
          group: [
            {
              path: getAssetById('crmef-theories-de-apprentissage').path,
              name: getAssetById('crmef-theories-de-apprentissage').label,
              pages: getAssetById('crmef-theories-de-apprentissage').meta.pageCount,
            },
          ],
          official: [],
        },
      },
      {
        id: 'research-methodology',
        name: 'CRMEF_SEMESTERS.semesters.semester-1.modules.research-methodology.name',
        professor: 'CRMEF_SEMESTERS.semesters.semester-1.modules.research-methodology.professor',
        desc: 'CRMEF_SEMESTERS.semesters.semester-1.modules.research-methodology.desc',
        files: {
          solo: [],
          group: [],
          official: [
            {
              path: getAssetById('crmef-methodologie-ra').path,
              name: getAssetById('crmef-methodologie-ra').label,
              pages: getAssetById('crmef-methodologie-ra').meta.pageCount,
            },
          ],
        },
      },
    ],
  },
  {
    id: 'semester-2',
    title: 'CRMEF_SEMESTERS.semesters.semester-2.title',
    modules: [
      {
        id: 's2-lesson-planning-advanced',
        name: 'CRMEF_SEMESTERS.semesters.semester-2.modules.s2-lesson-planning-advanced.name',
        professor: 'CRMEF_SEMESTERS.semesters.semester-2.modules.s2-lesson-planning-advanced.professor',
        desc: 'CRMEF_SEMESTERS.semesters.semester-2.modules.s2-lesson-planning-advanced.desc',
        files: {
          solo: [],
          group: [],
          official: [],
        },
      },
      {
        id: 's2-classroom-communication',
        name: 'CRMEF_SEMESTERS.semesters.semester-2.modules.s2-classroom-communication.name',
        professor: 'CRMEF_SEMESTERS.semesters.semester-2.modules.s2-classroom-communication.professor',
        desc: 'CRMEF_SEMESTERS.semesters.semester-2.modules.s2-classroom-communication.desc',
        files: {
          solo: [],
          group: [],
          official: [],
        },
      },
      {
        id: 's2-cs-reinforcement-3',
        name: 'CRMEF_SEMESTERS.semesters.semester-2.modules.s2-cs-reinforcement-3.name',
        professor: 'CRMEF_SEMESTERS.semesters.semester-2.modules.s2-cs-reinforcement-3.professor',
        desc: 'CRMEF_SEMESTERS.semesters.semester-2.modules.s2-cs-reinforcement-3.desc',
        files: {
          solo: [],
          group: [],
          official: [],
        },
      },
      {
        id: 's2-cs-reinforcement-4',
        name: 'CRMEF_SEMESTERS.semesters.semester-2.modules.s2-cs-reinforcement-4.name',
        professor: 'CRMEF_SEMESTERS.semesters.semester-2.modules.s2-cs-reinforcement-4.professor',
        desc: 'CRMEF_SEMESTERS.semesters.semester-2.modules.s2-cs-reinforcement-4.desc',
        files: {
          solo: [],
          group: [],
          official: [],
        },
      },
      {
        id: 's2-assessment-evaluation',
        name: 'CRMEF_SEMESTERS.semesters.semester-2.modules.s2-assessment-evaluation.name',
        professor: 'CRMEF_SEMESTERS.semesters.semester-2.modules.s2-assessment-evaluation.professor',
        desc: 'CRMEF_SEMESTERS.semesters.semester-2.modules.s2-assessment-evaluation.desc',
        files: {
          solo: [],
          group: [],
          official: [],
        },
      },
      {
        id: 's2-inclusive-education',
        name: 'CRMEF_SEMESTERS.semesters.semester-2.modules.s2-inclusive-education.name',
        professor: 'CRMEF_SEMESTERS.semesters.semester-2.modules.s2-inclusive-education.professor',
        desc: 'CRMEF_SEMESTERS.semesters.semester-2.modules.s2-inclusive-education.desc',
        files: {
          solo: [],
          group: [],
          official: [],
        },
      },
      {
        id: 's2-capstone-project',
        name: 'CRMEF_SEMESTERS.semesters.semester-2.modules.s2-capstone-project.name',
        professor: 'CRMEF_SEMESTERS.semesters.semester-2.modules.s2-capstone-project.professor',
        desc: 'CRMEF_SEMESTERS.semesters.semester-2.modules.s2-capstone-project.desc',
        files: {
          solo: [],
          group: [],
          official: [],
        },
      },
    ],
  },
];

// ---------------------------------------------

export const crmefMspInfo = {
  lyceeName: 'Abou abbas sebti',
  profName: 'MOUBARRAA SANAA',
  fbLink: 'https://www.facebook.com/officiel.sebti/',
  fbLabel: 'https://www.facebook.com/officiel.sebti/',
  imageLabel: '📸 Lycée Abou Al Abass Essabti',
  remerciement: `Je tiens d'abord à remercier vivement notre encadrante Mme. MOUBARRAA SANAA, qui a bien voulu nous encadrer et qui n'a pas hésité de nous accorder ses aides et ses conseils. Mes remerciements sont également exprimés à tous les formateurs du centre CRMEF pour leurs efforts et leurs conseils.`,
  introduction: `Le stage d'enseignement constitue une étape importante du cursus universitaire. C'est pour nous, stagiaire, l'occasion de tester nos capacités à intégrer une équipe, à prendre des initiatives et à assumer sa propre autonomie au-delà d'une simple description des tâches effectuées. Il revient de rencontrer des différentes réalités au sein de l'école d'accueil et en tant que stagiaire, on est censé de s'y habituer car cela fait preuve du séjour passé au sein de l'école d'accueil. Sur ce au départ il y a complexité des notions à enseigner et l'adaptation des salles de classe ainsi que la non maitrise des élèves et parfois il y a une maitrise souple des tous ces points précités dans certaines classes. Les points précités feront objets de constats au courant de ce rapport.
  
  Le principal objectif de notre stage d'enseignement est de nous amener à bien comprendre la reality de la vie professionnelle en prestant en tant que professeur des cours et surtout enseigner convenablement les cours d'informatique aux élèves de l'école secondaire.`,
  tableData: {
    establishment: 'Abou El Abbas Sebti',
    creationYear: '1984',
    roomsCount: '43 normales et une salle génie',
    directorName: 'Mr. ELKHALOUFIE Mustapha',
    mentorName: 'Pr MOUBARRAA SANAA',
    studentsCount: '3420',
  }
};

export const crmefVideos = [
  {
    id: 'intro-cs-school',
    title: 'Introduction à l\'Informatique au Collège',
    description: 'Une séance complète d\'introduction aux concepts fondamentaux de l\'informatique, de l\'architecture matérielle aux logiciels de base, adaptée aux élèves de collège.',
    url: 'https://www.w3schools.com/html/mov_bbb.mp4',
    duration: '10:15',
    views: '1.2K',
    date: '2026-04-12',
    author: 'Mouad Allaoui',
    category: 'Didactique',
  },
  {
    id: 'lesson-planning-tips',
    title: 'Didactique de l\'Informatique : Planification de Leçons',
    description: 'Comment scénariser une leçon d\'informatique pas à pas. De l\'analyse des objectifs d\'apprentissage à l\'élaboration des fiches de cours.',
    url: 'https://www.w3schools.com/html/movie.mp4',
    duration: '12:40',
    views: '980',
    date: '2026-04-20',
    author: 'Mouad Allaoui',
    category: 'Pédagogie',
  },
  {
    id: 'classroom-management-spell',
    title: 'Gestion de Classe et Animation des Groupes',
    description: 'Astuces concrètes de gestion de classe dans un laboratoire d\'informatique (salle Génie). Maintenir l\'attention et animer les ateliers collaboratifs.',
    url: 'https://www.w3schools.com/html/mov_bbb.mp4',
    duration: '8:55',
    views: '850',
    date: '2026-05-05',
    author: 'Mouad Allaoui',
    category: 'Pratique',
  },
  {
    id: 'eval-assessment-methods',
    title: 'Méthodes d\'Évaluation formative en Informatique',
    description: 'Guide pratique sur l\'évaluation des compétences pratiques en programmation et bureautique, incluant les barèmes de notation et le feedback immédiat.',
    url: 'https://www.w3schools.com/html/movie.mp4',
    duration: '14:20',
    views: '720',
    date: '2026-05-18',
    author: 'Mouad Allaoui',
    category: 'Évaluation',
  }
];

