export interface FormState {
  error: string;
  status: "INITIAL" | "SUCCESS" | "ERROR";
  _id?: string;
}
