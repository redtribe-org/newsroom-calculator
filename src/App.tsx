import React, { useEffect } from "react";
import { useState } from "react";
import {
  Box,
  Button,
  Chip,
  Container,
  Stack,
  Step,
  StepButton,
  Stepper,
  Typography,
} from "@mui/material";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Spacer } from "./Spacer.tsx";

const strategicGoals = {
  "Wir digitalisieren die Lufttechnik": null,
  "Wir stärken fortlaufend unsere Technologieführerschaft mit Innovationen":
    null,
  "Wir begeistern unsere Kunden": null,
  "Wir fokussieren profitables Wachstum zum Ausbau unserer Marktführerschaft":
    null,
  "Wir sind als Arbeitgeber die erste Wahl": null,
  "Wir verfolgen eine Null-Emissions-Strategie": null,
};

const steps = ["Strategische Ziele", "Sonsige Bewertungskriterien"];

const isNumber = (value: any): value is number => typeof value === "number";

const Scorer: React.FC<{
  strategicGoalScores: typeof strategicGoals;
  confidenceScore: number | undefined;
  targetAudiences: string[];
  globalRelevance: number | undefined;
  urgency: number | undefined;
  effort: number | undefined;
}> = ({
  strategicGoalScores,
  confidenceScore,
  targetAudiences,
  globalRelevance,
  urgency,
  effort,
}) => {
  const aggregatedStrategyScore = Object.values(strategicGoalScores).reduce(
    (acc, score) => acc + (score ?? 0),
    0,
  );

  const targetAudienceScore = targetAudiences.length;

  const filteredMetrics = [
    confidenceScore,
    globalRelevance,
    urgency,
    effort,
  ].filter(isNumber);

  const metricsWithConvertedAudienceScore = [
    ...filteredMetrics,
    ...(targetAudienceScore > 0 ? [targetAudienceScore] : []),
  ];

  const averagedMetricsScore =
    metricsWithConvertedAudienceScore.length === 0
      ? 0
      : metricsWithConvertedAudienceScore.reduce(
          (acc, score) => acc + score,
          0,
        ) / metricsWithConvertedAudienceScore.length;

  const color = React.useMemo(() => {
    if (aggregatedStrategyScore + averagedMetricsScore < 15) {
      return "error";
    }
    if (aggregatedStrategyScore + averagedMetricsScore < 25) {
      return "warning";
    }
    return "success";
  }, [averagedMetricsScore, aggregatedStrategyScore]);

  return (
    <Chip
      color={color}
      variant="outlined"
      sx={{ height: "auto", minWidth: "120px" }}
      label={
        <Typography variant="h1" component="span">
          {(aggregatedStrategyScore + averagedMetricsScore).toFixed(1)}
        </Typography>
      }
    />
  );
};

function App() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  const completedSteps = () => Object.keys(completed).length;
  const handleNext = () => {
    const isLastStep = activeStep === steps.length - 1;
    const allStepsCompleted = completedSteps() === steps.length;
    const newActiveStep =
      isLastStep && !allStepsCompleted
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((_step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };
  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
    setStrategicGoalScores(strategicGoals);
    setConfidenceScore(undefined);
    setTargetAudiences([]);
    setGlobalRelevance(undefined);
    setUrgency(undefined);
    setEffort(undefined);
  };

  const [strategicGoalScores, setStrategicGoalScores] =
    useState(strategicGoals);
  useEffect(() => {
    const allGoalsScored = Object.values(strategicGoalScores).every(
      (score) => score !== null,
    );
    if (allGoalsScored) {
      setCompleted((prev) => ({ ...prev, 0: true }));
    }
  }, [strategicGoalScores]);

  const strategicGoalsStep = Object.keys(strategicGoalScores).map((goal) => (
    <React.Fragment key={goal}>
      <Box>
        <Typography variant="h5">{goal}</Typography>
        <Spacer />
        <Stack
          spacing={{ xs: 1, sm: 2 }}
          sx={{ justifyContent: "center" }}
          direction="row"
          useFlexGap
          flexWrap="wrap"
        >
          {[0, 1, 2, 3, 4, 5].map((star) => (
            <Button
              key={star}
              variant={
                strategicGoalScores[
                  goal as keyof typeof strategicGoalScores
                ] === star
                  ? "contained"
                  : "outlined"
              }
              onClick={() => {
                setStrategicGoalScores((prev) => ({
                  ...prev,
                  [goal]: star,
                }));
              }}
            >
              {star === 0 ? "N/A" : star}
            </Button>
          ))}
        </Stack>
      </Box>
      <Spacer spacing={3} />
    </React.Fragment>
  ));

  const [confidenceScore, setConfidenceScore] = useState<number | undefined>();
  const confidenceStep = (
    <React.Fragment>
      <Box>
        <Typography variant="h5">
          Confidence zum Beitrag zur Erreichung der Kommunikationsziele
        </Typography>
        <Spacer />
        <Stack
          spacing={{ xs: 1, sm: 2 }}
          sx={{ justifyContent: "center" }}
          direction="row"
          useFlexGap
          flexWrap="wrap"
        >
          {[0, 1, 2, 3, 4, 5].map((star) => (
            <Button
              key={star}
              variant={confidenceScore === star ? "contained" : "outlined"}
              onClick={() => {
                setConfidenceScore(() => star);
              }}
            >
              {star === 0 ? "N/A" : star}
            </Button>
          ))}
        </Stack>
      </Box>
      <Spacer spacing={3} />
    </React.Fragment>
  );

  const [targetAudiences, setTargetAudiences] = useState<string[]>([]);
  const targetAudienceRelevanceStep = (
    <React.Fragment>
      <Box>
        <Typography variant="h5">Zielgruppenrelevanz</Typography>
        <Spacer />
        <Stack
          spacing={{ xs: 1, sm: 2 }}
          sx={{ justifyContent: "center" }}
          direction="row"
          useFlexGap
          flexWrap="wrap"
        >
          {[
            "Führungskräfte",
            "Mitarbeiter (Blue Collar)",
            "Mitarbeitende (White Collar)",
            "Kunden",
            "Allg. Öffentlichkeit/Community",
          ].map((audience) => (
            <Button
              key={audience}
              variant={
                targetAudiences.includes(audience) ? "contained" : "outlined"
              }
              onClick={() => {
                setTargetAudiences((prev) =>
                  prev.includes(audience)
                    ? prev.filter(
                        (currentAudience) => currentAudience !== audience,
                      )
                    : [...prev, audience],
                );
              }}
            >
              {audience}
            </Button>
          ))}
        </Stack>
      </Box>
      <Spacer spacing={3} />
    </React.Fragment>
  );

  const [globalRelevance, setGlobalRelevance] = useState<number | undefined>();
  const globalRelevanceStep = (
    <React.Fragment>
      <Box>
        <Typography variant="h5">Globale Relevanz</Typography>
        <Spacer />
        <Stack
          spacing={{ xs: 1, sm: 2 }}
          sx={{ justifyContent: "center" }}
          direction="row"
          useFlexGap
          flexWrap="wrap"
        >
          {[0, 1, 2, 3, 4, 5].map((star) => (
            <Button
              key={star}
              variant={globalRelevance === star ? "contained" : "outlined"}
              onClick={() => {
                setGlobalRelevance(() => star);
              }}
            >
              {star === 0 ? "N/A" : star}
            </Button>
          ))}
        </Stack>
      </Box>
      <Spacer spacing={3} />
    </React.Fragment>
  );

  const [urgency, setUrgency] = useState<number | undefined>();
  const urgencyStep = (
    <React.Fragment>
      <Box>
        <Typography variant="h5">Dringlichkeit</Typography>
        <Spacer />
        <Stack
          spacing={{ xs: 1, sm: 2 }}
          sx={{ justifyContent: "center" }}
          direction="row"
          useFlexGap
          flexWrap="wrap"
        >
          {[0, 1, 2, 3, 4, 5].map((star) => (
            <Button
              key={star}
              variant={urgency === star ? "contained" : "outlined"}
              onClick={() => {
                setUrgency(() => star);
              }}
            >
              {star === 0 ? "N/A" : star}
            </Button>
          ))}
        </Stack>
      </Box>
      <Spacer spacing={3} />
    </React.Fragment>
  );

  const [effort, setEffort] = useState<number | undefined>();
  const effortStep = (
    <React.Fragment>
      <Box>
        <Typography variant="h5">Aufwand</Typography>
        <Spacer />
        <Stack
          spacing={{ xs: 1, sm: 2 }}
          sx={{ justifyContent: "center" }}
          direction="row"
          useFlexGap
          flexWrap="wrap"
        >
          {[0, 1, 2, 3, 4, 5].map((star) => (
            <Button
              key={star}
              variant={effort === star ? "contained" : "outlined"}
              onClick={() => {
                setEffort(() => star);
              }}
            >
              {star === 0 ? "N/A" : star}
            </Button>
          ))}
        </Stack>
      </Box>
      <Spacer spacing={3} />
    </React.Fragment>
  );

  useEffect(() => {
    const allOtherMetricsScored = [
      confidenceScore,
      globalRelevance,
      urgency,
      effort,
    ].every(isNumber);

    if (allOtherMetricsScored && targetAudiences.length > 0) {
      setCompleted((prev) => ({ ...prev, 1: true }));
    }
  }, [confidenceScore, globalRelevance, urgency, effort, targetAudiences]);

  return (
    <>
      <Container>
        <Typography variant="h2" sx={{ textAlign: "center" }}>
          Newsroom Score Calculator
        </Typography>
        <Spacer spacing={4} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "flex-end",
            gap: "1rem",
          }}
        >
          <Scorer
            effort={effort}
            urgency={urgency}
            confidenceScore={confidenceScore}
            strategicGoalScores={strategicGoalScores}
            globalRelevance={globalRelevance}
            targetAudiences={targetAudiences}
          />
          <Button onClick={handleReset} sx={{ mr: 1 }}>
            Reset
          </Button>
        </Box>
        <Spacer spacing={3} />
        <Stepper nonLinear activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepButton color="inherit" onClick={() => setActiveStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <Spacer spacing={5} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
          }}
        >
          {activeStep === 0 && strategicGoalsStep}
          {activeStep > 0 && (
            <>
              {confidenceStep}
              {targetAudienceRelevanceStep}
              {globalRelevanceStep}
              {urgencyStep}
              {effortStep}
            </>
          )}
        </Box>

        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={() =>
              setActiveStep((prevActiveStep) => prevActiveStep - 1)
            }
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box sx={{ flex: "1 1 auto" }} />
          <Button onClick={handleNext} sx={{ mr: 1 }}>
            Next
          </Button>
        </Box>
      </Container>
    </>
  );
}

export default App;
