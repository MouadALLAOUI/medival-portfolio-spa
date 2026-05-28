const CRMEF_SEMESTERS = {
    files: {
        solo: 'Hermit’s Scroll (Solo Work)',
        group: 'Fellowship Parchment (Group Project)',
        official: 'Imperial Decree (Official Guide)',
        noFiles: 'No scrolls discovered in the ruins',
    },
    tooltip: {
        pages: 'Pages of Parchment',
        date: 'Penciled on',
    },
    semesters: {
        'semester-1': {
            title: 'First Crusade (Semester 1)',
            modules: {
                'lesson-planning': {
                    name: 'Scroll Design & Cartography of Learning',
                    professor: 'Grandmaster Raja Tamri',
                    files: {
                        solo: {
                            lesson: 'Map of the Day’s Teachings',
                            college: 'Informatics of the Lower Keep',
                        },
                    },
                },
                'learning-management': {
                    name: 'Castle Control & Garrison Management',
                    professor: 'Grandmaster Unknown',
                },
                'cs-reinforcement-1': {
                    name: 'Arcane Reinforcement I: Sorting Tomes & Python Serpents',
                    professor: 'Sage Snineh',
                },
                'cs-reinforcement-2': {
                    name: 'Arcane Reinforcement II: Clockwork Devices & Runes of Logic',
                    professor: 'Sage Iqdour',
                },
                'ict-education-didactics': {
                    name: 'Tapestry Weaving & Art of Arcane Teaching',
                    professor: 'High Priestess Wafae Serrar',
                },
                'education-sciences': {
                    name: 'Philosophical Arts & Doctrines of the Mind',
                    professor: 'Grandmaster Unknown',
                },
                'research-methodology': {
                    name: 'Quest Diagnostics & Alchemical Inquiry',
                    professor: 'Archmage Soufiane Baribi',
                },
            },
        },
    },
};

export { CRMEF_SEMESTERS };
