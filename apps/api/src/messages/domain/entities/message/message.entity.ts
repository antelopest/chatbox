export class MessageEntity {
  constructor(
    public readonly id: string,
    public readonly dialogId: string,
    public readonly senderId: string,
    public readonly text: string,
    public readonly createdAt: Date,
  ) {}

  static create(params: {
    dialogId: string;
    senderId: string;
    text: string;
  }): MessageEntity {
    return new MessageEntity(
      crypto.randomUUID(),
      params.dialogId,
      params.senderId,
      params.text.trim(),
      new Date(),
    );
  }
}
