const CRMEF_SEMESTERS = {
    selectModule: '🔮 Invoquer le parchemin :',
    allModules: '📜 Tous les grimoires',
    chooseModule: '-- Choisir le parchemin --',
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
    learned: 'Savoir Conquis',
    lacks: 'Armes Manquantes',
    semesters: {
        'semester-1': {
            title: 'Première Campagne (Semestre 1)',
            modules: {
                'lesson-planning': {
                    name: 'Tracé de Cartes & Art du Dessein Pédagogique',
                    professor: 'Grand Maître Raja Tamri',
                    desc: 'Maîtrisé l\'art ancestral de la cartographie pédagogique, du tracé d\'objectifs-quêtes limpides et du tissage d\'enchantements didactiques pour mener les apprentis vers de glorieuses conquêtes du savoir.',
                    files: {
                        solo: {
                            lesson: 'Grandes Lignes du Dessein de Leçon',
                            college: 'Arcanes Informatiques du Bas-Donjon',
                        },
                    },
                },
                'learning-management': {
                    name: 'Discipline du Donjon & Gouvernance d\'Apprentissage',
                    professor: 'Grand Maître Inconnu',
                    desc: 'Affiné l\'art de tenir les rangs dans les salles du donjon—instaurer la loi, résoudre les querelles entre apprentis, et maintenir une citadelle florissante du savoir.',
                },
                'cs-reinforcement-1': {
                    name: 'Renfort d\'Arcanes I : Grimoires de Données & Serpents de Python',
                    professor: 'Sage Snineh',
                    desc: 'Plongé dans les bibliothèques interdites des systèmes d\'information, forgé des alliances avec l\'oracle SQL, et apprivoisé le serpent Python au service des arts sacrés de l\'enseignement.',
                },
                'cs-reinforcement-2': {
                    name: 'Renfort d\'Arcanes II : Engrenages Mécaniques & Runes de Logique',
                    professor: 'Sage Iqdour',
                    desc: 'Percé les mystères des rouages mécaniques, traversé les tours de mémoire, et déchiffré les runes ancestrales de la logique booléenne gravées dans les portes de silicium.',
                },
                'ict-education-didactics': {
                    name: 'Tissage de Toiles (TICE) & Doctrine de l\'Arcane Didactique',
                    professor: 'Grande Prêtresse Wafae Serrar',
                    desc: 'Tissé des tapisseries enchantées des TICE dans les arts de l\'enseignement, et étudié les doctrines didactiques sacrées transmises par les générations de savants informatiques.',
                },
                'education-sciences': {
                    name: 'Arts Philosophiques & Doctrines de l\'Esprit',
                    professor: 'Grand Maître Inconnu',
                    desc: 'Étudié les grandes écoles philosophiques—constructivisme, béhaviorisme, parchemins socio-culturels—et leur application intemporelle au noble art de l\'enseignement.',
                },
                'research-methodology': {
                    name: 'Quêtes de Diagnostics & Enquêtes Alchimiques',
                    professor: 'Archimage Soufiane Baribi',
                    desc: 'Entrepris des quêtes de recherche-action, collecté des données de champ de bataille en classe, et transmué de brutes observations en révélations dorées pour perfectionner l\'art de l\'enseignement.',
                },
            },
        },
        'semester-2': {
            title: 'Deuxième Campagne (Semestre 2)',
            modules: {
                's2-lesson-planning-advanced': {
                    name: 'Maîtrise des Parchemins & Enchantements Différenciés',
                    professor: 'Grand Maître Raja Tamri',
                    desc: 'Dépassé le dessein élémentaire pour entrer dans le royaume des enchantements différenciés—adapter les arcanes à chaque profil d\'apprenti et forger des cartes de campagne fondées sur les compétences.',
                },
                's2-classroom-communication': {
                    name: 'Art Oratoire du Héraut & Port d\'Armes Professionnel',
                    professor: 'Dame Hakima Benzaki',
                    desc: 'Affiné l\'art oratoire verbal et non-verbal du héraut, pratiqué la délibération de verdicts constructifs et revêtu le plein armement de la posture enseignante professionnelle.',
                },
                's2-cs-reinforcement-3': {
                    name: 'Renfort d\'Arcanes III : Sortilèges de Tri, Coffres de Données & Runes de Complexité',
                    professor: 'Sage Snineh',
                    desc: 'Maîtrisé les anciens sortilèges de tri et incantations de recherche, conquis les labyrinthes récursifs, et gravé les runes sacrées du Big-O de la complexité algorithmique.',
                },
                's2-cs-reinforcement-4': {
                    name: 'Renfort d\'Arcanes IV : Tours de Signal & Doctrines du Système-Royaume',
                    professor: 'Sage Iqdour',
                    desc: 'Déchiffré les tours de signal des réseaux (strates OSI, parchemins TCP/IP, décrets de protocoles) et maîtrisé les doctrines opératoires régissant processus et fortifications des systèmes.',
                },
                's2-assessment-evaluation': {
                    name: 'Épreuve par le Feu & Jugement du Grand Conseil',
                    professor: 'Archimage Soufiane Baribi',
                    desc: 'Appris à forger des épreuves formatives et des jugements sommatifs, concevoir des chartes de critères, et manier des verdicts fondés sur les données pour évaluer et hisser la progression des apprentis.',
                },
                's2-inclusive-education': {
                    name: 'Forteresse Inclusive & Fraternité de Toutes les Aptitudes',
                    professor: 'Dame Nadia Zouaoui',
                    desc: 'Forgé le code de la chevalerie inclusive—ouvrir les portes de la forteresse à tous les apprentis quelle que soit leur aptitude, et adapter les stratégies arcanes à chaque champion.',
                },
                's2-capstone-project': {
                    name: 'Grand Tournoi Final & Praticum Légendaire',
                    professor: 'Archimage Soufiane Baribi',
                    desc: 'Forgé une quête de recherche légendaire unissant toutes les doctrines apprises à la pratique du champ de bataille, couronnée d\'une chronique réflexive digne de la salle des gloires du CRMEF.',
                },
            },
        },
    },
};

export { CRMEF_SEMESTERS };
