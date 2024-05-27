import { IEventData, IEventService, IImageService } from 'interfaces';
import multer from 'multer';
import { File } from 'types';
import { BaseController, Controller, Get, Post } from 'utils';

const upload = multer({ storage: multer.memoryStorage() });

@Controller('/event')
export class EventController extends BaseController {
  constructor(
    private eventService: IEventService,
    private imageService: IImageService,
  ) {
    super();
  }

  @Get('/')
  async get() {
    console.log('Hello World!');
    return 'body';
  }

  @Post('/', [upload.single('file')])
  async post({ body, file }: { file: File; body: IEventData }) {
    const thumbMetadata = this.imageService.getMetadata(file, true);
    const mainMetadata = this.imageService.getMetadata(file, false);

    const data = {
      name: body.name,
      descriptionIt: body.descriptionIt,
      descriptionEng: body.descriptionEng,
      date: new Date(body.date),
      image: `events/${mainMetadata.originalname}`,
      thumb: `events/thumbs/${thumbMetadata.originalname}`,
      type: body.type,
    };

    console.log(thumbMetadata, mainMetadata);

    const sharped = await this.imageService.sharpImage(file.buffer);

    console.debug('---------------', sharped);

    const [post] = await Promise.all([
      this.eventService.create(data),
      this.imageService.uploadImage(file.buffer, mainMetadata, 'events'),
      this.imageService.uploadImage(sharped, thumbMetadata, 'events/thumbs'),
    ]);

    return post;
  }
}
