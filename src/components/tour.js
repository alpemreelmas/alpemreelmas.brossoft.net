"use client"
import Joyride, {STATUS} from "react-joyride";
import {useEffect, useState} from "react";
import {useLocalStorage, useWindowSize} from "react-use";
import { TOUR_STATES } from "@/lib/constants";

export function Tour() {
    const [value, setValue] = useLocalStorage('alpemreelmas-visited', false);
    const {width, height} = useWindowSize();
    const [{ run, steps }, setState] = useState({
        run: width <= 1024 ? false : !value,
        steps: TOUR_STATES
    });
    
    
    const handleJoyrideCallback = (data) => {
        const { status, type } = data;
        const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];

        if (finishedStatuses.includes(status)) {
            setValue(true)
            setState({ run: false });
            
        }
    };
    return (
        <Joyride
            callback={handleJoyrideCallback}
            continuous
            run={run}
            scrollToFirstStep
            showProgress
            showSkipButton
            steps={steps}
            styles={{
                options: {
                    zIndex: 10000,
                },
            }}
        />
    )
}
