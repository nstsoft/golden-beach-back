import { IImageService, IMenuService } from 'interfaces';
import { isValidPassphrase } from 'middlewares';
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

  @Delete('/:id', [isValidPassphrase])
  async delete(req: AppRequest) {
    return this.menuService.delete(req.params.id === 'many' ? req.body.ids : req.params.id);
  }

  @Post('/', [upload.array('files', 5), isValidPassphrase])
  async post({ body, files }: { files: File[]; body: UploadMenu }) {
    const processFile = async (file: File) => {
      const [original, thumb] = await Promise.all([
        this.imageService.sharpAndCropImage(file.buffer, { width: 300, height: 250, quality: 30 }),
        this.imageService.sharpAndCropImage(file.buffer, { width: 600, height: 500 }),
      ]);
      const mainMetadata = this.imageService.getMetadata(file, false);
      const thumbMetadata = this.imageService.getMetadata(file, true);

      await Promise.all([
        this.imageService.uploadImage(original, mainMetadata, 'menu'),
        this.imageService.uploadImage(thumb, thumbMetadata, 'menu/thumbs'),
      ]);

      return {
        image: mainMetadata.originalname,
        thumb: thumbMetadata.originalname,
      };
    };

    const [main, ...rest] = await Promise.all(files.map(processFile));

    const data = {
      ...body,
      labels: body.labels.split(','),
      image: `menu/${main.image}`,
      thumb: `menu/thumbs/${main.thumb}`,
      images: rest.map((el) => ({
        image: `menu/${el.image}`,
        thumb: `menu/thumbs/${el.thumb}`,
      })),
    };

    return this.menuService.create(data);
  }

  @Put('/:id', [upload.array('files', 5), isValidPassphrase])
  async put({ body, files, params }: { files: File[]; body: UploadMenu; params: { id: string } }) {
    const data = {
      ...body,
      labels: body.labels.split(','),
    };

    const processFile = async (file: File) => {
      const [original, thumb] = await Promise.all([
        this.imageService.sharpAndCropImage(file.buffer, { width: 300, height: 250, quality: 30 }),
        this.imageService.sharpAndCropImage(file.buffer, { width: 600, height: 500 }),
      ]);
      const mainMetadata = this.imageService.getMetadata(file, false);
      const thumbMetadata = this.imageService.getMetadata(file, true);

      await Promise.all([
        this.imageService.uploadImage(original, mainMetadata, 'menu'),
        this.imageService.uploadImage(thumb, thumbMetadata, 'menu/thumbs'),
      ]);

      return {
        image: mainMetadata.originalname,
        thumb: thumbMetadata.originalname,
      };
    };

    const [main, ...rest] = await Promise.all(files.map(processFile));

    if (main) {
      Object.assign(data, {
        image: `menu/${main.image}`,
        thumb: `menu/thumbs/${main.thumb}`,
        images: rest.map((el) => ({
          image: `menu/${el.image}`,
          thumb: `menu/thumbs/${el.thumb}`,
        })),
      });
    }

    return this.menuService.updateOne(params.id, data);
  }
}
