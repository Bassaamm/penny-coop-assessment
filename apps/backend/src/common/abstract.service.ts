import { Model, Document, FilterQuery, UpdateQuery } from 'mongoose';

type ServiceOptions = {
  populate?: string | string[];
};

export abstract class AbstractService<T extends Document> {
  constructor(protected readonly model: Model<T>) {}
  async findAll(): Promise<T[]> {
    return this.model.find().exec();
  }

  async findOneOrFail(id: string): Promise<T> {
    const document = await this.model.findById(id).exec();
    if (!document) {
      throw new Error('Document not found');
    }
    return document;
  }

  async findOneByEmail(email: string, selectPassword = false): Promise<T> {
    const query = this.model.findOne({ email });
    if (selectPassword) {
      query.select('+password');
    }
    return query.exec();
  }

  async findOne(id: string, options?: ServiceOptions): Promise<T | null> {
    const query = this.model.findById(id);

    if (options?.populate) {
      query.populate(options.populate);
    }

    return query.exec();
  }

  async update(id: string, payload: UpdateQuery<T>): Promise<T> {
    const document = await this.model
      .findByIdAndUpdate(id, { $set: payload }, { new: true })
      .exec();

    if (!document) {
      throw new Error('Document not found');
    }

    return document;
  }

  async save(entity: Partial<T>): Promise<T> {
    const document = new this.model(entity);
    return document.save();
  }
}
