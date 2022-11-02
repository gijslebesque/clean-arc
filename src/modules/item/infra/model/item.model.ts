import mongoose, { Document, Schema } from "mongoose";

export interface ItemSchema extends Document<Schema.Types.ObjectId> {
  displayName: string;
  price: number;
}

const ItemSchema: Schema = new Schema<ItemSchema>({
  displayName: { type: Schema.Types.String, required: true },
  price: { type: Schema.Types.Number, required: true, default: 0 },
});

export const ItemModel = mongoose.model<ItemSchema>("Item", ItemSchema);
