import { Drawer, Heading, Label, Input, Button } from "@medusajs/ui";
import { FormProvider, useForm } from "react-hook-form";

type CreateBrandFormProps = {
  onSubmit: (data: { name: string }) => void;
  isLoading?: boolean;
  isOpen: boolean;
  onClose: () => void;
};

export const CreateBrandForm = ({
  onSubmit,
  isLoading,
  isOpen,
  onClose,
}: CreateBrandFormProps) => {
  const form = useForm({
    defaultValues: { name: "" },
  });

  const handleSubmit = (data: { name: string }) => {
    onSubmit(data);
    form.reset();
  };

  return (
    <Drawer open={isOpen} onOpenChange={onClose}>
      <Drawer.Content>
        <FormProvider {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-1 flex-col overflow-hidden"
          >
            <Drawer.Header>
              <Heading>Create Brand</Heading>
            </Drawer.Header>
            <Drawer.Body className="flex flex-col gap-y-4">
              <div className="flex flex-col gap-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  {...form.register("name", { required: true })}
                  id="name"
                  placeholder="Brand name"
                />
              </div>
            </Drawer.Body>
            <Drawer.Footer>
              <Button type="submit" variant="primary" disabled={isLoading}>
                {isLoading ? "Creating..." : "Save Brand"}
              </Button>
              <Button variant="secondary" onClick={onClose}>
                Cancel
              </Button>
            </Drawer.Footer>
          </form>
        </FormProvider>
      </Drawer.Content>
    </Drawer>
  );
};
