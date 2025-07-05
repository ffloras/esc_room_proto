import { createContext, useState, type FC, type ReactNode } from "react";

type timeProp = {[key: string]: number};

type TimeContextProp = {
  time: timeProp;
  changeTime: (hr: number, type: string) => void
  moonTime: string;
  changeMoonTime: () => void;
}
export const TimeContext = createContext<TimeContextProp>({
  time: {hour: 0, minute: 0},
  changeTime: () => {},
  moonTime: "",
  changeMoonTime: () => {},
})

type TimeProviderProp = {
  children: ReactNode;
}

export const TimeProvider: FC<TimeProviderProp>= ({children}) => {
  const [time, setTime] = useState<timeProp>({hour: 5, minute: 10});
  const [moonTime, setMoonTime] = useState("halfMoon");

  const changeTime = (time: number, type: string) => {
    setTime((prev) => ({...prev, [type]: time}))
  }

  const changeMoonTime = ()  => {
    let hr = time.hour;
    let min = time.minute;
    if ((hr == 11) || (hr < 2) || ( hr == 2 && min <= 15)) { //11:00 - 2:15
      setMoonTime("fullMoon");
    } else if ((hr < 5)) { //2:16 - 4:59
      setMoonTime("halfMoon");
    } else if ((hr < 6) || (hr == 7 && min <= 30)) { //5:00 - 7:30
      setMoonTime("crescentMoon");
    } else { //7:31 - 10:59
      setMoonTime("newMoon")
    }
  }




  return <TimeContext.Provider value={{time, changeTime, moonTime, changeMoonTime}}>
    {children}
  </TimeContext.Provider>
}