import { MedusaRequest, MedusaResponse } from "@medusajs/framework";

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const query = req.scope.resolve("query");

  const { id } = req.params;

  const { data: brand } = await query.graph({
    entity: "brand",
    filters: { id: id },
    fields: ["*", "products.*"],
  });

  res.json({ brand });
};
