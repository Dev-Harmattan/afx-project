'use server';

import Mailjet from 'node-mailjet';

const mailjetUsername = process.env.NEXT_PUBLIC_MJ_SMTP_USERNAME as string;
const mailjetPassword = process.env.NEXT_PUBLIC_MJ_SMTP_PASSWORD as string;
const sender = process.env.NEXT_PUBLIC_EMAIL_SENDER;

const mailjet = Mailjet.apiConnect(mailjetUsername, mailjetPassword);

export const sendMail = async ({
  to,
  subject,
  body,
  userName,
}: {
  to: string | null;
  subject: string;
  body: string;
  userName: string;
}) => {
  try {
    const emailData = {
      Messages: [
        {
          From: {
            Email: sender,
            Name: 'Totalenergies',
          },
          To: [
            {
              Email: to,
              Name: userName,
            },
          ],
          Subject: subject,
          HTMLPart: body,
        },
      ],
    };

    const result = await mailjet
      .post('send', { version: 'v3.1' })
      .request(emailData);
  } catch (error) {
    console.log(error);
  }
};
