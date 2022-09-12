import sgMail from '@sendgrid/mail';
import { BlogPostMailTemplate } from '../template/blogPost.js';

const { SENDGRID_API_KEY, SENDGRID_EMAIL } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const defaultParams = {
  from: 'SENDGRID_EMAIL', // Use the email address or domain you verified above
};

export const sendBlogPostMail = async ({ to, title, link }) => {
    try {
      const msg = {
        ...defaultParams,
        to,
        subject: 'Your article has been published.',
        html: BlogPostMailTemplate({ title, link }),
      };
      const sendgridResponse = await sgMail.send(msg);
      console.log(sendgridResponse);
    } catch (error) {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  };