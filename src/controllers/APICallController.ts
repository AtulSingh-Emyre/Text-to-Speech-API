/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Request, Response, NextFunction } from 'express';
import textToSpeech from '@google-cloud/text-to-speech';
import { writeFile } from 'fs';
import { promisify } from 'util';
import readXlsxFile from 'read-excel-file/node';

const client = new textToSpeech.TextToSpeechClient();

export class APICallController {
  static async convertToSpeech(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      readXlsxFile('./src/Assets/CMU-Arctic_translation_EN-HN.xlsx').then(
        async (rows) => {
          // console.log(rows);
          // Construct the request
          for (let i = 1; i < rows.length; i++) {
            const request: any = {
              input: { text: rows[i][1] },
              // Select the language and SSML voice gender (optional)
              voice: { languageCode: 'en-IN', name: 'en-IN-Wavenet-A' },
              // select the type of audio encoding
              audioConfig: {
                audioEncoding: 'LINEAR16',
                pitch: 0,
                speakingRate: 1
              }
            };
            // Performs the text-to-speech request

            const [response]: any = await client.synthesizeSpeech(request);
            // Write the binary audio content to a local file
            const writeFileCustom = promisify(writeFile);
            console.log(response);
            await writeFileCustom(
              './English/' + rows[i][0] + '.wav',
              response.audioContent,
              'binary'
            );

            const request2: any = {
              input: { text: rows[i][2] },
              // Select the language and SSML voice gender (optional)
              voice: { languageCode: 'hi-IN', name: 'hi-IN-Wavenet-A' },
              // select the type of audio encoding
              audioConfig: {
                audioEncoding: 'LINEAR16',
                pitch: 0,
                speakingRate: 1
              }
            };
            // Performs the text-to-speech request

            const [response2]: any = await client.synthesizeSpeech(request2);
            // Write the binary audio content to a local file
            console.log(response2);
            await writeFileCustom(
              './Hindi/' + rows[i][0] + '.wav',
              response2.audioContent,
              'binary'
            );
            console.log('files of current row have been created');
          }
          // `rows` is an array of rows
          // each row being an array of cells.
        }
      );
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}
