const CRMEF_SEMESTERS = {
    files: {
        solo: 'عمل فردي (مخطوطة منفردة)',
        group: 'مشروع جماعي (ميثاق المجموعة)',
        official: 'الدليل الرسمي (مرسوم رسمي)',
        noFiles: 'لا توجد ملفات متوفرة',
    },
    tooltip: {
        pages: 'عدد الصفحات',
        date: 'تاريخ الإنشاء',
    },
    semesters: {
        'semester-1': {
            title: 'الفصل الأول (المرحلة الأولى)',
            modules: {
                'lesson-planning': {
                    name: 'تخطيط الدروس وهندسة التعلمات',
                    professor: 'الأستاذة رجاء التامري',
                    files: {
                        solo: {
                            lesson: 'مخطط الدرس العام',
                            college: 'معلوميات السلك الإعدادي',
                        },
                    },
                },
                'learning-management': {
                    name: 'تدبير الفصول وتسيير التعلمات',
                    professor: 'غير معروف',
                },
                'cs-reinforcement-1': {
                    name: 'تقوية المعارف في المعلوميات I: أنظمة المعلومات، قواعد البيانات ولغة بايثون',
                    professor: 'الأستاذ صنينح',
                },
                'cs-reinforcement-2': {
                    name: 'تقوية المعارف في المعلوميات II: بنية الحاسوب والبوابات المنطقية',
                    professor: 'الأستاذ إقدور',
                },
                'ict-education-didactics': {
                    name: 'إدماج تكنولوجيا المعلومات والاتصالات TICE وديباكتيك المعلوميات',
                    professor: 'الأستاذة وفاء الصرار',
                },
                'education-sciences': {
                    name: 'علوم التربية والنظريات البيداغوجية',
                    professor: 'غير معروف',
                },
                'research-methodology': {
                    name: 'منهجية البحث والبحث التدخلي',
                    professor: 'الأستاذ سفيان عريبي',
                },
            },
        },
    },
};

export { CRMEF_SEMESTERS };
