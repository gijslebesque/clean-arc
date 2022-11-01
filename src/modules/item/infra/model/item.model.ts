import mongoose, { Document, Schema } from "mongoose";
import { UnmarshalledItem } from "../../domain/entity/item.entity";

type IItem = Omit<UnmarshalledItem, "id"> & Document;

const ItemSchema: Schema = new Schema({
  displayName: { type: Schema.Types.String, required: true },
  price: { type: Schema.Types.Number, required: true, default: 0 },
});

export const ItemModel = mongoose.model<IItem>("Item", ItemSchema);
