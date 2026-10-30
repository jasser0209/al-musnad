import type { Metadata, Viewport } from "next";
import { Cairo } from "next/font/google";
import Link from "next/link";
import { Headphones, ShieldCheck, BookOpen, Briefcase, FileCheck2 } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import AuthRoleModal from "@/components/auth/AuthRoleModal";
import InstallPwaBanner from "@/components/ui/InstallPwaBanner";
import { AppPreferencesProvider } from "@/context/AppPreferencesContext";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-cairo",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://al-musnad.vercel.app"),
  title: "المسند | المنصة التربوية والبيداغوجية المعتمدة",
  description:
    "منصة المسند التربوية والبيداغوجية المعتمدة للمؤسسات، المتفقدين، المعلمين، والتلاميذ لتصفح المستويات والمواد والوثائق الإدارية والنشرات التربوية.",
  keywords: [
    "المسند",
    "السنة الأولى ابتدائي",
    "السنة السادسة ابتدائي",
    "جذاذات",
    "تمارين",
    "امتحانات",
    "وثائق إدارية للمعلم",
  ],
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "المسند",
  },
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  verification: {
    google: "cjjaOITGWrgejk9JVO2ns7HzP55iAtkWdTfmwvYFuCo",
  },
  alternates: {
    canonical: "https://al-musnad.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-cairo transition-colors">
        <AppPreferencesProvider>
          {/* Global Top Navbar */}
          <Navbar />

          {/* Fullscreen Role Selection Modal */}
          <AuthRoleModal />

          {/* Main Content Area */}
          <main className="flex-1">{children}</main>

          {/* Vercel Speed Insights */}
          <SpeedInsights />

          {/* Smart PWA Install Banner */}
          <InstallPwaBanner />

          {/* Global Bottom Footer with Technical Support & Customer Service at the bottom of the page */}
          <footer className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pt-12 pb-8 mt-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
              {/* Dedicated Support & Customer Service Banner at the bottom of the page */}
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-600 via-indigo-700 to-slate-900 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-lg">
                <div className="flex items-start sm:items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center shrink-0">
                    <Headphones className="w-7 h-7 text-amber-300" />
                  </div>
                  <div className="space-y-1">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[11px] font-bold">
                      مركز المساعدة والمرافقة
                    </span>
                    <h3 className="text-lg sm:text-xl font-black">
                      قسم الدعم الفني وخدمة العملاء
                    </h3>
                    <p className="text-xs sm:text-sm text-blue-100 max-w-xl leading-relaxed">
                      هل تواجه أي استفسار تقني أو ترغب في التواصل مع المشرف العام لتوثيق هويتك التربوية؟ فريق الدعم الفني في خدمتك على مدار الساعة.
                    </p>
                  </div>
                </div>

                <Link
                  href="/support"
                  className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-900 font-extrabold text-xs sm:text-sm inline-flex items-center gap-2 shadow-md transition shrink-0"
                >
                  <Headphones className="w-4 h-4" />
                  <span>الانتقال إلى صفحة الدعم الفني وخدمة العملاء</span>
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="md:col-span-2 space-y-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 bg-blue-600 text-white rounded-xl flex items-center justify-center font-black text-lg shadow-sm">
                      م
                    </div>
                    <span className="text-xl font-extrabold text-slate-900 dark:text-white">
                      المسند
                    </span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-md">
                    المنصة التربوية والبيداغوجية المعتمدة للمؤسسات، المتفقدين، المعلمين، والتلاميذ لتصفح المستويات الدراسية، المواد، الجذاذات، التمارين، والوثائق الإدارية.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-3">
                    أقسام المنصة
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                    <li>
                      <Link href="/levels" className="hover:text-blue-600 transition inline-flex items-center gap-1.5">
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>مستودع المواد والمستويات</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/#learn-more" className="hover:text-blue-600 transition inline-flex items-center gap-1.5">
                        <span>اعرف المزيد عن المنصة</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/#catalog" className="hover:text-blue-600 transition">
                        النشرات العامة
                      </Link>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm mb-3">
                    الدعم الفني والتوثيق
                  </h4>
                  <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                    <li>
                      <Link href="/support" className="hover:text-blue-600 font-bold text-blue-600 dark:text-blue-400 transition inline-flex items-center gap-1.5">
                        <Headphones className="w-3.5 h-3.5" />
                        <span>الدعم الفني وخدمة العملاء</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/profile?tab=verification" className="hover:text-blue-600 transition inline-flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        <span>قسم توثيق الهوية</span>
                      </Link>
                    </li>
                    <li>
                      <Link href="/terms" className="hover:text-blue-600 transition inline-flex items-center gap-1.5">
                        <FileCheck2 className="w-3.5 h-3.5" />
                        <span>شروط الاستخدام والملكية</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
                <p>© {new Date().getFullYear()} منصة المسند التربوية. جميع الحقوق محفوظة.</p>
                <div className="flex items-center gap-4">
                  <Link href="/terms" className="hover:text-blue-600 font-semibold transition">
                    شروط الاستخدام والملكية
                  </Link>
                  <span>•</span>
                  <Link href="/support" className="hover:text-blue-600 font-semibold transition">
                    الدعم الفني وخدمة العملاء
                  </Link>
                </div>
              </div>
            </div>
          </footer>
        </AppPreferencesProvider>
      </body>
    </html>
  );
}