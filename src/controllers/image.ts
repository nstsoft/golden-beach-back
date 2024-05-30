import { IImageService, ImageTypeEnum } from 'interfaces';
import multer from 'multer';
import { AppRequest, File, UploadImage } from 'types';
import { BaseController, Controller, Get, Post } from 'utils';
const upload = multer({ storage: multer.memoryStorage() });

@Controller('/image')
export class ImageController extends BaseController {
  constructor(private imageService: IImageService) {
    super();
  }

  @Get('/')
  async get(request: AppRequest) {
    return this.imageService.findAll({ type: request.query.type as ImageTypeEnum }, request.pagination);
  }

  @Post('/', [upload.single('file')])
  async post({ body, file }: { file: File; body: UploadImage }) {
    const thumbMetadata = this.imageService.getMetadata(file, true);
    const mainMetadata = this.imageService.getMetadata(file, false);

    const sharped = await this.imageService.sharpImage(file.buffer);

    const data = {
      image: `gallery/${mainMetadata.originalname}`,
      thumb: `gallery/thumbs/${thumbMetadata.originalname}`,
      type: body.type,
    };

    const [image] = await Promise.all([
      this.imageService.create(data),
      this.imageService.uploadImage(file.buffer, mainMetadata, 'gallery'),
      this.imageService.uploadImage(sharped, thumbMetadata, 'gallery/thumbs'),
    ]);

    return image;
  }
}
