import { IImageService, ImageTypeEnum } from 'interfaces';
import { isValidPassphrase } from 'middlewares';
import multer from 'multer';
import { type AlbumsQuery, AppRequest, File, UploadImage } from 'types';
import { BaseController, Controller, Delete, Get, Post, Put } from 'utils';
const upload = multer({ storage: multer.memoryStorage() });

@Controller('/gallery')
export class ImageController extends BaseController {
  constructor(private imageService: IImageService) {
    super();
  }

  @Get('/')
  async get(request: AppRequest) {
    return this.imageService.findAll(
      {
        type: request.query.type as ImageTypeEnum,
        event: request.query.event as string,
        album: request.query.album as string,
      },
      request.pagination,
    );
  }

  @Get('/albums')
  async getGroups({ query }: { query: AlbumsQuery }) {
    return this.imageService.getAlbums(query);
  }

  @Post('/', [upload.array('files', 5), isValidPassphrase])
  async post({ body, files }: { files: File[]; body: UploadImage }) {
    const proceedFile = async (file: File) => {
      const thumbMetadata = this.imageService.getMetadata(file, true);
      const mainMetadata = this.imageService.getMetadata(file, false);
      const sharped = await this.imageService.sharpAndCropImage(file.buffer, { width: 300, height: 300, quality: 30 });

      const data = {
        image: `gallery/${mainMetadata.originalname}`,
        thumb: `gallery/thumbs/${thumbMetadata.originalname}`,
        album: body.album,
        event: body.event,
        type: body.type,
      };

      const [image] = await Promise.all([
        this.imageService.create(data),
        this.imageService.uploadImage(file.buffer, mainMetadata, 'gallery'),
        this.imageService.uploadImage(sharped, thumbMetadata, 'gallery/thumbs'),
      ]);
      return image;
    };

    return Promise.all(files.map(proceedFile));
  }

  @Delete('/:id', [isValidPassphrase])
  async delete(req: AppRequest) {
    return this.imageService.delete(req.params.id === 'many' ? req.body.ids : req.params.id);
  }

  @Put('/:id', [isValidPassphrase])
  async put({ body, params }: { files: File[]; body: UploadImage; params: { id: string } }) {
    return this.imageService.updateOne(params.id, body);
  }
}
