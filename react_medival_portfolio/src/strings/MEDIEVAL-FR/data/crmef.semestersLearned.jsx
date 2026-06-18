const SEMESTERS_LEARNED = {
    "semester-1": {
        "lesson-planning": {
            learned: "Comment structurer des plans de cours efficaces avec des objectifs d'apprentissage clairs, appliquer les principes de conception pédagogique et créer des sessions de classe engageantes orientées vers les résultats.",
            lacks: "Je lutte encore avec la conception de leçons pour des classes à capacités mixtes et la gestion du temps des activités dans une session de 50 minutes.",
        },
        "learning-management": {
            learned: "Comment gérer la dynamique de classe, établir des routines, gérer le comportement des élèves de manière constructive et favoriser un environnement d'apprentissage positif.",
            lacks: "Besoin de plus de pratique pour gérer les élèves perturbateurs et maintenir l'autorité sans être trop strict.",
        },
        "cs-reinforcement-1": {
            learned: "Renforcement de la compréhension des composants matériels, architecture du CPU, hiérarchie mémoire et algèbre de Bool incluant les portes logiques et la conception de circuits.",
            lacks: "J'ai encore du mal à simplifier les expressions booléennes complexes et à concevoir des circuits combinatoires à sorties multiples.",
        },
        "cs-reinforcement-2": {
            learned: "Approfondissement des connaissances en architecture des systèmes d'information, concepts de bases de données relationnelles (SQL) et fondamentaux de la programmation Python appliqués à des contextes éducatifs.",
            lacks: "Besoin de renforcer les concepts de POO Python et les requêtes SQL avancées comme les jointures et les sous-requêtes.",
        },
        "ict-education-didactics": {
            learned: "Exploration des méthodes d'intégration des outils numériques et des TIC dans la pratique enseignante, et étude des approches didactiques spécifiques à l'éducation en informatique.",
            lacks: "Manque d'expérience pratique avec des plateformes interactives comme Scratch et GeoGebra en contexte scolaire réel.",
        },
        "education-sciences": {
            learned: "Étude des théories fondamentales de l'éducation incluant le constructivisme, le behaviorisme et les approches socio-culturelles, et leur application à la pédagogie moderne.",
            lacks: "Besoin de mieux relier les cadres théoriques aux scénarios de classe pratiques et aux situations d'enseignement réelles.",
        },
        "research-methodology": {
            learned: "Acquisition de compétences dans la conception et la réalisation de projets de recherche-action, la collecte de données de classe et la réflexion critique sur les pratiques enseignantes.",
            lacks: "Difficulté à formuler des questions de recherche précises et à sélectionner les méthodes de collecte de données appropriées pour les études de classe à petite échelle.",
        },
    },
    "semester-2": {
        "s2-lesson-planning-advanced": {
            learned: "Construction sur les fondamentaux de la planification de leçons en explorant les stratégies d'enseignement différencié, l'adaptation du contenu pour des profils d'apprenants diversifiés et la conception d'unités basées sur les compétences.",
            lacks: "Besoin de plus d'expérience dans la création de matériel véritablement différencié qui réponde à tous les niveaux d'apprentissage simultanément.",
        },
        "s2-classroom-communication": {
            learned: "Affinement des techniques de communication verbale et non verbale en classe, pratique du feedback constructif et développement d'une posture d'enseignement confiante.",
            lacks: "Manque encore de confiance pour gérer les discussions animées en classe et gérer les questions imprévues des élèves avec aisance.",
        },
        "s2-cs-reinforcement-3": {
            learned: "Maîtrise des concepts algorithmiques fondamentaux incluant le tri, la recherche, la récursion et l'analyse de complexité Big-O appliquée aux problèmes réels du curriculum en informatique.",
            lacks: "Besoin de plus de pratique avec la programmation dynamique et les algorithmes de graphe pour enseigner les sujets avancés avec confiance.",
        },
        "s2-cs-reinforcement-4": {
            learned: "Étude des fondamentaux des réseaux informatiques (modèle OSI, TCP/IP, protocoles) et des concepts de systèmes d'exploitation incluant la gestion des processus et les bases de la sécurité.",
            lacks: "Difficulté à expliquer les couches réseau et les algorithmes d'ordonnancement des OS en termes simples pour les élèves du secondaire.",
        },
        "s2-assessment-evaluation": {
            learned: "Exploration des techniques d'évaluation formative et sommative, conception de grilles d'évaluation et stratégies d'évaluation basées sur les données pour mesurer les résultats d'apprentissage des élèves.",
            lacks: "Difficulté à concevoir des grilles à la fois objectives et complètes pour les projets ouverts en informatique.",
        },
        "s2-inclusive-education": {
            learned: "Développement de la conscience des pratiques d'enseignement inclusif, de l'accessibilité de l'apprentissage et des stratégies adaptatives pour les élèves aux capacités diversifiées.",
            lacks: "Besoin de stratégies plus pratiques pour adapter les exercices d'informatique aux élèves avec des troubles d'apprentissage.",
        },
        "s2-capstone-project": {
            learned: "Conception et présentation d'un projet de recherche éducative complet combinant théorie de l'enseignement et pratique de classe dans un rapport de stage réflexif.",
            lacks: "Besoin d'améliorer les compétences rédactionnelles académiques et d'apprendre à structurer un véritable article de recherche avec des citations correctes.",
        },
    },
}

const SEMESTERS_LACKS = SEMESTERS_LEARNED

export { SEMESTERS_LEARNED, SEMESTERS_LACKS }
