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
        learned: 'How to structure effective lesson plans with clear learning objectives, apply instructional design principles, and create engaging outcome-driven classroom sessions.',
        lacks: 'Still struggling with designing lessons for mixed-ability classes and timing activities appropriately within a 50-minute session.',
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
        professor: 'CRMEF_SEMESTERS.semesters.semester-1.modules.learning-management.professor',
        desc: 'CRMEF_SEMESTERS.semesters.semester-1.modules.learning-management.desc',
        learned: 'How to manage classroom dynamics, establish routines, handle student behavior constructively, and foster a positive learning environment.',
        lacks: 'Need more practice with dealing with disruptive students and maintaining authority without being overly strict.',
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
        learned: 'Deepened knowledge of information systems architecture, relational database concepts (SQL), and Python programming fundamentals applied to educational contexts.',
        lacks: 'Need to strengthen Python OOP concepts and advanced SQL queries like joins and subqueries.',
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
        learned: 'Strengthened understanding of hardware components, CPU architecture, memory hierarchy, and Boolean algebra including logic gates and circuit design.',
        lacks: 'Still find it hard to simplify complex Boolean expressions and design multi-output combinational circuits.',
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
        learned: 'Explored methods for integrating digital tools and ICT into teaching practice, and studied didactic approaches specific to computer science education.',
        lacks: 'Lack hands-on experience with interactive platforms like Scratch and GeoGebra in actual classroom settings.',
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
        learned: 'Studied foundational theories of education including constructivism, behaviorism, and socio-cultural approaches, and their application to modern pedagogy.',
        lacks: 'Need to better connect theoretical frameworks with practical classroom scenarios and real teaching situations.',
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
        learned: 'Gained skills in designing and conducting action research projects, collecting classroom data, and reflecting critically on teaching practices.',
        lacks: 'Struggle with formulating precise research questions and selecting appropriate data collection methods for small-scale classroom studies.',
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
        learned: 'Built on lesson planning foundations by exploring differentiated instruction strategies, adapting content for diverse learner profiles, and designing competency-based units.',
        lacks: 'Need more experience in creating truly differentiated materials that cater to all learning levels simultaneously.',
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
        learned: 'Refined verbal and non-verbal communication techniques for the classroom, practiced giving constructive feedback, and developed a confident teaching posture.',
        lacks: 'Still lack confidence in managing heated classroom discussions and handling unexpected student questions smoothly.',
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
        learned: 'Mastered core algorithmic concepts including sorting, searching, recursion, and Big-O complexity analysis applied to real CS curriculum problems.',
        lacks: 'Need more practice with dynamic programming and graph algorithms to teach advanced topics confidently.',
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
        learned: 'Studied computer networking fundamentals (OSI model, TCP/IP, protocols) and operating system concepts including process management and security basics.',
        lacks: 'Find it difficult to explain networking layers and OS scheduling algorithms in simple terms for secondary students.',
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
        learned: 'Explored formative and summative assessment techniques, rubric design, and data-driven evaluation strategies to measure student learning outcomes.',
        lacks: 'Struggle with designing rubrics that are both objective and comprehensive for open-ended CS projects.',
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
        learned: 'Developed awareness of inclusive teaching practices, learning accessibility, and adaptive strategies for students with diverse abilities.',
        lacks: 'Need more practical strategies for adapting CS exercises for students with learning disabilities.',
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
        learned: 'Designed and presented a comprehensive educational research project combining teaching theory and classroom practice in a reflective practicum report.',
        lacks: 'Need to improve academic writing skills and learn how to structure a proper research paper with correct citations.',
        files: {
          solo: [],
          group: [],
          official: [],
        },
      },
    ],
  },
];

export const crmefCritique = [
  {
    id: 'academic-confidence',
    title: 'Academic Confidence & Self-Efficacy',
    icon: '🧠',
    color: '#3498db',
    sections: [
      {
        subtitle: 'Strengths',
        icon: '✅',
        color: '#27ae60',
        content: `I have developed a solid theoretical foundation in computer science and pedagogy. My ability to grasp complex concepts quickly—especially in algorithms, data structures, and instructional design—gives me confidence in academic settings. I perform well when given clear objectives and structured environments. My ISTA and EST backgrounds provided me with strong technical problem-solving skills that I continue to leverage.`,
      },
      {
        subtitle: 'Weaknesses',
        icon: '❌',
        color: '#e74c3c',
        content: `However, I often underestimate my own capabilities, especially when comparing myself to peers who seem more articulate or experienced. I tend to second-guess my answers during discussions, even when I know the material well. This imposter syndrome is particularly pronounced in unfamiliar social-academic settings where I don't yet have established credibility.`,
      },
      {
        subtitle: 'Reflection',
        icon: '🪞',
        color: '#9b59b6',
        content: `The gap between what I know and what I believe about myself is something I need to actively bridge. I recognize that confidence is not about knowing everything—it's about trusting my ability to figure things out. Each successful lesson delivery and each positive student interaction adds a brick to this bridge.`,
      },
    ],
  },
  {
    id: 'communication',
    title: 'Communication & Interpersonal Skills',
    icon: '💬',
    color: '#e67e22',
    sections: [
      {
        subtitle: 'Strengths',
        icon: '✅',
        color: '#27ae60',
        content: `In one-on-one situations and small group discussions, I communicate effectively. I can explain technical concepts in accessible terms when I have time to prepare. Written communication is one of my stronger suits—I can structure arguments clearly in writing, which helps with lesson planning and academic reports. I am a good listener and often notice details others miss in conversations.`,
      },
      {
        subtitle: 'Weaknesses',
        icon: '❌',
        color: '#e74c3c',
        content: `In larger groups or formal presentations, I tend to become anxious and my speech becomes rushed. I struggle with spontaneous verbal exchanges, especially when challenged or contradicted publicly. I sometimes avoid speaking up in class discussions not because I lack opinions, but because I fear being judged for how I express them. My non-verbal communication needs work—I'm told I sometimes appear disengaged when I'm actually deeply focused.`,
      },
      {
        subtitle: 'Reflection',
        icon: '🪞',
        color: '#9b59b6',
        content: `Teaching has forced me out of my comfort zone in ways I didn't expect. Standing in front of 30+ students daily is slowly building my public speaking resilience. I've learned that most communication anxiety is anticipatory—once I start speaking, it flows. The key is to prepare more thoroughly so my confidence has a factual foundation to rest on.`,
      },
    ],
  },
  {
    id: 'time-management',
    title: 'Time Management & Organization',
    icon: '⏰',
    color: '#1abc9c',
    sections: [
      {
        subtitle: 'Strengths',
        icon: '✅',
        color: '#27ae60',
        content: `When I'm motivated, I can be extremely productive. I've developed reliable systems for tracking assignments and deadlines using digital tools. I'm good at breaking large projects into smaller, manageable tasks. My experience juggling multiple internships alongside academic work has taught me to prioritize effectively under pressure.`,
      },
      {
        subtitle: 'Weaknesses',
        icon: '❌',
        color: '#e74c3c',
        content: `I procrastinate on tasks that don't have immediate consequences or that I find emotionally draining. I tend to overcommit—saying yes to everything because I don't want to disappoint anyone—then struggling to deliver quality on all fronts. My desk, both physical and digital, is often chaotic. I lose time searching for files or notes that should be organized from the start.`,
      },
      {
        subtitle: 'Reflection',
        icon: '🪞',
        color: '#9b59b6',
        content: `The CRMEF formation is teaching me that preparation is not optional in teaching—it's survival. A well-prepared lesson plan saves time, reduces anxiety, and produces better outcomes. I'm slowly applying this principle to my personal life: building habits, creating templates, and learning to say no when my plate is full.`,
      },
    ],
  },
  {
    id: 'stress-resilience',
    title: 'Stress Management & Emotional Resilience',
    icon: '🛡️',
    color: '#c0392b',
    sections: [
      {
        subtitle: 'Strengths',
        icon: '✅',
        color: '#27ae60',
        content: `I have a high tolerance for technical problem-solving under pressure—I remain calm when debugging complex systems or troubleshooting classroom tech issues. Physical activities like running and football help me discharge stress effectively. I've developed a habit of journaling after difficult days, which helps me process emotions rather than suppress them.`,
      },
      {
        subtitle: 'Weaknesses',
        icon: '❌',
        color: '#e74c3c',
        content: `When multiple stressors converge—deadlines, classroom management challenges, personal issues—I tend to shut down rather than cope constructively. I catastrophize: a single bad lesson can spiral into questioning my entire career choice. I sometimes withdraw from social interactions when stressed, which paradoxically increases my isolation and worsens the situation. Sleep quality deteriorates significantly during high-pressure periods.`,
      },
      {
        subtitle: 'Reflection',
        icon: '🪞',
        color: '#9b59b6',
        content: `Resilience is not about being unaffected by stress—it's about recovering faster. I'm learning that bad days are not bad lives. The teaching profession demands emotional stamina, and I'm building mine gradually. Each challenging classroom situation I navigate successfully adds to my emotional toolkit.`,
      },
    ],
  },
  {
    id: 'teaching-identity',
    title: 'Teaching Identity & Professional Posture',
    icon: '🎓',
    color: '#8e44ad',
    sections: [
      {
        subtitle: 'Strengths',
        icon: '✅',
        color: '#27ae60',
        content: `I genuinely care about student learning and can see the impact of my efforts when a student finally grasps a concept. I bring real-world software engineering experience into my teaching, which makes lessons more relevant and engaging. I'm tech-savvy and can leverage digital tools creatively. My patience with struggling students is one of my greatest assets—I don't give up on anyone.`,
      },
      {
        subtitle: 'Weaknesses',
        icon: '❌',
        color: '#e74c3c',
        content: `I struggle with classroom authority—I want to be liked by students, which sometimes conflicts with maintaining discipline. I haven't yet found my authentic teaching voice; I oscillate between being too lenient and too strict. I find it difficult to adapt my teaching pace for mixed-ability classrooms. I sometimes focus too much on technical accuracy and not enough on pedagogical engagement.`,
      },
      {
        subtitle: 'Reflection',
        icon: '🪞',
        color: '#9b59b6',
        content: `Teaching is a performance art that requires authenticity. I'm learning that students respect fairness and consistency more than strictness or leniency. My technical background is an asset, but it can also be a limitation if I assume students share my learning style. The journey to finding my teaching identity is ongoing—and that's okay.`,
      },
    ],
  },
  {
    id: 'growth-mindset',
    title: 'Growth Mindset & Self-Awareness',
    icon: '🌱',
    color: '#27ae60',
    sections: [
      {
        subtitle: 'Strengths',
        icon: '✅',
        color: '#27ae60',
        content: `I actively seek feedback and try to implement it, even when it's uncomfortable to hear. I read extensively about pedagogy, psychology, and self-improvement. I can identify my weaknesses without being paralyzed by them. I've developed a habit of reflecting after each teaching session, noting what worked and what didn't. I'm open to trying new approaches and methodologies.`,
      },
      {
        subtitle: 'Weaknesses',
        icon: '❌',
        color: '#e74c3c',
        content: `Sometimes self-awareness becomes self-criticism. I analyze my failures more than my successes, creating a skewed perception of my actual performance. I can be overly perfectionistic, delaying completion of tasks because they don't meet my internal standards. I sometimes struggle to distinguish between constructive self-reflection and destructive rumination.`,
      },
      {
        subtitle: 'Reflection',
        icon: '🪞',
        color: '#9b59b6',
        content: `The fact that I can write this critique honestly is itself evidence of growth. Self-awareness without action is just navel-gazing. My goal is to translate these reflections into concrete improvements: practicing public speaking, building consistent routines, and learning to celebrate small victories along the way.`,
      },
    ],
  },
];

// ---------------------------------------------

export const crmefFormation = {
  definition: {
    title: 'What is CRMEF?',
    content: `The Centre Régional des Métiers de l'Éducation et de la Formation (CRMEF) is a Moroccan public institution dedicated to training and certifying teachers across the kingdom. Established under the Ministry of National Education, the CRMEF serves as the regional hub where aspiring educators receive professional formation in pedagogy, didactics, and classroom management.

The CRMEF's mission is to prepare future teachers with the theoretical knowledge and practical skills needed to deliver quality education in Moroccan public schools. Trainees undergo a two-semester program covering educational sciences, lesson planning, classroom communication, and subject-specific reinforcement.

The institution plays a vital role in Morocco's education reform strategy by ensuring that new teachers enter the profession with a solid pedagogical foundation aligned with modern teaching standards.`,
    image: '/media/CRMEF/IMG_20260427_112106.jpg',
  },
  gratitude: {
    title: 'Gratitude & Acknowledgment',
    content: `First and foremost, we would like to express our deep gratitude to our supervisor, Mr. Lhossain Ait Taleb, who kindly agreed to guide us and never hesitated to provide us with his invaluable support and advice.

Our thanks also extend to all the trainers at the CRMEF center for their continuous efforts and guidance throughout our training. Their dedication to shaping the next generation of educators is truly inspiring.

We are also grateful to the administrative staff of the CRMEF for creating an environment conducive to learning and professional development. Their commitment to excellence in teacher education has left a lasting impression on all trainees.

Finally, we extend our appreciation to our families and friends who supported us throughout this challenging but rewarding journey.`,
    acknowledgments: [
      { name: 'Mr. Lhossain Ait Taleb', role: 'Supervisor & Mentor' },
      { name: 'CRMEF Training Staff', role: 'Pedagogical Guidance' },
      { name: 'CRMEF Administrative Team', role: 'Institutional Support' },
      { name: 'Collège Annahda', role: 'Teaching Practice Host' },
    ],
  },
  map: {
    title: 'CRMEF Location & Access',
    address: 'CRMEF Marrakech-Safi, Morocco',
    description: `The CRMEF center is located in the Marrakech-Safi region of Morocco. The institution operates from a dedicated campus equipped with modern classrooms, computer labs, and pedagogical resource centers.

The center serves trainees from across the region, providing them with the facilities and resources needed for their two-semester formation program.`,
    coordinates: { lat: 31.6295, lng: -7.9811 },
    image: '/media/CRMEF/IMG_20260414_132805.jpg',
  },
};

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

