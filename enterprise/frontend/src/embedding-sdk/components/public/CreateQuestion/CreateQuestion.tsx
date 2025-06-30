import {
  type BaseInteractiveQuestionProps,
  InteractiveQuestion,
} from "../SdkQuestion";

/**
 * @interface
 * @expand
 * @category CreateQuestion
 */
export type CreateQuestionProps = Omit<
  Partial<BaseInteractiveQuestionProps>,
  "questionId" | "children"
>;

export const CreateQuestion = (props: CreateQuestionProps = {}) => (
  <InteractiveQuestion {...props} questionId="new" />
);
