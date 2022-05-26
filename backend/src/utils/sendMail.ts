import config from "@src/config";
import UserModel from "@src/models/user";
import ejs from "ejs";
import nodemailer from "nodemailer";
import { google } from "googleapis";
import app_root_path from 'app-root-path';

export default class MailUtils {
  private transporter: any;
  private oAuth2Client: any;
  constructor() {
    // this.oAuth2Client = new google.auth.OAuth2(
    //   config.CLIENT_ID,
    //   config.CLEINT_SECRET,
    //   config.REDIRECT_URI
    // );
    // this.oAuth2Client.setCredentials({ refresh_token: config.REFRESH_TOKEN });
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: "lasyfashion.manage@gmail.com",
        pass: "lasyfashion",
      },
    });
  }

  private async sendMail(to: string, subject: string, html: any) {
    try {
      // const accessToken = await this.oAuth2Client.getAccessToken();
      // this.transporter = nodemailer.createTransport({
      //   service: 'gmail',
      //   auth: {
      //     type: 'OAuth2',
      //     user: config.MAIL_FROM_ADDRESS,
      //     clientId: config.CLIENT_ID,
      //     clientSecret: config.CLEINT_SECRET,
      //     refreshToken: config.REFRESH_TOKEN,
      //     accessToken: accessToken,
      //   },
      //   tls: {
      //     rejectUnauthorized: false
      //   }
      // });
      const info = await this.transporter.sendMail({
        from: config.MAIL_FROM_ADDRESS, // sender address
        to,
        subject,
        html,
      });
      console.log("Message sent: %s", info);
      return info;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  public activeAccount(email: string, token: string, user: UserModel = null) {
    try {
      const subject = "Lasy Shop Sign up Confirmation";
      const fileTemplate = "activeAccount";
      return new Promise((resolve, reject) => {
        const url = `${config.WEBSITE_URL}/active-account?token=${encodeURIComponent(token)}`;
        ejs.renderFile(`${app_root_path}/src/templates/${fileTemplate}.ejs`, { mainUrl: url }, async (err, data) => {
          if (err) {
            console.log(err);
            reject(err);
          }
          const result = await this.sendMail(email, subject, data);
          resolve(result);
        });
      });
    } catch (error) {
      throw error;
    }
  }

  // 2
  public forgotPassword(email: string, token: string) {
    try {
      const subject = "Lasy Shop Password Required";
      let url = `${config.WEBSITE_URL}/login?action=reset-password&token=${encodeURIComponent(token)}`;
      const response = this._getCommonResponse(email, url);
      return new Promise((resolve, reject) => {
        ejs.renderFile(`${app_root_path}/src/templates/forgotPassword.ejs`, response, async (err, data) => {
          if (err) {
            console.log(err);
            reject(err);
          }
          const result = await this.sendMail(email, subject, data);
          resolve(result);
        });
      });
    } catch (error) {
      throw error;
    }
  }

  private _getCommonResponse(recipientEmail: string, mainUrl: string): ResponseEmailModel {
    const currentYear = new Date().getFullYear();
    const logoUrl = `${config.S3_URL}logo-2021-07-23T15%3A19%3A34.jpg`
    return {
      recipientEmail,
      mainUrl,
      websiteUrl: config.WEBSITE_URL,
      currentYear,
      logoUrl,
    };
  }
}


export interface ResponseEmailModel {
  recipientEmail: string;
  mainUrl: string;
  websiteUrl: string;
  currentYear: number;
  logoUrl: string;
  // Optional
  user?: UserModel
  jobTitle?: string;
  companyName?: string;
  userName?: string;
  // end Optional
}