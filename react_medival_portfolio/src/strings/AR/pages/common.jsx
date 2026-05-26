const COMMON = {
    nav: {
        logoText: "معاذ المبرمج",
        home: "القلعة / الرئيسية",
        landing: "نظرة عامة",
        projects: "مهام تقنية",
        blogs: "غرفة السجلات",
        crmef: "بوابة CRMEF",
        game: "عالم الكتابة",
        settingsGear: "افتح الإعدادات",
        medieval: {
            hero: "العراف",
            presentation: "الحرفي",
            skills: "مخطوطة المهارات",
            projects: "مهام تقنية",
            about: "لور البرمجة",
            contact: "أرسل غراباً",
            hobbies: "بعيداً عن الكود",
            design: "فرن التصميم",
            languages: "لغات المملكة",
        }
    },
    settings: {
        title: "مخطوطة الإعدادات",
        subtitle: "خصص تجربة محفظتك",
        backBtn: "← عودة",
        themeLabel: "سمة المملكة",
        langLabel: "اللغة / اللسان",
        fontSizeLabel: "حجم خط الكاتب",
        motionLabel: "تعويذة الحركة (الرسوم المتحركة)",
        motionActive: "مخفض (هادئ)",
        motionNormal: "سحر كامل (رسوم متحركة)",
        advancedBtn: "⚙️ إعدادات متقدمة",
        applyBtn: "حفظ التعاويذ",
        closeBtn: "إغلاق الإعدادات",
        sections: {
            appearance: {
                title: "🎨 المظهر",
                description: "السمة المرئية وتفضيلات العرض"
            },
            language: {
                title: "🌐 اللغة",
                description: "تفضيلات لغة الواجهة"
            },
            pdf: {
                title: "📄 قارئ PDF",
                description: "كيفية فتح وعرض مستندات PDF"
            },
            accessibility: {
                title: "♿ إمكانية الوصول",
                description: "تفضيلات الراحة والوصول"
            }
        },
        keys: {
            theme: {
                label: "سمة المملكة",
                description: "اختر النمط المرئي العام للمحفظة",
                options: {
                    light: { label: "نور أركين", description: "التبديل إلى سمة نور أركين" },
                    dark: { label: "عالم الظلال", description: "التبديل إلى سمة عالم الظلال" },
                    medieval: { label: "مخطوطة القرون الوسطى", description: "التبديل إلى سمة مخطوطة القرون الوسطى" }
                }
            },
            markdownTheme: {
                label: "نمط ماركداون",
                description: "كيفية تنسيق محتوى المدونة",
                options: {
                    default: { label: "افتراضي", description: "يطابق السمة المرئية النشطة" },
                    github: { label: "GitHub", description: "تنسيق GitHub نظيف" },
                    medieval: { label: "مخطوطة القرون الوسطى", description: "تنسيق القرون الوسطى المزخرف" }
                }
            },
            language: {
                label: "لغة الواجهة",
                description: "اللغة المستخدمة عبر واجهة المحفظة",
                options: {
                    en: { label: "English", description: "" },
                    fr: { label: "Français", description: "" },
                    ar: { label: "العربية", description: "" },
                    'medieval-en': { label: "Medieval English", description: "" },
                    'medieval-fr': { label: "Français Médiéval", description: "" }
                }
            },
            pdfMode: {
                label: "وضع الفتح",
                description: "أين تفتح مستندات PDF",
                options: {
                    inline: { label: "تمرير داخلي", description: "يتوسع داخل الصفحة تحت المشغل" },
                    modal: { label: "بوابة أركين (منبثقة)", description: "يفتح في نافذة عائمة مركزية" },
                    newWindow: { label: "طائرة خارجية (نافذة جديدة)", description: "يفتح في تبويب متصفح جديد" }
                }
            },
            pdfReadingMode: {
                label: "تخطيط القراءة",
                description: "كيفية تخطيط الصفحات داخل قارئ PDF",
                options: {
                    paginated: { label: "صفحة بصفحة", description: "التنقل صفحة واحدة في كل مرة" },
                    longStrip: { label: "شريط طويل", description: "تمرير عمودي مستمر" },
                    separatedStrip: { label: "شريط منفصل", description: "تمرير مع فواصل صفحات واضحة" },
                    doublePage: { label: "صفحة مزدوجة", description: "صفحتان جنباً إلى جنب (للمكتب)" }
                }
            },
            reducedMotion: {
                label: "تقليل الحركة",
                description: "تقليل الرسوم المتحركة عبر المحفظة"
            },
            fontSize: {
                label: "حجم خط الكاتب",
                description: "حجم خط القراءة الأساسي",
                options: {
                    small: { label: "صغير", description: "قاعدة 14px" },
                    medium: { label: "متوسط", description: "قاعدة 16px (افتراضي)" },
                    large: { label: "كبير", description: "قاعدة 18px" }
                }
            },
            soundEnabled: {
                label: "أصوات أركين",
                description: "تمكين المؤثرات الصوتية الثيماتية"
            }
        }
    },
    contextMenu: {
        navigateTitle: "التنقل",
        navigateHome: "العودة إلى القلعة",
        copyUrl: "نسخ رابط المخطوطة",
        urlLabel: "رابط المخطوطة",
        cycleTheme: "تبديل سمة المملكة",
        printPage: "طباعة المخطوطة",
        viewSource: "إلقاء نظرة على الكود",
        unlockAchievement: "اختراق البوابة السرية",
    },
    pdfViewer: {
        loading: "🔮 فك المخطوطة...",
        errorNotFound: "⚠️ المخطوطة المطلوبة غير موجودة أو لا يمكن تتبعها.",
        errorCorrupted: "⚠️ تعذر فك المخطوطة أو أنها تالفة.",
        errorNoData: "لم يتم تحديد مخطوطة.",
        previous: "← السابق",
        next: "التالي →",
        pagePrefix: "صفحة",
    },
    chatbot: {
        title: "العراف الأكبر",
        placeholder: "استشر العراف حول لور معاذ...",
        send: "استشارة",
        triggerText: "استشر العراف",
        triggerAria: "افتح مخطوطة العراف",
        closeAria: "أغلق مخطوطة العراف",
        suggestions: {
            whoIsMouad: "من هو معاذ؟",
            listProjects: "قائمة المشاريع",
            listCyberProjects: "مشاريع الأمن السيبراني",
        },
        howToUseTitle: "كيفية استخدام هذا الروبوت:",
        howToUseAsk: "اطرح أسئلة:",
        howToUseAskDesc: "حول السياق أو استفسارات عامة عن معاذ المبرمج",
        howToUseFollowUp: "أسئلة المتابعة:",
        howToUseFollowUpDesc: "يتذكر الروبوت سياق الموضوع النشط لمتابعة سلسة",
        worthAsking: "هل يستحق السؤال:",
        worthAskingDesc: "نعم! أبذل قصارى جهدي لبنائه — حتى لو كانت هناك بعض التحسينات المطلوبة. شكراً لاستخدام الروبوت البسيط الخاص بنا.",
        greeting: "تحياتي، أيها الباحث! أنا العراف. اسألني أي شيء عن معاذ المبرمج وقواه البرمجية الغامضة.",
        underDevNotice: "هذا الروبوت لا يزال تحت التطوير والتدريب. شكراً لتفهمك.",
        context: "السياق:",
        statParagraphs: "فقرات",
        statSentences: "جمل",
        statEntities: "كيانات",
    },
    alerts: {
        copySuccess: "تم نسخ {{label}} إلى كتاب التعاويذ! ✅",
        copyFailed: "فشلت تعويذة النسخ! 💀",
        pdfError: "تعذر فك المخطوطة المطلوبة. تأكد من وجود الملف. 🗂️",
        welcomeHome: "مرحباً بك في قصري، أتمنى أن تجد كل ما تتمناه",
        chaosUnderDev: "هذه المحفظة لا تزال تحت التطوير، شكراً لتفهمك",
        projectsUnderDev: "القسم الحالي تحت التطوير هو المشاريع",
        welcomeBack: "مرحباً بعودتك، أيها المسافر",
        themeAltered: "تم تغيير المملكة إلى {{theme}}! 🔮",
        portalAlreadyBreached: "تم اختراق البوابة السرية بالفعل! 🛡️",
        dateUnknown: "تاريخ غير معروف",
        developmentAlertBar: "مرحباً بك في محفظة معاذ المبرمج! هذه المحفظة لا تزال تحت التطوير، شكراً لتفهمك.",
    },
    footer: {
        copyright: "© {{year}} معاذ المبرمج | صُنع بكود سحري وبكسلات مسحورة",
        disclaimer: "لا يجوز نسخ هذه المخطوطة دون إذن صريح من الساحر",
    },
    thankyou: {
        title: "📜 تم إرسال رسالتك!",
        body: "طار غراب بكلماتك، أيها الزائر النبيل.\nسأقرأ مخطوطتك وأرد بسرعة بمجرد أن تصطف النجوم.",
        returnBtn: "⬅️ العودة إلى الأرشيف الأكبر",
    },
    achievements: {
        title: 'قبو الإنجازات',
        subtitle: 'مفتوح · نقاط الخبرة',
        unlocked: 'مفتوح',
        locked: 'مغلق',
        showLocked: 'عرض المغلقة',
        category: 'الفئة',
        rarity: 'الندرة',
        allCategories: 'الكل',
        allRarities: 'كل الندرات',
        xpSuffix: 'نقاط',
        empty: 'لا توجد إنجازات تطابق التصفية الخاصة بك',
        navLabel: 'الإنجازات',
    },
    notFound: {
        title: "🛡️ 404 - فقدت المخطوطة في الفراغ",
        subtitle: "تلاشت المخطوطة التي تبحث عنها من مكتبة المملكة.",
        description: "ربما أخطأت في كتابة العنوان، أو التهمت نيران التنين الصفحة. تحقق من إحداثياتك وحاول مرة أخرى، أيها المسافر.",
        backBtn: "⬅️ العودة إلى القلعة",
    }
}


export {
    COMMON,
}
