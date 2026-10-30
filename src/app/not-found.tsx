import Link from "next/link";
import { FileQuestion, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="w-20 h-20 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 rounded-3xl flex items-center justify-center mx-auto border border-blue-100 dark:border-blue-900 shadow-sm">
          <FileQuestion className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">
            404
          </h1>
          <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">
            الصفحة المطلوبة غير موجودة
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            عذراً، الوثيقة أو الصفحة التي تبحث عنها غير متوفرة أو قد تم نقلها أو حذفها من منصة «المسند».
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-sm"
          >
            <Home className="w-4 h-4" />
            الرئيسية
          </Link>
          <Link
            href="/browse"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl transition-colors"
          >
            <Search className="w-4 h-4" />
            استكشاف الأنشطة
          </Link>
        </div>
      </div>
    </div>
  );
}