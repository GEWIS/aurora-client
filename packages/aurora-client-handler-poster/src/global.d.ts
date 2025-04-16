declare module '*.scss';

declare module '*.png';

declare module '*.gif';

declare module '*.avif';

declare module '*.svg' {
  import * as React from 'react'

  export const ReactComponent: React.FunctionComponent<
    React.ComponentProps<'svg'> & { title?: string }
  >
  export default ReactComponent
}