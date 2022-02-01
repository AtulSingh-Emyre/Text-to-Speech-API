/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Request, Response, NextFunction } from 'express';
import textToSpeech from '@google-cloud/text-to-speech';
import { writeFile } from 'fs';
import { promisify } from 'util';

// Creates a client
const client = new textToSpeech.TextToSpeechClient();
export class APICallController {
  static async convertToSpeech(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const text = 'JOHN WILLIAMSON LATHAM IS THE CAPTAIN OF NEW ZEALAND.';

      // Construct the request
      const request: any = {
        input: { text: text },
        // Select the language and SSML voice gender (optional)
        voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },
        // select the type of audio encoding
        audioConfig: { audioEncoding: 'MP3' }
      };

      // Performs the text-to-speech request
      const [response]: any = await client.synthesizeSpeech(request);
      // Write the binary audio content to a local file
      const writeFileCustom = promisify(writeFile);
      await writeFileCustom('output.mp3', response.audioContent, 'binary');
      console.log('Audio content written to file: output.mp3');
    } catch (err) {
      next(err);
    }
  }
}
