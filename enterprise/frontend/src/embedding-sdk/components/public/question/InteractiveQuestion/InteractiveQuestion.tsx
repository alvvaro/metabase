import type {
  BackButton,
  Breakout,
  BreakoutDropdown,
  ChartTypeDropdown,
  ChartTypeSelector,
  DownloadWidget,
  DownloadWidgetDropdown,
  Editor,
  EditorButton,
  Filter,
  FilterDropdown,
  QuestionResetButton,
  QuestionSettings,
  QuestionSettingsDropdown,
  QuestionVisualization,
  SaveButton,
  SdkSaveQuestionForm,
  Summarize,
  SummarizeDropdown,
  Title,
  VisualizationButton,
} from "embedding-sdk/components/private/SdkQuestion/components";
import { EmbeddingSdkMode } from "metabase/visualizations/click-actions/modes/EmbeddingSdkMode";

import { SdkQuestion, type SdkQuestionProps } from "../SdkQuestion";

type InteractiveQuestionProps = SdkQuestionProps & {
  // TODO: Let's just use plugins in SdkQuestionProps
  plugins: SdkQuestionProps["componentPlugins"];
};

const _InteractiveQuestion = ({
  questionId,
  withResetButton = true,
  title,
  plugins,
  height,
  width,
  className,
  style,
  children = null,
  onBeforeSave,
  onSave,
  entityTypes,
  isSaveEnabled,
  targetCollection,
  withChartTypeSelector = true,
  withDownloads = false,
  initialSqlParameters,
  onRun,
}: InteractiveQuestionProps) => (
  <SdkQuestion
    questionId={questionId}
    withResetButton={withResetButton}
    title={title}
    componentPlugins={plugins}
    height={height}
    width={width}
    className={className}
    style={style}
    onBeforeSave={onBeforeSave}
    onSave={onSave}
    entityTypes={entityTypes}
    isSaveEnabled={isSaveEnabled}
    targetCollection={targetCollection}
    withChartTypeSelector={withChartTypeSelector}
    withDownloads={withDownloads}
    initialSqlParameters={initialSqlParameters}
    onRun={onRun}
    mode={EmbeddingSdkMode}
  >
    {children}
  </SdkQuestion>
);

export const InteractiveQuestion =
  _InteractiveQuestion as typeof _InteractiveQuestion & {
    BackButton: typeof BackButton;
    Filter: typeof Filter;
    FilterDropdown: typeof FilterDropdown;
    ResetButton: typeof QuestionResetButton;
    Title: typeof Title;
    Summarize: typeof Summarize;
    SummarizeDropdown: typeof SummarizeDropdown;
    /** @deprecated Use `InteractiveQuestion.Editor` instead */
    Notebook: typeof Editor;
    Editor: typeof Editor;
    /** @deprecated Use `InteractiveQuestion.EditorButton` instead */
    NotebookButton: typeof EditorButton;
    EditorButton: typeof EditorButton;
    QuestionVisualization: typeof QuestionVisualization;
    VisualizationButton: typeof VisualizationButton;
    SaveQuestionForm: typeof SdkSaveQuestionForm;
    SaveButton: typeof SaveButton;
    ChartTypeSelector: typeof ChartTypeSelector;
    ChartTypeDropdown: typeof ChartTypeDropdown;
    QuestionSettings: typeof QuestionSettings;
    QuestionSettingsDropdown: typeof QuestionSettingsDropdown;
    Breakout: typeof Breakout;
    BreakoutDropdown: typeof BreakoutDropdown;
    DownloadWidget: typeof DownloadWidget;
    DownloadWidgetDropdown: typeof DownloadWidgetDropdown;
  };

InteractiveQuestion.BackButton = SdkQuestion.BackButton;
InteractiveQuestion.Filter = SdkQuestion.Filter;
InteractiveQuestion.FilterDropdown = SdkQuestion.FilterDropdown;
InteractiveQuestion.ResetButton = SdkQuestion.ResetButton;
InteractiveQuestion.Title = SdkQuestion.Title;
InteractiveQuestion.Summarize = SdkQuestion.Summarize;
InteractiveQuestion.SummarizeDropdown = SdkQuestion.SummarizeDropdown;
InteractiveQuestion.Notebook = SdkQuestion.Editor;
InteractiveQuestion.Editor = SdkQuestion.Editor;
InteractiveQuestion.NotebookButton = SdkQuestion.EditorButton;
InteractiveQuestion.EditorButton = SdkQuestion.EditorButton;
InteractiveQuestion.QuestionVisualization = SdkQuestion.QuestionVisualization;
InteractiveQuestion.SaveQuestionForm = SdkQuestion.SaveQuestionForm;
InteractiveQuestion.SaveButton = SdkQuestion.SaveButton;
InteractiveQuestion.ChartTypeSelector = SdkQuestion.ChartTypeSelector;
InteractiveQuestion.QuestionSettings = SdkQuestion.QuestionSettings;
InteractiveQuestion.QuestionSettingsDropdown =
  SdkQuestion.QuestionSettingsDropdown;
InteractiveQuestion.BreakoutDropdown = SdkQuestion.BreakoutDropdown;
InteractiveQuestion.Breakout = SdkQuestion.Breakout;
InteractiveQuestion.ChartTypeDropdown = SdkQuestion.ChartTypeDropdown;
InteractiveQuestion.DownloadWidget = SdkQuestion.DownloadWidget;
InteractiveQuestion.DownloadWidgetDropdown = SdkQuestion.DownloadWidgetDropdown;
InteractiveQuestion.VisualizationButton = SdkQuestion.VisualizationButton;
