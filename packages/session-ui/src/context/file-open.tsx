import { createContext, useContext, type ParentProps } from "solid-js"

/** Opens a path in the host's file panel. Takes absolute paths, including ones outside the workspace. */
export type OpenFile = (path: string) => void

const context = createContext<{ readonly openFile: OpenFile }>()

export function FileOpenProvider(props: ParentProps<{ openFile: OpenFile }>) {
  return (
    <context.Provider
      value={{
        get openFile() {
          return props.openFile
        },
      }}
    >
      {props.children}
    </context.Provider>
  )
}

export const useFileOpener = () => useContext(context)
