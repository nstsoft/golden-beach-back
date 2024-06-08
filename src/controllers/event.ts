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
    const criteria = {
      type: req.query.type as EventTypeEnum,
      name: req.query.name as string,
    };
    if (req.query.date) {
      Object.assign(criteria, { date: new Date(req.query.date as string) });
    }

    return this.eventService.findAll(criteria, req.pagination);
  }

  @Get('/:id')
  async getOne(req: AppRequest) {
    return this.eventService.findById(req.params.id);
  }

  @Delete('/:id')
  async delete(req: AppRequest) {
    return this.eventService.delete(req.params.id === 'many' ? req.body.ids : req.params.id);
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

    const [sharped, original] = await Promise.all([
      this.imageService.sharpAndCropImage(file.buffer, { width: 200, height: 300, quality: 30 }),
      this.imageService.sharpAndCropImage(file.buffer, { width: 600, height: 900 }),
    ]);

    const [post] = await Promise.all([
      this.eventService.create(data),
      this.imageService.uploadImage(original, mainMetadata, 'events'),
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

      const [sharped, original] = await Promise.all([
        this.imageService.sharpAndCropImage(file.buffer, { width: 200, height: 300, quality: 30 }),
        this.imageService.sharpAndCropImage(file.buffer, { width: 565, height: 800 }),
      ]);

      Object.assign(data, {
        image: `events/${mainMetadata.originalname}`,
        thumb: `events/thumbs/${thumbMetadata.originalname}`,
      });
      await Promise.all([
        this.imageService.uploadImage(original, mainMetadata, 'events'),
        this.imageService.uploadImage(sharped, thumbMetadata, 'events/thumbs'),
      ]);
    }

    return this.eventService.updateOne(params.id, data);
  }
}
