import { loadSingleAsset, loadMultipleAssets } from "../lib/utils/assetUtils";

export const crmefProfile = {
  name: 'Mouad Allaoui',
  avatar: loadSingleAsset('mouad-pic-png', 'image').path,
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
          solo: loadMultipleAssets([
            'crmef-informatique-college-1',
            'crmef-informatique-college',
            'crmef-lesson',
            'crmef-fiche-resolution-generique',
            'crmef-methode-decouverte',
            'crmef-methode-demonstrative',
            'crmef-methode-interrogative',
          ], 'document'),
          group: [],
          official: loadMultipleAssets([
            'crmef-fiche-resolution-structure-final',
          ], 'document'),
        },
      },
      {
        id: 'learning-management',
        name: 'CRMEF_SEMESTERS.semesters.semester-1.modules.learning-management.name',
        professor: 'CRMEF_SEMESTERS.semesters.semester-1.modules.lesson-planning.professor',
        desc: 'CRMEF_SEMESTERS.semesters.semester-1.modules.learning-management.desc',
        files: {
          solo: loadMultipleAssets([
            'crmef-autorite-visuelle-20min',
            'crmef-seance-1-phase-visuel',
            'crmef-fiche-resolution-phase-visuel',
            'crmef-autorite-visuelle-presentation',
            'crmef-fiche-resolution-scratch',
            'crmef-scratch-2ac-presentation',
            'crmef-gemini-generated-image-pkz39rpkz39rpkz3',
          ], 'document'),
          group: loadMultipleAssets([
            'crmef-la-gestion',
            'crmef-gestion-2',
          ], 'document'),
          official: loadMultipleAssets([
            'crmef-gestion-situation-didactique',
          ], 'document'),
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
          official: loadMultipleAssets([
            'crmef-td1',
            'crmef-td2',
            'crmef-tp1',
            'crmef-tp2-fonctions',
            'crmef-tp3-chaine',
            'crmef-tp4-except',
            'crmef-tp5-listes',
            'crmef-tp6-tuples',
            'crmef-tp7-dict',
            'crmef-tp8-sets',
            'crmef-exercicres-1-algo',
            'crmef-s2-info-rbf2-24',
            'crmef-coursalgo',
            'crmef-cours-algorithme-snineh',
            'crmef-cours-python-1',
            'crmef-cours-python-2',
            'crmef-cours-python-3',
            'crmef-cours-python-4',
          ], 'document'),
        },
      },
      {
        id: 'cs-reinforcement-2',
        name: 'CRMEF_SEMESTERS.semesters.semester-1.modules.cs-reinforcement-2.name',
        professor: 'CRMEF_SEMESTERS.semesters.semester-1.modules.cs-reinforcement-2.professor',
        desc: 'CRMEF_SEMESTERS.semesters.semester-1.modules.cs-reinforcement-2.desc',
        files: {
          solo: [],
          group: loadMultipleAssets([
            'crmef-portes-logiques-applications-et-synthese',
          ], 'document'),
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
          group: loadMultipleAssets([
            'crmef-les-effets-didactiques',
            'crmef-summary-tice',
            'crmef-ticee',
          ], 'document'),
          official: loadMultipleAssets([
            'crmef-communication-pedagogique',
            'crmef-motivation-pedagogique',
            'crmef-polycope-didactique',
          ], 'document'),
        },
      },
      {
        id: 'education-sciences',
        name: 'CRMEF_SEMESTERS.semesters.semester-1.modules.education-sciences.name',
        professor: 'CRMEF_SEMESTERS.semesters.semester-1.modules.education-sciences.professor',
        desc: 'CRMEF_SEMESTERS.semesters.semester-1.modules.education-sciences.desc',
        files: {
          solo: loadMultipleAssets([
            'crmef-theorie-cognitive-arabe',
          ], 'document'),
          group: loadMultipleAssets([
            'crmef-theories-de-apprentissage',
            'crmef-theories-apprentissage-arabe',
          ], 'document'),
          official: loadMultipleAssets([
            'crmef-guide-pedagogique-arabe',
          ], 'document'),
        },
      },
      {
        id: 'research-methodology',
        name: 'CRMEF_SEMESTERS.semesters.semester-1.modules.research-methodology.name',
        professor: 'CRMEF_SEMESTERS.semesters.semester-1.modules.research-methodology.professor',
        desc: 'CRMEF_SEMESTERS.semesters.semester-1.modules.research-methodology.desc',
        files: {
          solo: [],
          group: loadMultipleAssets([
            'crmef-recherche-action-ia-esprit-critique',
          ], 'document'),
          official: loadMultipleAssets([
            'crmef-methodologie-ra',
          ], 'document'),
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
  lyceeName: 'Collège Annahda',
  profName: 'Lhossain Ait Taleb',
  fbLink: 'https://www.facebook.com/college.annahda.mhamid/',
  fbLabel: 'https://www.facebook.com/college.annahda.mhamid/',
  imageLabel: '📸 Collège Annahda',
  remerciement: `First and foremost, we would like to express our deep gratitude to our supervisor, Mr. Lhossain Ait Taleb, who kindly agreed to guide us and never hesitated to provide us with his invaluable support and advice. Our thanks also extend to all the trainers at the CRMEF center for their continuous efforts and guidance throughout our training.`,
  introduction: `The teaching internship constitutes a major step in the academic curriculum. For us, as trainees, it is an ideal opportunity to test our abilities to integrate into a team, take initiatives, and assume our own autonomy far beyond a simple description of the tasks performed. It involves facing different realities within the host school, and as trainee teachers, we are expected to adapt to them as a natural part of our time spent there. At the beginning, challenges naturally arise regarding the complexity of the concepts to be taught, adapting to the classroom environments, and managing student discipline, though some classes offer a much smoother experience. These observations will form the core focus of this report. The primary objective of our teaching internship is to guide us toward a thorough understanding of professional life by performing as active classroom teachers, and specifically to effectively teach computer science courses to secondary school students.`,
  tableData: {
    establishment: 'Annahda Middle School (ثانوية النهضة الاعدادية)',
    creationYear: '2003',
    roomsCount: '23 regular rooms, 1 computer science room',
    directorName: 'Mr. Abderrahim Massiri',
    mentorName: 'Pr. Lhossain Ait Taleb',
    studentsCount: '1349 (718 Male / 631 Female)',
  }
};

export const crmefVideos = [
  {
    // --- Existing attributes ---
    id: 'intro-cs-school',
    title: "Le Blueprint du Mentor : Maîtriser la Classe Moderne",
    description: "Une formation destinée aux enseignants et formateurs sur l'intégration pédagogique du numérique dans la classe moderne...",
    // url: 'public/media/CRMEF/LM/The_Mentor\'s_Blueprint__Mastering_the_Modern_Classroom.mp4',
    url: loadSingleAsset('crmef-lm-the-mentor-s-blueprint-mastering-the-modern-classroom', 'video').path,
    duration: '5:13',
    views: '1',
    date: '2026-04-12',
    author: 'Mouad Allaoui',
    category: 'Didactique',

    // --- Media & Technical ---
    thumbnail: undefined,                 // no custom thumbnail provided
    resolution: '1280x720',         // extracted from ffprobe
    format: 'mp4',
    codec: 'H.264',
    fileSize: '42MB',
    language: 'fr',
    subtitles: [],                  // none detected

    // --- Content & Classification ---
    level: 'Formateur',             // target audience (CRMEF trainers/teachers)
    tags: ['SAMR', 'LMS', 'CMS', 'intégration numérique', 'pédagogie', 'didactique', 'technologie éducative'],
    topics: [
      'Modèle SAMR',
      'LMS vs CMS',
      'Piliers Technologique, Pédagogique et Comportemental',
    ],
    tool: 'NotebookLM',             // production tool visible in watermark

    // --- Engagement & Status ---
    likes: 0,
    rating: null,
    status: 'published',
    featured: false,

    // --- Organizational ---
    institution: 'CRMEF',
    series: 'Le Blueprint du Mentor',
    episode: 1,
    relatedVideos: [],
  },
];

