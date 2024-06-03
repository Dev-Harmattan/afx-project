import HandleBars from 'handlebars';
import { userEmailNotificationTemplate } from './emailTemplate/userEmailNotification';

interface EventNotificationData {
  userName: string;
  userPassword: string;
  home_url: string;
  login_url: string;
  date: string;
  location: string | null;
  eventName: string;
  agenda: string | null;
  startTime: string;
  seatNumber: number;
  roomNumber: string | null;
  email: string | null;
}

export const compileUserNotificationEmail = ({
  userName,
  userPassword,
  email,
  home_url,
  login_url,
  agenda,
  date,
  eventName,
  location,
  roomNumber,
  seatNumber,
  startTime,
}: EventNotificationData) => {
  const template = HandleBars.compile(userEmailNotificationTemplate);
  const htmlBody = template({
    userName,
    userPassword,
    home_url,
    login_url,
    agenda,
    date,
    eventName,
    location,
    roomNumber,
    seatNumber,
    startTime,
    email,
  });
  return htmlBody;
};
