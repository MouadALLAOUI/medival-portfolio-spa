// crmef.jsx
const CRMEF = {
    header: {
        title: "Portfolio CRMEF",
        accueil: "Château / Bio",
        semester1: "Parchemins du Semestre 1",
        semester2: "Parchemins du Semestre 2",
        semesters: "Parchemins de Semestres",
        msp: "Chroniques MSP",
        videos: "Visions & Sortilèges",
    },
    profile: {
        bio: "En tant que développeur passionné par l'art du code et l'informatique, je suis constamment en quête de nouvelles connaissances. J'aime concevoir des architectures robustes et des interfaces enchantées. Je mets mes compétences à disposition des projets les plus ambitieux, forgeant des solutions sur mesure pour chaque quête.",
    },
    education: {
        items: {
            "data-science": {
                degree: "Science des Données",
                title: "Sorcelage en Science des Données",
                institution: "Université Cadi Ayyad",
                location: "Faculté des Sciences Semlalia — Marrakech",
                type: "Licence Fondamentale",
            },
            "fst": {
                degree: "Ingénierie Informatique",
                title: "Ingénierie Informatique",
                institution: "FST Marrakech",
                location: "Faculté des Sciences et Techniques",
                type: "Sciences & Technologies",
            },
            "lycee-militaire": {
                degree: "Discipline & Rigueur",
                title: "Discipline & Rigueur",
                institution: "1er Lycée Militaire Royal",
                location: "Kénitra",
                type: "Enseignement Secondaire",
            }
        }
    },
    experience: {
        items: {
            "pfe-master": {
                period: "Période Récente",
                title: "Mémoire de Master : Gestion & Sécurité des Données",
                description: "Développement d'une plateforme sécurisée de bout en bout pour la hiérarchisation des données dans un grand réseau d'alchimistes (entreprise).",
            },
            "pfe-licence": {
                period: "Années Précédentes",
                title: "Mémoire de Licence : Faculté des Sciences Semlalia",
                description: "Élaboration d'un système de suivi et de gestion d'inventaire. Conception d'interfaces utilisateur magiques.",
            }
        }
    },
    sports: {
        items: {
            "arts-martiaux": "Arts Martiaux",
            "athletisme": "Athlétisme",
            "gymnastique": "Gymnastique",
            "competitions": "Compétitions",
        }
    },
    accueil: {
        welcomeTitle: "Portail Professionnel CRMEF",
        welcomeDesc: "Bienvenue dans les chroniques de ma formation d'enseignant, de mes modules académiques et de mes stages en classe.",
        academicPath: "Parcours Académique",
        professionalExp: "Expériences d'Enseignement & Quêtes",
        sportsExtracurricular: "Valeur Extrascolaire & Sports",
    },
    semester: {
        title: "Modules de Formation du Semestre 1",
        subtitle: "Structures théoriques, cours de pédagogie et travaux dirigés.",
        viewDocument: "Inspecter le Parchemin",
        closeDocument: "Fermer le Parchemin",
        emptyPdf: "Sélectionne un parchemin pour inspecter son contenu.",
        modules: {
            "planification": "Module : Planification des Cours (Pr. Tanta)",
            "inf1": "Module : INF1 (Pr. Daoudi) - Architectures Mémoire Informatique",
            "tice": "Module : TICE (Pr. Serrar) - Portail d'Intégration des TIC",
            "didactique": "Module : Didactique (Pr. Daoudi) - Concepts Pédagogiques et Didactiques",
            "methodology": "Module : Méthodologie de Recherche (Pr. Rjdou?)",
        }
    },
    msp: {
        title: "Stage Professionnel MSP",
        subtitle: "Chroniques d'observations sur le terrain, d'essais pédagogiques et de rapports d'enseignement.",
        tabs: {
            presentation: "Aperçu du Stage",
            observations: "Observations Terrain",
            documents: "Artéfacts en Parchemins",
        },
        infoGrid: {
            establishment: "Académie d'Accueil",
            mentor: "Conseiller Noble (Mentor)",
            duration: "Durée de la Quête",
            classLevel: "Disciples Ciblés (Niveaux de Classe)",
        },
        noDocs: "Aucun document de stage enregistré dans ce grimoire.",
        header: {
            lyceeName: "Nom de l'École :",
            profName: "Professeur Encadrant :",
        },
        presentation: {
            remerciement: "Remerciement :",
            introduction: "Introduction :",
            generalInfo: "Informations Générales :",
            fbOfficiel: "🌐 Facebook Officiel :",
            remerciementText: "Je tiens tout d'abord à remercier chaleureusement notre superviseure Mme MOUBARRAA SANAA, qui nous a gentiment encadrés et n'a pas hésité à nous accorder son aide et ses conseils. Mes remerciements s'adressent également à tous les formateurs du centre CRMEF pour leurs efforts et leurs conseils.",
            introductionText: "Le stage d'enseignement constitue une étape importante du cursus universitaire. C'est pour nous, stagiaires, l'occasion de tester nos capacités à intégrer une équipe, à prendre des initiatives et à assumer notre propre autonomie au-delà d'une simple description des tâches effectuées. Il s'agit de rencontrer différentes réalités au sein de l'école d'accueil, et en tant que stagiaires, nous sommes censés nous y habituer, car cela démontre le séjour passé dans l'école d'accueil. Ainsi, au début, il y a une complexité dans les concepts à enseigner, l'adaptation des salles de classe, et le manque de gestion de classe, alors que parfois une maîtrise flexible de tous ces points existe dans certaines classes. Les points susmentionnés feront l'objet d'observations dans ce rapport.\n\nL'objectif principal de notre stage d'enseignement est de nous amener à comprendre la réalité de la vie professionnelle en servant comme enseignant de cours, et surtout d'enseigner correctement les cours d'informatique aux lycéens.",
        },
        table: {
            establishment: "Établissement",
            creationYear: "Année de Création",
            roomsCount: "Nombre de Salles de Classe",
            directorName: "Nom du Directeur",
            mentorName: "Professeur Encadrant",
            studentsCount: "Nombre d'Élèves",
            roomsCountValue: "43 salles de classe standard et un laboratoire informatique",
        },
        observations: {
            title: "🔮 Le Grimoire des Observations",
            desc: "Les notes et découvertes des séances d'enseignement seront inscrites ici.",
        },
        documents: {
            title: "🗝️ Les Archives",
            desc: "Les documents officiels, fiches pédagogiques et parchemins d'évaluation seront stockés dans cette chambre forte.",
        },
    },
    sections: {
        education: "Formation",
        experience: "Expérience Professionnelle",
        sports: "Sports",
    },
}

export {
    CRMEF,
}