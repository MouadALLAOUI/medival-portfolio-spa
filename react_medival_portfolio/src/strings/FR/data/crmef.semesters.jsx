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
                    name: 'Planification des apprentissages & ingénierie pédagogique',
                    professor: 'Pr. Raja Tamri',
                    desc: "La planification est un processus réflexif d'organisation temporelle des objectifs pédagogiques. Elle formalise le déroulement des apprentissages, renforce la cohérence des étapes et réduit considérablement les problèmes de gestion de classe. Ses piliers fondamentaux incluent le curriculum, le programme officiel, le profil du groupe cible et son environnement socio-économique.",
                    learned: "Appris à structurer des fiches pédagogiques efficaces, à formuler des objectifs d'apprentissage clairs, à appliquer les principes de l'ingénierie pédagogique et à concevoir des séances dynamiques orientées vers les résultats.",
                    lacks: "Difficulté persistante à identifier la situation-problème la plus pertinente pour amorcer certaines séquences d'apprentissage.",
                    files: {
                        solo: {
                            lesson: 'Grandes Lignes du Plan de Leçon',
                            college: 'Informatique pour le Collège',
                        },
                    },
                },
                'learning-management': {
                    name: 'Gestion des classes & gestion des apprentissages',
                    professor: 'Pr. Raja Tamri',
                    desc: "« Un ensemble d'actions que l'enseignant conçoit, organise et met en œuvre avec ses apprenants, et pour ses apprenants, en vue de favoriser leur implication dans l'opération enseignement-apprentissage, les soutenir, les orienter et développer leurs apprentissages. » — CLERMOUT (1997)",
                    learned: "Comment gérer la dynamique de classe, établir des routines, gérer le comportement des élèves de manière constructive et favoriser un environnement d'apprentissage positif.",
                    lacks: "Besoin de plus de pratique pour gérer les élèves perturbateurs et maintenir l'autorité sans être trop strict.",
                },
                'cs-reinforcement-1': {
                    name: 'Renforcement en informatique I : architecture des ordinateurs & logique booléenne',
                    professor: 'Pr. Iqdour',
                    desc: "Renforcé la compréhension des composants matériels, de l'architecture CPU, de la hiérarchie mémoire et de l'algèbre de Boole incluant les portes logiques et les principes de conception des circuits.",
                    learned: "Renforcement de la compréhension des composants matériels, architecture du CPU, hiérarchie mémoire et algèbre de Bool incluant les portes logiques et la conception de circuits.",
                    lacks: "J'ai encore du mal à simplifier les expressions booléennes complexes et à concevoir des circuits combinatoires à sorties multiples.",
                },
                'cs-reinforcement-2': {
                    name: "Renforcement en informatique II : systèmes informatiques, systèmes d'exploitation & programmation Python / MySQL",
                    professor: 'Pr. Snineh',
                    desc: "Approfondi les connaissances relatives aux systèmes informatiques, aux systèmes d'exploitation, aux bases de données relationnelles (SQL) et aux fondamentaux de la programmation Python appliqués à des contextes éducatifs.",
                    learned: "Approfondissement des connaissances en architecture des systèmes d'information, concepts de bases de données relationnelles (SQL) et fondamentaux de la programmation Python appliqués à des contextes éducatifs.",
                    lacks: "Besoin de renforcer les concepts de POO Python et les requêtes SQL avancées comme les jointures et les sous-requêtes.",
                },
                'ict-education-didactics': {
                    name: "Intégration des TICE & didactique de l'informatique",
                    professor: 'Pr. Wafae Serrar',
                    desc: "Les TIC englobent l'ensemble des outils numériques (ordinateurs, réseaux, logiciels) destinés au traitement, à la communication et à la gestion de l'information. Leur intégration vise le développement de l'esprit critique et de l'autonomie numérique. La didactique de l'informatique, quant à elle, étudie les processus d'enseignement et d'apprentissage propres à cette discipline et se concentre sur la transformation du savoir informatique afin de le rendre accessible et assimilable par l'élève.",
                    learned: "Exploration des méthodes d'intégration des outils numériques et des TIC dans la pratique enseignante, et étude des approches didactiques spécifiques à l'éducation en informatique.",
                    lacks: "Manque d'expérience pratique avec des plateformes interactives comme Scratch et GeoGebra en contexte scolaire réel.",
                },
                'education-sciences': {
                    name: "Sciences de l'éducation & théories pédagogiques",
                    professor: 'الدكتورة العسري',
                    desc: "انتقلت علوم التربية من السرد الفلسفي إلى النضج العلمي القائم على الملاحظة والقياس. تكمن أهميتها لأستاذ المعلوميات في استثمار المثلث الديدكتيكي والنقل الديدكتيكي لحماية الممارسة الصفيّة من \"النزعة التقنية الجافة\"؛ بحيث يتم تبسيط المفاهيم المعقدة لتتلاءم مع الخريطة الذهنية لمتعلم الإعدادي.",
                    learned: "Étude des théories fondamentales de l'éducation incluant le constructivisme, le behaviorisme et les approches socio-culturelles, et leur application à la pédagogie moderne.",
                    lacks: "Besoin de mieux relier les cadres théoriques aux scénarios de classe pratiques et aux situations d'enseignement réelles.",
                },
                'research-methodology': {
                    name: 'Méthodologie de recherche & recherche-action',
                    professor: 'Pr. Soufiane Baribi',
                    desc: "La recherche-action est une démarche d'investigation pragmatique visant à apporter des réponses concrètes à des problématiques pédagogiques réelles. Elle repose sur la collecte méthodique de données de terrain, l'analyse critique des pratiques et l'introduction d'améliorations mesurables au service de l'apprentissage des élèves.",
                    learned: "Acquisition de compétences dans la conception et la réalisation de projets de recherche-action, la collecte de données de classe et la réflexion critique sur les pratiques enseignantes.",
                    lacks: "Difficulté à formuler des questions de recherche précises et à sélectionner les méthodes de collecte de données appropriées pour les études de classe à petite échelle.",
                },
            },
        },
        'semester-2': {
            title: 'Semestre 2',
            modules: {
                's2-productions-didactiques': {
                    name: 'Productions didactiques & planification avancée',
                    professor: 'Dr. Wafae Serrar',
                    desc: "La production didactique consiste à concevoir et formaliser des ressources pédagogiques adaptées au programme officiel d'informatique au collège. Elle concrétise la transposition didactique en restructurant le savoir savant en savoir enseigné, conformément à l'Approche Par Compétences, et favorise l'autonomie et la différenciation des apprentissages.",
                    learned: "Construction sur les fondamentaux de la planification de leçons en explorant les stratégies d'enseignement différencié, l'adaptation du contenu pour des profils d'apprenants diversifiés et la conception d'unités basées sur les compétences.",
                    lacks: "Besoin de plus d'expérience dans la création de matériel véritablement différencié qui réponde à tous les niveaux d'apprentissage simultanément.",
                },
                's2-gestion-apprentissages-2': {
                    name: 'Gestion des apprentissages 2',
                    professor: 'Dr. Raja Tamri',
                    desc: "Consolidé les techniques de communication pédagogique, verbale et non verbale, et développé une posture professionnelle favorisant un climat de classe serein et propice aux apprentissages.",
                    learned: "Affinement des techniques de communication verbale et non verbale en classe, pratique du feedback constructif et développement d'une posture d'enseignement confiante.",
                    lacks: "Manque encore de confiance pour gérer les discussions animées en classe et gérer les questions imprévues des élèves avec aisance.",
                },
                's2-reseaux-informatiques': {
                    name: 'Réseaux informatiques & notions fondamentales',
                    professor: 'Dr. Radoune Iqdour',
                    desc: "Le module vise à introduire les principes fondamentaux des réseaux informatiques en s'appuyant sur des analogies concrètes afin de faciliter la compréhension des notions d'émetteur, de récepteur, de canal, de routage, ainsi que des mécanismes de diffusion, de partage de canal et de commutation.",
                    learned: "Maîtrise des concepts algorithmiques fondamentaux incluant le tri, la recherche, la récursion et l'analyse de complexité Big-O appliquée aux problèmes réels du curriculum en informatique.",
                    lacks: "Besoin de plus de pratique avec la programmation dynamique et les algorithmes de graphe pour enseigner les sujets avancés avec confiance.",
                },
                's2-developpement-web-reseaux': {
                    name: 'Développement web & applications en réseau',
                    professor: 'Dr. Soufiane Baribi',
                    desc: "Étudié les fondements du Web et de l'architecture Client/Serveur, le rôle des protocoles HTTP/HTTPS et la logique des échanges entre navigateur et serveur, en lien avec le fonctionnement des applications web connectées.",
                    learned: "Étude des fondamentaux des réseaux informatiques (modèle OSI, TCP/IP, protocoles) et des concepts de systèmes d'exploitation incluant la gestion des processus et les bases de la sécurité.",
                    lacks: "Difficulté à expliquer les couches réseau et les algorithmes d'ordonnancement des OS en termes simples pour les élèves du secondaire.",
                },
                's2-evaluation-apprentissages': {
                    name: 'Évaluation des apprentissages',
                    professor: 'Dr. Raja Tamri',
                    desc: "L'évaluation est un processus structuré permettant de mesurer les acquis des élèves, d'analyser le degré de maîtrise des compétences et d'orienter les décisions pédagogiques à travers des démarches formatives et sommatives.",
                    learned: "Exploration des techniques d'évaluation formative et sommative, conception de grilles d'évaluation et stratégies d'évaluation basées sur les données pour mesurer les résultats d'apprentissage des élèves.",
                    lacks: "Difficulté à concevoir des grilles à la fois objectives et complètes pour les projets ouverts en informatique.",
                },
                's2-inclusive-education': {
                    name: 'Vie scolaire & accompagnement éducatif',
                    professor: 'Dr. Hassan Khayi',
                    desc: "تستمد الحياة المدرسية مشروعيتها من الميثاق الوطني ومقتضيات القانون الإطار رقم 51.17، لترتيل المدرسة كفضاء مفعم بالحياة يتمركز حول المتعلم لتنمية استقلاليته وروح المبادرة لديه.",
                    learned: "Développement de la conscience des pratiques d'enseignement inclusif, de l'accessibilité de l'apprentissage et des stratégies adaptatives pour les élèves aux capacités diversifiées.",
                    lacks: "Besoin de stratégies plus pratiques pour adapter les exercices d'informatique aux élèves avec des troubles d'apprentissage.",
                },
                's2-capstone-project': {
                    name: 'Éthique professionnelle, législation éducative & stage final',
                    professor: 'Dr. Abdeljabbar Karimi',
                    desc: "Réalisé un projet pédagogique intégrateur articulant cadre théorique, pratique de classe et analyse réflexive, aboutissant à un rapport de stage structuré et argumenté.",
                    learned: "Conception et présentation d'un projet de recherche éducative complet combinant théorie de l'enseignement et pratique de classe dans un rapport de stage réflexif.",
                    lacks: "Besoin d'améliorer les compétences rédactionnelles académiques et d'apprendre à structurer un véritable article de recherche avec des citations correctes.",
                },
                's2-analyse-pratiques': {
                    name: 'Analyse des pratiques pédagogiques',
                    professor: 'Dr. Wafae Serrar',
                    desc: "L'analyse des pratiques professionnelles est une démarche réflexive visant à objectiver les actions pédagogiques, à comprendre les choix didactiques opérés et à améliorer progressivement la posture enseignante dans ses dimensions pédagogique, didactique et relationnelle.",
                    learned: "Ce module m'a permis de prendre conscience de mes limites professionnelles, de l'importance d'une préparation rigoureuse et de la nécessité d'adopter une posture humble et réflexive face à l'acte d'enseigner.",
                    lacks: "Difficulté à adapter spontanément mon discours pédagogique face à des situations imprévues, notamment lors d'explications adressées à des pairs maîtrisant déjà le contenu.",
                },
            },
        },
    },
};

export { CRMEF_SEMESTERS };
