const CRMEF_SEMESTERS = {
    files: {
        solo: 'Travail Individuel',
        group: 'Projet de Groupe',
        official: 'Guide Officiel',
        noFiles: 'Aucun fichier disponible',
    },
    tooltip: {
        pages: 'Pages',
        date: 'Créé le',
    },
    learned: 'Ce que j\'ai appris',
    lacks: 'Ce qui me manque',
    selectModule: '🔮 Aller au module :',
    allModules: 'Tous les modules',
    chooseModule: '-- Choisir un module --',
    semesters: {
        'semester-1': {
            title: 'Semestre 1',
            modules: {
                'lesson-planning': {
                    name: 'Planification des Apprentissages & Ingénierie Pédagogique',
                    professor: 'Pr. Raja Tamri',
                    desc: 'Appris à structurer des fiches pédagogiques efficaces, à définir des objectifs d\'apprentissage clairs et à appliquer les principes de l\'ingénierie didactique pour concevoir des séances engageantes.',
                    files: {
                        solo: {
                            lesson: 'Grandes Lignes du Plan de Leçon',
                            college: 'Informatique pour le Collège',
                        },
                    },
                },
                'learning-management': {
                    name: 'Gestion des Classes & Gestion des Apprentissages',
                    professor: 'Inconnu',
                    desc: 'Développé des compétences pour gérer la dynamique de classe, instaurer des routines, traiter les comportements des élèves de manière constructive et créer un environnement d\'apprentissage positif.',
                },
                'cs-reinforcement-1': {
                    name: 'Renforcement en Informatique I : Systèmes d\'Information, Bases de Données & Python',
                    professor: 'Pr. Snineh',
                    desc: 'Approfondi les connaissances en architecture des systèmes d\'information, les bases de données relationnelles (SQL) et les fondamentaux de Python appliqués aux contextes éducatifs.',
                },
                'cs-reinforcement-2': {
                    name: 'Renforcement en Informatique II : Architecture des Ordinateurs & Logique Booléenne',
                    professor: 'Pr. Iqdour',
                    desc: 'Renforcé la compréhension des composants matériels, de l\'architecture CPU, de la hiérarchie mémoire et de l\'algèbre de Boole incluant les portes logiques et la conception de circuits.',
                },
                'ict-education-didactics': {
                    name: 'Intégration des TICE & Didactique de l\'Informatique',
                    professor: 'Pr. Wafae Serrar',
                    desc: 'Exploré les méthodes d\'intégration des outils numériques dans la pratique enseignante et étudié les approches didactiques spécifiques à l\'enseignement de l\'informatique.',
                },
                'education-sciences': {
                    name: 'Sciences de l\'Éducation & Théories Pédagogiques',
                    professor: 'Inconnu',
                    desc: 'Étudié les théories fondamentales de l\'éducation telles que le constructivisme, le béhaviorisme et les approches socio-culturelles et leur application à la pédagogie moderne.',
                },
                'research-methodology': {
                    name: 'Méthodologie de Recherche & Recherche-Action',
                    professor: 'Pr. Soufiane Baribi',
                    desc: 'Acquis des compétences dans la conception et la conduite de projets de recherche-action, la collecte de données en classe et la réflexion critique sur les pratiques enseignantes.',
                },
            },
        },
        'semester-2': {
            title: 'Semestre 2',
            modules: {
                's2-lesson-planning-advanced': {
                    name: 'Planification Avancée & Pédagogie Différenciée',
                    professor: 'Pr. Raja Tamri',
                    desc: 'Approfondi les bases de la planification en explorant les stratégies de différenciation, l\'adaptation aux profils d\'apprenants variés et la conception de séquences basées sur les compétences.',
                },
                's2-classroom-communication': {
                    name: 'Communication en Classe & Posture Professionnelle',
                    professor: 'Pr. Hakima Benzaki',
                    desc: 'Affiné les techniques de communication verbale et non-verbale en classe, pratiqué le retour constructif et développé une posture enseignante confiante et professionnelle.',
                },
                's2-cs-reinforcement-3': {
                    name: 'Renforcement en Informatique III : Algorithmes, Structures de Données & Complexité',
                    professor: 'Pr. Snineh',
                    desc: 'Maîtrisé les concepts algorithmiques fondamentaux tels que le tri, la recherche, la récursivité et l\'analyse de complexité Big-O appliqués aux problèmes du programme informatique.',
                },
                's2-cs-reinforcement-4': {
                    name: 'Renforcement en Informatique IV : Réseaux & Systèmes d\'Exploitation',
                    professor: 'Pr. Iqdour',
                    desc: 'Étudié les fondamentaux des réseaux informatiques (modèle OSI, TCP/IP, protocoles) et les concepts des systèmes d\'exploitation incluant la gestion des processus et la sécurité.',
                },
                's2-assessment-evaluation': {
                    name: 'Évaluation & Contrôle des Apprentissages',
                    professor: 'Pr. Soufiane Baribi',
                    desc: 'Exploré les techniques d\'évaluation formative et sommative, la conception de grilles de critères et les stratégies basées sur les données pour mesurer et améliorer les résultats des élèves.',
                },
                's2-inclusive-education': {
                    name: 'Éducation Inclusive & Pédagogie des Besoins Particuliers',
                    professor: 'Pr. Nadia Zouaoui',
                    desc: 'Développé la conscience des pratiques d\'enseignement inclusif, l\'accessibilité à l\'apprentissage et les stratégies adaptatives pour soutenir les élèves aux capacités et horizons divers.',
                },
                's2-capstone-project': {
                    name: 'Projet de Synthèse & Stage Final de Pratique',
                    professor: 'Pr. Soufiane Baribi',
                    desc: 'Conçu et présenté un projet de recherche pédagogique complet combinant théorie de l\'enseignement et pratique en classe, aboutissant à un rapport de stage réflexif.',
                },
            },
        },
    },
};

export { CRMEF_SEMESTERS };
