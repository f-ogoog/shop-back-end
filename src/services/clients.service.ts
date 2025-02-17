import clientModel from "../models/client.model";
import { Client } from "../types/clients.types";

const updateOrCreate = async (data: Client) => {
  const client = await clientModel.findOne({ email: data.email });

  if (client) {
    Object.assign(client, data);
    return await client.save();
  }

  return clientModel.create(data);
};

export const clientsService = {
  updateOrCreate,
};
