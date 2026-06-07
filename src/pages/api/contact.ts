import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export const config = {
  api: {
    bodyParser: {
      // 添付ファイル（base64）を含むため上限を引き上げる
      sizeLimit: '12mb',
    },
  },
};

type Attachment = {
  filename: string;
  content: string; // base64
};

interface ContactPayload {
  formType: 'inquiry' | 'recruitment';
  name: string;
  email: string;
  phone?: string;
  inquiryType?: string;
  position?: string;
  message?: string;
  attachments?: Attachment[];
}

const INQUIRY_TYPE_LABELS: Record<string, string> = {
  general: '一般お問い合わせ',
  service: 'サービスについて',
  quote: 'お見積もり依頼',
  other: 'その他',
};

const POSITION_LABELS: Record<string, string> = {
  driver: 'ドライバー',
  sorter: '仕分け作業員',
  office: '事務スタッフ',
  sales: '営業',
  other: 'その他',
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    MAIL_FROM,
    MAIL_TO,
  } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !MAIL_TO) {
    console.error('メール送信の環境変数が設定されていません');
    return res
      .status(500)
      .json({ success: false, message: 'サーバーのメール設定が未完了です。管理者にお問い合わせください。' });
  }

  const data = req.body as ContactPayload;

  if (!data || !data.name || !data.email) {
    return res.status(400).json({ success: false, message: '必須項目が不足しています。' });
  }

  const isRecruitment = data.formType === 'recruitment';
  const fromAddress = MAIL_FROM || SMTP_USER;

  const lines: string[] = [];
  lines.push(isRecruitment ? '【求人応募】' : '【お問い合わせ】');
  lines.push('');
  lines.push(`お名前：${data.name}`);
  lines.push(`メールアドレス：${data.email}`);
  if (data.phone) lines.push(`電話番号：${data.phone}`);
  if (!isRecruitment && data.inquiryType) {
    lines.push(`お問い合わせ種類：${INQUIRY_TYPE_LABELS[data.inquiryType] || data.inquiryType}`);
  }
  if (isRecruitment && data.position) {
    lines.push(`応募職種：${POSITION_LABELS[data.position] || data.position}`);
  }
  lines.push('');
  lines.push(isRecruitment ? '自己PR・志望動機：' : 'お問い合わせ内容：');
  lines.push(data.message || '（記載なし）');
  lines.push('');
  lines.push('-----------------------------------');
  lines.push('このメールは Next Earth ウェブサイトのフォームから送信されました。');

  const attachments = (data.attachments || [])
    .filter(a => a && a.filename && a.content)
    .map(a => ({
      filename: a.filename,
      content: Buffer.from(a.content, 'base64'),
    }));

  const subject = isRecruitment
    ? `【求人応募】${data.name} 様`
    : `【お問い合わせ】${INQUIRY_TYPE_LABELS[data.inquiryType || ''] || ''} - ${data.name} 様`;

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      secure: Number(SMTP_PORT) === 465, // 465 はSSL
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `Next Earth お問い合わせ <${fromAddress}>`,
      to: MAIL_TO,
      replyTo: data.email,
      subject,
      text: lines.join('\n'),
      attachments,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('メール送信に失敗しました:', error);
    return res
      .status(500)
      .json({ success: false, message: '送信に失敗しました。時間をおいて再度お試しください。' });
  }
}
