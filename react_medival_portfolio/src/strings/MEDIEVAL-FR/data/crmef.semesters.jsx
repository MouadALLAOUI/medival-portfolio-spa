const CRMEF_SEMESTERS = {
    files: {
        solo: 'Parchemin Solitaire (Travail Individuel)',
        group: 'Charte de Guilde (Projet Coopératif)',
        official: 'Édit du Royaume (Guide Officiel)',
        noFiles: 'Aucun parchemin découvert dans les ruines',
    },
    tooltip: {
        pages: 'Feuillets de Vélin',
        date: 'Rédigé le',
    },
    semesters: {
        'semester-1': {
            title: 'Première Campagne (Semestre 1)',
            modules: {
                'lesson-planning': {
                    name: 'Tracé de Cartes & Art du Dessein Pédagogique',
                    professor: 'Grand Maître Raja Tamri',
                    files: {
                        solo: {
                            lesson: 'Grandes Lignes du Dessein de Leçon',
                            college: 'Arcanes Informatiques du Bas-Donjon',
                        },
                    },
                },
                'learning-management': {
                    name: 'Discipline du Donjon & Gouvernance d’Apprentissage',
                    professor: 'Grand Maître Inconnu',
                },
                'cs-reinforcement-1': {
                    name: 'Renfort d’Arcanes I : Grimoires de Données & Serpents de Python',
                    professor: 'Sage Snineh',
                },
                'cs-reinforcement-2': {
                    name: 'Renfort d’Arcanes II : Engrenages Mécaniques & Runes de Logique',
                    professor: 'Sage Iqdour',
                },
                'ict-education-didactics': {
                    name: 'Tissage de Toiles (TICE) & Doctrine de l’Arcane Didactique',
                    professor: 'Grande Prêtresse Wafae Serrar',
                },
                'education-sciences': {
                    name: 'Arts Philosophiques & Doctrines de l’Esprit',
                    professor: 'Grand Maître Inconnu',
                },
                'research-methodology': {
                    name: 'Quêtes de Diagnostics & Enquêtes Alchimiques',
                    professor: 'Archimage Soufiane Baribi',
                },
            },
        },
    },
};

export { CRMEF_SEMESTERS };
