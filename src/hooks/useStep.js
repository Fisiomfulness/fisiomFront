// @ts-check
import { useState, useCallback } from "react";

/**
 * @typedef {{
 *   initialStep?: number;
 *   totalSteps: number;
 *   loop?: boolean;
 * }} UseStepOptions
 */

/**
 * `useStep` is a hook to manage steps in multi-step interfaces like wizards or forms.
 * It provides functionality to move between steps, with optional looping from first to last step.
 *
 * @param {UseStepOptions} options - Configuration options including the initial step, total number of steps, and looping behavior.
 * @return - An object containing the current step and functions to navigate between steps.
 */
function useStep({ initialStep = 0, totalSteps, loop = false }) {
  const [currentStep, setCurrentStep] = useState(initialStep);

  const goToStep = useCallback(
    /** @param {number} step */
    (step) => {
      if (step < 0 || step >= totalSteps) {
        if (loop) {
          const newStep = step < 0 ? totalSteps - 1 : 0;
          setCurrentStep(newStep);
        }
        return;
      }
      setCurrentStep(step);
    },
    [totalSteps, loop],
  );

  const nextStep = useCallback(() => {
    goToStep(currentStep + 1);
  }, [currentStep, goToStep]);

  const prevStep = useCallback(() => {
    goToStep(currentStep - 1);
  }, [currentStep, goToStep]);

  const reset = useCallback(() => {
    setCurrentStep(initialStep);
  }, [initialStep]);

  return { currentStep, goToStep, nextStep, prevStep, reset };
}

export { useStep };
