import { defineRouteConfig } from "@medusajs/admin-sdk";
import { TagSolid } from "@medusajs/icons";
import {
  Container,
  createDataTableColumnHelper,
  DataTable,
  DataTablePaginationState,
  useDataTable,
  toast,
  Heading,
  Button,
} from "@medusajs/ui";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { sdk } from "../../lib/sdk";
import { CreateBrandForm } from "../../components/add-brand";

type Brand = {
  id: string;
  name: string;
};
type BrandsResponse = {
  brands: Brand[];
  count: number;
  limit: number;
  offset: number;
};

const columnHelper = createDataTableColumnHelper<Brand>();

const columns = [
  columnHelper.accessor("id", {
    header: "ID",
  }),
  columnHelper.accessor("name", {
    header: "Name",
  }),
];

const BrandsPage = () => {
  const queryClient = useQueryClient();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const limit = 15;
  const [pagination, setPagination] = useState<DataTablePaginationState>({
    pageSize: limit,
    pageIndex: 0,
  });
  const offset = useMemo(() => pagination.pageIndex * limit, [pagination]);

  const { data, isLoading } = useQuery<BrandsResponse>({
    queryFn: () =>
      sdk.client.fetch(`/admin/brands`, {
        query: { limit, offset },
      }),
    queryKey: [["brands", limit, offset]],
  });

  const table = useDataTable({
    columns,
    data: data?.brands || [],
    getRowId: (row) => row.id,
    rowCount: data?.count || 0,
    isLoading,
    pagination: {
      state: pagination,
      onPaginationChange: setPagination,
    },
  });

  const createBrandMutation = useMutation({
    mutationFn: async (data: { name: string }) => {
      return sdk.client.fetch(`/admin/brands`, {
        method: "post",
        body: { name: data.name },
      });
    },
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [["brands", limit, offset]] });
      setIsDrawerOpen(false);
      toast.success("Brand created");
    },
    onError: (error) => {
      console.error("Failed to create brand:", error);
      setIsDrawerOpen(false);
    },
  });

  const handleCreateBrand = (data: { name: string }) => {
    createBrandMutation.mutate(data);
  };

  return (
    <Container className="divide-y p-0">
      <DataTable instance={table}>
        <DataTable.Toolbar className="flex flex-col items-start justify-between gap-2 md:flex-row md:items-center">
          <div className="flex items-center justify-between">
            <Heading>Brands</Heading>
            <Button variant="primary" onClick={() => setIsDrawerOpen(true)}>
              Create Brand
            </Button>
          </div>
        </DataTable.Toolbar>
        <DataTable.Table />
        <DataTable.Pagination />
      </DataTable>
      <CreateBrandForm
        onSubmit={handleCreateBrand}
        isLoading={createBrandMutation.isPending}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </Container>
  );
};

export const config = defineRouteConfig({
  label: "Brands",
  icon: TagSolid,
});

export default BrandsPage;
