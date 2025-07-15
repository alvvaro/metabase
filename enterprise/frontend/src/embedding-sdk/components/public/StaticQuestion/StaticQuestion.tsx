import {
  FlexibleSizeComponent,
  type FlexibleSizeProps,
} from "embedding-sdk/components/private/FlexibleSizeComponent";
import {
  InteractiveQuestionProvider,
  type InteractiveQuestionProviderProps,
} from "embedding-sdk/components/private/InteractiveQuestion/context";
import type { InteractiveQuestionDefaultViewProps } from "embedding-sdk/components/private/InteractiveQuestionDefaultView";
import { DefaultViewTitle } from "embedding-sdk/components/private/InteractiveQuestionDefaultView/DefaultViewTitle";
import { withPublicComponentWrapper } from "embedding-sdk/components/private/PublicComponentWrapper";
import { Group, Stack } from "metabase/ui";

import { InteractiveQuestion } from "../InteractiveQuestion";
import type { InteractiveQuestionQuestionIdProps } from "../InteractiveQuestion/types";

/**
 * @interface
 * @expand
 * @category StaticQuestion
 */
export type StaticQuestionProps = InteractiveQuestionQuestionIdProps & {
  withChartTypeSelector?: boolean;
} & Pick<InteractiveQuestionProviderProps, "initialSqlParameters"> &
  Pick<InteractiveQuestionDefaultViewProps, "title"> &
  FlexibleSizeProps;

const StaticQuestionInner = ({
  questionId: initialQuestionId,
  withChartTypeSelector,
  height,
  width,
  className,
  style,
  initialSqlParameters,

  // Hidden by default for backwards-compatibility.
  title = false,
}: StaticQuestionProps): JSX.Element | null => (
  <InteractiveQuestionProvider
    questionId={initialQuestionId}
    variant="static"
    initialSqlParameters={initialSqlParameters}
  >
    <FlexibleSizeComponent
      width={width}
      height={height}
      className={className}
      style={style}
    >
      <Stack gap="sm">
        {title && <DefaultViewTitle title={title} />}

        {withChartTypeSelector && (
          <Group justify="space-between">
            <InteractiveQuestion.ChartTypeDropdown />
          </Group>
        )}

        <InteractiveQuestion.QuestionVisualization
          height={height}
          width={width}
          className={className}
          style={style}
        />
      </Stack>
    </FlexibleSizeComponent>
  </InteractiveQuestionProvider>
);

/**
 * A component that renders a static question.
 *
 * @function
 * @category StaticQuestion
 */
export const StaticQuestion = withPublicComponentWrapper(StaticQuestionInner);
