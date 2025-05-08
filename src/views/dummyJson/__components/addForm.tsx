import type React from "react";
import type { IAddJsonRequest } from "../../../api/listJsonService/requestModel";
import InputText from "../../../components/InputText";

interface AddFormInterface {
  value: IAddJsonRequest;
  errors: IAddJsonRequest;
  onChange: (field: keyof IAddJsonRequest, value: string) => void;
}

const AddForm: React.FC<AddFormInterface> = ({ value, onChange, errors }) => {
  return (
    <form>
      <InputText
        fullWidth
        id="outlined-multiline-static"
        label="Title"
        value={value.title}
        error={Boolean(errors.title)}
        helperText={errors.title}
        onChange={(e) => onChange("title", e.target.value)}
        sx={{ mb: 2, mt: 2}}
      />
      <InputText
        fullWidth
        id="outlined-multiline-static"
        label="Body"
        value={value.body}
        error={Boolean(errors.body)}
        helperText={errors.body}
        onChange={(e) => onChange("body", e.target.value)}
        multiline
        rows={3}
      />
    </form>
  );
};

export default AddForm;
