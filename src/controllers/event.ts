import { EventTypeEnum, IEventService, IImageService } from 'interfaces';
import multer from 'multer';
import { AppRequest, File, UploadEvent } from 'types';
import { BaseController, Controller, Delete, Get, Post, Put } from 'utils';

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
  async get(req: AppRequest) {
    return this.eventService.findAll({ type: req.query.type as EventTypeEnum }, req.pagination);
  }

  @Get('/:id')
  async getOne(req: AppRequest) {
    return this.eventService.findById(req.params.id);
  }

  @Delete('/:id')
  async delete(req: AppRequest) {
    if (req.params.id === 'many') {
      return this.eventService.delete(req.body.ids);
    }
    return this.eventService.delete(req.params.id);
  }

  @Post('/', [upload.single('file')])
  async post({ body, file }: { file: File; body: UploadEvent }) {
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

    const sharped = await this.imageService.sharpImage(file.buffer);

    const [post] = await Promise.all([
      this.eventService.create(data),
      this.imageService.uploadImage(file.buffer, mainMetadata, 'events'),
      this.imageService.uploadImage(sharped, thumbMetadata, 'events/thumbs'),
    ]);

    return post;
  }

  @Put('/:id', [upload.single('file')])
  async put({ body, file, params }: { file: File; body: UploadEvent; params: { id: string } }) {
    const data = {
      name: body.name,
      descriptionIt: body.descriptionIt,
      descriptionEng: body.descriptionEng,
      date: new Date(body.date),
      type: body.type,
    };

    if (file) {
      const thumbMetadata = this.imageService.getMetadata(file, true);
      const mainMetadata = this.imageService.getMetadata(file, false);
      const sharped = await this.imageService.sharpImage(file.buffer);

      Object.assign(data, {
        image: `events/${mainMetadata.originalname}`,
        thumb: `events/thumbs/${thumbMetadata.originalname}`,
      });
      await Promise.all([
        this.imageService.uploadImage(file.buffer, mainMetadata, 'events'),
        this.imageService.uploadImage(sharped, thumbMetadata, 'events/thumbs'),
      ]);
    }

    return this.eventService.updateOne(params.id, data);
  }
}
