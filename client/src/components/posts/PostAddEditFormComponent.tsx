import { useQuery } from "@apollo/client";
import {
  Button,
  Grid,
  LoadingOverlay,
  Modal,
  MultiSelect,
  Textarea,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { CATEGORIES } from "../../utils/query";

export type PostAddEditFormState = {
  content: string;
  categories: string[];
};

type PostAddEditFormComponentProps = {
  title: string;
  opened: boolean;
  close: () => void;
  formData: PostAddEditFormState;
  submissionOnGoing: boolean;
  submitButtonLabel: string;
  onSubmit: (values: PostAddEditFormState) => void;
};

export function PostAddEditFormComponent({
  title,
  opened,
  close,
  formData,
  submissionOnGoing = false,
  submitButtonLabel,
  onSubmit,
}: PostAddEditFormComponentProps) {
  const { data, loading, error } = useQuery(CATEGORIES);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      content: formData.content,
      categories: formData.categories,
    },
    validate: (values) => ({
      content: values.content.length > 0 ? null : "Content is too short",
      categories:
        values.categories.length > 0 ? null : "Select at least one category",
    }),
  });

  return (
    <Modal opened={opened} onClose={close} title={title}>
      <form
        onSubmit={form.onSubmit((values) => {
          onSubmit(values);
          //clear form
          form.reset();
        })}
      >
        <Grid grow>
          <Grid.Col span={12}>
            <Textarea
              placeholder="E.g: Today was a great day!"
              resize="vertical"
              key={form.key("content")}
              {...form.getInputProps("content")}
            />
          </Grid.Col>
          <Grid.Col span={6}>
            <LoadingOverlay visible={loading} />
            <MultiSelect
              data={data?.categories || []}
              error={error ? "Failed to load categories" : null}
              placeholder="Select categories"
              searchable
              nothingFoundMessage="No categories found"
              label="Categories"
              key={form.key("categories")}
              {...form.getInputProps("categories")}
            />
          </Grid.Col>
          <Grid.Col
            span={6}
            style={{
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              tt="uppercase"
              type="submit"
              loading={submissionOnGoing}
              loaderProps={{ type: "dots" }}
            >
              {submitButtonLabel}
            </Button>
          </Grid.Col>
        </Grid>
      </form>
    </Modal>
  );
}
