import { DialogDocument } from '@dialogs/infrastructure/schemas';
import { DialogEntity } from '@dialogs/domain';

export class DialogPersistenceMapper {
  static toEntity(doc: DialogDocument): DialogEntity {
    return new DialogEntity({
      id: doc._id.toString(),
      type: doc.type,
      title: doc.title,
      participants: doc.participants.map(String),
      updatedAt: doc.updatedAt,
    });
  }
}
