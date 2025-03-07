import { send } from 'emailjs-com';

export interface EmailPayload {
    name: string;
    email: string;
    content: string;
    subject: string;
}

export async function sendEmail(body: EmailPayload): Promise<{ status: number }> {
    const serviceId = process.env.NEXT_PUBLIC_EMAIL_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAIL_TEMPLATE_ID;
    const userId = process.env.NEXT_PUBLIC_EMAIL_USER_ID;



    if (!serviceId || !templateId || !userId) {
        throw new Error('Email service configuration is missing');
    }

    try {
        const result = await send(serviceId, templateId, body as any as Record<string, unknown>, userId);
        return result;
    } catch (error) {
        throw error;
    }
} 