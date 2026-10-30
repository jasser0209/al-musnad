import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
const resend = apiKey ? new Resend(apiKey) : null;

const DEFAULT_FROM =
  process.env.RESEND_FROM_EMAIL || "منصة المسند <onboarding@resend.dev>";
const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://al-musnad.vercel.app";

interface SendEmailParams {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
}

/**
 * Base email dispatcher with graceful fallback.
 */
export async function sendEmail({
  to,
  subject,
  html,
  text,
}: SendEmailParams): Promise<{ success: boolean; data?: any; error?: any }> {
  if (!resend || !apiKey) {
    console.warn(
      "⚠️ [Email Service] RESEND_API_KEY is not configured. Email skipped:",
      subject,
      "to:",
      to
    );
    return { success: false, error: "RESEND_API_KEY_MISSING" };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: DEFAULT_FROM,
      to,
      subject,
      html,
      text: text || subject,
    });

    if (error) {
      console.warn("⚠️ [Email Service] Resend API error:", error.message);
      return { success: false, error };
    }

    console.log("✅ [Email Service] Email sent successfully to:", to, "ID:", data?.id);
    return { success: true, data };
  } catch (err: any) {
    console.warn("⚠️ [Email Service] Unexpected error sending email:", err?.message || err);
    return { success: false, error: err?.message || "SEND_FAILED" };
  }
}

/**
 * Wraps content in Al-Musnad's branded HTML layout.
 */
function createEmailTemplate({
  title,
  preheader,
  contentHtml,
  ctaText,
  ctaUrl,
}: {
  title: string;
  preheader?: string;
  contentHtml: string;
  ctaText?: string;
  ctaUrl?: string;
}): string {
  return `
<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f8fafc;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      direction: rtl;
      text-align: right;
      color: #1e293b;
    }
    .wrapper {
      max-width: 600px;
      margin: 30px auto;
      background: #ffffff;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
      border: 1px solid #e2e8f0;
    }
    .header {
      background: linear-gradient(135deg, #0f172a 0%, #1e3a8a 100%);
      padding: 36px 30px;
      text-align: center;
      color: #ffffff;
    }
    .header h1 {
      margin: 0;
      font-size: 26px;
      font-weight: 900;
      letter-spacing: -0.5px;
    }
    .header p {
      margin: 8px 0 0 0;
      font-size: 13px;
      color: #93c5fd;
      font-weight: 500;
    }
    .content {
      padding: 32px 30px;
      font-size: 15px;
      line-height: 1.8;
      color: #334155;
    }
    .cta-container {
      text-align: center;
      margin: 30px 0 10px 0;
    }
    .cta-button {
      display: inline-block;
      background-color: #2563eb;
      color: #ffffff !important;
      font-size: 14px;
      font-weight: 800;
      text-decoration: none;
      padding: 14px 32px;
      border-radius: 12px;
      box-shadow: 0 4px 12px rgba(37, 99, 235, 0.25);
    }
    .badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 8px;
      background-color: #eff6ff;
      color: #1d4ed8;
      font-weight: 800;
      font-size: 12px;
      margin-bottom: 15px;
      border: 1px solid #bfdbfe;
    }
    .footer {
      background-color: #f1f5f9;
      padding: 24px 30px;
      text-align: center;
      font-size: 12px;
      color: #64748b;
      border-top: 1px solid #e2e8f0;
      line-height: 1.6;
    }
    .footer a {
      color: #2563eb;
      text-decoration: none;
      font-weight: 700;
    }
  </style>
</head>
<body>
  ${preheader ? `<div style="display:none;font-size:1px;color:#333333;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">${preheader}</div>` : ""}
  <div class="wrapper">
    <div class="header">
      <h1>منصة «المسند»</h1>
      <p>الفضاء البيداغوجي الشامل للتعليم الأساسي بالجمهورية التونسية</p>
    </div>
    <div class="content">
      ${contentHtml}
      ${
        ctaText && ctaUrl
          ? `
      <div class="cta-container">
        <a href="${ctaUrl}" class="cta-button" target="_blank">${ctaText}</a>
      </div>
      `
          : ""
      }
    </div>
    <div class="footer">
      <p style="margin: 0 0 8px 0;">
        هذه الرسالة تم إرسالها تلقائياً من خوادم <strong>منصة المسند</strong>.<br>
        للدعم الفني والاستفسار، تواصل معنا عبر واتساب: 
        <a href="https://wa.me/21627764985">27764985</a> أو 
        <a href="https://wa.me/21646907101">46907101</a>
      </p>
      <p style="margin: 0; color: #94a3b8;">
        جميع الحقوق محفوظة © 2026 منصة المسند التربوية
      </p>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * 1. sendWelcomeEmail(to, name, roleTitle)
 * Sends an elegant welcome email upon new user registration.
 */
export async function sendWelcomeEmail(
  to: string,
  name: string,
  roleTitle: string
) {
  const subject = `مرحباً بك في منصة المسند — فضاءك التربوي المتميز يا ${name}`;
  const html = createEmailTemplate({
    title: subject,
    preheader: `يسعدنا انضمامك إلى مجتمع المسند التربوي كـ ${roleTitle}`,
    contentHtml: `
      <div class="badge">الفئة: ${roleTitle}</div>
      <h2 style="font-size: 20px; color: #0f172a; margin-top: 0;">أهلاً بك يا أستاذ/ة ${name}،</h2>
      <p>
        يسرّنا أن نرحب بك في <strong>منصة «المسند»</strong>، المنظومة الوطنية المتكاملة لتبادل المذكرات،
        الجذاذات النموذجية، الفروض والأنشطة التقييمية لكافة المستويات الدراسية في المرحلة الابتدائية.
      </p>
      <p>
        حسابك الآن مفعّل وجاهز، وبإمكانك الاستفادة من فضاءك المخصص كـ <strong>${roleTitle}</strong>:
      </p>
      <ul style="padding-right: 20px; color: #475569;">
        <li>تصفح وتحميل الجذاذات والفروض المعتمدة بيداغوجياً.</li>
        <li>نشر ومشاركة الإنتاجات والملفات البيداغوجية مع الزملاء.</li>
        <li>الحصول على شارات الاعتماد والملاحظات التوجيهية من المتفقدين التربويين.</li>
      </ul>
    `,
    ctaText: "الدخول إلى منصة المسند الآن",
    ctaUrl: `${APP_URL}/login`,
  });

  return sendEmail({ to, subject, html });
}

/**
 * 2. sendSupportReplyNotification(to, name, ticketSubject, replyText)
 * Notifies the user when an admin or moderator replies to their support ticket.
 */
export async function sendSupportReplyNotification(
  to: string,
  name: string,
  ticketSubject: string,
  replyText: string
) {
  const subject = `رد جديد على استفسارك في الدعم الفني: ${ticketSubject}`;
  const html = createEmailTemplate({
    title: subject,
    preheader: `قام فريق إدارة المسند بالرد على تذكرتك: ${ticketSubject}`,
    contentHtml: `
      <div class="badge" style="background-color: #f0fdf4; color: #166534; border-color: #bbf7d0;">مركز الدعم الفني</div>
      <h2 style="font-size: 18px; color: #0f172a; margin-top: 0;">مرحباً ${name}،</h2>
      <p>
        نحيطك علماً بأن فريق الإشراف والمتابعة في <strong>منصة المسند</strong> قد قام بالرد على تذكرتك الخاصة بـ:
      </p>
      <div style="background-color: #f8fafc; border-right: 4px solid #2563eb; padding: 14px 18px; margin: 18px 0; border-radius: 8px;">
        <strong style="color: #1e293b; display: block; margin-bottom: 6px;">موضوع الاستفسار: ${ticketSubject}</strong>
        <p style="margin: 0; color: #475569; font-style: italic;">« ${replyText} »</p>
      </div>
      <p>
        إذا كانت لديك أي استفسارات إضافية، بإمكانك متابعة المحادثة مباشرة عبر مركز الدعم الفني.
      </p>
    `,
    ctaText: "الانتقال إلى مركز الدعم الفني",
    ctaUrl: `${APP_URL}/support`,
  });

  return sendEmail({ to, subject, html });
}

/**
 * 3. sendEndorsementNotification(to, teacherName, worksheetTitle)
 * Notifies the teacher when an inspector pedagogically endorses their published worksheet.
 */
export async function sendEndorsementNotification(
  to: string,
  teacherName: string,
  worksheetTitle: string
) {
  const subject = `تهانينا! تم اعتماد منشورك البيداغوجي «${worksheetTitle}» رسميّاً ★`;
  const html = createEmailTemplate({
    title: subject,
    preheader: `حصل منشورك ${worksheetTitle} على شارة الاعتماد البيداغوجي من المتفقد التربوي`,
    contentHtml: `
      <div class="badge" style="background-color: #fefce8; color: #854d0e; border-color: #fef08a;">★ اعتماد بيداغوجي رسمي</div>
      <h2 style="font-size: 19px; color: #0f172a; margin-top: 0;">تهانينا الحارة أستاذ/ة ${teacherName}،</h2>
      <p>
        يسرّنا إعلامك بأن المتفقد التربوي المعتمد قد قام بمراجعة واعتماد منشورك:
      </p>
      <div style="background-color: #eff6ff; border-radius: 12px; padding: 18px; margin: 18px 0; border: 1px solid #bfdbfe; text-align: center;">
        <span style="font-size: 24px;">★</span>
        <h3 style="margin: 6px 0; font-size: 17px; color: #1e40af;">« ${worksheetTitle} »</h3>
        <p style="margin: 0; font-size: 13px; color: #3b82f6; font-weight: 600;">تم منحه شارة الاعتماد التربوي الرسمي</p>
      </div>
      <p>
        أصبح منشورك الآن يحمل شارة التميّز ويحظى بالأولوية في نتائج البحث والتوصيات لجميع المربين في تونس. نشكرك على عطائك وإثرائك للمكتبة البيداغوجية.
      </p>
    `,
    ctaText: "معاينة منشورك المعتمد",
    ctaUrl: `${APP_URL}`,
  });

  return sendEmail({ to, subject, html });
}