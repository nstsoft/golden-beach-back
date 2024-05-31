import { IImageService, IMenuService } from 'interfaces';
import multer from 'multer';
import { File, UploadMenu } from 'types';
import { BaseController, Controller, Get, Post } from 'utils';

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

  @Post('/', [upload.single('file')])
  async post({ body, file }: { file: File; body: UploadMenu }) {
    const mainMetadata = this.imageService.getMetadata(file, false);
    const thumbMetadata = this.imageService.getMetadata(file, true);

    const [post] = await Promise.all([
      this.menuService.create({
        ...body,
        image: `menu/${mainMetadata.originalname}`,
        thumb: `menu/thumbs/${thumbMetadata.originalname}`,
      }),
      this.imageService.uploadImage(file.buffer, mainMetadata, 'menu'),
    ]);

    return post;
  }
}
