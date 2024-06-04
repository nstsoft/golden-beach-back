import { IImageService, IMenuService } from 'interfaces';
import multer from 'multer';
import { AppRequest, File, UploadMenu } from 'types';
import { BaseController, Controller, Delete, Get, Post, Put } from 'utils';

const upload = multer({ storage: multer.memoryStorage() });

@Controller('/menu')
export class MenuController extends BaseController {
  constructor(
    private menuService: IMenuService,
    private imageService: IImageService,
  ) {
    super();
  }

  @Get('/')
  async get() {
    return this.menuService.findAll({}, { skip: 0, limit: 10000 });
  }

  @Get('/:id')
  async getOne(req: AppRequest) {
    return this.menuService.findById(req.params.id);
  }

  @Delete('/:id')
  async delete(req: AppRequest) {
    return this.menuService.delete(req.params.id === 'many' ? req.body.ids : req.params.id);
  }

  @Post('/', [upload.single('file')])
  async post({ body, file }: { file: File; body: UploadMenu }) {
    const mainMetadata = this.imageService.getMetadata(file, false);
    const thumbMetadata = this.imageService.getMetadata(file, true);

    const [thumb, original] = await Promise.all([
      this.imageService.sharpAndCropImage(file.buffer, { width: 200, height: 200, quality: 30 }),
      this.imageService.sharpAndCropImage(file.buffer, { width: 500, height: 500 }),
    ]);

    const [post] = await Promise.all([
      this.menuService.create({
        ...body,
        labels: body.labels.split(','),
        image: `menu/${mainMetadata.originalname}`,
        thumb: `menu/thumbs/${thumbMetadata.originalname}`,
      }),
      this.imageService.uploadImage(original, mainMetadata, 'menu'),
      this.imageService.uploadImage(thumb, thumbMetadata, 'menu/thumbs'),
    ]);

    return post;
  }

  @Put('/:id', [upload.single('file')])
  async put({ body, file, params }: { file: File; body: UploadMenu; params: { id: string } }) {
    const data = {
      ...body,
      labels: body.labels.split(','),
    };

    if (file) {
      const mainMetadata = this.imageService.getMetadata(file, false);
      const thumbMetadata = this.imageService.getMetadata(file, true);

      const [thumb, original] = await Promise.all([
        this.imageService.sharpAndCropImage(file.buffer, { width: 200, height: 200, quality: 30 }),
        this.imageService.sharpAndCropImage(file.buffer, { width: 500, height: 500 }),
      ]);

      Object.assign(data, {
        image: `menu/${mainMetadata.originalname}`,
        thumb: `menu/thumbs/${thumbMetadata.originalname}`,
      });

      await Promise.all([
        this.imageService.uploadImage(original, mainMetadata, 'menu'),
        this.imageService.uploadImage(thumb, thumbMetadata, 'menu/thumbs'),
      ]);
    }

    return this.menuService.updateOne(params.id, data);
  }
}
