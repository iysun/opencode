import type { ParentProps } from "solid-js"
import { FileOpenProvider, type OpenFile } from "@opencode/session-ui/context"
import { createOpenSessionFileTab } from "@/session/helpers"
import { useSessionLayout } from "@/session/session-layout"
import { useFile } from "@/workspaces/files/model"

/**
 * Lets tool cards open the file they touched as a side-panel tab, next to the diff.
 *
 * This is the same path the file browser already takes to open a file: `normalize` keeps an
 * absolute path outside the workspace intact, `load` reads it by re-pointing the location at the
 * file's own directory, and the panel renders it with the text viewer.
 */
export function FileOpener(props: ParentProps) {
  const file = useFile()
  const { tabs, view } = useSessionLayout()

  const openTab = createOpenSessionFileTab({
    normalizeTab: (tab) => (tab.startsWith("file://") ? file.tab(tab) : tab),
    openTab: tabs().open,
    pathFromTab: file.pathFromTab,
    loadFile: file.load,
    openReviewPanel: () => {
      if (!view().reviewPanel.opened()) view().reviewPanel.open()
    },
    setActive: tabs().setActive,
  })

  const openFile: OpenFile = (path) => {
    if (!path) return
    openTab(file.tab(path))
  }

  return <FileOpenProvider openFile={openFile}>{props.children}</FileOpenProvider>
}
