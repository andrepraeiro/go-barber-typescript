/* eslint-disable no-console */
import nodemailer, { Transporter } from 'nodemailer';
import aws from 'aws-sdk';
import { inject, injectable } from 'tsyringe';
import MailConfig from '@config/mail';
import IMailProvider from '../models/IMailProvider';
import ISendEmailDTO from '../dtos/ISendEmailDTO';
import IMailTemplateProvider from '../../MailTemplateProvider/models/IMailTemplateProvider';

interface IMessage {
  to: string;
  body: string;
}

@injectable()
export default class SESMailProvider implements IMailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: IMailTemplateProvider
  ) {
    this.client = nodemailer.createTransport({
      SES: new aws.SES({
        apiVersion: '2010-12-01',
        region: 'us-est-2',
      }),
    });
  }

  public async sendMail({
    to,
    subject,
    from,
    templateData,
  }: ISendEmailDTO): Promise<void> {
    const { name, email } = MailConfig.defaults.from;
    await this.client.sendMail({
      from: {
        name: from?.name || name,
        address: from?.email || email,
      },

      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });
  }
}
