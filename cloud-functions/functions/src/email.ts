import { shouldSendWithLease, markSent } from './idempotent';
import { firestore } from './db';

export const sendEmail = async (eventId: string) => {
  const emailRef = firestore.collection('sentEmails').doc(eventId);

  const send = await shouldSendWithLease(emailRef);
  if (send) {
    // Send email.
    // sgMail.setApiKey(...);
    // sgMail.send({ ..., text: content.text });
    return markSent(emailRef);
  }
  // Do more here.
  return undefined;
};
