// import { type ReactNode, type ComponentType, } from 'react'

// type ProviderProps = {children: ReactNode};
// type ProviderComponent = ComponentType<ProviderProps>

// //modified from https://dev.to/fariasmateuss/compose-multiple-react-providers-4oc4
// export const compose = (providers: ProviderComponent[]): ComponentType<ProviderProps> => {
//   providers.reduce(
//     (Prev, Curr) => ({children}: ProviderProps) => (
//       <Prev>
//         <Curr>{children}</Curr>
//       </Prev>
//     ),
//   )
// }

import { type ReactNode, type ComponentType } from "react";

type ProviderProps = { children: ReactNode };
type ProviderComponent = ComponentType<ProviderProps>;

export const compose = (providers: ProviderComponent[]) =>
  providers.reduce(
    (Prev, Curr) =>
      ({ children }: ProviderProps) =>
        (
          <Prev>
            <Curr>{children}</Curr>
          </Prev>
        ),
    ({ children }: ProviderProps) => <>{children}</>
  );