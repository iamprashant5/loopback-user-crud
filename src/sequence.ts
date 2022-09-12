import {MiddlewareSequence, RequestContext} from '@loopback/rest';

interface LogDetails {
  StartTime: string;
  EndTime: string;
  Referer: string;
  UserAgent: string;
  RequestIp: string;
  ErrorTime?: string;
}
export class MySequence extends MiddlewareSequence {
  logValues: LogDetails = {
    StartTime: '',
    EndTime: '',
    Referer: '',
    UserAgent: '',
    RequestIp: '',
  };

  log(logData: LogDetails) {
    console.log(logData);
  }

  async handle(context: RequestContext) {
    this.logValues.StartTime = new Date().getTime().toString();
    this.logValues.Referer = context.request.headers.referer ?? '';
    this.logValues.RequestIp = context.request.ip;
    this.logValues.UserAgent = context.request.headers['user-agent'] ?? '';
    const {ALLOWED_ORIGIN} = process.env;
    const allowedOriginArray = ALLOWED_ORIGIN?.split('') ?? [];

    if (!allowedOriginArray.includes(this.logValues.Referer)) {
      this.logValues.ErrorTime = new Date().getTime().toString();
      this.log(this.logValues);
      // throw Error('Invalid origin');
    }
    await super.handle(context);
    this.logValues.EndTime = new Date().getTime().toString();
    this.log(this.logValues);
  }
}
