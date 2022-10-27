import { Logger as WinstonLogger } from 'winston';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';

import { Inject, Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class UploadsService {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: WinstonLogger, // @InjectModel(Arts.name) private readonly artsModel: Model<ArtsDocument>,
  ) {}

  //   public async upload(artData: CreateArtDto): Promise<Arts> {
  public async upload(file) {
    try {
      const uploadName = `${Date.now() + '_' + file.originalname}`;
      const upload = await new AWS.S3()
        .putObject({
          // Date.now() : UTC 기준으로 1970년 1월 1일 0시 0분 0초부터 현재까지 경과된 밀리 초 반환
          Key: uploadName,
          Body: file.buffer,
          Bucket: process.env.AWS_BUCKET_NAME,
        })
        .promise();

      this.logger.info('upload: ', upload);
      if (upload) {
        this.logger.info('image: ', { image: process.env.AWS_URL + uploadName });
        return process.env.AWS_URL + uploadName;
      }
    } catch (err) {
      this.logger.error('Error', { err: err });
    }
  }
}
