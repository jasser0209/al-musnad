"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import type { AccountRoleOption } from "@/types/api";

export type Locale = "ar" | "fr" | "en";
export type ThemeMode = "light" | "dark";

export interface RoleMetadataTranslations {
  title: string;
  subtitle: string;
  badge: string;
  orgLabel: string;
  orgPlaceholder: string;
  nameLabel: string;
  namePlaceholder: string;
}

export interface Dictionary {
  dir: "rtl" | "ltr";
  brandName: string;
  brandTagline: string;
  nav: {
    home: string;
    browse: string;
    upload: string;
    support: string;
    adminPanel: string;
    login: string;
    register: string;
    logout: string;
    profile: string;
    editProfile: string;
    subscriptions: string;
    verification: string;
    settings: string;
    notifications: string;
    markAllRead: string;
    noNotifications: string;
    themeLight: string;
    themeDark: string;
    language: string;
  };
  authModal: {
    loginTitle: string;
    loginSubtitle: string;
    registerTitle: string;
    registerSubtitle: string;
    switchToRegister: string;
    switchToLogin: string;
    close: string;
    continueBtn: string;
    changeRoleBtn: string;
  };
  roles: Record<AccountRoleOption, RoleMetadataTranslations>;
  authForm: {
    emailLabel: string;
    passwordLabel: string;
    passwordHint: string;
    studentGradeLabel: string;
    studentGradePlaceholder: string;
    termsLabel: string;
    submitLogin: string;
    submitRegister: string;
    googleContinue: string;
    orDivider: string;
    verificationNote: string;
    haveCodeQuestion: string;
    activateCodeLink: string;
  };
}

export const DICTIONARIES: Record<Locale, Dictionary> = {
  ar: {
    dir: "rtl",
    brandName: "المسند",
    brandTagline: "المنصة التربوية والبيداغوجية المعتمدة",
    nav: {
      home: "الرئيسية",
      browse: "النشرات",
      upload: "نشر وثيقة",
      support: "الدعم الفني",
      adminPanel: "لوحة المشرف",
      login: "تسجيل الدخول",
      register: "إنشاء حساب",
      logout: "تسجيل الخروج",
      profile: "الملف الشخصي ومساحتي",
      editProfile: "تعديل الملف الشخصي",
      subscriptions: "الاشتراكات",
      verification: "التوثيق",
      settings: "الإعدادات",
      notifications: "التنبيهات والإشعارات",
      markAllRead: "تحديد الكل كمقروء",
      noNotifications: "لا توجد تنبيهات جديدة حالياً",
      themeLight: "الوضع النهاري",
      themeDark: "الوضع الليلي",
      language: "اللغة",
    },
    authModal: {
      loginTitle: "اختر صفتك لتسجيل الدخول إلى المسند",
      loginSubtitle: "حدد فضاءك التربوي للوصول المباشر إلى النشرات وأدوات العمل المخصصة لك",
      registerTitle: "اختر نوع الحساب الذي تريد إنشاءه في المسند",
      registerSubtitle: "يمكنك إنشاء حسابك مباشرة، وتوثيق هويتك لاحقاً بكود من المشرف للحصول على شارة التوثيق",
      switchToRegister: "ليس لديك حساب؟ انتقل إلى إنشاء حساب جديد",
      switchToLogin: "لديك حساب بالفعل؟ انتقل إلى تسجيل الدخول",
      close: "إغلاق النافذة",
      continueBtn: "متابعة",
      changeRoleBtn: "تغيير نوع الحساب",
    },
    roles: {
      INSTITUTION: {
        title: "حساب مؤسسة تربوية",
        subtitle: "للمدارس، المعاهد، والمؤسسات التعليمية لإدارة ونشر الرصيد البيداغوجي والوثائق المدرسية.",
        badge: "فضاء المؤسسات",
        orgLabel: "اسم المؤسسة التربوية / المدرسة *",
        orgPlaceholder: "أدخل الاسم الرسمي للمؤسسة التربوية",
        nameLabel: "صفة أو اسم المسؤول التربوي *",
        namePlaceholder: "أدخل الاسم الكامل للمسؤول",
      },
      INSPECTOR: {
        title: "حساب متفقد تربوي",
        subtitle: "للمتفقدين والموجهين البيداغوجيين لاعتماد صحة النشرات علمياً وتربوياً وتقديم التوجيهات الرسمية.",
        badge: "فضاء المتفقدين",
        orgLabel: "الدائرة التفقدية / المندوبية الجهوية *",
        orgPlaceholder: "أدخل اسم الدائرة التفقدية أو المندوبية",
        nameLabel: "الاسم الكامل للمتفقد *",
        namePlaceholder: "أدخل الاسم الكامل",
      },
      TEACHER: {
        title: "حساب معلم",
        subtitle: "للمعلمين والأساتذة لنشر المذكرات، التمارين، وإصلاح الاختبارات مع التحكم الكامل في جمهور النشر.",
        badge: "فضاء المعلمين",
        orgLabel: "المؤسسة التربوية التي تدرّس بها (اختياري)",
        orgPlaceholder: "أدخل اسم المدرسة أو المؤسسة",
        nameLabel: "الاسم الكامل للمعلم *",
        namePlaceholder: "أدخل الاسم الكامل",
      },
      STUDENT: {
        title: "حساب تلميذ",
        subtitle: "للتلاميذ وأولياء الأمور لتصفح وتحميل التمارين، المراجعات، والأنشطة الموجهة للتلاميذ.",
        badge: "فضاء التلاميذ",
        orgLabel: "المؤسسة التعليمية / المدرسة (اختياري)",
        orgPlaceholder: "أدخل اسم المدرسة",
        nameLabel: "الاسم الكامل للتلميذ *",
        namePlaceholder: "أدخل الاسم الكامل",
      },
    },
    authForm: {
      emailLabel: "البريد الإلكتروني *",
      passwordLabel: "كلمة المرور *",
      passwordHint: "8 أحرف على الأقل",
      studentGradeLabel: "المستوى الدراسي للتلميذ (إجباري) *",
      studentGradePlaceholder: "اختر المستوى الدراسي...",
      termsLabel: "أوافق على شروط وأحكام الاستخدام وسياسة الخصوصية لمنصة المسند *",
      submitLogin: "تسجيل الدخول الآن",
      submitRegister: "إنشاء الحساب الآن",
      googleContinue: "المتابعة باستخدام حساب Google",
      orDivider: "أو",
      verificationNote: "ملاحظة التوثيق: يمكنك إنشاء حسابك الآن واستخدام المنصة، ولإضافة شارة التوثيق الرسمية (للمؤسسات، المعلمين، والمتفقدين) يتم تأكيد الهوية بكود من المشرف في قسم التوثيق.",
      haveCodeQuestion: "هل لديك كود توثيق الحساب؟",
      activateCodeLink: "تفعيل كود التوثيق",
    },
  },

  fr: {
    dir: "ltr",
    brandName: "Al-Musnad",
    brandTagline: "Plateforme Pédagogique Certifiée",
    nav: {
      home: "Accueil",
      browse: "Publications",
      upload: "Publier",
      support: "Support & Aide",
      adminPanel: "Administration",
      login: "Connexion",
      register: "Créer un compte",
      logout: "Déconnexion",
      profile: "Mon Espace & Profil",
      editProfile: "Modifier le profil",
      subscriptions: "Abonnements",
      verification: "Vérification",
      settings: "Paramètres",
      notifications: "Notifications",
      markAllRead: "Tout marquer comme lu",
      noNotifications: "Aucune notification pour le moment",
      themeLight: "Mode Clair",
      themeDark: "Mode Sombre",
      language: "Langue",
    },
    authModal: {
      loginTitle: "Choisissez votre profil de connexion sur Al-Musnad",
      loginSubtitle: "Accédez à votre espace pédagogique dédié",
      registerTitle: "Choisissez le type de compte à créer",
      registerSubtitle: "Créez votre compte et vérifiez votre identité via un code administrateur pour obtenir le badge certifié",
      switchToRegister: "Pas encore de compte ? Créer un nouveau compte",
      switchToLogin: "Déjà inscrit ? Se connecter à mon compte",
      close: "Fermer",
      continueBtn: "Continuer",
      changeRoleBtn: "Changer le type de compte",
    },
    roles: {
      INSTITUTION: {
        title: "Espace Établissement",
        subtitle: "Pour les écoles et institutions éducatives afin de gérer et diffuser leurs ressources.",
        badge: "Établissement",
        orgLabel: "Nom de l'établissement scolaire *",
        orgPlaceholder: "Saisissez le nom officiel de l'établissement",
        nameLabel: "Nom du responsable *",
        namePlaceholder: "Saisissez le nom complet",
      },
      INSPECTOR: {
        title: "Espace Inspecteur",
        subtitle: "Pour les inspecteurs pédagogiques afin d'homologuer les publications et publier des directives.",
        badge: "Inspecteur",
        orgLabel: "Circonscription / Délégation régionale *",
        orgPlaceholder: "Saisissez la circonscription pédagogique",
        nameLabel: "Nom complet de l'inspecteur *",
        namePlaceholder: "Saisissez le nom complet",
      },
      TEACHER: {
        title: "Espace Enseignant",
        subtitle: "Pour les enseignants afin de publier des exercices ou des corrigés réservés aux enseignants.",
        badge: "Enseignant",
        orgLabel: "Établissement scolaire (optionnel)",
        orgPlaceholder: "Saisissez le nom de l'école",
        nameLabel: "Nom complet de l'enseignant *",
        namePlaceholder: "Saisissez le nom complet",
      },
      STUDENT: {
        title: "Espace Élève",
        subtitle: "Pour les élèves et parents afin de consulter et télécharger les fiches d'exercices.",
        badge: "Élève",
        orgLabel: "École (optionnel)",
        orgPlaceholder: "Saisissez le nom de l'école",
        nameLabel: "Nom complet de l'élève *",
        namePlaceholder: "Saisissez le nom complet",
      },
    },
    authForm: {
      emailLabel: "Adresse e-mail *",
      passwordLabel: "Mot de passe *",
      passwordHint: "8 caractères minimum",
      studentGradeLabel: "Niveau scolaire de l'élève (obligatoire) *",
      studentGradePlaceholder: "Sélectionnez le niveau scolaire...",
      termsLabel: "J'accepte les conditions générales d'utilisation et la politique de confidentialité d'Al-Musnad *",
      submitLogin: "Se connecter",
      submitRegister: "Créer mon compte",
      googleContinue: "Continuer avec Google",
      orDivider: "OU",
      verificationNote: "Note : Vous pouvez créer un compte sans vérification immédiate. Le badge de certification (Établissement, Enseignant, Inspecteur) s'active avec un code fourni par l'administrateur.",
      haveCodeQuestion: "Vous avez un code de vérification ?",
      activateCodeLink: "Activer mon code",
    },
  },

  en: {
    dir: "ltr",
    brandName: "Al-Musnad",
    brandTagline: "Certified Educational & Pedagogical Platform",
    nav: {
      home: "Home",
      browse: "Publications",
      upload: "Publish",
      support: "Support",
      adminPanel: "Admin Panel",
      login: "Log In",
      register: "Sign Up",
      logout: "Sign Out",
      profile: "My Workspace & Profile",
      editProfile: "Edit Profile",
      subscriptions: "Subscriptions",
      verification: "Verification",
      settings: "Settings",
      notifications: "Notifications",
      markAllRead: "Mark all read",
      noNotifications: "No new notifications",
      themeLight: "Light Mode",
      themeDark: "Dark Mode",
      language: "Language",
    },
    authModal: {
      loginTitle: "Select Your Account Type on Al-Musnad",
      loginSubtitle: "Access your tailored educational workspace",
      registerTitle: "Select the Account Type to Create",
      registerSubtitle: "Create your account now and verify your identity anytime via an admin code to unlock the verified badge",
      switchToRegister: "Don't have an account? Create a new account",
      switchToLogin: "Already have an account? Log in here",
      close: "Close",
      continueBtn: "Continue",
      changeRoleBtn: "Change Account Type",
    },
    roles: {
      INSTITUTION: {
        title: "Educational Institution",
        subtitle: "For schools and educational centers to manage and publish institutional curricula.",
        badge: "Institution",
        orgLabel: "Official Institution / School Name *",
        orgPlaceholder: "Enter official institution name",
        nameLabel: "Coordinator Full Name *",
        namePlaceholder: "Enter full name",
      },
      INSPECTOR: {
        title: "Pedagogical Inspector",
        subtitle: "For certified inspectors to endorse scientific & pedagogical accuracy and pin official directives.",
        badge: "Inspector",
        orgLabel: "Inspection District / Regional Directorate *",
        orgPlaceholder: "Enter inspection district",
        nameLabel: "Inspector Full Name *",
        namePlaceholder: "Enter full name",
      },
      TEACHER: {
        title: "Teacher Account",
        subtitle: "For teachers to publish worksheets for students or answer keys exclusively for fellow teachers.",
        badge: "Teacher",
        orgLabel: "School Name (Optional)",
        orgPlaceholder: "Enter school name",
        nameLabel: "Teacher Full Name *",
        namePlaceholder: "Enter full name",
      },
      STUDENT: {
        title: "Student Account",
        subtitle: "For students and parents to browse, preview, and download worksheets and study materials.",
        badge: "Student",
        orgLabel: "School Name (Optional)",
        orgPlaceholder: "Enter school name",
        nameLabel: "Student Full Name *",
        namePlaceholder: "Enter full name",
      },
    },
    authForm: {
      emailLabel: "Email Address *",
      passwordLabel: "Password *",
      passwordHint: "At least 8 characters",
      studentGradeLabel: "Student Grade Level (Required) *",
      studentGradePlaceholder: "Select grade level...",
      termsLabel: "I agree to Al-Musnad Terms & Conditions and Privacy Policy *",
      submitLogin: "Log In Now",
      submitRegister: "Create Account",
      googleContinue: "Continue with Google",
      orDivider: "OR",
      verificationNote: "Verification Note: You can create an account without immediate verification. Official verification badges for Institutions, Teachers, and Inspectors are unlocked via an admin code.",
      haveCodeQuestion: "Have a verification code?",
      activateCodeLink: "Activate Code",
    },
  },
};

interface AppPreferencesContextValue {
  locale: Locale;
  setLocale: (loc: Locale) => void;
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
  t: Dictionary;
  authModalMode: "login" | "register" | null;
  openAuthModal: (mode: "login" | "register") => void;
  closeAuthModal: () => void;
}

const AppPreferencesContext = createContext<AppPreferencesContextValue | undefined>(undefined);

export function AppPreferencesProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("ar");
  const [theme, setThemeState] = useState<ThemeMode>("light");
  const [authModalMode, setAuthModalMode] = useState<"login" | "register" | null>(null);

  useEffect(() => {
    try {
      const savedLocale = localStorage.getItem("musnad_locale") as Locale | null;
      if (savedLocale && (savedLocale === "ar" || savedLocale === "fr" || savedLocale === "en")) {
        setLocaleState(savedLocale);
      }

      const savedTheme = localStorage.getItem("musnad_theme") as ThemeMode | null;
      if (savedTheme === "dark" || savedTheme === "light") {
        setThemeState(savedTheme);
      } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setThemeState("dark");
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    const dict = DICTIONARIES[locale];
    document.documentElement.lang = locale;
    document.documentElement.dir = dict.dir;
    document.body.style.direction = dict.dir;
    document.body.style.textAlign = dict.dir === "rtl" ? "right" : "left";
    try {
      localStorage.setItem("musnad_locale", locale);
    } catch {
      // ignore
    }
  }, [locale]);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    try {
      localStorage.setItem("musnad_theme", theme);
    } catch {
      // ignore
    }
  }, [theme]);

  const setLocale = (loc: Locale) => setLocaleState(loc);
  const setTheme = (mode: ThemeMode) => setThemeState(mode);
  const toggleTheme = () => setThemeState((prev) => (prev === "light" ? "dark" : "light"));

  const openAuthModal = (mode: "login" | "register") => setAuthModalMode(mode);
  const closeAuthModal = () => setAuthModalMode(null);

  return (
    <AppPreferencesContext.Provider
      value={{
        locale,
        setLocale,
        theme,
        toggleTheme,
        setTheme,
        t: DICTIONARIES[locale],
        authModalMode,
        openAuthModal,
        closeAuthModal,
      }}
    >
      {children}
    </AppPreferencesContext.Provider>
  );
}

export function useAppPreferences() {
  const ctx = useContext(AppPreferencesContext);
  if (!ctx) {
    throw new Error("useAppPreferences must be used inside AppPreferencesProvider");
  }
  return ctx;
}