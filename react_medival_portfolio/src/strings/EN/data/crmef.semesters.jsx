const CRMEF_SEMESTERS = {
    files: {
        solo: 'Solo Work',
        group: 'Group Project',
        official: 'Official Guide',
        noFiles: 'No files available',
    },
    tooltip: {
        pages: 'Pages',
        date: 'Created',
    },
    learned: 'What I Learned',
    lacks: 'What I Lack',
    selectModule: '🔮 Scroll to Module:',
    allModules: 'All Modules',
    chooseModule: '-- Select Module --',
    semesters: {
        'semester-1': {
            title: 'Semester 1',
            modules: {
                'lesson-planning': {
                    name: 'Lesson Planning & Pedagogical Engineering',
                    professor: 'Prof. Raja Tamri',
                    desc: 'Learned how to structure effective lesson plans, define learning objectives, and apply instructional design principles to create engaging and outcome-driven classroom sessions.',
                    learned: 'How to structure effective lesson plans with clear learning objectives, apply instructional design principles, and create engaging outcome-driven classroom sessions.',
                    lacks: 'Still struggling with designing lessons for mixed-ability classes and timing activities appropriately within a 50-minute session.',
                    files: {
                        solo: {
                            lesson: 'Lesson Plan Outline',
                            college: 'Middle School Informatics',
                        },
                    },
                },
                'learning-management': {
                    name: 'Classroom & Learning Management',
                    professor: 'Prof. Raja Tamri',
                    desc: 'Developed skills in managing classroom dynamics, establishing routines, handling student behavior constructively, and fostering a positive learning environment.',
                    learned: 'How to manage classroom dynamics, establish routines, handle student behavior constructively, and foster a positive learning environment.',
                    lacks: 'Need more practice with dealing with disruptive students and maintaining authority without being overly strict.',
                },
                'cs-reinforcement-1': {
                    name: 'CS Reinforcement I: Computer Architecture & Boolean Logic',
                    professor: 'Prof. Iqdour',
                    desc: 'Strengthened understanding of hardware components, CPU architecture, memory hierarchy, and Boolean algebra including logic gates and circuit design principles.',
                    learned: 'Strengthened understanding of hardware components, CPU architecture, memory hierarchy, and Boolean algebra including logic gates and circuit design.',
                    lacks: 'Still find it hard to simplify complex Boolean expressions and design multi-output combinational circuits.',
                },
                'cs-reinforcement-2': {
                    name: "CS Reinforcement II: Operating Systems, Databases & Python",
                    professor: 'Prof. Snineh',
                    desc: "Deepened knowledge of information systems, operating systems, relational databases (SQL), and Python programming fundamentals applied to educational contexts.",
                    learned: 'Deepened knowledge of information systems architecture, relational database concepts (SQL), and Python programming fundamentals applied to educational contexts.',
                    lacks: 'Need to strengthen Python OOP concepts and advanced SQL queries like joins and subqueries.',
                },
                'ict-education-didactics': {
                    name: 'ICT Integration (TICE) & Computer Science Didactics',
                    professor: 'Prof. Wafae Serrar',
                    desc: 'Explored methods for integrating digital tools and ICT into teaching practice, and studied didactic approaches specific to computer science education.',
                    learned: 'Explored methods for integrating digital tools and ICT into teaching practice, and studied didactic approaches specific to computer science education.',
                    lacks: 'Lack hands-on experience with interactive platforms like Scratch and GeoGebra in actual classroom settings.',
                },
                'education-sciences': {
                    name: 'Educational Sciences & Pedagogical Theories',
                    professor: 'Dr. Al Assari',
                    desc: 'Studied foundational theories of education including constructivism, behaviorism, and socio-cultural approaches, and their application to modern pedagogy.',
                    learned: 'Studied foundational theories of education including constructivism, behaviorism, and socio-cultural approaches, and their application to modern pedagogy.',
                    lacks: 'Need to better connect theoretical frameworks with practical classroom scenarios and real teaching situations.',
                },
                'research-methodology': {
                    name: 'Research Methodology & Action Research',
                    professor: 'Prof. Soufiane Baribi',
                    desc: 'Gained skills in designing and conducting action research projects, collecting classroom data, and reflecting critically on teaching practices to drive continuous improvement.',
                    learned: 'Gained skills in designing and conducting action research projects, collecting classroom data, and reflecting critically on teaching practices.',
                    lacks: 'Struggle with formulating precise research questions and selecting appropriate data collection methods for small-scale classroom studies.',
                },
            },
        },
        'semester-2': {
            title: 'Semester 2',
            modules: {
                's2-productions-didactiques': {
                    name: 'Advanced Lesson Planning & Didactic Productions',
                    professor: 'Dr. Wafae Serrar',
                    desc: 'Built on lesson planning foundations by exploring differentiated instruction strategies, adapting content for diverse learner profiles, and designing competency-based units.',
                    learned: 'Built on lesson planning foundations by exploring differentiated instruction strategies, adapting content for diverse learner profiles, and designing competency-based units.',
                    lacks: 'Need more experience in creating truly differentiated materials that cater to all learning levels simultaneously.',
                },
                's2-gestion-apprentissages-2': {
                    name: 'Learning Management 2',
                    professor: 'Dr. Raja Tamri',
                    desc: 'Refined verbal and non-verbal communication techniques for the classroom, practiced giving constructive feedback, and developed a confident and professional teaching posture.',
                    learned: 'Refined verbal and non-verbal communication techniques for the classroom, practiced giving constructive feedback, and developed a confident teaching posture.',
                    lacks: 'Still lack confidence in managing heated classroom discussions and handling unexpected student questions smoothly.',
                },
                's2-reseaux-informatiques': {
                    name: 'Computer Networks & Network Fundamentals',
                    professor: 'Dr. Radoune Iqdour',
                    desc: "The module introduces fundamental principles of computer networks using concrete analogies to facilitate understanding of transmitter, receiver, channel, routing, as well as broadcast, channel sharing, and switching mechanisms.",
                    learned: 'Mastered core algorithmic concepts including sorting, searching, recursion, and Big-O complexity analysis applied to real CS curriculum problems.',
                    lacks: 'Need more practice with dynamic programming and graph algorithms to teach advanced topics confidently.',
                },
                's2-developpement-web-reseaux': {
                    name: 'Web Development & Networked Applications',
                    professor: 'Dr. Soufiane Baribi',
                    desc: "Studied the foundations of the Web and Client/Server architecture, the role of HTTP/HTTPS protocols, and the logic of exchanges between browser and server, in relation to connected web applications.",
                    learned: 'Studied computer networking fundamentals (OSI model, TCP/IP, protocols) and operating system concepts including process management and security basics.',
                    lacks: 'Find it difficult to explain networking layers and OS scheduling algorithms in simple terms for secondary students.',
                },
                's2-evaluation-apprentissages': {
                    name: 'Assessment & Evaluation of Learning',
                    professor: 'Dr. Raja Tamri',
                    desc: 'Explored formative and summative assessment techniques, rubric design, and data-driven evaluation strategies to measure and improve student learning outcomes.',
                    learned: 'Explored formative and summative assessment techniques, rubric design, and data-driven evaluation strategies to measure student learning outcomes.',
                    lacks: 'Struggle with designing rubrics that are both objective and comprehensive for open-ended CS projects.',
                },
                's2-inclusive-education': {
                    name: 'School Life & Educational Support',
                    professor: 'Dr. Hassan Khayi',
                    desc: 'Developed awareness of inclusive teaching practices, learning accessibility, and adaptive strategies to support students with diverse abilities and backgrounds.',
                    learned: 'Developed awareness of inclusive teaching practices, learning accessibility, and adaptive strategies for students with diverse abilities.',
                    lacks: 'Need more practical strategies for adapting CS exercises for students with learning disabilities.',
                },
                's2-capstone-project': {
                    name: 'Professional Ethics, Educational Law & Final Practicum',
                    professor: 'Dr. Abdeljabbar Karimi',
                    desc: 'Designed and presented a comprehensive educational research project combining teaching theory and classroom practice, culminating in a reflective practicum report.',
                    learned: 'Designed and presented a comprehensive educational research project combining teaching theory and classroom practice in a reflective practicum report.',
                    lacks: 'Need to improve academic writing skills and learn how to structure a proper research paper with correct citations.',
                },
                's2-analyse-pratiques': {
                    name: 'Analysis of Teaching Practices',
                    professor: 'Dr. Wafae Serrar',
                    desc: 'Developed skills in systematically observing and analyzing teaching practices, identifying effective strategies and areas for improvement, and applying reflective methods to enhance pedagogical approaches.',
                    learned: 'Learned how to systematically observe teaching sessions, analyze pedagogical decisions, and provide constructive feedback for improvement.',
                    lacks: 'Still developing the ability to remain completely objective during observations and to provide feedback that is both honest and encouraging.',
                },
            },
        },
    },
};

export { CRMEF_SEMESTERS };
