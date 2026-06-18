const CRMEF_SEMESTERS = {
    selectModule: '🔮 Summon Module Scroll:',
    allModules: '📜 All Grimoires',
    chooseModule: '-- Choose Scroll --',
    files: {
        solo: 'Hermit\'s Scroll (Solo Work)',
        group: 'Fellowship Parchment (Group Project)',
        official: 'Imperial Decree (Official Guide)',
        noFiles: 'No scrolls discovered in the ruins',
    },
    tooltip: {
        pages: 'Pages of Parchment',
        date: 'Penciled on',
    },
    learned: 'Lore Gained',
    lacks: 'Missing Enchantments',
    semesters: {
        'semester-1': {
            title: 'First Crusade (Semester 1)',
            modules: {
                'lesson-planning': {
                    name: 'Scroll Design & Cartography of Learning',
                    professor: 'Grandmaster Raja Tamri',
                    desc: 'Mastered the ancient art of crafting lesson scrolls, charting clear learning quests, and weaving instructional enchantments to guide apprentices toward worthy achievements.',
                    learned: 'How to structure effective lesson plans with clear learning objectives, apply instructional design principles, and create engaging outcome-driven classroom sessions.',
                    lacks: 'Still struggling with designing lessons for mixed-ability classes and timing activities appropriately within a 50-minute session.',
                    files: {
                        solo: {
                            lesson: 'Map of the Day\'s Teachings',
                            college: 'Informatics of the Lower Keep',
                        },
                    },
                },
                'learning-management': {
                    name: 'Castle Control & Garrison Management',
                    professor: 'Grandmaster Raja Tamri',
                    desc: 'Honed the art of commanding the learning garrison—establishing order in the halls, resolving disputes among apprentices, and maintaining a thriving citadel of knowledge.',
                    learned: 'How to manage classroom dynamics, establish routines, handle student behavior constructively, and foster a positive learning environment.',
                    lacks: 'Need more practice with dealing with disruptive students and maintaining authority without being overly strict.',
                },
                'cs-reinforcement-1': {
                    name: 'Arcane Reinforcement I: Clockwork Devices & Runes of Logic',
                    professor: 'Sage Iqdour',
                    desc: 'Unraveled the mysteries of clockwork engines, traversed the memory towers, and deciphered the ancient runes of Boolean logic etched into silicon gates.',
                    learned: 'Strengthened understanding of hardware components, CPU architecture, memory hierarchy, and Boolean algebra including logic gates and circuit design.',
                    lacks: 'Still find it hard to simplify complex Boolean expressions and design multi-output combinational circuits.',
                },
                'cs-reinforcement-2': {
                    name: 'Arcane Reinforcement II: Sorting Tomes, Data Vaults & Serpent Scripts',
                    professor: 'Sage Snineh',
                    desc: 'Delved into the forbidden libraries of information systems, forged bonds with the SQL oracle, tamed the Python serpent, and mastered the operating doctrines of the digital realm.',
                    learned: 'Deepened knowledge of information systems architecture, relational database concepts (SQL), and Python programming fundamentals applied to educational contexts.',
                    lacks: 'Need to strengthen Python OOP concepts and advanced SQL queries like joins and subqueries.',
                },
                'ict-education-didactics': {
                    name: 'Tapestry Weaving & Art of Arcane Teaching',
                    professor: 'High Priestess Wafae Serrar',
                    desc: 'Wove enchanted tapestries of ICT into the teaching arts, and studied the sacred didactic doctrines passed down through generations of computing scholars.',
                    learned: 'Explored methods for integrating digital tools and ICT into teaching practice, and studied didactic approaches specific to computer science education.',
                    lacks: 'Lack hands-on experience with interactive platforms like Scratch and GeoGebra in actual classroom settings.',
                },
                'education-sciences': {
                    name: 'Philosophical Arts & Doctrines of the Mind',
                    professor: 'Sage Al Assari',
                    desc: 'Studied the great philosophical schools—constructivism, behaviorism, the sociocultural scrolls—and their timeless application to the noble craft of teaching.',
                    learned: 'Studied foundational theories of education including constructivism, behaviorism, and socio-cultural approaches, and their application to modern pedagogy.',
                    lacks: 'Need to better connect theoretical frameworks with practical classroom scenarios and real teaching situations.',
                },
                'research-methodology': {
                    name: 'Quest Diagnostics & Alchemical Inquiry',
                    professor: 'Archmage Soufiane Baribi',
                    desc: 'Embarked on quests of action research, gathered battlefield data from the classroom, and transmuted raw observations into golden insights for improved teaching.',
                    learned: 'Gained skills in designing and conducting action research projects, collecting classroom data, and reflecting critically on teaching practices.',
                    lacks: 'Struggle with formulating precise research questions and selecting appropriate data collection methods for small-scale classroom studies.',
                },
            },
        },
        'semester-2': {
            title: 'Second Crusade (Semester 2)',
            modules: {
                's2-productions-didactiques': {
                    name: 'Master Scroll Crafting & Differentiated Enchantments',
                    professor: 'Grandmaster Raja Tamri',
                    desc: 'Advanced beyond basic scroll design into the realm of differentiated enchantments—adapting arcane teachings for varied apprentice profiles and forging competency-based campaign maps.',
                },
                's2-gestion-apprentissages-2': {
                    name: 'Herald\'s Oratory & Professional Battle Stance',
                    professor: 'Lady Hakima Benzaki',
                    desc: 'Refined the herald\'s art of verbal and non-verbal address, practiced delivering verdicts of constructive feedback, and donned the full armour of professional teaching posture.',
                },
                's2-reseaux-informatiques': {
                    name: 'Arcane Reinforcement III: Sorting Spells, Data Vaults & Complexity Runes',
                    professor: 'Sage Snineh',
                    desc: 'Mastered the ancient sorting spells and search incantations, conquered recursive labyrinths, and inscribed the sacred Big-O runes of computational complexity.',
                },
                's2-developpement-web-reseaux': {
                    name: 'Arcane Reinforcement IV: Signal Towers & Realm Operating Doctrines',
                    professor: 'Sage Iqdour',
                    desc: 'Deciphered the signal towers of networking lore (OSI strata, TCP/IP scrolls, protocol decrees) and mastered the realm\'s operating doctrines governing processes and system fortifications.',
                },
                's2-evaluation-apprentissages': {
                    name: 'Trial by Fire & Judgment of the Council',
                    professor: 'Archmage Soufiane Baribi',
                    desc: 'Learned to design formative trials and summative judgments, craft rubric charters, and wield data-driven verdicts to measure and enhance apprentice progress.',
                },
                's2-inclusive-education': {
                    name: 'Inclusive Stronghold & Fellowship of All Abilities',
                    professor: 'Lady Nadia Zouaoui',
                    desc: 'Cultivated the code of inclusive knighthood—opening the gates of the stronghold to all apprentices regardless of ability, and adapting arcane strategies for every champion.',
                },
                's2-capstone-project': {
                    name: 'Grand Final Tournament & Legendary Practicum',
                    professor: 'Archmage Soufiane Baribi',
                    desc: 'Forged a legendary research quest uniting all learned doctrines with battlefield practice, culminating in a reflective chronicle worthy of the CRMEF hall of fame.',
                },
                's2-analyse-pratiques': {
                    name: 'Analysis of Practices',
                    professor: 'Unknown',
                    desc: 'Developed skills in systematically observing and analyzing teaching practices, identifying effective strategies and areas for improvement, and applying reflective methods to enhance pedagogical approaches.',
                },
            },
        },
    },
};

export { CRMEF_SEMESTERS };
